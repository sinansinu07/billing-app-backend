const Customer = require("../models/customer-model")

const customerValidationSchema = {
    name : {
        notEmpty : {
            errorMessage : " Customer Name is required"
        }
    },
    'contact.email' : {
        notEmpty : {
            errorMessage : " Customer Contact is required"
        },
        custom : {
            options :(async (value) => {
                const customer = await Customer.findOne({ email : value })
                if(!customer) {
                    return true
                } else {
                    throw new Error("Email already exist")
                }
            }) 
        },
        trim : true
    },
    'contact.mobile' : {
        notEmpty : {
            errorMessage : " Customer Mobile is required"
        }
    }
}

module.exports = customerValidationSchema