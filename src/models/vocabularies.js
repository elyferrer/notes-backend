const mongoose = require('mongoose')

const vocabulariesSchema = new mongoose.Schema({
    value: {
        type: String,
        required: true
    },
    reading: {
        type: String,
        required: true,
    },
    meaning: {
        type: String,
        required: true,
    },
    note: {
        type: String,
        required: false
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

module.exports = mongoose.model('NoteVocabularies', vocabulariesSchema);