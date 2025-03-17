import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { OnModuleInit } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class ChatGateway implements OnModuleInit {

  @WebSocketServer()
  public server: Server

  constructor(private readonly chatService: ChatService) { }

  onModuleInit() {

    this.server.on('connection', (socket: Socket) => {

      const { name, token } = socket.handshake.auth;
      if (!name) {
        socket.disconnect();
        return;
      }

      this.chatService.onClientConnected({
        id: socket.id,
        name: name
      });

      // socket.emit('welcome-message', 'Welcome to the chat');

      this.server.emit('on-clients-changed', this.chatService.getClients());

      socket.on('disconnect', () => {
        this.chatService.onClientDisconnected(socket.id);
        this.server.emit('on-clients-changed', this.chatService.getClients());
        // console.log('Client disconnected:', socket.id);
      });

    });

  }

  @SubscribeMessage('send-message')
  handleMessage(
    @MessageBody() message: string,
    @ConnectedSocket() client: Socket,
  ) {

    const { name, tocken } = client.handshake.auth;
    // console.log({ name, message });

    if (!message) {
      return;
    }

    this.server.emit(
      'on-message',
      {
        userId: client.id,
        message: message,
        name: name,
      }
    )



  }

}
