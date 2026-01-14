const mongoose = require('mongoose')

const charactersSchema = new mongoose.Schema({
    value: {
        type: String,
        required: true,
        maxLength: 20
    },
    reading: {
        type: [String],
        required: false,
        default: []
    },
    on_reading: {
        type: [String],
        required: false,
        default: []
    },
    kun_reading: {
        type: [String],
        required: false,
        default: []
    },
    meaning: {
        type: [String],
        required: false,
        default: []
    },
    note: {
        type: String,
        required: false,
        default: null
    },
    category_id: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    created_by: {
        type: String,
        required: true
    },
    updated_at: {
        type: Date,
        required: false
    },
    updated_by: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Characters', charactersSchema);