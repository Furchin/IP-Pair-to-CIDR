var mergecidrs = require('../lib/index.js');
var ip = require('ip');
describe('merge-cidrs', function() {
    describe('using strings as CIDR identifiers', function() {
        it('merges two adjacent /32 CIDR blocks together', function() {
            var subnet = mergecidrs('127.0.0.1/32', '127.0.0.2/32');
            expect(subnet.subnetMaskLength).toBe(30);
            expect(subnet.networkAddress).toBe('127.0.0.0');
        });

        it('merges two completely unrelated /32 CIDR blocks, resulting in 0.0.0.0/0 as the only CIDR containing both', function() {
            var subnet = mergecidrs('128.0.0.1/32', '127.0.0.2/32');
            expect(subnet.subnetMaskLength).toBe(0);
            expect(subnet.networkAddress).toBe('0.0.0.0');
        });

        it('merges a /30 block and a /32 block contained within the /30 block correctly', function() {
            var subnet = mergecidrs('127.0.0.1/32', '127.0.0.2/30');
            expect(subnet.subnetMaskLength).toBe(30);
            expect(subnet.networkAddress).toBe('127.0.0.0');
        });

        it('merges two /26 blocks into a single /24 block', function() {
            // TODO
        });

        it('merges two /24 blocks into a /16 block', function() {
            // TODO
        });
    });

    describe('using ip.cidrSubnet as CIDR identifiers', function() {
        it('merges two adjacent /32 CIDR blocks together', function() {
            var subnet = mergecidrs(ip.cidrSubnet('127.0.0.1/32'), ip.cidrSubnet('127.0.0.2/32'));
            expect(subnet.subnetMaskLength).toBe(30);
            expect(subnet.networkAddress).toBe('127.0.0.0');
        });

        it('merges two completely unrelated /32 CIDR blocks, resulting in 0.0.0.0/0 as the only CIDR containing both', function() {
            var subnet = mergecidrs(ip.cidrSubnet('128.0.0.1/32'), ip.cidrSubnet('127.0.0.2/32'));
            expect(subnet.subnetMaskLength).toBe(0);
            expect(subnet.networkAddress).toBe('0.0.0.0');
        });

        it('merges a /30 block and a /32 block contained within the /30 block correctly', function() {
            var subnet = mergecidrs(ip.cidrSubnet('127.0.0.1/32'), ip.cidrSubnet('127.0.0.2/30'));
            expect(subnet.subnetMaskLength).toBe(30);
            expect(subnet.networkAddress).toBe('127.0.0.0');
        });

        it('merges two /26 blocks into a single /24 block', function() {
            // TODO
        });

        it('merges two /24 blocks into a /16 block', function() {
            // TODO
        });
    });
});
