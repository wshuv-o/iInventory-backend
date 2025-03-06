import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) 
    private userRepository: Repository<User>, // Injecting the UserRepository
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
  
  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async create(userData: Partial<User>): Promise<User> {
    const user = this.userRepository.create(userData);
    return this.userRepository.save(user);
  }

  async findById(id: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }
  async updateUser(id: number, updateData: Partial<User>): Promise<User | null> {
    const user = await this.findById(id); // Ensure user exists

    if (!user) {
      return null;
    }

    return await this.userRepository.save({ ...user, ...updateData });
  }
}
