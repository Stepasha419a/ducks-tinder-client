import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Module } from "@nestjs/common";

@Module({
    providers: [UsersService],
    controllers: [UsersController]    
})

export class UsersModule {

}