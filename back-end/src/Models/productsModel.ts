import client from '../database';
import { Product } from '../Types/products';

let sql: string = ``;
function creatQuery(cols: string[]) {
  const query = ['UPDATE products'];
  query.push('SET');

  const set: string[] = [];
  Object.values(cols).forEach(function (key, i) {
    set.push(key + ' = ($' + (i + 2) + ')');
  });
  query.push(set.join(', '));

  query.push('WHERE product_id = ($1) ');

  sql = query.join(' ');
}
export class ProductModel {
  async index(): Promise<Product[]> {
    try {
      const connection = await client.connect();
      const sql = `SELECT * FROM products ORDER BY product_id asc`;
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`cannot get products ${error}`);
    }
  }

  async create(product: Product): Promise<Product> {
    try {
      const connection = await client.connect();
      const sql = `INSERT INTO products ( 
        name,
        price,
        description,
        quantity) VALUES ($1,$2,$3,0) returning *`;
      const result = await connection.query(sql, [
        product.name,
        product.price,
        product.description
      ]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`cannot add product  ${error}`);
    }
  }
  async deleteProduct(id: number): Promise<Product> {
    try {
      const connection = await client.connect();
      const sql = `DELETE FROM products WHERE product_id=($1)`;
      const result = await connection.query(sql, [id]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`cannot get product ${error}`);
    }
  }
  async updateProduct(
    id: number,
    cols: string[],
    values: string[]
  ): Promise<Product> {
    try {
      creatQuery(cols);
      const connection = await client.connect();

      const result = await connection.query(sql, [id, ...values]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`cannot get product ${error}`);
    }
  }
}
