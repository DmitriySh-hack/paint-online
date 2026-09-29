import { makeAutoObservable } from "mobx";

class canvasState{
    canvas: HTMLCanvasElement | null = null
    socket: WebSocket | null = null
    sessionid: string | null = null
    undoList: string[] = []
    redoList: string[] = []
    username: string = ''

    constructor() {
        makeAutoObservable(this)
    }

    setSessionId(id: string){
        this.sessionid = id
    }
    setSocket(socket: WebSocket){
        this.socket = socket
    }

    setUsername(username: string){
        this.username = username
    }

    setCanvas(canvas: HTMLCanvasElement){
        this.canvas = canvas
    }

    pushToUndo(data: string){
        this.undoList.push(data)
    }

    pushToRedo(data: string){
        this.redoList.push(data)
    }

    undo(){
        const ctx = this.canvas?.getContext('2d')
        if (!ctx) return

        if(this.undoList.length > 0){
            let dataUrl = this.undoList.pop()
            if(!dataUrl) return
            if(!this.canvas) return
            this.redoList.push(this.canvas.toDataURL())
            let img = new Image()
            img.src = dataUrl
            img.onload = () => {
                if(!this.canvas) return
                ctx.clearRect(0,0,this.canvas?.width, this.canvas?.height)
                ctx.drawImage(img, 0,0,this.canvas?.width, this.canvas?.height)
            }

        }else{
            if(!this.canvas) return
            ctx.clearRect(0,0,this.canvas?.width, this.canvas?.height)
        }
    }

    redo(){
        const ctx = this.canvas?.getContext('2d')
        if (!ctx) return

        if(this.redoList.length > 0){
            let dataUrl = this.redoList.pop()
            if(!dataUrl) return
            if(!this.canvas) return
            this.undoList.push(this.canvas.toDataURL())
            let img = new Image()
            img.src = dataUrl
            img.onload = () => {
                if(!this.canvas) return
                ctx.clearRect(0,0,this.canvas?.width, this.canvas?.height)
                ctx.drawImage(img, 0,0,this.canvas?.width, this.canvas?.height)
            }

        }else{
            if(!this.canvas) return
            ctx.clearRect(0,0,this.canvas?.width, this.canvas?.height)
        }
    }
}

export default new canvasState()