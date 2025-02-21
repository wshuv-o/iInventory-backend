import { Controller, Post, Body, Get, Req, UnauthorizedException, HttpException, HttpStatus, Param, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Endpoint for logging in
  @Post('login')
  async login(@Body() body: { email: string; password: string }): Promise<User> {
    const { email, password } = body;
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (user.password !== password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
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

    // Get user by ID
    @Get(':id')
    async getUserById(@Param('id') id: number): Promise<User> {
      const user = await this.userService.findById(id);
  
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
  
      return user;
    }
  
    // Update user details
    @Put(':id')
    async updateUser(@Param('id') id: number, @Body() updateData: Partial<User>): Promise<{message: string}> {
      const user = await this.userService.findById(id);
  
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
  
      const updatedUser = await this.userService.updateUser(id, updateData);
      return {message: "User updated successfully"};
    }
    
}
