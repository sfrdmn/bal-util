// Generated by CoffeeScript 1.3.3
(function() {
  var balUtil, balUtilCompare, balUtilEvents, balUtilFlow, balUtilHTML, balUtilModules, balUtilPaths, balUtilTypes, key, subpackage, subpackages, value, _i, _len,
    __hasProp = {}.hasOwnProperty;

  balUtil = {};

  balUtilCompare = require(__dirname + '/compare');

  balUtilEvents = require(__dirname + '/events');

  balUtilFlow = require(__dirname + '/flow');

  balUtilHTML = require(__dirname + '/html');

  balUtilModules = require(__dirname + '/modules');

  balUtilPaths = require(__dirname + '/paths');

  balUtilTypes = require(__dirname + '/types');

  subpackages = [balUtilCompare, balUtilEvents, balUtilFlow, balUtilHTML, balUtilModules, balUtilPaths, balUtilTypes];

  for (_i = 0, _len = subpackages.length; _i < _len; _i++) {
    subpackage = subpackages[_i];
    for (key in subpackage) {
      if (!__hasProp.call(subpackage, key)) continue;
      value = subpackage[key];
      balUtil[key] = value;
    }
  }

  module.exports = balUtil;

}).call(this);
