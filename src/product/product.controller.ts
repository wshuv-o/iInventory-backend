import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() productData: Partial<Product>): Promise<Product> {
    return this.productService.create(productData);
  }

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Product> {
    return this.productService.findOne(id);
  }

  @Put(':id')
  async updateProduct(
    @Param('id') id: number,
    @Body() body: { quantity: number },
  ): Promise<Product> {  // Corrected to return the Product after update
    return this.productService.update(id, body.quantity);
  }

  @Delete(':id')
  async removeProduct(@Param('id') id: number): Promise<void> { 
    return this.productService.remove(id);
  }

  @Post('save')
  async saveInventory(@Body() body: { inventoryItems: Product[] }): Promise<void> {  // Updated to async
    return this.productService.save(body.inventoryItems);
  }
}
