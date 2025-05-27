// src/auth/firebase.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import admin from '../config/firebase';

@Injectable()
export class FirebaseService {
  async verifyToken(token: string): Promise<admin.auth.DecodedIdToken> { // Return the full decoded token
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      return decodedToken; // Return the entire decoded token, not just the uid
    } catch (error) {
      throw new UnauthorizedException('Invalid Firebase token');
    }
  }
}