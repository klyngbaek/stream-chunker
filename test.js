var test = require('tape');
var Chunker = require('./index.js');
var chunky = require('chunky');

test('testStreamChunker', function (t) {

    t.plan(500);

    var buffer = new Buffer(16*100);
    for (var i=0 ; i<100 ; i++) {
        buffer.writeFloatBE(i/8, i*16+0);
        buffer.writeFloatBE(-i*4, i*16+4);
        buffer.writeFloatBE(i*2, i*16+8);
        buffer.writeFloatBE(-i, i*16|+12);
    }

    var chunks = chunky(buffer);

    chunker = Chunker(16);
    
    var k=0;

    chunker.on('data', function (data) {
        t.equals(data.length, 16, 'yeah');

        var a = data.readFloatBE(0);
        var b = data.readFloatBE(4);
        var c = data.readFloatBE(8);
        var d = data.readFloatBE(12);

        t.equals(a, k/8);
        t.equals(b, -k*4);
        t.equals(c, k*2);
        t.equals(d, -k);

        k++;
    });

    for (var j=0 ; j<chunks.length ; j++) {
        chunker.write(chunks[j]);
    }

});