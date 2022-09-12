import ws, { WebSocketServer } from "ws";
import ChatService from "./ChatService";

const wss = new ws.Server({
    port: process.env.WSPORT as number | undefined,
    backlog: 10
}, () => console.log(`WS Server started on port ${process.env.WSPORT}`))

wss.on('connection', (ws, req) => {
    ws.on('message', async (args: any) => {
        args = JSON.parse(args)

        req.url && ChatService.sendMessage(args.username, req.url.slice(1), args.content)
        broadcastMessage(args, wss)
    })
})

function broadcastMessage(args: any, wss: WebSocketServer) {
    wss.clients.forEach(client => {
        client.send(JSON.stringify(args))
    })
}

export default wss