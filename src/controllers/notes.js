const Note = require('../models/notes');

exports.get = async (req, res) => {
    try {
        const user = req.user;
        const notes = await Note.find({ created_by: user.id }).sort({ end_date: -1 });
        
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.getByCategory = async (req, res) => {
    try {
        const user = req.user;
        const categoryId = req.params.id;
        const notes = await Note.find({ created_by: user.id, category_id: categoryId });
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.getDetails = async (req, res) => {
    try {
        const user = req.user;
        const id = req.params.id;
        
        const notes = await Note.findOne({ _id: id, created_by: user.id });
        
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.create = async (req, res) => {
    const { title, details, category_id, is_important } = req.body;
    const { id } = req.user;

    try {
        const newNote = new Note({ 
            title, 
            details,
            category_id,
            is_important,
            created_by: id
        });

        await newNote.save();
        res.status(201).json(newNote);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const userId = req.user.id;
        const noteId = req.params.id;

        const validateNote = await Note.findOne({ _id: noteId, created_by: userId });
        
        if (validateNote) {
            const updateResult = await Note.findOneAndUpdate(
                { _id: noteId },
                { $set: req.body },
                { new: true }
            );
            
            if (updateResult) {
                return res.status(200).json(updateResult);
            }
        }

        res.status(404).send('Note not found');
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.delete = async (req, res) => {
    try {
        const userId = req.user.id;
        const noteId = req.params.id;

        const validateNote = await Note.findOne({ _id: noteId, created_by: userId });
        
        if (validateNote) {
            const deletedNote = await Note.findByIdAndDelete(noteId);

            if (deletedNote) {
                return res.status(200).json(deletedNote);
            }
        }

        res.status(404).json({ message: 'Note not found' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};