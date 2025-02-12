import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'products.db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,  // Auto sync database schema
    }),
    ProductModule,
    UserModule,
  ],  
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
