const { ObjectId } = require('mongodb')
const { Database } = require('../database/index')

const COLLECTION = 'users'

const getAll = async () => {
    const collection = await Database(COLLECTION);
    return await collection.find({}).toArray();
}

const getById = async (id) => {
    const collection = await Database(COLLECTION);
    return collection.findOne({ _id: ObjectId(id) });
}

const create = async (product) => {
    const collection = await Database(COLLECTION);
    let result = await collection.insertOne(product)
    return result.insertedId
}



const deleteById = async (id) => {
    const collection = await Database(COLLECTION);
    return collection.deleteOne({ _id: ObjectId(id) });
}

const updateById = async (id, nombre, apellidop, emailp) => {
    const collection = await Database(COLLECTION);
    return collection.updateOne({ _id: ObjectId(id) }, { $set: { name: nombre, apellido: apellidop, email: emailp } });
}


module.exports.UsersService = {
    getAll,
    getById,
    create,
    deleteById,
    updateById
}