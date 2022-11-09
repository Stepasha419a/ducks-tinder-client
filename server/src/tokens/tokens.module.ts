import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Token, TokenSchema } from './tokens.model';
import { TokensService } from './tokens.service';

@Module({
    providers: [TokensService],
    imports: [
        MongooseModule.forFeature([
            {name: Token.name, schema: TokenSchema}
        ]),
        JwtModule.register({
            secret: process.env.PRIVATE_KEY,
            signOptions: {
              expiresIn: "7d"
            }
        })
    ],
    exports: [TokensService]
})
export class TokensModule {}
