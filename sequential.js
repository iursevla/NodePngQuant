let shelljs = require("shelljs");
let fs = require('fs');

let inputPath = './input';
let outputPath = './output'; //Comprimir as ja comprimidas com qualidade entre 60-80

let options = "--speed 1 --strip --quality=60-80"
let pngs = fs.readdirSync(inputPath);

console.time('ExecTime');
for (const png of pngs) {
    let inputPngPath = inputPath + "/" + png;
    let outputPngPath = outputPath + "/" + png;
    shelljs.exec('pngquant.exe ' + options + " " + inputPngPath + " -o " + outputPngPath); //pngquant.exe --speed 1 --strip --quality=60-80 ./RES/13/?? -o ./RES2/13/?
    console.log("Compressed: " + inputPngPath)
}
console.timeEnd("ExecTime")


