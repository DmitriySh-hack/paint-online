import Tool from "./Tools"

export default class Brush extends Tool{
    mouseDown = false
    constructor(canvas: HTMLCanvasElement, socket: WebSocket, sessionId: string){
        super(canvas, socket, sessionId)
        this.listen()
    }

    listen(){
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
    }

    static draw(ctx: any, x: number, y: number){
        ctx.globalCompositeOperation = 'source-over'
        ctx.lineTo(x, y)
        ctx.stroke()
    }

    mouseDownHandler(e: MouseEvent){
        this.mouseDown = true
        this.ctx?.beginPath()
        this.ctx?.moveTo(e.offsetX, e.offsetY)
    }

    mouseUpHandler(e: MouseEvent){
        this.mouseDown = false
        this.socket.send(JSON.stringify({
            method: 'draw',
            id: this.sessionId,
            figure: {
                type: 'finish',
            }
        }))
    }

    mouseMoveHandler(e: MouseEvent){
        if(this.mouseDown === true){
            // this.draw(e.offsetX, e.offsetY)
            this.socket.send(JSON.stringify({
                method: 'draw',
                id: this.sessionId,
                figure: {
                    type: 'brush',
                    x: e.offsetX,
                    y: e.offsetY
                }
            }))
        }
    }
}