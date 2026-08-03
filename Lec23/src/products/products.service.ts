import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  private products = [];

  create(createProductDto: CreateProductDto) {
    const newProduct = { id: Date.now(), ...createProductDto };
    this.products.push(newProduct);
    return newProduct;
  }

  findAll(isSubscribed: boolean) {
    if (isSubscribed) {
      // 20%-იანი ფასდაკლება აქტიური საბსქრიფშენის დროს
      return this.products.map((p) => ({
        ...p,
        price: p.price * 0.8,
        discountApplied: true,
      }));
    }

    return this.products;
  }
}