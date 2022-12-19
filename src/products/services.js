const { ObjectId } = require('mongodb')
const { Database } = require('../database/index')
const { ProductsUtils } = require('./utils')
const COLLECTION = 'products'

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


const generateReport = async (name, res) => {
    let products = await getAll();
    ProductsUtils.excelGenerator(products, name, res)

}

const deleteById = async (id) => {
    const collection = await Database(COLLECTION);
    return collection.deleteOne({ _id: ObjectId(id) });
}

const updateById = async (id, nombre, preciop, cantidadp) => {
    const collection = await Database(COLLECTION);
    return collection.updateOne({ _id: ObjectId(id) }, { $set: { name: nombre, precio: preciop, cantidad: cantidadp } });
}


module.exports.ProductsService = {
    getAll,
    getById,
    create,
    generateReport,
    deleteById,
    updateById
}