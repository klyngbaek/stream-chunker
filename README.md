# stream-chunker
A transform stream which chunks incoming data into `chunkSize` byte chunks.

[![build status](https://secure.travis-ci.org/klyngbaek/stream-chunker.png)](http://travis-ci.org/klyngbaek/stream-chunker)

[![NPM](https://nodei.co/npm/stream-chunker.png)](https://nodei.co/npm/stream-chunker/)

## api

### `var chunker = require('stream-chunker')(chunkSize)`
Returns a new chunker. Chunker is a duplex (tansform) stream. You can write data into the
chunker, and regardless of the incoming data, the readable side will emit data
in `chunkSize` byte chunks.

## An example

```javascript
// Create sample input stream with 10 byte chunks
var Lorem = require('loremipstream');
var sampleStream = new Lorem({
	size: 1000,
	dataSize: 10,
	dataInteval: 100
});

// Create stream chunker with 4 byte chunks
var CHUNK_SIZE = 4;
Chunker = require('stream-chunker');
var chunker = Chunker(CHUNK_SIZE) // split the stream of data into 4 byte chunks
// make sure to add any data event listeners to chunker stream
// before you write any data to it
chunker.on('data', function(data) {
    // do something with a 16 byte chunk of data
    console.log('Handle '+CHUNK_SIZE+'bytes at a time: ' + data.toString('utf8'));
});
sampleStream.pipe(chunker); // write some data to chunker to get chunked
```

##License
MIT
