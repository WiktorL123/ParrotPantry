const Shop = require('../models/Shop');

const getAllShops = async (req, res) => {
    try {
        const allShops = await Shop.find()

        if(!allShops) {
            res.status(404).send('No shops found.');
        }
        res.status(200).json(allShops);
    }
    catch (error) {
        return res.status(400).json(error)
    }
}

const getShopById = async (req, res) => {
    try {
        const id = req.params.id;

        if(!id) {
            res.status(400).send('Invalid ID format');
        }

        const shop = await Shop.findById(id)
        if(!shop) {
            res.status(404).send('No shop found.');
        }
        res.status(200).json(shop);
    }
    catch (error) {
        return res.status(400).json(error)
    }
}

const addShop = async (req, res) => {
    try {
        const shop = req.body;
        if(!shop) {
            res.status(400).send('Request body empty');
        }

        const newShop = new Shop(shop)
        await newShop.save();

        res.status(200).json(newShop);
    }
    catch (error) {
        return res.status(400).json(error)
    }
}

const updateShop = async (req, res) => {
    try {
        const id = req.params.id;

        if(!id) {
            res.status(400).send('Invalid ID format');
        }

        const shop = req.body;

        if(!shop) {
            res.status(400).send('Request body empty');
        }

        const updateShop = await Shop.findByIdAndUpdate(id, shop)
        if(!updateShop) {
            res.status(404).send('No shop found.');
        }

        res.status(200).json({message: "Shop updated successfully."});
    }
    catch (error) {
        return res.status(400).json(error)
    }
}


const deleteShop = async (req, res) => {
    try {
        const id = req.params.id;

        if(!id) {
            res.status(400).send('Invalid ID format');
        }

        const deleteShop = await Shop.findByIdAndDelete(id)

        if(!deleteShop) {
            res.status(404).send('No shop found.');
        }

        res.status(200).json({message: "Shop deleted successfully."});
    }
    catch (error) {
        return res.status(400).json(error)
    }
}



module.exports = {
    getAllShops,
    getShopById,
    addShop,
    updateShop,
    deleteShop
}