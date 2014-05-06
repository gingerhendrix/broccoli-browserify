var Transform = require('broccoli-transform');
var RSVP = require('rsvp');
var browserify = require('browserify')
var mkdirp = require('mkdirp')
var fs = require('fs')
var path = require('path')

function BrowserifyFilter(inputTree, options) {
  if (!(this instanceof BrowserifyFilter)) {
    return new BrowserifyFilter(inputTree, options);
  }

  this.inputTree = inputTree;
  this.options = options || {};
}

BrowserifyFilter.prototype = Object.create(Transform.prototype);
BrowserifyFilter.prototype.constructor = BrowserifyFilter;

BrowserifyFilter.prototype.transform = function (srcDir, destDir) {
  var options = this.options;
  var browserify_options = options.browserify || {};
  var bundle_options = options.bundle || {};

  mkdirp.sync(path.join(destDir, path.dirname(options.outputFile)))

  browserify_options.basedir = srcDir;
  var b = browserify(browserify_options);

  for (var i = 0; i < options.entries.length; i++) {
    b.add(options.entries[i]);
  }

  return new RSVP.Promise(function (resolve, reject) {
    b.bundle(bundle_options, function (err, data) {
      if (err) {
        return reject(err);
      }
      fs.writeFileSync(path.join(destDir, options.outputFile), data)

      resolve(destDir);
    });
  }.bind(this));
};

module.exports = BrowserifyFilter;
