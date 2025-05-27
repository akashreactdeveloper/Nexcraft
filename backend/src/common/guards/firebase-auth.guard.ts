// src/common/guards/firebase-auth.guard.ts
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { FirebaseService } from '../../auth/firebase.service';

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  constructor(private firebaseService: FirebaseService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      throw new UnauthorizedException('Firebase token is required');
    }

    try {
      const uid = await this.firebaseService.verifyToken(token);
      request.user = { uid }; // Attach the UID to the request
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid Firebase token');
    }
  }
}