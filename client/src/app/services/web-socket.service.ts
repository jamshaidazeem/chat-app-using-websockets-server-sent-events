import { Injectable } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';
import { IMessage } from '../models/message';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private url: string = 'ws://localhost:3000';
  private webSocketSubject = webSocket<string>(this.url);
  public webSocket$ = this.webSocketSubject.asObservable();

  constructor() {}

  public sendMessageToWebSocketServer(message: IMessage) {
    this.webSocketSubject.next(JSON.stringify(message));
  }
}
