// Made By I.G
const WebSocket = require('ws').Server;
const serv = new WebSocket({ port: 5002 });

var clients = [];


serv.on('connection' , function(ws){
    ws.on('message', function(massege){

        var massege = JSON.parse(massege);

        if(massege.type == "name"){
            if(clients.includes(massege.data)){
                ws.send(JSON.stringify({
                    name:"massege",
                    data:"User Name allready in Use ! "
                }));
            }else{
                ws.personName = massege.data
                console.log("new User Logedin - " + ws.personName);
                clients.push(ws.personName);
                return ws;
            }
        }

        if(massege.type == "getClients"){
            ws.send(JSON.stringify({
                type:"getClients",
                data:clients
            }));
            return;
        }
        
        serv.clients.forEach(function (client){
            if(client != ws)
                client.send(JSON.stringify({
                    name: ws.personName,
                    data: massege.data
                }));
        });
        
    });

    //When Connection logout 
    ws.on('close' , function(){
        console.log(serv.clients)
        console.log("I lost A client" , ws.personName);
        clients = clients.filter(e => e !== ws.personName); 
        console.log(clients)
    });

    //When new connection to socket happen
    serv.on('connection', () => {
        console.log("Number of Clients : "+ serv.clients.size);
    });


});


