const invoiceValidationSchema = {
    customer:{
        notEmpty:{
            errorMessage:"Customer is required"
        }
    },
    'lineItems.*.product':{
        notEmpty:{
            errorMessage:"Product is required"
        }
    },
    'lineItems.*.quantity': {
        notEmpty:{
            errorMessage:"Quantity is required"
        }, 
        isNumeric:{
            errorMessage:"Quantity must be a number"
        }
    },
    taxes:{
        notEmpty:{
            errorMessage:"Tax rate is required"
        },
        isNumeric:{
            errorMessage:"Tax rate should be a numeric value"
        }
    },
    discount:{
        notEmpty:{
            errorMessage:"Discount amount is required"
        },
        isNumeric:{
            errorMessage:"Discount amount should be a numeric value"
        }
    }
}
module.exports = invoiceValidationSchema