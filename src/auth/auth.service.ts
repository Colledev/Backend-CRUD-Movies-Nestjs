import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { User } from '../users/users.entity';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async comparePasswords(
    newPassword: string,
    passwordHash: string,
  ): Promise<boolean> {
    return bcrypt.compare(newPassword, passwordHash);
  }

  async generateJwtToken(payload: any): Promise<string> {
    return this.jwtService.sign(payload);
  }

  async validateJwtToken(token: string): Promise<any> {
    return this.jwtService.verify(token);
  }

  async decodeJwtToken(token: string): Promise<any> {
    return this.jwtService.decode(token);
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByUsername(username);
    if (user && (await this.comparePasswords(pass, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
      }),
    };
  }

  async register(user: User): Promise<User> {
    user.password = await this.hashPassword(user.password);
    return this.userService.create(user);
  }

  async authenticateMiddleware(req: any): Promise<any> {
    const tokenHeader = req.headers.authorization;

    if (!tokenHeader) {
      throw new UnauthorizedException('Token not found');
    }

    const token = tokenHeader.split(' ')[1];
    return this.validateJwtToken(token);
  }
}
