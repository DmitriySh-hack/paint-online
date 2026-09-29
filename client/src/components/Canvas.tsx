import React, { useEffect, useRef, useState } from 'react'
import '../styles/canvas.scss'
import { observer } from 'mobx-react-lite';
import { Button, Modal } from 'react-bootstrap'
import canvasState from '../store/canvasState'
import { useParams } from 'react-router-dom';
import Brush from '../tools/Brush';
import toolState from '../store/toolState';
import Rect from '../tools/Rect';

const Canvas = observer(() => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const usernameRef = useRef<HTMLInputElement>(null)

    const [modal, setModal] = useState(true)

    const params = useParams()
    console.log(params)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        canvasState.setCanvas(canvas)
    }, [])

    useEffect(() => {
        const id = params.id
        const canvas = canvasRef.current
        if(canvasState.username && id && canvas){
            const socket = new WebSocket('ws://localhost:5001/')
            canvasState.setSocket(socket)
            canvasState.setSessionId(id)
            toolState.setTool(new Brush(canvas, socket, id))
            socket.onopen = () => {
                console.log(`Подключение с ${canvasState.username} установлено`)
                
            }
            socket.onmessage = (event) => {
                let msg = JSON.parse(event.data)
                switch (msg.method){
                    case "connection":
                        console.log(`Пользователь ${canvasState.username} подключился!`)
                        break;
                    case "draw":
                        drawHandler(msg)
                        break;
                }
            }
        }
    }, [canvasState.username])

    const drawHandler = (msg: any) => {
        const figure = msg.figure
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        switch(figure.type){
            case "brush":
                Brush.draw(ctx, figure.x, figure.y)
                break;
            case 'rect':
                Rect.draw(ctx, figure.x, figure.y, figure.width, figure.height)
                break;
            case "finish":
                ctx?.beginPath()
                break;
        }
    }

    const mouseDownHandle = () => {
        canvasState.pushToUndo(canvasRef.current?.toDataURL() || '')
    }

    const connectHandler = () => {
        if(!usernameRef.current) return
        canvasState.setUsername(usernameRef.current.value)
        setModal(false)
    }

    return (
        <div className='canvas'>
            <Modal show={modal} onHide={() => {}}>
                <Modal.Header>
                    <Modal.Title>Введите имя</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="text" ref={usernameRef}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={connectHandler}>
                        Войти
                    </Button>
                </Modal.Footer>
            </Modal>
            <canvas 
                ref={canvasRef} 
                width={700} 
                height={500}
                onMouseDown={() => {
                    mouseDownHandle()
                }}
            />
        </div>
    )
});

export default Canvas