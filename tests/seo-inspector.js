'use strict';

import SeoInspector from '../SeoInspector';
import fs from 'fs';
import { expect } from 'chai';

function getFileContent(path) {
    return new Promise((resolve, reject) => {
        fs.open(path, 'r', (err, fd) => {
            if (err) throw err
            let buffer = new Buffer(1024);
            fs.read(fd, buffer, 0, buffer.length, 0, function (err, bytes) {
                if  (err) throw err;
                if (bytes > 0) {
                    resolve(buffer.slice(0, bytes).toString());
                }
                fs.close(fd, function (err) {
                    if (err) throw err;
                });
            });
        });
    });
};

var rrr = '';
describe('Read from a HTML file, then check SEO rules, then write result to a file', () => {

    it('Check all rules by default, then show all SEO defects found', (done) => {

        //const myDone = (err, data) => {
        //    if (err) {
        //        console.log(err);
        //    } else {
        //        console.log(data);
        //        rrr = data;
        //        expect("X").to.equal("Y");
        //        expect(summary).to.eventually.equal("XXX");
        //    }
        //};

         new SeoInspector({ done: done })
             .read('tests/source/bad.html')
             .write('tests/destination/bad01.txt');

       // done();
    });

    it('Check all rules by default, then show all SEO defects found 22222', () => {
    console.log("rrr");
    console.log(rrr);
        //done();
    });


            //});
        //};

        //inspect()
        //    .then(
        //        data => {
        //            console.log(data);
        //            getFileContent('tests/destination/bad01.txt');
        //        }
        //    )
        //    .then(
        //        content => {
        //            console.log(content)
        //            resolve('');
        //        }
        //    );

        
        

/*
        new SeoInspector({ done: done })
            .read('tests/source/bad.html')
            .write('tests/destination/bad01.txt');
        getFileContent('tests/destination/bad01.txt', (actualSummary) => {
            let expectedSummary = "SEO defects found: \nThere are 2 <img> tag without alt attribute\nThere are 2 <a> tag without rel attribute\nThis HTML without <title> tag\nThis HTML without <meta name=\"descriptions\"> tag\nThis HTML without <meta name=\"keywords\"> tag\nThis HTML have more than 15 <strong> tags\nThis HTML have more than one <h1> tagXXX\n";
console.log(expectedSummary);
console.log(actualSummary);
            var aaaa = actualSummary;
            expect("X").to.equal("Y");
            expect(actualSummary).to.equal(expectedSummary);
        });
        */

});
