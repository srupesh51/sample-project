'use strict';

const _ = require('underscore');
const responseCodes = require('./../utils/response-codes');


function LattisError(message, code, name='LattisError') {
    this.name = name;
    this.message = message || 'Default Message';
    this.code = code;
    this.stack = (new Error()).stack;
}

LattisError.prototype = Object.create(Error.prototype);
LattisError.prototype.constructor = LattisError;

module.exports = {
    missingParameter: function(formatForWire) {
        const error = new LattisError(
            'There are one or more parameters missing in the supplied request',
            responseCodes.BadRequest,
            'MissingParameter'
        );
        return formatForWire ? this.formatErrorForWire(error) : error;
    },
	noError: function() {
        return null;
    },
	formatErrorForWire: function(lattisError) {
        return _.omit(lattisError, 'stack');
    }
}
	