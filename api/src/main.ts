import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './config/swagger';
import { ConfigService } from '@nestjs/config/dist/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const config = new DocumentBuilder()
    .setTitle(swaggerConfig.title)
    .setDescription(swaggerConfig.description)
    .addBearerAuth(
      {
        in: 'header',
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'Authorization',
    )
    .setVersion(swaggerConfig.version)
    .setExternalDoc('Postman Collection', '/docs-json')
    .build();

  const allowedCorsOrigins = [
    configService.get('system.appUrl'),
    configService.get('system.apiUrl'),
    configService.get('system.appDomain'),
    `https://${configService.get('system.appDomain')}`,
    `https://www.${configService.get('system.appDomain')}`,
    `https://*.${configService.get('system.appDomain')}`,
    'http://localhost:3000',
    'http://127.0.0.1:3000',
  ];

  if (configService.get('security.strictCORS')) {
    app.enableCors({
      origin: allowedCorsOrigins.filter(Boolean),
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    });
  } else {
    app.enableCors();
  }

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory());

  await app.listen(process.env.PORT ?? 3030);
}

bootstrap();
