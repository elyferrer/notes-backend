const mongoose = require('mongoose')

const categoriesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
        default: null
    },
    is_active: {
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
        required: false
    },
    updated_by: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('NoteCategories', categoriesSchema);