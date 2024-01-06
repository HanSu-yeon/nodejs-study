import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

//사용자 인증 정보를 확인하는 클래스
@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  //CanActivate 인터페이스의 메서드
  async canActivate(context: any): Promise<boolean> {
    //컨텍스트에서 리퀘스트 정보를 가져옴
    const request = context.switchToHttp().getRequest();

    //쿠키가 있으면 인증된 것
    if (request.cookies['login']) {
      return true;
    }
    //쿠키가 없으면 request의 body 정보 확인
    if (!request.body.email || !request.body.password) {
      return false;
    }
    console.log(request.body.email);
    //인증 로직은 기존의 authService.validateUser 사용
    const user = await this.authService.validateUser(
      request.body.email,
      request.body.password,
    );

    //유저 정보가 없으면 false 반환
    if (!user) {
      return false;
    }
    //있으면 request에  user 정보를 추가하고 true 반환
    request.user = user;
    return true;
  }
}

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: any): Promise<boolean> {
    const result = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest();
    await super.logIn(request);
    return result;
  }
}

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    return request.isAuthenticated();
  }
}

@Injectable()
//google 스트래티지 사용
export class GoogleAuthGuard extends AuthGuard('google') {
  async canActive(context: any): Promise<boolean> {
    //부모 클래스의 메서드 사용
    const result = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest();
    await super.logIn(request); //세션 적용
    return result;
  }
}
