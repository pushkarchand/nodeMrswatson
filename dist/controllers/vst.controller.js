"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util = require('util');
const fs = require("fs");
class VstController {
    /**
     * Method to pipe wav file
     */
    getVstWavFileSound(getRequest, getResponse) {
        fs.exists("." + getRequest.url, function (exists) {
            if (exists) {
                fs.stat("." + getRequest.url, function (error, stat) {
                    if (error) {
                        throw error;
                    }
                    const d = new Date();
                    getResponse.setHeader('Cache-Control', 'public, max-age=' + d.getTime());
                    getResponse.writeHead(200);
                    fs.createReadStream("." + getRequest.url)
                        .pipe(getResponse);
                });
            }
            else {
                getResponse.writeHead(500);
                getResponse.write("sound file not found");
                getResponse.end();
            }
        });
    } // public getVstWavFileSound(getRequest: Request, getResponse: Response)
}
exports.VstController = VstController;
//# sourceMappingURL=vst.controller.js.map