import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const PluginSchema = new Schema({
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
    vstid: {
        type: String,
        required: true
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});