'use strict';
module.exports = {
    getPriceChange(v1, v2) {
        return {
            val: "$" + Math.abs((v1 - v2).toFixed(2)),
            percent: ((v1 - v2) / v2).toFixed(2) + "%"
        }
    }
};












