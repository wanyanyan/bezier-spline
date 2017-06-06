"use strict";

// based on http://www.particleincell.com/2012/bezier-splines/

/* eslint no-plusplus: 0 */
/* eslint no-mixed-operators: 0 */
/* eslint operator-assignment: 0 */

/* computes control points given knots K, this is the brain of the operation */
module.exports = function computeControlPoints(K) {
	var p1 = [];
	var p2 = [];
	var n = K.length - 1;

	/* rhs vector */
	var a = [];
	var b = [];
	var c = [];
	var r = [];

	/* left most segment */
	a[0] = 0;
	b[0] = 2;
	c[0] = 1;
	r[0] = K[0] + 2 * K[1];

	/* internal segments */
	for (var i = 1; i < n - 1; i++) {
		a[i] = 1;
		b[i] = 4;
		c[i] = 1;
		r[i] = 4 * K[i] + 2 * K[i + 1];
	}

	/* right segment */
	a[n - 1] = 2;
	b[n - 1] = 7;
	c[n - 1] = 0;
	r[n - 1] = 8 * K[n - 1] + K[n];

	/* solves Ax=b with the Thomas algorithm (from Wikipedia) */
	for (var _i = 1; _i < n; _i++) {
		var m = a[_i] / b[_i - 1];
		b[_i] = b[_i] - m * c[_i - 1];
		r[_i] = r[_i] - m * r[_i - 1];
	}

	p1[n - 1] = r[n - 1] / b[n - 1];
	for (var _i2 = n - 2; _i2 >= 0; --_i2) {
		p1[_i2] = (r[_i2] - c[_i2] * p1[_i2 + 1]) / b[_i2];
	}

	/* we have p1, now compute p2 */
	for (var _i3 = 0; _i3 < n - 1; _i3++) {
		p2[_i3] = 2 * K[_i3 + 1] - p1[_i3 + 1];
	}

	p2[n - 1] = 0.5 * (K[n] + p1[n - 1]);

	return { p1: p1, p2: p2 };
};