let debug = require("debug")("arduino");
import { EventEmitter } from "events";
import serialport, { SerialPort } from "serialport";
import qs from "qs";

export default class Arduino extends EventEmitter {
  constructor() {
    debug("looking for an arduino...");
    this._buffer = "";
    serialport.list((err, ports) => {
      if(err) {
        debug("error while listing ports", err);
        return;
      }

      let comName = "";

      ports.forEach((port) => {
        if(port.manufacturer.match(/Arduino/gi)) {
          comName = port.comName;
        }
      });

      if(!comName) {
        debug("no arduino found!");
        return;
      }

      this.port = new SerialPort(comName, {
      });
      this.port.open((err) => {
        if(err) {
          debug("can't open port", err);
          return;
        }

        debug("conneted to arduino");
        this.emit("connected");
	this.port.flush();

        this.port.on("data", (data) => { this.handleData(data) } );
      });
    });
  }

  sendData(data) {
    let dataString = qs.stringify(data) + ";";
    this.port.write(dataString);
  }

  handleData(chunk) {
    this._buffer += chunk;
    let dataArray = this._buffer.split("\n");
    while(dataArray.length > 1) {
      let dataString = dataArray.shift();

      let data = qs.parse(dataString);
      if(data) {
        this.emit("serial data", data);
      }
    }
    this._buffer = dataArray[0];
    debug("buffer is '%s'", this._buffer);
  }
}
