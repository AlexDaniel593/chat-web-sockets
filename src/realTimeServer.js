module.exports = (httpServer) => 
    { 
        const {Server} = require('socket.io'); 
        const io = new Server(httpServer);
        io.on('connection', socket => { 
            console.log(socket.id);
            const cokie = socket.handshake.headers.cookie;
            const username = cokie.split("=")[1];
            socket.on("message",message =>{
                io.emit("message", {
                    user: username,
                    message: message,
                    timestamp: new Date()
                });
            });
        });

}