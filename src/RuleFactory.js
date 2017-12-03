'use strict';

import ImgTagWithAltAttritubeRule from './rules/ImgTagWithAltAttritubeRule';
import ATagWithRelAttritubeRule from './rules/ATagWithRelAttritubeRule';
import HeadTagWithTitleAndDescriptionsKeywordsMetaRule from './rules/HeadTagWithTitleAndDescriptionsKeywordsMetaRule';
import NoTooManyStrongTagsRule from './rules/NoTooManyStrongTagsRule';
import NoMoreThanOneH1TagRule from './rules/NoMoreThanOneH1TagRule';

class RuleFactory {

    constructor() {
	this.rules = {
	    'ImgTagWithAltAttritube': { options: { enabled: 1 } },
	    'ATagWithRelAttritube': { options: { enabled: 1 } },
	    'HeadTagWithTitleAndDescriptionsKeywordsMeta': { options: { enabled: 1 } },
	    'NoTooManyStrongTags': { options: { enabled: 1, threshold: 15 } },
	    'NoMoreThanOneH1Tag': { options: { enabled: 1 } }
	};
    }

    create(name, options, done) {
        switch(name) {
            case 'ImgTagWithAltAttritube':
                return new ImgTagWithAltAttritubeRule(options);
            case 'ATagWithRelAttritube':
                return new ATagWithRelAttritubeRule(options);
            case 'HeadTagWithTitleAndDescriptionsKeywordsMeta':
                return new HeadTagWithTitleAndDescriptionsKeywordsMetaRule(options);
            case 'NoTooManyStrongTags': 
                return new NoTooManyStrongTagsRule(options);
            case 'NoMoreThanOneH1Tag':
                return new NoMoreThanOneH1TagRule(options);
            default:
                return done(new Error('Failed to init rule object due to invalid rule name.'));
        }
    }

    getDefaultRules() {
        return this.rules;
    }

}

export default RuleFactory;
