'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var R = require('ramda');

module.exports = function transpose(lists) {
	var len = Math.min.apply(Math, _toConsumableArray(lists.map(R.prop('length'))));
	return R.range(0, len).reduce(function (acc, i) {
		return [].concat(_toConsumableArray(acc), [lists.map(R.nth(i))]);
	}, []);
};