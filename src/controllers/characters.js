const Character = require('../models/characters');

exports.get = async (req, res) => {
    try {
        const user = req.user;
        const characters = await Character.find({ created_by: user.id });
        
        res.status(200).json(characters);
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.create = async (req, res) => {
    const { 
        value, 
        reading, 
        on_reading, 
        kun_reading,
        meaning,
        note,
        category_id
    } = req.body;
    const { id } = req.user;

    try {
        const newCharacter = new Character({ 
            value, 
            reading,
            on_reading,
            kun_reading,
            meaning,
            note,
            category_id,
            created_by: id
        });

        await newCharacter.save();
        res.status(201).json(newCharacter);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const userId = req.user.id;
        const characterId = req.params.id;

        const validateCharacter = await Character.findOne({ _id: characterId, created_by: userId });
        
        if (validateCharacter) {
            const updateResult = await Character.findOneAndUpdate(
                { _id: characterId },
                { $set: req.body },
                { new: true }
            );
            
            if (updateResult) {
                return res.status(200).json(updateResult);
            }
        }

        res.status(404).send('Character not found');
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.delete = async (req, res) => {
    try {
        const userId = req.user.id;
        const characterId = req.params.id;

        const validateCharacter = await Character.findOne({ _id: characterId, created_by: userId });
        
        if (validateCharacter) {
            const deletedCharacter = await Character.findByIdAndDelete(characterId);

            if (deletedCharacter) {
                return res.status(200).json(deletedCharacter);
            }
        }

        res.status(404).json({ message: 'Character not found' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};