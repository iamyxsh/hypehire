import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { config } from 'dotenv';
import { MikroORM } from '@mikro-orm/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
config();

async function bootstrap() {
  const PORT = process.env.PORT;
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.get(MikroORM).getSchemaGenerator().ensureDatabase();
  await app.get(MikroORM).getSchemaGenerator().updateSchema();
  const config = new DocumentBuilder()
    .setTitle('Token Price Traker')
    .setDescription('Assignment to show my skills in NestJS and Web3.')
    .setVersion('1.0')
    .addTag('hypehire')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
}

bootstrap();
