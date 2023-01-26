import { NextFunction, Request, Response } from 'express';
import { ProductModel } from '../Models/productsModel';

const product = new ProductModel();

export async function createProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await product.create({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description
    });
    res.json({ message: 'product created' });
  } catch (error) {
    next(error);
  }
}
export async function updateProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await product.updateProduct(
      +req.params.product_id,
      req.body.cols,
      req.body.values
    );
    res.json({ message: 'product updated' });
  } catch (error) {
    next(error);
  }
}
export async function index(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await product.index());
  } catch (error) {
    next(error);
  }
}

export async function deleteProduct(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    res.json(await product.deleteProduct(Number(req.params.product_id)));
  } catch (error) {
    next(error);
  }
}
