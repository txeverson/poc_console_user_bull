const Queue = require('bull');

const opts = {
    // redis: {
    //     host: 'localhost', // Endereço do servidor Redis
    //     port: 6379,        // Porta do servidor Redis
    //     // Outras configurações do Redis, se necessário
    // },
    // prefix: "console"

}

const sendQueue = new Queue('Works', opts);

for (i = 0; i < 3; i++) {
    message = {
        id: i,
        Nome: "Teste Filas",
        email: "email@teste.com",
        senha: "senha_teste",
    }

    sendQueue.add(message);

    console.log(`Mensagem: ${i}`)
}
