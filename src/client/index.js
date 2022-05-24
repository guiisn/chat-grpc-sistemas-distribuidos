let grpc = require("grpc");
var readline = require("readline");
require('dotenv').config()

const app = require('../app/index')

const { proto, serverIpAddress } = app

//Read terminal Lines
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let username;

// criando cliente GRPC
let client = new proto.example.Chat(
    serverIpAddress,
    grpc.credentials.createInsecure()
);

// iniciar stream do chat
function startChat() {
    let channel = client.join({ user: username });

    channel.on("data", onData);

    rl.on("line", function (text) {
        client.send({ user: username, text: text }, res => { });
    });
}

// mostrar mensagem no chat
function onData(message) {
    if (message.user == username) {
        return;
    }
    console.log(`-[${message.user}]: ${message.text}`);
    console.log('');
}

// pegar nome da pessoa que entrar no chat
rl.question("Informe um nome de usuário: ", answer => {
    username = answer.toUpperCase();

    startChat();
});
