// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import { VercelRequest, VercelResponse } from '@vercel/node';
// import { ExpressAdapter } from '@nestjs/platform-express';
// import * as express from 'express';

// async function createApp() {
//   const app = express();
//   const nestApp = await NestFactory.create(AppModule, new ExpressAdapter(app));
//   nestApp.enableCors({
//     origin: 'https://storemore-iu2yg8pns-wshuv-os-projects.vercel.app',
//     credentials: true,
//   });
//   await nestApp.init();
//   return app;
// }

// // The function that will be used as a handler in Vercel
// export default async (req: VercelRequest, res: VercelResponse) => {
//   const app = await createApp();
//   app(req, res); // Use Express to handle the request
// };


import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: "http://localhost:3000", 
    credentials: true, 
  });

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();