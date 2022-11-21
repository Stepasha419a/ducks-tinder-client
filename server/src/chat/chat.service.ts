import { UsersService } from './../users/users.service';
import { IChat, IMessage, ISendMessage } from './chat.interface';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chat, ChatDocument } from './chat.model';

@Injectable()
export class ChatService {
    constructor(
        @InjectModel(Chat.name) private readonly chatModel: Model<ChatDocument>,
        private readonly usersService: UsersService
    ) {}

    async getAll(userId: string): Promise<IChat[]> {
        const user = await this.usersService.getOne(userId)
        const chats = [] as IChat[]

        for await (let chatId of user.chats) {
            const chat = await this.chatModel.findById(chatId)
            chats.push({_id: chat._id.toString(), messages: chat.messages, members: chat.members})
        }

        return chats
    }

    async getOne(id: string): Promise<IChat> {
        const chat = await this.chatModel.findById(id)
            .catch(() => {throw new HttpException('Chat was not found', HttpStatus.BAD_REQUEST)})
            
        return chat
    }

    async create(members: string[]): Promise<IChat> {
        const chatCandidate = await this.chatModel.findOne({members: members})
        const chatCandidateReversedIDs = await this.chatModel.findOne({members: members.reverse()})
        if(chatCandidate || chatCandidateReversedIDs) {
            throw new HttpException('The chat with such members already exists', HttpStatus.BAD_REQUEST)
        }

        const chat = await this.chatModel.create({members: members})

        members.forEach(async (memberId) => {
            const user = await this.usersService.getOne(memberId)
            await this.usersService.update(memberId, {chats: [...user.chats, chat._id.toString()]})
        })

        return chat
    }

    async delete(id: string) {
        const chat = await this.chatModel.findByIdAndDelete(id)

        if(!chat) {throw new HttpException('Chat was not found', HttpStatus.BAD_REQUEST)}

        chat.members.forEach(async (memberId: string) => {
            const user = await this.usersService.getOne(memberId)
            const index = user.chats.findIndex((item: any) => item === id)
            user.chats.splice(index, 1)
            await this.usersService.update(memberId, {chats: user.chats})
        })

        return chat
    }
    
    async sendMessage(chatId: string, message: ISendMessage) {
        const chat = await this.chatModel.findById(chatId)
            .catch(() => {throw new HttpException('Chat was not found', HttpStatus.BAD_REQUEST)})

        const newMessage: IMessage = {
            id: Date.now().toString(),
            content: message.content,
            userId: message.userId
        }

        await this.chatModel.findByIdAndUpdate(chatId, {messages: [...chat.messages, newMessage]}, {new: true})
    }
}
