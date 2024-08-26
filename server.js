require("dotenv").config()
const express = require("express")
const cors = require("cors")
const { checkSchema } = require("express-validator")
const app = express()
const port = process.env.PORT || 3070

const configureDB = require("./config/db")
configureDB()

const productCltr = require("./app/controllers/product-controller")
const customerCltr = require("./app/controllers/customer-contoller")
const invoicesCltr = require("./app/controllers/invoice-controller")

const productValidationSchema = require("./app/validators/product-validation-schema")
const customerValidationSchema = require("./app/validators/customer-validation-schema")
const invoiceValidationSchema = require("./app/validators/invoice-validation-schema")


app.use(express.json())
app.use(cors())

app.post("/api/products", checkSchema(productValidationSchema), productCltr.create)
app.get("/api/products", productCltr.list)
app.put("/api/products/:id", checkSchema(productValidationSchema), productCltr.update)
app.delete("/api/products/:id", productCltr.remove)


app.post("/api/customers", checkSchema(customerValidationSchema), customerCltr.create)
app.get("/api/customers", customerCltr.list)
app.put("/api/customers/:id", checkSchema(customerValidationSchema), customerCltr.update)
app.delete("/api/customers/:id", customerCltr.remove)

app.post("/api/invoices", checkSchema(invoiceValidationSchema), invoicesCltr.create)
app.get("/api/invoices", invoicesCltr.list)
app.delete("/api/invoices/:id", invoicesCltr.remove)

app.listen(port, () => {
    console.log(`Server is running at port ${port}`)
})