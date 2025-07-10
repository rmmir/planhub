import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    app.enableCors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    });
    await app.listen(process.env.PORT ?? 5000);
}
void bootstrap();
