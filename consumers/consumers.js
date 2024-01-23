const Queue = require('bull');

const receiveQueue = new Queue('Works');

// receiveQueue.process(function (job, done) {
//     console.log(`Work A, Received message: ${job.id}: `, job.data);
//     done();
// });

receiveQueue.process(async (job) => {
    let progress = 0;
    // await doSomething(job.data);
    await console.log(`Work A, Received message: ${job.id}: `, job.data);
    progress += 10;
    job.progress(progress);


    // done()
    // job.isCompleted().then(r => {
    //     console.log("Fim: ", r)
    // })
})