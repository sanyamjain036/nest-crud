import { Product } from 'src/Product/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  cart_id: string;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart)
  cartItems: CartItem[];
}

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn('uuid')
  cartItem_id: string;

  @Column()
  quantity: number;

  @ManyToOne(() => Cart, (cart) => cart.cartItems)
  @JoinColumn({ name: 'cart_id', referencedColumnName: 'cart_id' })
  cart: Cart;

  @ManyToOne(() => Product, (product) => product.cartItems)
  @JoinColumn({ name: 'prodcut_id', referencedColumnName: 'product_id' })
  product: Product;
}
