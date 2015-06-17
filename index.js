var through2 = require('through2');

module.exports = function (chunkSize) {
    // buffer to store the last few bytes of incoming data
    // if it does not divide evenly into chunkSize
    var buffer = new Buffer(0);
    return through2(function (newData, enc, next) {
        var allData = Buffer.concat([buffer, newData]);
        var totalLength = allData.length;
        var remainder = totalLength % chunkSize;
        var cutoff = totalLength - remainder;
        for (var i=0 ; i<cutoff ; i+=chunkSize) {
            var chunk = allData.slice(i, i+chunkSize);
            this.push(chunk);
        }
        buffer = allData.slice(cutoff, totalLength);
        next();
    });
}
