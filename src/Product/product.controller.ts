import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { ProductDTO } from './product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  //get all products
  @Get()
  async findAll(): Promise<Product[]> {
    return await this.productService.findall();
  }

  //get one product
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Product> {
    const product = await this.productService.findOne(id);
    console.log("eerot");
    if (!product) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Product Not Found',
        },
        HttpStatus.NOT_FOUND,
      );
    }


    return product;
  }

  //create product
  @Post()
  async create(@Body() product: ProductDTO): Promise<Product> {
    return await this.productService.create(product);
  }

  //delete user
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    //handle the error if user not found
    const product = await this.productService.findOne(id);
    if (!product) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: 'Product Not Found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
    return this.productService.delete(id);
  }
}
