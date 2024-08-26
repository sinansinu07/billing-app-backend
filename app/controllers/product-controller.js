const Product = require("../models/product-model")
const { validationResult } = require("express-validator")
const productCltr = {}

productCltr.create = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(404).json({ errors : errors.array() })
    }
    try {
        const { body } = req
        const product = await Product.create(body)
        res.status(201).json(product)
    } catch (err) {
        res.status(500).json({ error : "Internal Server Error"})
    }
}
productCltr.list = async (req, res) => {
    try {
        const product = await  Product.find().sort({ createdAt : 1 })
        res.status(200).json(product)
    } catch(err) {
        res.status(500).json({ error : "Internal Server Error"})
    }
}
productCltr.update = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(404).json({ errors : errors.array() })
    }
    const id = req.params.id
    try {
        const { body } = req
        const product = await Product.findByIdAndUpdate(id, body, { new : true})
        res.status(201).json(product)
    } catch(err) {
        res.status(500).json({ error : "Internal Server Error" })
    }
}

productCltr.remove = async (req, res) => {
    const id = req.params.id
    try {
        const product = await Product.findByIdAndDelete({_id: id})
        res.status(201).json(product)
    } catch(err) {
        res.status(500).json({ error : "Internal Server Error" })
    }
}

module.exports = productCltr