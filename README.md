# stream-chunker
A transform stream which chunks incoming data into `chunkSize` byte chunks.

[![NPM](https://nodei.co/npm/stream-chunker.png)](https://nodei.co/npm/stream-chunker/)

## api

### `var chunker = require('stream-chunker')(chunkSize)`
Returns a new chunker. Chunker is a duplex (tansform) stream. You can write data into the
chunker, and regardless of the incoming data, the readable side will emit data
in `chunkSize` byte chunks.

## An example

```javascript
var sampleStream = require('lorem-streamer')();
Chunker = require('stream-chunker');
var chunker = Chunker(16) // split the stream of data into 4 byte chunks
// make sure to add any data event listeners to chunker stream
// before you write any data to it
chunker.on('data', function(data) {
    // do something with a 16 byte chunk of data
    console.log('Handle 16 bytes at a time: ' + data.toString('utf8'));
});
sampleStream.pipe(chunker); // write some data to chunker to get chunked
```

##License
MIT
