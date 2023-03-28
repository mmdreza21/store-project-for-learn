import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { PrismaService } from 'src/Prisma.service';
import { CatProfile } from './dto/catProfile';
import { ObjectIdValidator } from 'src/middlewares/objectIdValidation';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, PrismaService, CatProfile],
})
export class CategoryModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ObjectIdValidator).forRoutes('category/:id');
    // .forRoutes({ path: 'cats', method: RequestMethod.GET });
    // .forRoutes({ path: 'ab*cd', method: RequestMethod.ALL });
  }
}

// consumer
//   .apply(LoggerMiddleware)
//   .exclude(
//     { path: 'cats', method: RequestMethod.GET },
//     { path: 'cats', method: RequestMethod.POST },
//     'cats/(.*)',
//   )
//   .forRoutes(CatsController);
//! hint
// The exclude() method supports wildcard parameters using the path-to-regexp package.
