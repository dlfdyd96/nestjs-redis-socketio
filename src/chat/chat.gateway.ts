import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ namespace: 'chat' })
export class ChatGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
  private static readonly logger = new Logger(ChatGateway.name);

  @WebSocketServer()
  server: Server;

  afterInit() {
    ChatGateway.logger.debug(`Socket Server Init Complete`);
  }

  handleConnection(client: Socket) {
    ChatGateway.logger.debug(
      `${client.id}(${client.handshake.query['username']}) is connected!`,
    );

    this.server.emit('msgToClient', {
      name: `admin`,
      text: `join chat.`,
    });
  }

  handleDisconnect(client: Socket) {
    ChatGateway.logger.debug(`${client.id} is disconnected...`);
  }

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, payload: { name: string; text: string }): void {
    this.server.emit('msgToClient', payload);
  }
}
