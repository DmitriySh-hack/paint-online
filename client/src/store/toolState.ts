import { makeAutoObservable } from "mobx";
import Tool from '../tools/Tools'

class toolState{
    tool: Tool | null = null;
    constructor() {
        makeAutoObservable(this)
    }

    setTool(tool: Tool | null){
        this.tool = tool
    }

    setStrokeTool(color: string){
        if(!this.tool) return
        this.tool.strokeColor = color
    }

    setLineWidthTool(width: number){
        if(!this.tool) return
        this.tool.lineWidth = width
    }
}

export default new toolState()