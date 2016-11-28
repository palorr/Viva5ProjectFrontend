export class ChatMessage {
	public From: string;
    public Message: string;
    public Sent: Date;

    constructor(from: string, message: string, date: string) {
		this.From = from;
        this.Message = message;
        this.Sent = new Date(date);
    }
}