import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  MessageBody,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';

@WebSocketGateway({ namespace: 'chat' })
export class ChatGateway {
  @WebSocketServer() server: Server;

  @SubscribeMessage('message')
  handleMessage(socket: Socket, data: any): void {
    const { message, nickname } = data;
    socket.broadcast.emit('message', `${nickname}:${message}`);
  }
}

@WebSocketGateway({ namespace: 'room' })
export class RoomGateway {
  constructor(private readonly chatGateway: ChatGateway) {}
  rooms = [];

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('createRoom')
  handleMessage(@MessageBody() data) {
    const { nickname, room } = data;
    this.chatGateway.server.emit('notice', {
      message: `${nickname}님이 ${room}방을 만들었습니다`,
    });
    this.rooms.push(room);
    this.server.emit('rooms', this.rooms);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(socket: Socket, data) {
    const { nickname, room, toLeaveRoom } = data;
    socket.leave(toLeaveRoom);
    this.chatGateway.server.emit('notice', {
      message: `${nickname}님이 ${room}방에 입장했다`,
    });
    socket.join(room);
  }

  @SubscribeMessage('message')
  handleMessageToRoom(socket: Socket, data) {
    const { message, room, nickname } = data;
    console.log(data);
    socket.broadcast.to(room).emit('message', {
      message: `${nickname}:${message}`,
    });
  }
}
