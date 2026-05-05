import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import helmet from 'helmet';
import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug'],
  });

  // ─── Sécurité ───────────────────────────────────────────
  app.use(helmet());
  app.use(compression());

  // ─── CORS ───────────────────────────────────────────────
  app.enableCors({
    origin: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  });

  // ─── Validation globale ─────────────────────────────────
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  // ─── Préfixe API ────────────────────────────────────────
  app.setGlobalPrefix('api/v1');

  // ─── Swagger (documentation API) ────────────────────────
  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('SantéConnect API')
      .setDescription('API de la plateforme sécurisée médecin-patient SantéConnect')
      .setVersion('1.0')
      .addBearerAuth()
      .addTag('auth', 'Authentification & autorisation')
      .addTag('users', 'Gestion des utilisateurs')
      .addTag('messages', 'Messagerie sécurisée')
      .addTag('appointments', 'Gestion des rendez-vous')
      .addTag('health-logs', 'Suivi quotidien de santé')
      .addTag('prescriptions', 'Prescriptions électroniques')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);
    console.log(`📚 Documentation Swagger : http://localhost:${process.env.APP_PORT}/api/docs`);
  }

  const port = process.env.APP_PORT || 3001;
  await app.listen(port);
  console.log(`🚀 SantéConnect API démarrée sur : http://localhost:${port}/api/v1`);
}

bootstrap();
