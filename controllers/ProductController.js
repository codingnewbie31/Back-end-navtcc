import { products } from "../constants.js";


export const getSingleProducts = (req,res) =>{
    const {id} = req.params;
    const product = products.find(item => item.id === Number(id));
    
    if (!product) {
        res.status(404).json({
        messsage : "Data not Found. Please enter another ID ",
    })
    }
    
    res.json({
        messsage : "Data Found Successfully",
        data : product,
    })
}

export const getProducts = (req,res) => {

    res.json({
        message : "Get all products Successfully",
        data : products
    })
}

export const createProducts = (req,res) => {
    const products = req.body;
    const response = {
        message : "Message Created Successfully",
        data : products
    }
    res.json(response)
}

export const updateProducts = (req,res) => {
    const {id} = req.params;
    res.send(`Updated Products ${id}`)
}

export const deleteProducts = (req,res) => {
    res.send("Products Deleted Successfully")
}