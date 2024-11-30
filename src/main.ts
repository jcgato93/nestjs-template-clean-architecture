import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { envs } from './infrastructure/config/envs';
import { GlobalExceptionFilter } from './infrastructure/shared/filters/global-exception.filter';
import { TransformInterceptor } from './infrastructure/shared/interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = envs.port;

  // Habilitar CORS
  app.enableCors();

  // Filtros globales para manejo de excepciones
  app.useGlobalFilters(new GlobalExceptionFilter());

  // Pipes para validar y transformar los datos entrantes
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Transformar datos de entrada a los tipos de datos especificados en los DTOs
      whitelist: true, // Ignorar propiedades no declaradas en DTOs
      forbidNonWhitelisted: true, // Lanzar error si se envían propiedades no permitidas
    }),
  );

  // Interceptor global para transformar respuestas
  app.useGlobalInterceptors(new TransformInterceptor());

  // RabbitMQ o Bus de Eventos (placeholder para más adelante)
  // Aquí podrías configurar una conexión inicial al bus de eventos si es necesario.
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}

bootstrap();
