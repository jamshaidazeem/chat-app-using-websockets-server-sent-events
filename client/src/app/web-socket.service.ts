import { Injectable } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private url: string = 'ws://localhost:3000';
  private webSocketSubject = webSocket<string>(this.url);
  public webSocket$ = this.webSocketSubject.asObservable();

  constructor() {}

  public sendMessageToWebSocketServer(message: any) {
    this.webSocketSubject.next(JSON.stringify(message));
  }
}
