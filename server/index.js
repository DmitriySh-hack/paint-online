const express = require('express')
const app = express()

const { connectionHandler, broadcastConnection } = require('./connectionHandler')

const wsServer = require('express-ws')(app)
const aWss = wsServer.getWss()

const PORT = process.env.PORT || 5001

app.ws('/', (ws, res) => {
    console.log('Connected')
    ws.on('message', (data) => {
        const msg = JSON.parse(data.toString())
        switch(msg.method){
            case "connection":
                connectionHandler(ws, msg, aWss)    
                break;
            case "draw":
                broadcastConnection(ws, msg, aWss)
                break;
        }
    })
})

app.listen(PORT, () => console.log(`server start on PORT ${PORT}`))