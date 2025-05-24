import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import admin from '../../config/firebase';
  
  @Injectable()
  export class FirebaseAuthGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const token = this.extractToken(request);
      if (!token) throw new UnauthorizedException('No token provided');
  
      try {
        const decoded = await admin.auth().verifyIdToken(token);
        request.user = decoded;
        return true;
      } catch (error) {
        throw new UnauthorizedException('Invalid token');
      }
    }
  
    private extractToken(req: any): string | null {
      const authHeader = req.headers.authorization;
      if (!authHeader) return null;
      const [, token] = authHeader.split(' ');
      return token;
    }
  }
  