var through2 = require('through2');

module.exports = ByteBatcher;

function ByteBatcher (size) {
    // buffer to store the last few bytes of incoming data
    // if it does not divide evenly into size
    var buffer = new Buffer(0);
    return through2(function (data, enc, next) {
        data = Buffer.concat([buffer, data]);
        var length = data.length;
        var remainder = length%size;
        var cutoff = length - remainder;
        for (var i=0 ; i<cutoff ; i+= size) {
            var chunk = data.slice(i, i+size);
            this.push(chunk);
        }
        buffer = data.slice(cutoff, length);
        next();
    });
}