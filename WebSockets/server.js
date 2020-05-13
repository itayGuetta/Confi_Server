const websocket = require('ws').Server;
const serv = new websocket({port: 5002});

serv.on('connection' , function(ws){
    ws.on('message', function(massege){

        massege = JSON.parse(massege);
        if(massege.type == "massage"){
            ws.personName = massege.data
        }

        console.log("Recived : " + massege);

        serv.clients.forEach(function e(client){
            if(client != ws)
                client.send(massege)
        })



        if(massege == "Hello"){
            ws.send("Hello to you to ! (server :) ) ")
        }else{
            ws.send("From - server : "+massege)
        }

    });

    ws.on('close' , function(ws){
        console.log("I lost A client")
    });



});


