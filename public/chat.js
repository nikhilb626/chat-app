$(document).ready(function(){
        var socket=io.connect("http://192.168.2.106:3000");


    var username=$("#username");
    var change_username=$("#change_username");
    
    var feedback=$("#feedback");
    var type=$("#typing-container");


    var message=$("#message");
    var change_message=$("#change_message");


    change_message.click(function(){
        socket.emit('new_message',{message:message.val()})
    })


    socket.on("new_message",(data)=>{
        message.val("");

        feedback.append("<p>"+data.username+":"+data.message+"</p>")
    })
    
    change_username.click(function(){
        socket.emit("change_username",{
            username:username.val()
        })
    })

    socket.on("change_username",data=>{
        type.html("<p><i>"+data.username+" join the chat."+"</i></p><br><br>")
    })

    
    
    message.bind("focus",()=>{
        socket.emit("typing")
    })
    
    
    socket.on("typing",data=>{
        type.html("<p><i>"+data.username+" is typing..."+"</i></p><br><br>")
    })

    message.bind("blur",()=>{
        socket.emit("untyping")
    })

    socket.on("untyping",data=>{
        type.html("<p><i>"+"status:null"+"</i></p>")
    })
  
 });

