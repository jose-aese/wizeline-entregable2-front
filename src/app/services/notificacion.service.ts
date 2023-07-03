import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {io} from 'socket.io-client';
import {environment} from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class NotificacionService {

    public  socket;
    private urlService = environment.urlServiceIO;

    constructor() {
        this.socket = io(this.urlService, {transports: ['websocket', 'polling', 'flashsocket']});
    }


    sendMessage(data: {}): void {
        this.socket.emit('howdy', data);
        this.socket.on("new message", (a) => {
            alert(a);
        });
    }

    getMessage(): Observable<any> {
        return new Observable<any>(observer => {
            this.socket.on('new message', (data) => {
                observer.next(data);
            });

            return () => {
                this.socket.disconnect();
            }
        });
    }

}
