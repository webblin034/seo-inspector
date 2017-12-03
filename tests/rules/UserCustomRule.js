'use strict';

import BaseRule from '../rules/BaseRule';

class UserCustomRule extends BaseRule {

    check(dom) {
        if (this.options.enabled === 0) {
            return;
        }
        let report = 'User custom rule violated';
        return report;
    }

}

export default UserCustomRule;
