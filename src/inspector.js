'use strict';

const fs = require('fs');
const { JSDOM } = require('jsdom');
const _ = require('lodash');
const iconv = require('iconv-lite');
 
const config = {
    checkers: {
        'img-tag-with-alt-attritube': { options: { enabled: 1 } },
        'a-tag-with-rel-attritube': { options: {enabled: 1} },
        'head-tag-with-title-and-descriptions-keywords-meta': { options: { enabled: 1 } },
        'no-too-many-strong-tags': { options: { enabled: 1, threshold: 15 } },
        'no-more-than-one-h1-tag': { options: { enabled: 1 } }
    }
};

function getHtml(input, callback) {
    return new Promise((resolve, reject) => {
        const type = input.constructor.name;
        switch (type) {
            case 'String':
                const filePath = input;
                fs.readFile(filePath, 'utf8', (err, html) => {
                    if (err) return callback(err);
                    resolve(html);
                });
                break;
            case 'ReadStream':
                const readStream = input;
                let chunks = [];
                let size = 0;
                readStream.on('data', (chunk) => {
                    chunks.push(chunk);
                    size += chunk.length
                });
                readStream.on('end', () => {
                    let buffer = Buffer.concat(chunks, size);
                    let contentStr = iconv.decode(buffer, 'utf8');
                    resolve(contentStr);
                });
                break;
            default:
                return callback(new Error('"input" option is invalid, supported list: a HTML file path and Node Readable Stream.'));
        }
    });
};

function getDom(html) {
    return new Promise((resolve, reject) => {
        let dom = new JSDOM(html);
        resolve(dom);
    });
};

function getSummary(dom) {
    return new Promise((resolve, reject) => {
        let summary = [];
        _.forEach(config.checkers, (checker, name) => {
            let report = require('./checkers/' + name).check(dom, checker.options)
            if (report && report != 'undefined') {
                summary.push(report);
            }
        });
        resolve(summary);
    });
};

function output(summary, output, callback) {
    return new Promise((resolve, reject) => {
        let contentStr = "";
        if (summary && summary.length > 0) {
            contentStr = "SEO defects found: \n" + summary.join("\n") + "\n";
        } else {
            contentStr = "No any SEO defect found. \n"; 
        }
        const type = output.constructor.name;
        switch (type) {
            case 'Console':
                console.log(contentStr);
                break;
            case 'String':
                const filePath = output;
                fs.writeFile(filePath, contentStr, (err) => {
                    if (err) return callback(err);
                });
                break;
            case 'WriteStream':
                const writeStream = output;
                writeStream.write(contentStr, (err) => {
                    if (err) return callback(err);
                });
                break;
            default:
                return callback(new Error('"output" option is invalid, supported list: a file path, Node Writable Stream and console.'));
        }
        resolve('');
        return callback(null);
    });
};

module.exports = {
    run: function(options, callback) {
        getHtml(options.input, callback)
        .then(
            html => getDom(html)
        )
        .then(
            dom => getSummary(dom)
        )
        .then(
            summary => output(summary, options.output, callback)
        );
    }
}
