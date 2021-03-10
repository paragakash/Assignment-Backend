import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
    productName: String,
    vat: Number,
    qty: Number,
    gprice:Number,
    stock:Number,
    image:String
})

var Products = mongoose.model('Products', productSchema);

export default Products;