# stream-chunker

A transform stream which chunks incoming data into `chunkSize` byte chunks.

[![build status](https://secure.travis-ci.org/klyngbaek/stream-chunker.png)](http://travis-ci.org/klyngbaek/stream-chunker)

[![NPM](https://nodei.co/npm/stream-chunker.png)](https://nodei.co/npm/stream-chunker/)

## api

#### `var chunker = require('stream-chunker')(chunkSize, [opts])`
Returns a new chunker. Chunker is a duplex (tansform) stream. You can write data into the
chunker, and regardless of the incoming data, the readable side will emit data
in `chunkSize` byte chunks. This modules has no notion of `objectMode`, everything
written to this stream must be a `string` or a `buffer`.

- `chunkSize`: `integer` - Size in bytes of the desired chunks.
- opts
  - `flush`: `boolean` - Optional. Flush incomplete chunk data on stream end. Default is `false`.
  - `encoding`: `string` - Optional. Encoding of String chunks. Must be a valid Buffer encoding, such as `utf8` or `ascii`.

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

// Create stream chunker with 16 byte chunks
var Chunker = require('stream-chunker');
var opts = {
	flush: true,
	encoding: 'utf8'
};
var chunker = Chunker(16, opts); // split the stream of data into 4 byte chunks
// make sure to add any data event listeners to chunker stream
// before you write any data to it
chunker.on('data', function(data) {
    // do something with a chunk of data
    // notice the last chunk is the flushed data
    console.log('Chunk: ' + data;
});
sampleStream.pipe(chunker); // write some data to chunker to get chunked

```

## License
MIT
