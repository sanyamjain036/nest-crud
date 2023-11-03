import { CartItem } from 'src/Cart/cart.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn("uuid")
  product_id: string;

  @Column()
  name : string;

  @Column({type:"float8"})
  price: number;

  @Column()
  imageURL:string;

  @OneToMany(() => CartItem, (cartItem) => cartItem.product)
  cartItems: CartItem[]
}