import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

class AuthService {
  private users: User[] = [
    {
      id: '1',
      username: 'testuser',
      email: 'test@example.com',
      password: '$2a$12$LKB008QwMumm14cJ67a1eubTdw.xKhlg/NaM45oUUS9qOernzyVw2', // hashed password for 'password123'
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ];
  private readonly JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

  async registerUser(username: string, email: string, password: string): Promise<User> {
    const existingUser = this.users.find(u => u.email === email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser: User = {
      id: uuidv4(),
      username,
      email,
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.users.push(newUser);
    return newUser;
  }

  
  async loginUser(email: string, password: string): Promise<string> {
    const user = this.users.find(u => u.email === email);
    if (!user) {
      console.log(`Login attempt failed: User not found for email ${email}`);
      throw new Error('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log(`Login attempt failed: Invalid password for user ${email}`);
      throw new Error('Invalid email or password');
    }

    console.log(`Login successful for user ${email}`);
    const token = jwt.sign({ userId: user.id }, this.JWT_SECRET, { expiresIn: '1h' });
    return token;
  }

  verifyToken(token: string): { userId: string } {
    try {
      const decoded = jwt.verify(token, this.JWT_SECRET) as { userId: string };
      return decoded;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  async getUserById(userId: string): Promise<User | undefined> {
    return this.users.find(u => u.id === userId);
  }
}

export const authService = new AuthService();