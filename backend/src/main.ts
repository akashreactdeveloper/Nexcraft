import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    // Enable CORS to allow frontend requests
    app.enableCors({
      origin: 'http://localhost:3001', // Replace with your frontend URL (e.g., Next.js default port)
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true, // If you need to send cookies or auth headers
    });

    // Set a global prefix for all routes (optional)
    app.setGlobalPrefix('api'); // All routes will now be prefixed with /api (e.g., /api/auth/login)

    // Enable global validation pipe (optional but recommended)
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true, // Strip properties not defined in DTOs
        forbidNonWhitelisted: true, // Throw error if unknown properties are present
        transform: true, // Automatically transform payloads to DTO instances
      }),
    );

    // Use environment variable for port
    const port = process.env.PORT || 3000;
    await app.listen(port);

    console.log(`🚀 Server running at http://localhost:${port}`);
  } catch (error) {
    console.error('❌ Failed to start the server:', error);
    process.exit(1); // Exit with failure code
  }
}

bootstrap();