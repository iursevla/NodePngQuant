# NodeJS Batch Processing for [pngquant](https://pngquant.org)

This is a simple **sequential** or **parallel** batch processing PNG compressor for NodeJS using **pngquant** ([website](https://pngquant.org) / [GitHub](https://github.com/pornel/pngquant) ). 

It was made for Windows, but since it uses NodeJS [shelljs](https://github.com/shelljs/shelljs) portable unix shell, then it can be easily ported to other OSs by changing the pngquant.exe to similar executable in OSX/Linux environments.

# Usage

Sequential: ```node sequential.js```

Parallel: ```node parallel.js```

## Note
This will execute the pngquant.exe for each image with the following options: 

```--speed 1 --strip --quality=60-80 ./input/[name].png -o ./output/[name].png```,

 to change this options you have to change the ```worker.js``` file to meet your needs.

# Performance

Tested with Intel Core-i5 4690K 3.5GHz 4 core processor.

## 1. With 21 images (all of them were a copy of [this image](http://wikiworldorder.org/images/HeartPlantFractal-earth.png)) each with 20 917 344 bytes (~20MB).

**Sequential version:** ExecTime: 341963.668ms = 341.963668s = 5min41s

**Parallel version:** ExecTime: 117284.8515ms = 117.284852s ~= 2min 

1. Core 1 -> ExecTime: 111692.898ms - 5 images
2. Core 2 -> ExecTime: 113035.387ms - 5 images
3. Core 3 -> ExecTime: 113390.365ms - 5 images
4. Core 4 -> ExecTime: 131020.756ms - 6 images

## 2. With 67 random small sized images

**Sequential version:** ExecTime: 23342.678ms ~= 23s

**Parallel version:** ExecTime:  8079.25ms ~= 8s

1. Core 1 -> ExecTime: 7775.574ms - 16 images
2. Core 2 -> ExecTime: 8246.340ms - 16 images
3. Core 3 -> ExecTime: 8127.483ms - 16 images
4. Core 4 -> ExecTime: 8169.789ms - 19 images

# Future work (TODO)

1. Enable usage of sub-folders inside input folder.
    * Each core will convert png's inside one or more sub-folders.
2. Use user input as options to pngquant.

# Dependencies

1. [shelljs](https://github.com/shelljs/shelljs) - Portable Unix shell commands for Node.js. To install use: ```npm install -g shelljs```

# Problems

## 1
If the division of number of png images by the number of cpu cores is not an integer then the last core has to convert the remaining images (maximum will be numCores - 1 images). 

Example: 
1. We have 23 images to convert
2. We have 4 cores to process those images in parallel

Then the first 3 cores will convert 5 images each and the last one will convert 8 images

## 2

Does not work with sub folders inside input folder.
