const chai = require('chai');
const _ = require('lodash');

module.exports = chaiHr;

// human natural language to chai test
function chaiHr(str) {
    return (obj) => {
        var words = str.split(/\s+/),
            ref,
            key,
            i = 1,
            l = words.length;

        if (words[ 0 ] !== 'expect')
            throw new Error('test should start with expect word')

        ref = expect(obj)

        for (; i < l; i++) {
            key = words[ i ];
            if (typeof ref === 'function') {
                ref = ref(key)
            }
            else if (ref) {
                if (typeof ref[ key ] === 'function') {
                    ref = _.bind(ref[ key ], ref)
                }
                else {
                    ref = ref[ key ]
                }
            }
        }
        return obj;
    }
}


