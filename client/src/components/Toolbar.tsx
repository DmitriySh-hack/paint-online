import React from 'react'
import '../styles/toolbar.scss'
import toolState from '../store/toolState'
import Brush from '../tools/Brush'
import canvasState from '../store/canvasState'
import Rect from '../tools/Rect'
import Circle from '../tools/Circle'
import Eraser from '../tools/Eraser'

const Toolbar = () => {

    const changeColorHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
        toolState.setStrokeTool(e.target.value)
    }

    return (
        <div className='toolbar'>
            <button className='toolbar__btn brush' onClick={() => canvasState.canvas && toolState.setTool(new Brush(canvasState.canvas, canvasState.socket!, canvasState.sessionid!))}/>
            <button className='toolbar__btn rect' onClick={() => canvasState.canvas && toolState.setTool(new Rect(canvasState.canvas, canvasState.socket!, canvasState.sessionid!))}/>
            <button className='toolbar__btn circle' onClick={() => canvasState.canvas && toolState.setTool(new Circle(canvasState.canvas))}/>
            <button className='toolbar__btn eraser' onClick={() => canvasState.canvas && toolState.setTool(new Eraser(canvasState.canvas))}/>
            <input type='color' 
                onChange={(e) => {
                    changeColorHandle(e)
                }}
            />
            <button className='toolbar__btn undo' onClick={() => canvasState.undo()}/>
            <button className='toolbar__btn redo' onClick={() => canvasState.redo()}/>
            <button className='toolbar__btn save'/>
        </div>
    )
}

export default Toolbar