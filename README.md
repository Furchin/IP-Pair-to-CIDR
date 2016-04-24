# Merge-CIDRs
Given a pair of CIDRs (in either string format `"127.0.0.1/32"` or as `ip.cidrSubnet` objects), return an `ip.cidrSubnet` structure representing the smallest CIDR which encompasses both of the original CIDR blocks.

Install with:

    npm install merge-cidrs

## Usage
```js
var mergeCidrs = require('merge-cidrs');

// Using strings (in this example two adjacent /32 CIDR blocks representing the individual IP address)
var subnet = mergeCidrs('127.0.0.1/32', '127.0.0.2/32');
console.log('Merged CIDR: ' + subnet.networkAddress + '/' + subnet.subnetMaskLength);

// If you already have ip.cidrSubnets you can use those too. (In this example a /32 and an overlapping /30 CIDR block.)
var subnetA = ip.cidrSubnet('127.0.0.1/32');
var subnetB = ip.cidrSubnet('127.0.0.2/30');
var merged = mergeCidrs(subnetA, subnetB);
console.log('Merged CIDR: ' + merged.networkAddress + '/' + merged.subnetMaskLength);
```
