const mongoose = require('mongoose')

const notesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    details: {
        type: String,
        required: true
    },
    category_id: {
        type: String,
        required: true,
    },
    is_important: {
        type: Boolean,
        default: true
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
        required: false,
        default: null
    },
    updated_by: {
        type: String,
        required: false,
        default: null
    }
});

module.exports = mongoose.model('Notes', notesSchema);