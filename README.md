# SEO Checker
> A library for scanning a HTML file to show all of the SEO defects 

## Usage

Install with npm `npm install seo-inspector --save`

### Getting started

Require the library and then all the methods listed below will be made available to you.

#### Read from a HTML file, write result to a file

```js
const SeoInspector = require('seo-inspector')

new SeoInspector({ done:
                    (err, data) => {
                        if (err) throw err;
                    }
                })
.read('source/target.html')
.write('destination/report.txt');
```

#### Read from a Node Readable Stream, write result to a Node Writable Stream

```js
const SeoInspector = require('seo-inspector')

new SeoInspector({ done:
                    (err, data) => {
                        if (err) throw err;
                    }
                })
.read(fs.createReadStream('source/target.html'))
.write(fs.createWriteStream('destination/report.txt'));
```

#### Read from a HTML file, write result to console

```js
const SeoInspector = require('seo-inspector')

new SeoInspector({ done:
                    (err, data) => {
                        if (err) throw err;
                    }
                })
.read('source/target.html')
.write(console);
```

#### Example output to show all SEO defects

```
SEO defects found:
There are 2 <img> tag without alt attribute
There are 2 <a> tag without rel attribute
This HTML without <title> tag
This HTML without <meta name="descriptions"> tag
This HTML without <meta name="keywords"> tag
This HTML have more than 15 <strong> tags
This HTML have more than one <h1> tag
```
or
```
No any SEO defect found.
```

#### free to chain any rules you want, default is to apply all rules to check

Supported SEO rules now: `ImgTagWithAltAttritube`, `ATagWithRelAttritube`, `HeadTagWithTitleAndDescriptionsKeywordsMeta`, `NoTooManyStrongTags` and `NoMoreThanOneH1Tag`

```js
const SeoInspector = require('seo-inspector')

new SeoInspector({ done:
                    (err, data) => {
                        if (err) throw err;
                    }
                })
.read('source/target.html')
.addRule('ImgTagWithAltAttritube')
.addRule('NoTooManyStrongTags')
.write('destination/report.txt');
```




