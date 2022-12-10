import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Put, UseGuards} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() user: User) {
    return this.usersService.create(user);
  }
  
  @Post(':id') 
  changePassword(@Param('id', ParseIntPipe)id : number, @Body('oldPassword') oldP: string, @Body('newPassword') newP: string) {
    return this.usersService.changeUserPassword(id, oldP, newP);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Get('/order/' + ':id')
  findByOrderId(@Param('id', ParseIntPipe) id: number) {
    console.log(id);
    return this.usersService.findByOrderId(id);
  }

  @Put()
  update(@Body() user: User) {
    return this.usersService.update(user);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.delete(id);
  }
}
