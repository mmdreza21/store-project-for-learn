import { config } from 'dotenv';
config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

(async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  // app.use()

  const options = new DocumentBuilder()
    .setTitle('this is documentation for store api`s')
    .setDescription(
      'you can use this for understand how this app apis work this is build by ❤ whit mohamad reza javadi',
    )
    .setVersion('1.0.0')
    .addBasicAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'JWT-auth',
    )
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(8080);
})();
