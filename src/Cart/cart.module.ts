import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart, CartItem } from './cart.entity';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { ProductModule } from 'src/Product/product.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cart,CartItem]),
    ProductModule
  ],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
