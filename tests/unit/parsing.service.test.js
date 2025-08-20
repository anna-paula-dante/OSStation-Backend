const { parseAndGroupData } = require('../../src/services/parsing.service');

describe('Parsing Service', () => {
    it('should correctly parse and group data from a buffer', () => {
        const input = `0000000075                                  Bobbie Batz00000007980000000002     1578.5720211116\n0000000049                               Ken Wintheiser00000005230000000003      586.7420210903`
        const buffer = Buffer.from(input);
        const result = parseAndGroupData(buffer);
        expect(result).toHaveLength(2);
        expect(result[0].user_id).toBe(75);
        expect(result[0].orders[0].order_id).toBe(798);
        expect(result[0].orders[0].products).toHaveLength(1);
        expect(result[0].orders[0].total).toBe("1578.57");
    });
});