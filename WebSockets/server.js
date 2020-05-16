const WebSocket = require('ws').Server;
const serv = new WebSocket({ port: 5002 });

serv.on('connection' , function(ws){
    ws.on('message', function(massege){

        massege = JSON.parse(massege);
       
        if(massege.type == "name"){
            ws.personName = massege.data
            return;
        }
        
        console.log("Recived : " + massege.data + ws.personName);

        serv.clients.forEach(function e(client){
            if(client != ws)
                client.send(JSON.stringify({
                    name: ws.personName,
                    data: massege.data
                }));
        });



        if(massege == "Hello"){
            ws.send("Hello to you to ! (server :) ) ")
        }else{
            ws.send("From - server : "+massege)
        }

    });
    ws.send('hello from the server!');
    ws.on('close' , function(ws){
        console.log("I lost A client")
    });

    //When new connection to socket happen
    serv.on('connection', (ws) => {
        console.log("Number of Clients : "+ serv.clients.size);
    });


});


