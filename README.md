# stream-chunker

A transform stream which chunks incoming data into `chunkSize` byte chunks.

[![build status](https://secure.travis-ci.org/klyngbaek/stream-chunker.png)](http://travis-ci.org/klyngbaek/stream-chunker)

[![NPM](https://nodei.co/npm/stream-chunker.png)](https://nodei.co/npm/stream-chunker/)

## api

### `var chunker = require('stream-chunker')(chunkSize, [flush])`
Returns a new chunker. Chunker is a duplex (tansform) stream. You can write data into the
chunker, and regardless of the incoming data, the readable side will emit data
in `chunkSize` byte chunks.

- `chunkSize`: `integer` - Size in bytes of the desired chunks.
- `flush`: `boolean` - Optional. Flush incomplete chunk data on stream end. Default is `false`.

## Simple example
```
var fs = require('fs');
var chunker = require('stream-chunker'); 

fs.createReadStream('/someFile')
  	.pipe(chunks(16))
  	.pipe(somethingThatExpects16ByteChunks());
```

## Full working example example
```javascript
// Create sample input stream with 10 byte chunks
var Lorem = require('loremipstream');
var sampleStream = new Lorem({
	size: 100,
	dataSize: 10,
	dataInteval: 100
});

// Create stream chunker with 4 byte chunks
var Chunker = require('stream-chunker');
var chunker = Chunker(4); // split the stream of data into 4 byte chunks
// make sure to add any data event listeners to chunker stream
// before you write any data to it
chunker.on('data', function(data) {
    // do something with a 4 byte chunk of data
    console.log('4 byte chunk: ' + data.toString('utf8'));
});
sampleStream.pipe(chunker); // write some data to chunker to get chunked
```

## License
MIT
