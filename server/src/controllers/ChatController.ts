import ws from 'ws'

const wss = new ws.Server({
    port: process.env.WSPORT as number | undefined,
}, () => console.log(`WS Server started on port ${process.env.WSPORT}`))

wss.on('connection', (ws) => {
    ws.on('message', (message: any) => {
        message = JSON.parse(message)
        
        switch (message.event) {
            case 'message':

                broadcastMessage(message)
                break;
            case 'connection':

                broadcastMessage(message)
                break;
            default:
                break;
        }
    })
})

function broadcastMessage(message: any) {
    wss.clients.forEach(client => {
        client.send(JSON.stringify(message))
    })
}

export default wss