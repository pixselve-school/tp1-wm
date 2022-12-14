import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { RolesModule } from '../roles/roles.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AssociationsModule } from '../associations/associations.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => RolesModule),
    forwardRef(() => AssociationsModule),
    ClientsModule.register([
      {
        name: 'REGISTRATION_CONFIRMATION_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL],
          queue: 'registration_confirmation',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
