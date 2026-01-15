const Category = require('../models/categories');

exports.get = async (req, res) => {
    try {
        const user = req.user;
        const categories = await Category.find({ created_by: user.id });
        
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json(error);
    }
    
};

exports.create = async (req, res) => {
    const { name, description } = req.body;
    const { id } = req.user;

    try {
        const newCategory = new Category({ 
            name, 
            description, 
            created_by: id
        });

        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
};

exports.update = async (req, res) => {
    try {
        const userId = req.user.id;
        const categoryId = req.params.id;

        const validateCategory = await Category.findOne({ _id: categoryId, created_by: userId });
        
        if (validateCategory) {
            const updateResult = await Category.findOneAndUpdate(
                { _id: categoryId },
                { $set: req.body },
                { new: true }
            );
            
            if (updateResult) {
                return res.status(200).json(updateResult);
            }
        }

        res.status(404).send('Category not found');
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.delete = async (req, res) => {
    try {
        const userId = req.user.id;
        const categoryId = req.params.id;

        const validateCategory = await Category.findOne({ _id: categoryId, created_by: userId });
        
        if (validateCategory) {
            const deletedTask = await Category.findByIdAndDelete(categoryId);

            if (deletedTask) {
                return res.status(200).json(deletedTask);
            }
        }

        res.status(404).json({ message: 'Task not found' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};