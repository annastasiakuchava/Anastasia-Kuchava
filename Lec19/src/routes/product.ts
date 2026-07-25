import { Router, Request, Response } from 'express';
import { productValidationSchema } from '../validations/product';
import { isAdmin } from '../middlewares/auth';
import * as productService from '../services/product';

const router = Router();

// 1. GET ALL
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await productService.getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
});

// 2. GET BY ID
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await productService.getProductById(req.params.id);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product' });
  }
});

// 3. CREATE (აქ ხდება Joi ვალიდაცია)
router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { error } = productValidationSchema.validate(req.body);
    if (error) {
      res.status(400).json({ message: error.details[0].message });
      return;
    }

    const newProduct = await productService.createProduct(req.body);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error creating product' });
  }
});

// 4. UPDATE (საჭიროებს ადმინის როლს)
router.put('/:id', isAdmin, async (req: Request, res: Response): Promise<void> => {
  try {
    const { error } = productValidationSchema.validate(req.body);
    if (error) {
      res.status(400).json({ message: error.details[0].message });
      return;
    }

    const updatedProduct = await productService.updateProduct(req.params.id, req.body);
    if (!updatedProduct) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error updating product' });
  }
});

// 5. DELETE (საჭიროებს ადმინის როლს)
router.delete('/:id', isAdmin, async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedProduct = await productService.deleteProduct(req.params.id);
    if (!deletedProduct) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }
    res.json({ message: 'Product deleted successfully', deletedProduct });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product' });
  }
});

export default router;