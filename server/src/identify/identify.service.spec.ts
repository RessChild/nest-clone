import { JwtModule } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";
import { JwtStrategy } from "../strategy/jwt.strategy";
import { LocalStrategy } from "../strategy/local.strategy";
import { RefreshStrategy } from "../strategy/refresh.strategy";
import { IdentifyController } from "./identify.controller"
import { IdentifyService } from "./identify.service";

describe("IdentifyController", () => {
    let identifyController: IdentifyController;

    // 테스트 수행 전 작업
    beforeEach(async () => {
        const identify: TestingModule = await Test.createTestingModule({
            imports:[
                JwtModule.register({})
            ],
            controllers: [IdentifyController],
            providers: [IdentifyService, LocalStrategy, JwtStrategy, RefreshStrategy]
        }).compile();

        identifyController = identify.get<IdentifyController>(IdentifyController);
    });

    describe('root', () => {
        it('should return "abc"', () => {
            expect(identifyController.test()).toBe('hello');
          });
    })
})