import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Préfixe global pour l'API
  app.setGlobalPrefix('api');

  // Autoriser le frontend sur Codespaces (port 3001)
  app.enableCors({
    origin: ['https://special-guide-6v4q9q5x7pg3rqpj-3001.app.github.dev'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
