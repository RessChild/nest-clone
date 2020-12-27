1. react + nest js 를 활용하여  todo + 로그인 + 회원가입 만들기

# 설치
1. npm i @nestjs/typeorm typeorm --save
2. npm i dotenv --save

# 절차 및 구조
0. https://medium.com/@feedbotstar/nest-js-typeorm-postgresql-%EC%8B%9C%EC%9E%91%ED%95%98%EA%B8%B0-153c3a55aba1
1. 메인 모듈에서 TypeOrmModule.forRoot({ 각종 커넥션 정보 }) 로 DB 와 먼저 연결
2. 각 모듈마다 typeorm 객체를 선언
3. 각 객체에 접근권한을 주는 repository 객체 구현
4. repository 객체를 통해 DB 에 쿼리를 날림
@@ 각 타입을 등록하고 선언하는 부분이 뒤엉켜있으니 주의할것

# 발생 문제
- No repository for "User" was found. Looks like this entity is not registered in current "default" connection?
- SyntaxError: Cannot use import statement outside a module
    => package.json 에서 "type": "modules" 선언 ( commonjs 에서 수정 )
- referenceerror exports is not defined
    => package.json 에서 commonjs 로 사용해야 함 ( 이전 문제 해결법과 충돌... )

- ㅏ.. 오류 너무 많이 생기는데 정확한 원인을 못찾는 중..
- forRoot 로 쓰면 default 로 ormconfig.json 을 참조한다는데, 왜 내부 인자로 뭘 값을 또 넣어줘야하는건가..

- forRoot 에 걍 설정정보 다 넣고, Entity 에 객체 넣어주니 됨.. 이유가 뭐지..
- Argument of type '{ id: string; todos: string; }' is not assignable to parameter of type 'DeepPartial<Todo>'

# 개선사항
- import { ConfigModule } from '@nestjs/config';
- https://docs.nestjs.com/techniques/configuration

# nestjs-Passport
- 참고 링크: https://docs.nestjs.com/security/authentication
- npm install --save @nestjs/passport passport passport-local
- npm install --save-dev @types/passport-local
    1. 로그인 구문에 passportStrayegy 클래스 생성
        ( 내부에 함수 validate 선언 필요 )
    2. 상단 모듈에 passport 관련 선언

# nestjs-JWT
- npm install --save @nestjs/jwt passport-jwt
- npm install --save-dev @types/passport-jwt

# 진행사항
1. 수정 모드 추가 ( 12/26 )
    - table 구조 변경 (PrimaryGeneratedColumn 사용)
    - typeorm 의 update 활용
2. JWT 추가 시도 ( 12/27 )
    - jwt 를 쓰기위해선 passport 가 반드시 필요한 것으로 보임 ( 기본 기능을 jwt passport 에서 제공하는 듯 )
    - 초기 권한 설정이 아예 안먹는듯..? req.user 에 값이 안들어감
      passport 가 인증에 사용할 변수명을 명확히 해야 함
      validate 호출은 자동으로 진행됨