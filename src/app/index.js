const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
require('dotenv').config()

const chatOptions = require('../config/options/index')

// iniciando servidor GRPC.
const server = new grpc.Server();

// atribuindo endereço de IP declarado no .env à uma constante.
const serverIpAddress = process.env.SERVER_IP_ADDRESS;

// instanciando o protobuf
let proto = grpc.loadPackageDefinition(
    protoLoader.loadSync("protos/chat.proto", chatOptions)
);

module.exports = { server, serverIpAddress, proto }