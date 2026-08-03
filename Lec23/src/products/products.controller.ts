import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { SubscriptionGuard } from './guards/subscription.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @UseGuards(SubscriptionGuard)
  findAll(@Req() req: any) {
    return this.productsService.findAll(req.isSubscribed);
  }
}