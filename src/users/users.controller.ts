import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { User } from './user.entity';
import { CreateUser } from './createUser.dto';
import { UpdateUser } from './updateUser.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async getOneUser(@Param('id') id: string): Promise<User> {
    const user = this.usersService.findOneById(parseInt(id));
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Put(':id')
  async updateOneUser(
    @Param('id') id: string,
    @Body() data: UpdateUser,
  ): Promise<void> {
    // check if the user exists
    const user = this.usersService.findOneById(parseInt(id));
    // if not, return error
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.usersService.update(parseInt(id), data);
  }

  @Delete(':id')
  async deleteOneUser(@Param('id') id: string): Promise<User> {
    // check if the user exists
    const user = this.usersService.findOneById(parseInt(id));
    // if not, return error
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.usersService.delete(parseInt(id));
    return user;
  }

  @Post()
  async create(
    @Body() { firstname, lastname, age }: CreateUser,
  ): Promise<User> {
    return this.usersService.create(firstname, lastname, age);
  }
}
