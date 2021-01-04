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
    2. 상단 모듈에 passportModule 을 사용선언 

# nestjs-JWT
- npm install --save @nestjs/jwt passport-jwt
- npm install --save-dev @types/passport-jwt
    1. service 안에 JwtService 객체를 내부변수로 선언
        - access_token 을 만들어 반환하는 함수를 선언 ( login() )
        - 이때 JwtService 의 sign 함수를 사용하여 값을 만들어냄
    2. 상단 모듈에 JWTModule 을 사용선언

# 진행사항
1. 수정 모드 추가 ( 12/26 )
    - table 구조 변경 (PrimaryGeneratedColumn 사용)
    - typeorm 의 update 활용
2. JWT 추가 시도 ( 12/27 )
    - jwt 를 쓰기위해선 passport 가 반드시 필요한 것으로 보임 ( 기본 기능을 jwt passport 에서 제공하는 듯 )
    - 초기 권한 설정이 아예 안먹는듯..? req.user 에 값이 안들어감
      passport 가 인증에 사용할 변수명을 명확히 해야 함
      validate 호출은 자동으로 진행됨
    - jwt 토큰은 값을 받아 클라이언트에서 저장하다가, 헤더에 넣어서 전송해줘야함
    - jwtStrategy의 validate가 작동 안한 이유는 토큰 자체가 없어서 막혔기 때문
    - 실행 순서는 validate -> handleRequest 순서
3. 참고자료
    - https://velog.io/@tlatldms/%EC%84%9C%EB%B2%84%EA%B0%9C%EB%B0%9C%EC%BA%A0%ED%94%84-Refresh-JWT-%EA%B5%AC%ED%98%84
    - jwt 토큰을 재생성하는데 refresh 토큰이란걸 쓰는게 보편적인 것 같음
    - 그러니까 2 종류의 토큰을 보유 ( access_token, refresh_token )
    - location 정보로 넘기는 정보를 cookie 나 localstorage 정보로 옮길 것
    - jwtModule 내에 선언해주는건 기본값.
        생성되는 토큰마다 고유값이 다른 경우, options 으로 직접 기재할 수 있음
4. react-cookie
    - https://m.blog.naver.com/PostView.nhn?blogId=dilrong&logNo=221450777898&proxyReferer=https:%2F%2Fwww.google.com%2F
    - npm i react-cookie --save
    - cookie 의 경우, 브라우저가 완전히 종료되면 없어짐
    ( 자동로그인을 구현할려면, localstorage 를 쓰는게 맞는 듯 )
5. Refresh_token 의 필요여부는 사람마다 의견이 다른 듯
    - https://zzossig.io/posts/etc/what_is_the_point_of_refresh_token/
6. 클라이언트에서 jwt 해독을 위한 모듈 불러오기
    - npm i jsonwebtoken --save
    - 이후 exp 비교하면서 시간 널널하게 비교.
        만료된 토큰이면 새 토큰을 받아오고 실행
        다만.. 이게 useState 도 비동기로 적용되는거라서, 이미 토큰 기한이 만료된경우엔 에러창뜸