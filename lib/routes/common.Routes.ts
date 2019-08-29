import { Request, Response } from "express";
import { pluginController } from '../controllers/plugin.controller';
import {VstController} from '../controllers/vst.controller';

export class Routes {

    public pluginCtrlr: pluginController = new pluginController();
    public vstCtrl:VstController=new VstController();
    public routes(app): void {
        /**
         * Get Route Api to enumerate
         */
        app.route('/').get(this.pluginCtrlr.getplugins);


        /**
         * Post Api
         */
        app.route('/plugin').post(this.pluginCtrlr.addNewplugin);
        app.route('/plugin').get(this.pluginCtrlr.getplugins);
        app.route('/vst').post(this.pluginCtrlr.generateWav);
        app.route('/VST/otuputwav/:filename').get(this.vstCtrl.getVstWavFileSound);
    }
}