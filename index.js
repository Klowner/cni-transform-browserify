var browserify = require('browserify'),
	through2 = require('through2'),
	path = require('path'),
	extend = require('util')._extend;

module.exports = function browserifyTransform (browserifyOptions) {
	var options = extend({}, browserifyOptions);

	return through2.obj(function (file, enc, next) {
		var self = this,
			b = browserify(file, extend({
				basedir: path.dirname(file.path)
			}, browserifyOptions));

		b.bundle(function (err, buffer) {
			file.contents = buffer;
			self.push(file);
			next();
		});
	});
};
