import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './Product/product.module';
import { CartModule } from './Cart/cart.module';


// TypeOrmModule.forRoot({
//   type: "postgres",
//   host: "localhost",
//   port: 5432,
//   username: "root",
//   password: "root",
//   database: "test_db",
//   entities: [__dirname + '/**/*.entity{.ts,.js}'],
//   synchronize: true,
// }),

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    ProductModule,
    CartModule,
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.PG_HOST,
      username: process.env.PG_USER,
      password: process.env.PG_PASS,
      database: process.env.PG_DB,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      ssl:true,
      autoLoadEntities:true
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
