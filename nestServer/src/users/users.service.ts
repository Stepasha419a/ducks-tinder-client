import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users = [
        {
            id: "0",
            name: "stepan",
            age: 17
        },
        {
            id: "1",
            name: "oleg",
            age: 19
        }
    ]

    getAll() {
        return this.users
    }

    getOne(id: string) {
        return this.users.find(user => user.id === id)
    }

    create(userDto: CreateUserDto) {
        this.users.push({
            ...userDto,
            id: Date.now().toString()
        })

        return userDto
    }

    update(id: string, userDto: UpdateUserDto) {
        const userIndex = this.users.findIndex(user => user.id === id)
        this.users[userIndex] = {...userDto, id}

        return this.users[userIndex]
    }

    remove(id: string) {
        this.users.filter(user => user.id !== id)

        return 'deleted'
    }
}
