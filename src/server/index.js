const grpc = require("grpc");
require('dotenv').config()

const app = require('../app/index')

const { proto, server, serverIpAddress } = app

// enviar mensagens para todos os usuários no chat
function messageForAllUsers(message) {
    users.forEach(user => {
        user.write(message);
    });
}

// array que guardará os usuárois que entrarem no chat
let users = [];

// essa função é disparada quando um novo usuário entrar no chat
function newUserInChat(user, callback) {
    users.push(user)
    messageForAllUsers({ user: 'INFORMAÇÃO', text: "Um novo usuário acabou de entrar no chat!" });
}

// receber mensagem do cliente
function sendMessage(call, callback) {
    messageForAllUsers(call.request);
}

// Definindo os métodos do servidor e iniciando
server.addService(proto.example.Chat.service, { join: newUserInChat, send: sendMessage });

server.bind(serverIpAddress, grpc.ServerCredentials.createInsecure());

try {
    server.start();
    console.log('[SERVIDOR]: O servidor está em execução!');
} catch (error) {
    console.log('[SERVIDOR]: Falha ao executar o servidor: ', error);
}