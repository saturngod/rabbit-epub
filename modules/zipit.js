module.exports = function (file,callback) {

  var zipFolder = require('zip-folder');
  var path = require('path');
  var process = require('process');
  var getfilename = require(path.resolve(__dirname,"./getFileName.js"));

  var fromFolder = path.resolve(process.cwd(), './temp_epub');

  var newname  = getfilename(file);
  newname = "New_" + newname;
  var toFolder = path.resolve(process.cwd(), newname);

  zipFolder(fromFolder, toFolder, function(err) {

    if(!err) {
      var rimraf = require('rimraf');
      //need to remove comment
      rimraf(fromFolder,function() {
        callback(err);
      })
    }
    else {
      callback(err);
    }

});

}
