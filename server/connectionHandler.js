function broadcastConnection(ws, msg, aWss){
    aWss.clients.forEach(client => {
        if(client.id === msg.id){
            client.send(JSON.stringify(msg))
        }
    })
}

function connectionHandler(ws, msg, aWss){
    ws.id = msg.id
    broadcastConnection(ws, msg, aWss)
}

module.exports = { connectionHandler, broadcastConnection }