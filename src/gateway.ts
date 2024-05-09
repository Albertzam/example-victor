import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class SocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  afterInit(server: Server): void {
    this.server = server;
  }

  handleDisconnect(client: Socket) {
    // throw new Error('Method not implemented.');
    client.disconnect();
  }

  handleConnection(client: Socket) {
    console.log(client.id);
    client.join('branchKey');
  }

  @SubscribeMessage('send')
  send(@MessageBody() data: unknown) {
    console.log(data);
    this.server.to(data as any).emit('message', 'Hello world!');
  }
}
