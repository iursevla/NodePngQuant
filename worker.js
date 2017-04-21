let shelljs = require("shelljs");
let cluster = require('cluster');

console.log("slave", cluster.worker.id, "has started with pid:", process.pid)
let pngquantOptions = "--speed 1 --strip --quality=60-80"
compressPngFiles(process.env.files.split(','), process.env.inputPath, process.env.outputPath);

function compressPngFiles(listOfPngFiles, inputPath, outputPath) {
    console.time('ExecTime');
    for (const png of listOfPngFiles) {
        let inputPngPath = inputPath + "/" + png;
        let outputPngPath = outputPath + "/" + png;
        shelljs.exec('pngquant.exe ' + pngquantOptions + " " + inputPngPath + " -o " + outputPngPath);
        console.log("Compressed: " + inputPngPath)
    }
    console.timeEnd("ExecTime")
    process.exit();
}