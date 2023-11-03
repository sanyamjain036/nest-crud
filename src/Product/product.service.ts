import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { ProductDTO } from './product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  // get all products
  async findall(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  // get one product
  async findOne(id: string): Promise<Product> {
    return await this.productRepository.findOne({ where : { product_id:id } });
  }

  //create product
  async create(product: ProductDTO): Promise<Product> {
    const newProduct = this.productRepository.create(product);
    return await this.productRepository.save(newProduct);
  }

  // delete user
  async delete(id: string): Promise<void> {
    await this.productRepository.delete({product_id:id})
  }
}
