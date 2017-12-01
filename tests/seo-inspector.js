const inspector = require('../src/inspector');
const fs = require('fs');
const expect = require('chai').expect;

function getFileContent(path, callback) {
    fs.open(path, 'r', (err, fd) => {
        if (err) throw err;
        let buffer = new Buffer(1024);
        fs.read(fd, buffer, 0, buffer.length, 0, function (err, bytes) {
            if (err) throw err;
            if (bytes > 0) {
                callback(buffer.slice(0, bytes).toString());
            }
            fs.close(fd, function (err) {
                if (err) throw err;
            });
        });
    });
};

describe('Input a html file, then output a file.', () => {

    it('Show all SEO defects found', () => {
        inspector.run({
            input: 'tests/source/bad.html',
            output: 'tests/destination/bad1.txt'
        }, (err) => {
            if (err) throw err;
            getFileContent('tests/destination/bad1.txt', (actualSummary) => {
                let expectedSummary = "SEO defects found: \nThere are 2 <img> tag without alt attribute\nThere are 2 <a> tag without rel attribute\nThis HTML without <title> tag\nThis HTML without <meta name=\"descriptions\"> tag\nThis HTML without <meta name=\"keywords\"> tag\nThis HTML have more than 15 <strong> tags\nThis HTML have more than one <h1> tag\n";
                expect(actualSummary).to.equal(expectedSummary);
            });
        });
    });

    it('Show no any SEO defect found', () => {
        inspector.run({
            input: 'tests/source/good.html',
            output: 'tests/destination/good1.txt'
        }, (err) => {
            if (err) throw err;
            getFileContent('tests/destination/good1.txt', (actualSummary) => {
                let expectedSummary = "No any SEO defect found. \n";
                expect(actualSummary).to.equal(expectedSummary);
            });
        });
    });

});

describe('Input node readable stream, then output node writable stream.', () => {

    it('Show all SEO defects found', () => {
        inspector.run({
            input: fs.createReadStream('source/bad.html'),
            output: fs.createWriteStream('destination/bad2.txt'),
        }, (err) => {
            if (err) throw err;
            getFileContent('tests/destination/bad2.txt', (actualSummary) => {
                let expectedSummary = "SEO defects found: \nThere are 2 <img> tag without alt attribute\nThere are 2 <a> tag without rel attribute\nThis HTML without <title> tag\nThis HTML without <meta name=\"descriptions\"> tag\nThis HTML without <meta name=\"keywords\"> tag\nThis HTML have more than 15 <strong> tags\nThis HTML have more than one <h1> tag\n";
                expect(actualSummary).to.equal(expectedSummary);
            });
        });

    });

    it('Show no any SEO defect found', () => {
        inspector.run({
            input: 'tests/source/good.html',
            output: 'tests/destination/good2.txt'
        }, (err) => {
            if (err) throw err;
            getFileContent('tests/destination/good2.txt', (actualSummary) => {
                let expectedSummary = "No any SEO defect found. \n";
                expect(actualSummary).to.equal(expectedSummary);
            });
        });
    });

});

//exception case

//threshold 15 -> 20
//enabled 1 -> 0 
