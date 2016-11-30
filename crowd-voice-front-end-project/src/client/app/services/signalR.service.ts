import { Injectable, EventEmitter } from '@angular/core';

//import { CONFIGURATION } from '../shared/app.constants';
import { ChatMessage, TypingMessage, ChatUser } from '../models/index';

import 'signalr';
import * as jQuery from 'jquery';

@Injectable()
export class SignalRService {

    private proxy: any;
    private proxyName: string = 'chat';
    
    private connection: any;

    public newChatUserAdded: EventEmitter<ChatUser>;

    public messageReceived: EventEmitter<ChatMessage>;
    
    public typingReceived: EventEmitter<TypingMessage>;
    
    public connectionEstablished: EventEmitter<Boolean>;
    
    public connectionExists: Boolean;

    constructor() {
        this.connectionEstablished = new EventEmitter<Boolean>();
        this.messageReceived = new EventEmitter<ChatMessage>();
        this.newChatUserAdded = new EventEmitter<ChatUser>();
        this.typingReceived = new EventEmitter<TypingMessage>();
        
        this.connectionExists = false;

        this.connection = jQuery.hubConnection('http://localhost:54684');
  
        this.proxy = this.connection.createHubProxy(this.proxyName);

        this.registerOnServerEvents();

        this.startConnection();
    }

    public sendChatUserMessage(message: ChatUser) {
        console.log('sendChatUserMessage via this.proxy.invoke ...', this.proxy);
        this.proxy.invoke('NewChatUserAdded', message);
    }

    public sendChatMessage(message: ChatMessage) {
        console.log('sendChatMessage via this.proxy.invoke ...', this.proxy);
        this.proxy.invoke('SendMessage', message);
    }
    
    public sendTypingMessage(message: TypingMessage) {
        console.log('sendTypingMessage via this.proxy.invoke ...', this.proxy);
        this.proxy.invoke('TypeMessage', message);
    }

    private startConnection(): void {
        this.connection.start().done((data: any) => {
            console.log('DATA FROM START CONNECTION: ', data);
            console.log('Now connected ' + data.transport.name + ', connection ID= ' + data.id);
            this.connectionEstablished.emit(true);
            this.connectionExists = true;
        }).fail((error: any) => {
            console.log('Could not connect ' + error);
            this.connectionEstablished.emit(false);
        });
    }

    private registerOnServerEvents(): void {
        this.proxy.on('NewChatUserAdded', (data: ChatUser) => {
            console.log('new user added in SignalRService: ' + JSON.stringify(data));
            this.newChatUserAdded.emit(data);
        });
        
        this.proxy.on('SendMessage', (data: ChatMessage) => {
            console.log('received message in SignalRService: ' + JSON.stringify(data));
            this.messageReceived.emit(data);
        });
        
        this.proxy.on('TypeMessage', (data: TypingMessage) => {
            console.log('received typing in SignalRService: ' + JSON.stringify(data));
            this.typingReceived.emit(data);
        });
    }
}
