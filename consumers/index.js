// // Importa a biblioteca Bull
// const {Queue, Worker, QueueScheduler} = require('bull');
//
// // Cria uma instância da fila com uma chave única
// const myQueue = new Queue('myQueue', {
//     limiter: {
//         max: 1, // Limite de tarefas processadas simultaneamente
//         duration: 1000, // Período de restrição
//     },
// });
//
// // Processador para a fila
// const processFunction = async (job) => {
//     console.log(`Processando a tarefa: ${job.data}`);
//     // Simula uma operação assíncrona
//     await new Promise(resolve => setTimeout(resolve, 2000));
//     console.log(`Tarefa concluída: ${job.data}`);
// };
//
// // Cria um worker para processar tarefas da fila
// const worker = new Worker('myQueue', processFunction);
//
// // Cria um scheduler para garantir que as tarefas sejam processadas
// const scheduler = new QueueScheduler('myQueue');
//
// // Adiciona tarefas à fila
// const addTasksToQueue = async () => {
//     for (let i = 1; i <= 5; i++) {
//         await myQueue.add(`Tarefa ${i}`);
//     }
// };
//
// // Inicia o processamento
// addTasksToQueue();

console.log("Index.js");