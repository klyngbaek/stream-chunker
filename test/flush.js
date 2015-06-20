var Chunker = require('../index.js');
var test = require('tape');
var concat = require('concat-stream');

test('Test flush option', function (t) {

    t.plan(2);

    function check(data) {
        t.equals(data.toString('utf8'), '1234');
    }
    var chunker = Chunker(4);
    var concatStream = concat(check);
    chunker.pipe(concatStream);
    chunker.write('12');
    chunker.write('34');
    chunker.write('56');
    chunker.end();
    

    function checkFlush(data) {
        t.equals(data.toString('utf8'), '123456');
    }
    var chunkerFlush = Chunker(4, true);
    var concatStreamFlush = concat(checkFlush);
    chunkerFlush.pipe(concatStreamFlush);
    chunkerFlush.write('12');
    chunkerFlush.write('34');
    chunkerFlush.write('56');
    chunkerFlush.end();
    
});