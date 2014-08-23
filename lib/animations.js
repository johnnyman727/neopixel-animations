var toHex = require('colornames');
var debug = false;

function hexColorExtractor(colorstring) {
  return parseInt(toHex(colorstring).slice(1), 16);
}

module.exports.progressBar = function(numLEDs, color, progress) {
  if (debug) console.log(numLEDs, color, progress);
  if (!color || numLEDs === undefined || progress === undefined) {
    throw new Error("Invalid Usage. Needs hexColor, numLEDs, progress")
  }

  var hexColor = hexColorExtractor(color);

  if (!hexColor) {
    throw new Error()
  }

  var last = Math.floor(numLEDs * progress * 3),
      buffer = new Buffer(numLEDs * 3);

  buffer.fill(0);

  for (var i = 0; i < last; i+= 3) {
    buffer[i] = (hexColor & 0x00FF00) >> 8;
    buffer[i + 1] = (hexColor & 0xFF0000) >> 16;
    buffer[i + 2] = hexColor & 0x0000FF;
  }

  return buffer;
}