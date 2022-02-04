// import { AutomapperModule } from '@automapper/nestjs';
import { Module } from '@nestjs/common';
import { authModule } from './authModule';
import { AutoMapper } from './autoMapper';
import { DbModule } from './dbModule';
import { ProductModule } from './ProductsModules';
import { UserModule } from './userModuls';

// import { AppService } from './services/authService';

@Module({
  imports: [DbModule, UserModule, authModule, ProductModule, AutoMapper],
  controllers: [],
  providers: [],
})
export class AppModule {}
