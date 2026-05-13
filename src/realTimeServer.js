module.exports = (httpServer) => 
    { 
        const {Server} = require('socket.io'); 
        const io = new Server(httpServer);
        io.on('connection', socket => { 
            console.log(socket.id);
            const cookieString = socket.handshake.headers.cookie || "";
            
            // Función simple para parsear cookies
            const cookies = {};
            cookieString.split(";").forEach(cookie => {
                const parts = cookie.split("=");
                if (parts.length >= 2) {
                    cookies[parts[0].trim()] = decodeURIComponent(parts.slice(1).join("="));
                }
            });

            const username = cookies.username || "Anonimo";
            const avatar = cookies.avatar || "/img/profile.jpg";

            socket.on("message",message =>{
                io.emit("message", {
                    user: username,
                    avatar: avatar,
                    message: message,
                    timestamp: new Date()
                });
            });

            socket.on("typing", (user) => {
                socket.broadcast.emit("typing", user);
            });

            socket.on("stopTyping", (user) => {
                socket.broadcast.emit("stopTyping", user);
            });
        });

}