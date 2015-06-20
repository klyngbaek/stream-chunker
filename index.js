/**
 * @module stream-chunker
 */
var through2 = require('through2');

/**
 * Returns a transform stream which chunks incoming data into chunkSize byte
 * chunks.
 * @param  {integer}    chunkSize   Size of chunks in bytes
 * @param  {boolean}    [flush]     Flush any remaining data that does not make
 *                                  a full chunk when stream is ended.
 * @return {Stream.Transform}       A transform stream
 *
 * @example
 * // Create sample input stream with 10 byte chunks
 * var Lorem = require('loremipstream');
 * var sampleStream = new Lorem({
 *     size: 1000,
 *     dataSize: 10,
 *     dataInteval: 100
 * });
 * 
 * // Create stream chunker with 4 byte chunks
 * var CHUNK_SIZE = 4;
 * Chunker = require('../index.js');
 * var chunker = Chunker(CHUNK_SIZE) // split the stream of data into 4 byte chunks
 * // make sure to add any data event listeners to chunker stream
 * // before you write any data to it
 * chunker.on('data', function(data) {
 *     // do something with a 16 byte chunk of data
 *     console.log('Handle '+CHUNK_SIZE+'bytes at a time: ' + data.toString('utf8'));
 * });
 * sampleStream.pipe(chunker); // write some data to chunker to get chunked
 */
module.exports = function (chunkSize, flush) {

    // buffer to store the last few bytes of incoming data
    // if it does not divide evenly into chunkSize
    var buffer = new Buffer(0);

    var opts = {
        halfOpen: false,
        objectMode: false
    };

    var transformFunction = function (data, enc, next) {
        var allData = Buffer.concat([buffer, data]);
        var totalLength = allData.length;
        var remainder = totalLength % chunkSize;
        var cutoff = totalLength - remainder;
        for (var i=0 ; i<cutoff ; i+=chunkSize) {
            var chunk = allData.slice(i, i+chunkSize);
            this.push(chunk);
        }
        buffer = allData.slice(cutoff, totalLength);
        next();
    };

    var flushFunction;
    if (flush) {
        flushFunction = function (next) {
            this.push(buffer);
            next();
        };
    }

    return through2(opts, transformFunction, flushFunction);

};