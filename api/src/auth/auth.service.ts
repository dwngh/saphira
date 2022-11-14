import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    console.log("Auth svc validating ...");
    const user = await this.usersService.findByUsername(username);
    let isPasswordCorrect = await bcrypt.compare(pass, user.password);
    if (user && isPasswordCorrect) {
      console.log("Validation Ok!");
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    console.log("Auth svc login");
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
