'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var R = require('ramda');
var computeControlPoints = require('./computeControlPoints.js');
var transpose = require('./transpose.js');

var controlPointsToLists = function controlPointsToLists(controlPoints) {
	return R.flatten(transpose([controlPoints.p1, controlPoints.p2]));
};

var combinePoints = module.exports.combinePoints = function combinePoints(_points, _controlPoints) {
	var points = [].concat(_toConsumableArray(_points));
	var controlPoints = [].concat(_toConsumableArray(_controlPoints));
	var results = [];
	while (true) {
		results = [].concat(_toConsumableArray(results), _toConsumableArray(R.take(1, points)), _toConsumableArray(R.take(2, controlPoints)));
		points = R.drop(1, points);
		controlPoints = R.drop(2, controlPoints);
		if (controlPoints.length === 0) {
			break;
		}
	}
	return [].concat(_toConsumableArray(results), _toConsumableArray(R.take(1, points)));
};

var getSegments = module.exports.getSegments = function getSegments(bezierPoints) {
	var numSegments = (bezierPoints.length - 1) / 3;
	return R.range(0, numSegments).map(function (i) {
		var fromIndex = i * 3;
		var toIndex = fromIndex + 4;
		return R.slice(fromIndex, toIndex, bezierPoints);
	});
};

var getControlPoints = module.exports.getControlPoints = R.pipe(transpose, R.map(computeControlPoints), R.map(controlPointsToLists), transpose);