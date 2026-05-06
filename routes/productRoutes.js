import express from 'express'
import {
    createProducts,
    deleteProducts,
    getProducts,
    getSingleProducts,
    updateProducts,
} from '../controllers/ProductController.js'


const router = express.Router();

router.get('/get-products', getProducts )
router.get('/get-products/:id', getSingleProducts )

router.post('/create-products', createProducts)
router.put('/update-products/:id', updateProducts)

router.delete('/delete-products/:id', deleteProducts)

export default router;