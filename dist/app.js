"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const common_Routes_1 = require("./routes/common.Routes");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const plugin_controller_1 = require("./controllers/plugin.controller");
class App {
    constructor() {
        this.app = express();
        this.routePrv = new common_Routes_1.Routes();
        this.mongoUrl = 'mongodb://localhost:27017/mrswatson';
        this.pluginCntlr = new plugin_controller_1.pluginController();
        this.app.use(morgan('combined'));
        this.app.use(cors());
        this.app.options('*', cors());
        this.app.use(function (req, res, next) {
            /*
             "Access-Control-Allow-Origin", "*"
             * response header indicates whether the response can be shared with resources with the given origin.
             * If the server specifies an origin host rather than "*",
             * then it must also include Origin in the Vary response header to indicate to clients
             that server responses will differ based on the value of the Origin request header.
           */
            res.header("Access-Control-Allow-Origin", "*");
            /*
             "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"
              *  The simple headers, Accept, Accept-Language, Content-Language,
              *  Content-Type of either application/x-www-form-urlencoded, multipart/form-data, or text/plain
              *  are always available and don't need to be listed by this
              *
              *
              *  header.
            */
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            /*
             "Access-Control-Expose-Headers"
             * The Access-Control-Expose-Headers response header indicates which headers can be exposed
               as part of the response by listing their names
            */
            res.header("Access-Control-Expose-Headers", 'Content-Range,token,errorMesage,Cache-Control,');
            next();
        });
        this.config();
        this.mongoSetup();
        this.routePrv.routes(this.app);
    }
    config() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        // serving static files 
        this.app.use(express.static('public'));
    } // private config(): void
    mongoSetup() {
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl, { useNewUrlParser: true });
    } // private mongoSetup(): void
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map