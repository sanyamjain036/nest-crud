import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart, CartItem } from './cart.entity';
import { ProductService } from 'src/Product/product.service';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private CartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private CartItemRepository: Repository<CartItem>,
    private readonly productService: ProductService,
  ) {}

  // get all carts
  async findallCarts(): Promise<Cart[]> {
    return await this.CartRepository.find({
      relations: { cartItems: { product: true } },
    });
  }

  // create a cart
  async createCart(): Promise<Cart> {
    const cart = this.CartRepository.create();
    return await this.CartRepository.save(cart);
  }

  // add item to cart
  async addItemToCart(
    cart_id: string,
    prodcut_id: string,
    quantity: number,
  ): Promise<CartItem> {
    const cart = await this.CartRepository.findOne({ where: { cart_id } });
    const product = await this.productService.findOne(prodcut_id);

    const newCartItem = this.CartItemRepository.create({
      quantity,
      cart: cart,
      product: product,
    });

    return await this.CartItemRepository.save(newCartItem);
  }

  //update quantity of cartItem
  async updateQuantityOfCartItem(
    cartItem_id: string,
    quantity: number,
  ): Promise<CartItem> {
    const cartItem = await this.CartItemRepository.findOne({
      where: { cartItem_id },
    });
    cartItem.quantity = quantity;
    return await this.CartItemRepository.save(cartItem);
  }

  // remove a product from Cart
  async removeProductFromCart(
    cartItem_id: string,
  ): Promise<{ message: String }> {
    await this.CartItemRepository.delete({ cartItem_id });
    return { message: 'Product removed from cart successfully' };
  }

  //get one cart details
  async getCartDetails(cart_id: string): Promise<CartItem[]> {
    const cartData = await this.CartRepository.findOne({
      where: { cart_id: cart_id },
      relations: { cartItems: { product: true } },
    });
    return cartData.cartItems;
  }
}
