import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as config from 'config';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const serverConfig = process.env.PORT || config.get('server');
  const app = await NestFactory.create(AppModule);

  await app.listen(serverConfig.port);

  logger.log(`🚀 Server running on http://localhost:${serverConfig.port}`, 'Bootstrap');
}
bootstrap();
