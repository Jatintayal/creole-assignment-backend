import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomersModule } from './customers/customers.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    CustomersModule,
    // Add your mongodb database connection string here.
    MongooseModule.forRoot(
      'mongodb+srv://jatin:pikachu22@coda-fullstack-challeng.8pwvi.mongodb.net/test'
    )
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService
  ],
})
export class AppModule {}
