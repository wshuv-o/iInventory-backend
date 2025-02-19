import { Controller, Post, Body, Get, Req, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Endpoint for logging in
  @Post('login')
  async login(@Body() body: { email: string; password: string }): Promise<{ message: string }> {
    const { email, password } = body;
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (user.password !== password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return { message: 'Login successful' };
  }

  // Get the logged-in user's profile
  @Get('me')
  async getLoggedInUser(@Req() req): Promise<User> {
    const userId = req.user?.id;

    if (!userId) {
      throw new UnauthorizedException('No logged-in user');
    }

    const user = await this.userService.findById(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user;
  }
  @Post('signup')
  async signup(@Body() body: { email: string; phone:string; password: string; name: string }): Promise<User> {
    const { email,phone, password, name } = body;

    // Check if user with the same email already exists
    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      throw new HttpException('User with this email already exists', HttpStatus.BAD_REQUEST);
    }

    // Create new user
    const newUser = await this.userService.create({ email, phone, password, name });

    return newUser;
  }
}
