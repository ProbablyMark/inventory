import express from 'express';

import {
  createProduct,
  index,
  deleteProduct,
  updateProduct
} from '../Controllers/productsController';

const productsRouter = express.Router();

productsRouter.post('/products/newProduct', createProduct);
productsRouter.get('/products/all', index);
productsRouter.delete('/products/:product_id', deleteProduct);
productsRouter.patch('/products/:product_id', updateProduct);

export default productsRouter;
