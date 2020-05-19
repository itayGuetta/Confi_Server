const WebSocket = require('ws').Server;
const serv = new WebSocket({ port: 5002 });

var clients = [];


serv.on('connection' , function(ws){
    ws.on('message', function(massege){

        massege = JSON.parse(massege);
        console.log("from : " + massege.data +"  Recived : "+ws.personName);
       
        if(massege.type == "name"){
            if(clients.includes(massege.data)){
                ws.send(JSON.stringify({
                    name:"massege",
                    data:"User Name allready in Use ! "
                }));
            }else{
                ws.personName = massege.data
                clients.push(ws.personName);
            }
            return;
        }

        if(massege.type == "getClients"){
            console.log(clients)
            ws.send(JSON.stringify({
                type:"getClients",
                name:"clients",
                data:clients
            }));
        }
        
        

        serv.clients.forEach(function (client){
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
        console.log("I lost A client");
        clients = clients.filter(e => e !== ws.personName); 
    });

    //When new connection to socket happen
    serv.on('connection', (ws) => {
        console.log("Number of Clients : "+ serv.clients.size);
    });


});


