"use strict";

module.exports = {
    check(dom, options) {
        if (options.enabled == 0) {
            return;
        }
        let report = '';
        const elements = dom.window.document.querySelectorAll("strong");
        if (elements && elements.length > options.threshold) {
            report += 'This HTML have more than ' + options.threshold + ' <strong> tags';
        }
        return report;
    }
};
