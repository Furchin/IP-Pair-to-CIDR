'use strict';
var ip = require('ip');
var _ = require('underscore');

module.exports = function merge(a, b) {
    // If we were passed strings, convert to a proper cidr subnet
    if (_.isString(a)) {
        a = ip.cidrSubnet(a);
    }
    if (_.isString(b)) {
        b = ip.cidrSubnet(b);
    }

    var first = Math.min(ip.toLong(a.networkAddress), ip.toLong(b.networkAddress));

    var last = Math.max(ip.toLong(a.broadcastAddress), ip.toLong(b.broadcastAddress));

    var xor = first ^ last;
    // Count the number of leading zeros. This will be the 32 - number of non-zero trailing bits.
    var nonZeroTrailingBits = 0;
    while (xor != 0) {
        xor = xor >>> 1;
        nonZeroTrailingBits++;
    }
    var bits = 32 - nonZeroTrailingBits;


    return ip.cidrSubnet(ip.fromLong(first) + '/' + bits);
};
