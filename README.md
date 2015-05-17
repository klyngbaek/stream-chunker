# An example

```javascript
Chunker = require('stream-chunker');
var chunker = Chunker(16) // split the stream of data into 16 byte chunks
// make sure to add any data event listeners to chunker stream
// before you write any data to it
chunker.on('data', function(data) {
    // do something with a 16 byte chunk of data
});
someStream.pipe(chunker); // write some data to chunker to get chunked
```
