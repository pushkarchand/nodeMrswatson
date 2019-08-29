import * as mongoose from 'mongoose';
import { PluginSchema } from '../models/plugin.model';
import { Request, Response } from 'express';
import * as path from 'path';
const plugin = mongoose.model('plugin', PluginSchema);
import * as mrswatson from "node-mrswatson";
const util = require('util');

export class pluginController {

    /**
     * 
     * @param req :Request
     * @param res :Response
     */
    public addNewplugin(req: Request, res: Response) {
        req.body.path = path.resolve(__dirname, `../../VST/plugins/${req.body.path}`);
        req.body.path.replace(/\\/g, "\\\\");
        let newplugin = new plugin(req.body);
        newplugin.save((err, plugin) => {
            if (err) {
                res.send(err);
            }
            res.json(plugin);
        });
    }// public addNewplugin (req: Request, res: Response)


    /**
     * 
     * @param req :Request
     * @param res :Response
     */
    public getplugins(req: Request, res: Response) {
        plugin.find({}, (err, plugin) => {
            if (err) {
                res.send(err);
            }
            res.json(plugin);
        });
    }// public getplugins (req: Request, res: Response)


    /**
     * 
     * @param req :Request
     * @param res :Response
     */
    public getpluginWithID(req: Request, res: Response) {
        plugin.findById(req.params.pluginId, (err, plugin) => {
            if (err) {
                res.send(err);
            }
            res.json(plugin);
        });
    }// public getpluginWithID (req: Request, res: Response)

    /**
     * 
     * @param req :Request
     * @param res :response
     */
    public updateplugin(req: Request, res: Response) {
        plugin.findOneAndUpdate({ _id: req.params.pluginId }, req.body, { new: true }, (err, plugin) => {
            if (err) {
                res.send(err);
            }
            res.json(plugin);
        });
    }// public updateplugin (req: Request, res: Response)


    /**
     * 
     * @param req :Request
     * @param res :Response
     */
    public deleteplugin(req: Request, res: Response) {
        plugin.remove({ _id: req.params.pluginId }, (err, plugin) => {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Successfully deleted plugin!' });
        });
    }// public deleteplugin (req: Request, res: Response)

    public async generateWav(postRequest: Request, postResponse: Response) {
        postRequest.body.source = postRequest.body.source.replace(/\\/g, "\\\\");
        postRequest.body.vst = postRequest.body.vst.replace(/\\/g, "\\\\");
        postRequest.body.plugin = postRequest.body.plugin.replace(/\\/g, "\\\\");
        const obj = {
            inputFile: postRequest.body.source,
            outputFile: `D:\\Pushkar\\projects\\Sarnar\\mrWatson\\VST\\otuputwav\\${postRequest.body.outpath}.wav`,
            tempo: postRequest.body.tempo,
            plugins: [[postRequest.body.vst, postRequest.body.plugin]]
        };
        obj.outputFile = obj.outputFile.replace(/\\/g, "\\\\");
        // 3 voice Soft Lead
        //,'D:\\projects\\MrsVstPrototype\\VST\\presets\\Obxd-KVRCommunityBankPart2.fxb'
        const mrsWatsongenerateWav=util.promisify(mrswatson.processMid);
        const mrsWatsonResponse = await mrsWatsongenerateWav(obj);
        try {
            const returnValueResponse= mrsWatsonResponse.includes('Plugin chain could not be constructed');
            if (!returnValueResponse) {
                postResponse.send({ "error": null, "data": obj.outputFile});
            }
        } catch{
            postResponse.send({ "error": mrsWatsonResponse, "data": null });
        }
        // {
        //     if (err) {
        //         postResponse.send({"error":err,"data":null});
        //     }
        //     postResponse.send({"error":null,"data":'D:\\Pushkar\\projects\\Sarnar\\mrWatson\\VST\\otuputwav\\test2.wav'})
        // });
    }// public generateWav(postRequest: Request, postResponse: Response)
    

}