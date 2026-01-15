const Vocabulary = require('../models/vocabularies');

exports.get = async (req, res) => {
    try {
        const user = req.user;
        const vocabularies = await Vocabulary.find({ created_by: user.id });
        
        res.status(200).json(vocabularies);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.create = async (req, res) => {
    const { 
        value, 
        reading, 
        meaning, 
        note,
        category_id
    } = req.body;
    const { id } = req.user;

    try {
        const newVocabulary = new Vocabulary({ 
            value, 
            reading, 
            meaning, 
            note,
            category_id,
            created_by: id
        });

        await newVocabulary.save();
        res.status(201).json(newVocabulary);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const userId = req.user.id;
        const vocabularyId = req.params.id;

        const validateVocabulary = await Vocabulary.findOne({ _id: vocabularyId, created_by: userId });
        
        if (validateVocabulary) {
            const updateResult = await Vocabulary.findOneAndUpdate(
                { _id: vocabularyId },
                { $set: req.body },
                { new: true }
            );
            
            if (updateResult) {
               return res.status(200).json(updateResult);
            }
        }

        res.status(404).send('Vocabulary not found');
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.delete = async (req, res) => {
    try {
        const userId = req.user.id;
        const vocabularyId = req.params.id;

        const validateVocabulary = await Vocabulary.findOne({ _id: vocabularyId, created_by: userId });
        
        if (validateVocabulary) {
            const deletedVocabulary = await Vocabulary.findByIdAndDelete(vocabularyId);

            if (deletedVocabulary) {
                return res.status(200).json(deletedVocabulary);
            }
        }

        res.status(404).json({ message: 'Vocabulary not found' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};