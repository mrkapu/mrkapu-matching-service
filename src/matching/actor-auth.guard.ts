import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

// Every matching route is about one person's own matches and preferences:
// the caller must be signed in (auth-service's session JWT, checked with the
// shared JWT_SECRET) and :userId must be them.
@Injectable()
export class ActorAuthGuard implements CanActivate {
  private readonly jwt = new JwtService();

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const header = String(req.headers?.authorization ?? '');
    if (!header.startsWith('Bearer ')) throw new UnauthorizedException('Missing or invalid authorization header');

    let uid: string | undefined;
    try {
      uid = this.jwt.verify(header.slice(7).trim(), { secret: process.env.JWT_SECRET || 'your_jwt_secret' })?.uid;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
    if (!uid) throw new UnauthorizedException('Invalid auth token');
    if (req.params?.userId && req.params.userId !== uid) throw new ForbiddenException('You can only see your own matches');
    return true;
  }
}
