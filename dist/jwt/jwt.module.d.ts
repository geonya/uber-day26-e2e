import { DynamicModule } from '@nestjs/common';
import { JwtModuleOptions } from './jwt.interfaces';
export declare class JwtModule {
    static forRoot(options: JwtModuleOptions): DynamicModule;
}
