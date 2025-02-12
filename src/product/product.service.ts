import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(productData: Partial<Product>): Promise<Product> {
    const product = this.productRepository.create(productData);
    return this.productRepository.save(product);
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new Error(`Product with ID ${id} not found`);
    }
    return product;
  }

  // Updated the method to handle async operations using await
  async update(id: number, quantity: number): Promise<Product> {
    const product = await this.findOne(id);  // Use findOne method to fetch the product
    product.quantity = quantity;
    return this.productRepository.save(product); // Save the updated product
  }

  // Corrected remove method with async handling and proper repository delete
  async remove(id: number): Promise<void> {
    const product = await this.findOne(id);  // Use findOne to check if the product exists
    await this.productRepository.remove(product); // Delete the product using TypeORM repository
  }

  // Corrected save method to save an array of products
  async save(inventoryItems: Product[]): Promise<void> {
    await this.productRepository.save(inventoryItems);  // Use save method to persist an array of products
  }
}
