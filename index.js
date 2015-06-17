var through2 = require('through2');

module.exports = ByteBatcher;

function ByteBatcher (chunkSize) {
    // buffer to store the last few bytes of incoming data
    // if it does not divide evenly into chunkSize
    var buffer = new Buffer(0);
    return through2(function (data, enc, next) {
        data = Buffer.concat([buffer, data]);
        var totalLength = data.length;
        var remainder = totalLength%chunkSize;
        var cutoff = totalLength - remainder;
        for (var i=0 ; i<cutoff ; i+=chunkSize) {
            var chunk = data.slice(i, i+chunkSize);
            this.push(chunk);
        }
        buffer = data.slice(cutoff, totalLength);
        next();
    });
}
