"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const plugin_controller_1 = require("../controllers/plugin.controller");
const vst_controller_1 = require("../controllers/vst.controller");
class Routes {
    constructor() {
        this.pluginCtrlr = new plugin_controller_1.pluginController();
        this.vstCtrl = new vst_controller_1.VstController();
    }
    routes(app) {
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
exports.Routes = Routes;
//# sourceMappingURL=common.Routes.js.map