import { FilesModule } from './../files/files.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Module } from "@nestjs/common";
import { User, UserSchema } from './users.model';

@Module({
    providers: [UsersService],
    controllers: [UsersController],
    imports: [
        MongooseModule.forFeature([
            {name: User.name, schema: UserSchema}
        ]),
        FilesModule
    ],
    exports: [
        UsersService
    ]
})

export class UsersModule {

}