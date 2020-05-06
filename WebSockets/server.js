const websocket = require('ws').Server;
const serv = new websocket({port: 5002});

serv.on('connection' , function(ws){
    ws.on('message', function(massege){
        console.log("Recived : " + massege);
        if(massege == "Hello"){
            ws.send("Hello to you to ! (server :) ) ")
        }else{
            ws.send(massege)
        }

    });

    ws.on('close' , function(ws){
        console.log("I lost A client")
    });



});


