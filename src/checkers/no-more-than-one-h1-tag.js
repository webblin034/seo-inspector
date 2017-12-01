"use strict";

module.exports = {
    check(dom, options) {
        if (options.enabled == 0) {
            return;
        }
        let report = '';
        const elements = dom.window.document.querySelectorAll("h1");
        if (elements && elements.length > 1) {
            report += 'This HTML have more than one <h1> tag';
        }
        return report;
    }
};
