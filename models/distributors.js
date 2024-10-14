const mongoose = require('mongoose');

const DistributorSchema = new mongoose.Schema({
    name: {                    // Name of the distributor
        type: String,
        required: true,
    },
    contactInfo: {             // Contact information (can be an object)
        email: { type: String },
        phone: { type: String },
    },
    address: {                 // Address of the distributor
        street: { type: String },
        city: { type: String },
        state: { type: String },
        zip: { type: String },
    },
    itemsSupplied: [mongoose.Types.ObjectId],  // Array of item ObjectIds supplied by this distributor
});

// Create the Distributor model
const Distributor = mongoose.model('Distributor', DistributorSchema);

// Function to create a new distributor
const create = async (distributorData) => {
    const distributor = new Distributor(distributorData);
    return await distributor.save();
};

// Function to get a distributor by ID
const getById = async (id) => {
    return await Distributor.findById(id).populate('itemsSupplied');
};

// Function to update a distributor
const update = async (id, distributorData) => {
    const distributor = await getById(id);
    if (!distributor) return null;

    Object.assign(distributor, distributorData);
    await distributor.save();
    return distributor;
};

// Function to delete a distributor
const deleteById = async (id) => {
    const distributor = await getById(id);
    if (!distributor) return null;

    await distributor.deleteOne();
    return distributor;
};

// Function to add an item supplied by the distributor
const addItem = async (distributorId, itemId) => {
    const distributor = await getById(distributorId);
    if (!distributor) return null;

    distributor.itemsSupplied.push(itemId);
    await distributor.save();
    return distributor;
};

module.exports = {
    create,
    getById,
    update,
    deleteById,
    addItem,
};
