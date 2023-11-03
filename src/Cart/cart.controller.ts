import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { Cart, CartItem } from './cart.entity';
import { CartItemDTO } from './cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  //get all Carts
  @Get()
  async findallCarts(): Promise<Cart[]> {
    return await this.cartService.findallCarts();
  }

  //create a new cart
  @Get('new')
  async createCart():Promise<Cart>{
    return await this.cartService.createCart();
  }

  //get one cart details
  @Get(':cart_id')
  async getCartDetails(@Param('cart_id') cart_id: string): Promise<CartItem[]> {
    const cartItems = await this.cartService.getCartDetails(cart_id);
    return cartItems;
  }

  //add one item to cart
  @Post(':cart_id')
  async addItemToCart(@Param('cart_id') cart_id: string , @Body() cartItem: CartItemDTO): Promise<CartItem> {
    return await this.cartService.addItemToCart(
      cart_id,
      cartItem.product_id,
      cartItem.quantity,
    );
  }

  //update quantity of cartItem
  @Patch('update')
  async updateQuantityOfCartItem(
    @Body('quantity') quantity: number,
    @Body('cartItem_id') cartItem_id: string,
  ): Promise<CartItem> {
    return await this.cartService.updateQuantityOfCartItem(
      cartItem_id,
      quantity,
    );
  }

  // remove a product from Cart
  @Delete('delete')
  async delete(@Body('cartItem_id') cartItem_id: string): Promise<{ message: String }> {
    //handle the error if user not found
    return await this.cartService.removeProductFromCart(cartItem_id);
  }


}
