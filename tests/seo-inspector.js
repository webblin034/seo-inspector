'use strict';

import SeoInspector from '../SeoInspector';
import fs from 'fs';
import { expect, } from 'chai';
import chai from 'chai';
import UserCustomRule from './UserCustomRule';

describe('Read from a HTML file, then check SEO rules, then write result to a file', () => {

    it('Check all rules by default, then no any SEO defect found', () => {
        
        const inspect = () => {
            return new Promise((resolve, reject) => {
                new SeoInspector({ done: 
                                     (err, contentStr) => {
                                         if (err) throw err;
                                         resolve(contentStr);
                                     }
                                 })
                .read('tests/source/good.html')
                .write('tests/destination/good0101.txt');
            });
        };

        return inspect().then( actualSummary => {
            let expectedSummary = "No any SEO defect found. \n";
            expect(actualSummary).to.equal(expectedSummary);
        });

    });

    it('Check all rules by default, then show all SEO defects found', () => {
        
        const inspect = () => {
            return new Promise((resolve, reject) => {
                new SeoInspector({ done: 
                                     (err, contentStr) => {
                                         if (err) throw err;
                                         resolve(contentStr);
                                     }
                                 })
                .read('tests/source/bad.html')
                .write('tests/destination/bad0101.txt');
            });
        };

        return inspect().then( actualSummary => {
            let expectedSummary = "SEO defects found: \nThere are 2 <img> tag without alt attribute\nThere are 2 <a> tag without rel attribute\nThis HTML without <title> tag\nThis HTML without <meta name=\"descriptions\"> tag\nThis HTML without <meta name=\"keywords\"> tag\nThis HTML have more than 15 <strong> tags\nThis HTML have more than one <h1> tag\n";
            expect(actualSummary).to.equal(expectedSummary);
        });

    });

    it('Check rule1 and rule4, then show all SEO defects found', () => {
        
        const inspect = () => {
            return new Promise((resolve, reject) => {
                new SeoInspector({ done: 
                                     (err, contentStr) => {
                                         if (err) throw err;
                                         resolve(contentStr);
                                     }
                                 })
                .read('tests/source/bad.html')
                .addRule('ImgTagWithAltAttritube')
                .addRule('NoTooManyStrongTags')
                .write('tests/destination/bad0102.txt');
            });
        };

        return inspect().then( actualSummary => {
            let expectedSummary = "SEO defects found: \nThere are 2 <img> tag without alt attribute\nThis HTML have more than 15 <strong> tags\n";
            expect(actualSummary).to.equal(expectedSummary);
        });

    });

    it('Check rule1 and rule4, and rule4 has custom threshold, then show all SEO defects found', () => {
        
        const inspect = () => {
            return new Promise((resolve, reject) => {
                new SeoInspector({ done: 
                                     (err, contentStr) => {
                                         if (err) throw err;
                                         resolve(contentStr);
                                     }
                                 })
                .read('tests/source/bad.html')
                .addRule('ImgTagWithAltAttritube')
                .addRule('NoTooManyStrongTags', { threshold: 20 })
                .write('tests/destination/bad0103.txt');
            });
        };

        return inspect().then( actualSummary => {
            let expectedSummary = "SEO defects found: \nThere are 2 <img> tag without alt attribute\n";
            expect(actualSummary).to.equal(expectedSummary);
        });

    });

    it('Check rule1 and a new user custom rule, then show all SEO defects found', () => {
        
        const inspect = () => {
            return new Promise((resolve, reject) => {
                new SeoInspector({ done: 
                                     (err, contentStr) => {
                                         if (err) throw err;
                                         resolve(contentStr);
                                     }
                                 })
                .read('tests/source/bad.html')
                .addRule('ImgTagWithAltAttritube')
                .addRule('UserCustom', { object: new UserCustomRule({ threshold: 5 }) })
                .write('tests/destination/bad0104.txt');
            });
        };

        return inspect().then( actualSummary => {
            let expectedSummary = "SEO defects found: \nThere are 2 <img> tag without alt attribute\nUser custom rule violated\n";
            expect(actualSummary).to.equal(expectedSummary);
        });

    });

});

describe('Read from a Node Readable Stream, then check SEO rules, then write result to a Node Writable Stream', () => {

    it('Check all rules by default, then no any SEO defect found', () => {
        
        const inspect = () => {
            return new Promise((resolve, reject) => {
                new SeoInspector({ done: 
                                     (err, contentStr) => {
                                         if (err) throw err;
                                         resolve(contentStr);
                                     }
                                 })
                .read(fs.createReadStream('tests/source/good.html'))
                .write(fs.createWriteStream('tests/destination/good0201.txt'));
            });
        };

        return inspect().then( actualSummary => {
            let expectedSummary = "No any SEO defect found. \n";
            expect(actualSummary).to.equal(expectedSummary);
        });

    });

    it('Check all rules by default, then show all SEO defects found', () => {
        
        const inspect = () => {
            return new Promise((resolve, reject) => {
                new SeoInspector({ done: 
                                     (err, contentStr) => {
                                         if (err) throw err;
                                         resolve(contentStr);
                                     }
                                 })
                .read(fs.createReadStream('tests/source/bad.html'))
                .write(fs.createWriteStream('tests/destination/bad0201.txt'));
            });
        };

        return inspect().then( actualSummary => {
            let expectedSummary = "SEO defects found: \nThere are 2 <img> tag without alt attribute\nThere are 2 <a> tag without rel attribute\nThis HTML without <title> tag\nThis HTML without <meta name=\"descriptions\"> tag\nThis HTML without <meta name=\"keywords\"> tag\nThis HTML have more than 15 <strong> tags\nThis HTML have more than one <h1> tag\n";
            expect(actualSummary).to.equal(expectedSummary);
        });

    });

});

describe('Read from a Node Readable Stream, then check SEO rules, then write result to console', () => {

    it('Check all rules by default, then no any SEO defect found', () => {
        
        const inspect = () => {
            return new Promise((resolve, reject) => {
                new SeoInspector({ done: 
                                     (err, contentStr) => {
                                         if (err) throw err;
                                         resolve(contentStr);
                                     }
                                 })
                .read(fs.createReadStream('tests/source/good.html'))
                .write(console);
            });
        };

        return inspect().then( actualSummary => {
            let expectedSummary = "No any SEO defect found. \n";
            expect(actualSummary).to.equal(expectedSummary);
        });

    });

    it('Check all rules by default, then show all SEO defects found', () => {
        
        const inspect = () => {
            return new Promise((resolve, reject) => {
                new SeoInspector({ done: 
                                     (err, contentStr) => {
                                         if (err) throw err;
                                         resolve(contentStr);
                                     }
                                 })
                .read(fs.createReadStream('tests/source/bad.html'))
                .write(console);
            });
        };

        return inspect().then( actualSummary => {
            let expectedSummary = "SEO defects found: \nThere are 2 <img> tag without alt attribute\nThere are 2 <a> tag without rel attribute\nThis HTML without <title> tag\nThis HTML without <meta name=\"descriptions\"> tag\nThis HTML without <meta name=\"keywords\"> tag\nThis HTML have more than 15 <strong> tags\nThis HTML have more than one <h1> tag\n";
            expect(actualSummary).to.equal(expectedSummary);
        });

    });

});
