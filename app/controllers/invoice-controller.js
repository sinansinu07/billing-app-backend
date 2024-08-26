const Customer = require('../models/customer-model');
const Invoice = require('../models/invoice-model')
const Product = require("../models/product-model");

const {validatioResult, validationResult} = require('express-validator')

const invoicesCltr ={}

invoicesCltr.create =async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})    
    }
    const body = req.body
    const invoiceObj = {...body}
    try{
        // const Products = Promise.all(invoiceObj.lineItems.map((ele)=>{
        //     return Product.findById(ele.product)
        // }))
        const productIds =invoiceObj.lineItems.map((ele)=>ele.product)
        const products = await Product.find().where('_id').in(productIds)
        // const products = await Product.find({ _id: [...productIds]})
        console.log(products)

        for(let i = 0; i < products.length; i++){
            invoiceObj.lineItems[i].price = products[i].price
        }
        invoiceObj.grossTotal = invoiceObj.lineItems.reduce((acc,cv)=>{
            return acc + cv.quantity * cv.price
        }, 0)
        const dedudction = invoiceObj.grossTotal * invoiceObj.discount / 100
        const addidtion = invoiceObj.grossTotal * invoiceObj.taxes / 100

        invoiceObj.netTotal = invoiceObj.grossTotal - dedudction + addidtion
        invoiceObj.outStandingBalance = invoiceObj.netTotal
        const invoice = await Invoice.create(invoiceObj)

        const customer = await Customer.findById(invoice.customer)
        customer.outstandingBalance += invoice.netTotal
        customer.purchaseHistory.push({ invoice : invoice._id })
        await customer.save()

        const newInvoice = await Invoice.findById(invoice._id).populate('customer', ['_id', 'name']).populate('lineItems.product', ['_id', 'name'])
        res.status(200).json(newInvoice)
    }catch(err){
        res.status(500).json('internal server error')
    }
}
invoicesCltr.list = async (req, res) => {
    try {
        const invoice = await  Invoice.find().sort({ createdAt : 1 }).populate('customer', ['_id', 'name']).populate('lineItems.product', ['_id','name'])
        res.status(200).json(invoice)
    } catch(err) {
        res.status(500).json({ error : "Internal Server Error"})
    }
}
invoicesCltr.remove = async (req, res) => {
    const id = req.params.id 
    try {
        const invoice = await Invoice.findByIdAndDelete(id) 
        res.json(invoice) 
    } catch(err) {

    }
}

module.exports = invoicesCltr