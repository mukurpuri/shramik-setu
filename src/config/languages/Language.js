import LanguageJson from './language.json';
import _ from 'lodash';
const Language = {
    get: function(key1, key2, language) {
        let langObj = _.find(LanguageJson, lang => {
            return lang.language === language
        });
        return langObj[key1][key2];
    }
}
export default Language;
