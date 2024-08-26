const productValidationSchema = {
    name : {
        notEmpty : {
            errorMessage : " Product Name is required"
        }
    },
    price : {
        notEmpty : {
            errorMessage : " Product Price is required"
        },
        isNumeric : {
            errorMessage : " Product Price should be a number",
            options : { min : 1 }
        }
    },
    stockLevel : {
        notEmpty : {
            errorMessage : " Stock level is required"
        },
        isNumeric : {
            errorMessage : " stock level be a number",
            options : { min : 1 }
        }
    },
    reorderLevel : {
        notEmpty : {
            errorMessage : " Re-Order Level is required"
        },
        isNumeric : {
            errorMessage : " Re-Order Level should be a number",
            options : { min : 1 }
        }
    }
}

module.exports = productValidationSchema