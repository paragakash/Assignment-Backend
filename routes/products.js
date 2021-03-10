import express from 'express';
import path from 'path'
import multer from 'multer'

import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from '../controllers/products.js';

const router = express.Router();


var storage=multer.diskStorage({
    destination:'./public/',
    filename:(req,file,cb)=>{
        console.log('file',file)
      cb(null,Date.now()+file.originalname)
    }
  })
  
var upload = multer({
storage:storage
}).single('file')

router.get('/', getProducts);
router.post('/',upload,createProduct);
router.get('/:id', getProduct);
router.patch('/:id', updateProduct);
router.delete('/:id', deleteProduct);

router.use(express.static(path.dirname+"./Public/"));


export default router;