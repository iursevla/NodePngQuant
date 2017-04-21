let shelljs = require("shelljs");
let fs = require('fs');
let cluster = require('cluster'); // Paralellize png compression
let inputPath = './input';
let outputPath = './output';

if (cluster.isMaster) {
    console.log("master", process.pid, "has started")
    let numCPUs = require('os').cpus().length;
    let pngs = fs.readdirSync(inputPath);
    let end = pngs.length / numCPUs;
    for (let i = 0; i < numCPUs; i++)
        cluster.fork({ files: pngs.slice(i * end, end * (i + 1)), inputPath: inputPath, outputPath: outputPath });
} else {
    require('./worker.js')
}