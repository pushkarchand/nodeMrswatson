"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const plugin_model_1 = require("../models/plugin.model");
const path = require("path");
const plugin = mongoose.model('plugin', plugin_model_1.PluginSchema);
const mrswatson = require("node-mrswatson");
const util = require('util');
class pluginController {
    /**
     *
     * @param req :Request
     * @param res :Response
     */
    addNewplugin(req, res) {
        req.body.path = path.resolve(__dirname, `../../VST/plugins/${req.body.path}`);
        req.body.path.replace(/\\/g, "\\\\");
        let newplugin = new plugin(req.body);
        newplugin.save((err, plugin) => {
            if (err) {
                res.send(err);
            }
            res.json(plugin);
        });
    } // public addNewplugin (req: Request, res: Response)
    /**
     *
     * @param req :Request
     * @param res :Response
     */
    getplugins(req, res) {
        plugin.find({}, (err, plugin) => {
            if (err) {
                res.send(err);
            }
            res.json(plugin);
        });
    } // public getplugins (req: Request, res: Response)
    /**
     *
     * @param req :Request
     * @param res :Response
     */
    getpluginWithID(req, res) {
        plugin.findById(req.params.pluginId, (err, plugin) => {
            if (err) {
                res.send(err);
            }
            res.json(plugin);
        });
    } // public getpluginWithID (req: Request, res: Response)
    /**
     *
     * @param req :Request
     * @param res :response
     */
    updateplugin(req, res) {
        plugin.findOneAndUpdate({ _id: req.params.pluginId }, req.body, { new: true }, (err, plugin) => {
            if (err) {
                res.send(err);
            }
            res.json(plugin);
        });
    } // public updateplugin (req: Request, res: Response)
    /**
     *
     * @param req :Request
     * @param res :Response
     */
    deleteplugin(req, res) {
        plugin.remove({ _id: req.params.pluginId }, (err, plugin) => {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Successfully deleted plugin!' });
        });
    } // public deleteplugin (req: Request, res: Response)
    generateWav(postRequest, postResponse) {
        return __awaiter(this, void 0, void 0, function* () {
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
            const mrsWatsongenerateWav = util.promisify(mrswatson.processMid);
            const mrsWatsonResponse = yield mrsWatsongenerateWav(obj);
            try {
                const returnValueResponse = mrsWatsonResponse.includes('Plugin chain could not be constructed');
                if (!returnValueResponse) {
                    postResponse.send({ "error": null, "data": obj.outputFile });
                }
            }
            catch (_a) {
                postResponse.send({ "error": mrsWatsonResponse, "data": null });
            }
            // {
            //     if (err) {
            //         postResponse.send({"error":err,"data":null});
            //     }
            //     postResponse.send({"error":null,"data":'D:\\Pushkar\\projects\\Sarnar\\mrWatson\\VST\\otuputwav\\test2.wav'})
            // });
        });
    } // public generateWav(postRequest: Request, postResponse: Response)
}
exports.pluginController = pluginController;
//# sourceMappingURL=plugin.controller.js.map