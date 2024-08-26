const Customer = require("../models/customer-model")
const { validationResult } = require("express-validator")
const customerCltr = {}

customerCltr.create = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(404).json({ errors : errors.array() })
    }
    try {
        const { body } = req
        const customer = await Customer.create(body)
        res.status(201).json(customer)
    } catch (err) {
        res.status(500).json({ error : "Internal Server Error"})
    }
}
customerCltr.list = async (req, res) => {
    try {
        const customer = await  Customer.find().sort({ createdAt : 1 })
        res.status(200).json(customer)
    } catch(err) {
        res.status(500).json({ error : "Internal Server Error"})
    }
}
customerCltr.update = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(404).json({ errors : errors.array() })
    }
    const id = req.params.id
    try {
        const { body } = req
        const customer = await Customer.findByIdAndUpdate(id, body, { new : true})
        res.status(201).json(customer)
    } catch(err) {
        res.status(500).json({ error : "Internal Server Error" })
    }
}

customerCltr.remove = async (req, res) => {
    const id = req.params.id
    try {
        const customer = await Customer.findByIdAndDelete({_id: id})
        res.status(201).json(customer)
    } catch(err) {
        res.status(500).json({ error : "Internal Server Error" })
    }
}

module.exports = customerCltr