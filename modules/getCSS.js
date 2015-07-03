module.exports = function (dir) {

  return walkSync(dir,[]);

}

function walkSync (dir, filelist) {

  if( dir[dir.length-1] != '/') dir=dir.concat('/')

  var fs = fs || require('fs'),
      files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {

    if (fs.statSync(dir + file).isDirectory()) {
      filelist = walkSync(dir + file + '/', filelist);
    }
    else {
      var ext = file.substring(file.lastIndexOf(".")+1);
      if(ext.toLowerCase() == "css") {
        filelist.push(dir+file);
      }

    }
  });
  return filelist;
};
