import Tool from "./Tools"

export default class Rect extends Tool{
    mouseDown = false;
    startX = 0;
    startY = 0;
    saved = '';

    width = 0;
    height = 0;

    constructor(canvas: HTMLCanvasElement, socket: WebSocket, sessionId: string){
        super(canvas, socket, sessionId)
        this.listen()
    }

    listen(){
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
    }

    static draw(ctx: CanvasRenderingContext2D | null, x: number, y: number, w: number, h: number){
        if (!ctx) return
        ctx.beginPath()
        ctx.rect(x, y, w, h)
        ctx.stroke()
    }

    mouseDownHandler(e: MouseEvent){
        this.mouseDown = true
        this.ctx?.beginPath()
        this.startX = e.offsetX;
        this.startY = e.offsetY;
        this.saved = this.canvas.toDataURL()
    }

    mouseUpHandler(e: MouseEvent){
        this.mouseDown = false
        this.socket.send(JSON.stringify({
            method: 'draw',
            id: this.sessionId,
            figure: {
                type: 'rect',
                x: this.startX,
                y: this.startY,
                width: this.width,
                height: this.height,
            }
        }))
        this.socket.send(JSON.stringify({
            method: 'draw',
            id: this.sessionId,
            figure: {
                type: 'finish',
            }
        }))
    }

    mouseMoveHandler(e: MouseEvent){
        let currentX = e.offsetX;
        let currentY = e.offsetY;
        this.width = currentX - this.startX;
        this.height = currentY - this.startY;
        if(this.mouseDown === true){
            const img = new Image()
            img.src = this.saved
            img.onload = () => {
                if (!this.ctx) return
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
                this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
                Rect.draw(this.ctx, this.startX, this.startY, this.width, this.height)
            }
        }
    }
}