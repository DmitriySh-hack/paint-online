import Tool from "./Tools"

export default class Circle extends Tool{
    mouseDown = false;
    startX = 0;
    startY = 0;
    saved = '';

    constructor(canvas: HTMLCanvasElement){
        super(canvas)
        this.listen()
    }

    listen(){
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
    }

    draw(x: number, y: number, radius: number){
        if(!this.ctx) return
        this.ctx.globalCompositeOperation = 'source-over'
        const img = new Image()
        img.src = this.saved;
        img.onload = () => {
            this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.ctx?.drawImage(img, 0, 0)
            this.ctx?.beginPath()
            this.ctx?.arc(x, y, radius, 0, 2 * Math.PI)
            this.ctx?.stroke()
        }
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
    }

    mouseMoveHandler(e: MouseEvent){
        const width = e.offsetX - this.startX
        const height = e.offsetY - this.startY
        const radius = Math.min(Math.abs(width), Math.abs(height)) / 2

        const centerX = this.startX + Math.sign(width) * radius
        const centerY = this.startY + Math.sign(height) * radius
        if(this.mouseDown === true){
            this.draw(centerX, centerY, radius)
        }
    }
}