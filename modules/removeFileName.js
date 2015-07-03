module.exports = function (filepath) {

  var os = require('os');
  var platform = os.platform();
  var separator = "/";

  if(platform == "win32" || platform == "win64") {
    separator = "\\";
  }

  return filepath.substring(0,filepath.lastIndexOf(separator));

}
