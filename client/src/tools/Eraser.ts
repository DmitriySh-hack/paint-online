import Tool from "./Tools"

export default class Eraser extends Tool{
    mouseDown = false
    constructor(canvas: HTMLCanvasElement){
        super(canvas)
        this.listen()
    }

    listen(){
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
    }

    draw(x: number, y: number){
        if(!this.ctx) return
        this.ctx.lineTo(x, y)
        this.ctx.globalCompositeOperation = 'destination-out'
        this.ctx.stroke()
    }

    mouseDownHandler(e: MouseEvent){
        this.mouseDown = true
        this.ctx?.beginPath()
        this.ctx?.moveTo(e.offsetX, e.offsetY)
    }

    mouseUpHandler(e: MouseEvent){
        this.mouseDown = false
    }

    mouseMoveHandler(e: MouseEvent){
        if(this.mouseDown === true){
            this.draw(e.offsetX, e.offsetY)
        }
    }
}