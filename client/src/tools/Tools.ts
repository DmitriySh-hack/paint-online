export default class Tool{
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D | null;
    socket: WebSocket
    sessionId: string

    constructor(canvas: HTMLCanvasElement, socket: WebSocket, id: string){
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.socket = socket;
        this.sessionId = id;
        this.destroyEvents()
    }

    set strokeColor(color: string){
        if(!this.ctx) return
        this.ctx.strokeStyle = color
    }

    set lineWidth(width: number){
        if(!this.ctx) return
        this.ctx.lineWidth = width
    }

    destroyEvents(){
        this.canvas.onmousedown = null
        this.canvas.onmouseup = null
        this.canvas.onmousemove = null
    }
}