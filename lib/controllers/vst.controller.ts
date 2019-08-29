import { Request, Response } from 'express';
import * as path from 'path';
import * as mrswatson from "node-mrswatson";
const util = require('util');
import fs = require('fs');

export class VstController {


    /**
     * Method to pipe wav file
     */
    public getVstWavFileSound(getRequest: Request, getResponse: Response) {
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
            } else {

                getResponse.writeHead(500);
                getResponse.write("sound file not found");
                getResponse.end();
            }

        });
    }// public getVstWavFileSound(getRequest: Request, getResponse: Response)

}