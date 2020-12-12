// Object 객체를 쓰기 위한 인터페이스 선언
export interface User<Type> {
    [ key: string ]: Type[];
}