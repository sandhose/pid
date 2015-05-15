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
        parser: serialport.parsers.readline("\n")
      });
      this.port.open((err) => {
        if(err) {
          debug("can't open port", err);
          return;
        }

        debug("conneted to arduino");
        this.emit("connected");

        this.port.on("data", (data) => { this.handleData(data) } );
      });
    });
  }

  sendData(data) {
    let dataString = qs.stringify(data) + ";";
    debug("sending", dataString);
    this.port.write(dataString);
  }

  handleData(chunk) {
    console.log(chunk, qs.parse(chunk));
    this.emit("data", qs.parse(chunk));
    /*debug("recieved chunk '%s'", chunk);
    this._buffer += chunk;
    let dataArray = this._buffer.split(";");
    while(dataArray.length > 1) {
      let dataString = dataArray.shift();

      //let dataString = this._buffer.substring(0, index);
      //this._buffer = this._buffer.substring(index);

      debug("recieved dataString '%s', parsing...", dataString);
      let data = qs.parse(dataString);
      if(data) {
        this.emit("data", data);
      }
    }
    this._buffer = dataArray[0];
    debug("buffer is '%s'", this._buffer);*/
  }
}
