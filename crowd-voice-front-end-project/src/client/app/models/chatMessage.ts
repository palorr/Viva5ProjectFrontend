export class ChatMessage {
    public FromId: number;
	public FromName: string;
    public Message: string;
    public Sent: Date;

    constructor(fromId: number, fromName: string, message: string, date: string) {
		this.FromId = fromId;
        this.FromName = fromName;
        this.Message = message;
        this.Sent = new Date(date);
    }
}