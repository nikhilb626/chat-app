const express=require("express");
const path=require("path");

const bodyParser=require("body-parser");

const app=express();

const port=3000;

app.set("view engine","hbs");

const staticPath=path.join(__dirname,"../public");
app.use(express.static(staticPath));


app.get("/",(req,res)=>{
    res.render("index");
})



const server=app.listen(port,()=>{
    console.log("server connected...")
})

// include socket.io
const io=require("socket.io")(server);

io.on("connection",(socket)=>{
    console.log("new client has been added");

    socket.username="Anonymous";

    socket.on("new_message",data=>{
        io.sockets.emit("new_message",{
            message:data.message,
            username:socket.username
        });

        
    });
    socket.on("change_username",data=>{
        socket.username=data.username;
        socket.broadcast.emit("change_username",{username:socket.username});
    });

    socket.on("typing",data=>{
        socket.broadcast.emit("typing",{username:socket.username});
    });

    socket.on("untyping",data=>{
        socket.broadcast.emit("untyping");
    });




})

