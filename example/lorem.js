// Create sample input stream with 10 byte chunks
var Lorem = require('loremipstream');
var sampleStream = new Lorem({
	size: 1000,
	dataSize: 10,
	dataInteval: 100
});

// Create stream chunker with 4 byte chunks
var CHUNK_SIZE = 4;
Chunker = require('../index.js');
var chunker = Chunker(CHUNK_SIZE) // split the stream of data into 4 byte chunks
// make sure to add any data event listeners to chunker stream
// before you write any data to it
chunker.on('data', function(data) {
    // do something with a 16 byte chunk of data
    console.log('Handle '+CHUNK_SIZE+'bytes at a time: ' + data.toString('utf8'));
});
sampleStream.pipe(chunker); // write some data to chunker to get chunked