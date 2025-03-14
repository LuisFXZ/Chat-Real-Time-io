import { WebSocketGateway } from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { OnModuleInit } from '@nestjs/common';
import { Server } from 'socket.io';

@WebSocketGateway()
export class ChatGateway implements OnModuleInit {

  public server: Server

  constructor(private readonly chatService: ChatService) { }

  onModuleInit() { 

  }

}
