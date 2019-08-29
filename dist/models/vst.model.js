"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
exports.VstSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    keyword: {
        type: String
    },
    path: {
        type: String,
        required: true
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});
//# sourceMappingURL=vst.model.js.map