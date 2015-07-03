'use strict';

exports.parse = function (file,to,callback) {

  var path = require('path');
  var fs = require('fs');
  var fstream = require('fstream');
  var unzip = require('unzip2');
  var process = require('process');
  var path = require('path');
  var epub = require(__dirname + '/epubparser.js');
  var getFileName = require(__dirname + '/getFileName.js');



  if (!fs.existsSync(file)) {
    return false;
  }

  var name = getFileName(file);
  if (name.substring(name.lastIndexOf(".") + 1)!="epub") {
    return false;
  }

  if(to !="zg" && to !="uni") {
    return false;
  }
  else {


    var tmp_epub = path.resolve(process.cwd(), './temp_epub');

    //copy file for ibook


    var mkdirp = require('mkdirp');
    mkdirp(tmp_epub, function(err) {
      if(err) {
        console.log(err);
      }

      var readStream = fs.createReadStream(file);
      var writeStream = fstream.Writer(tmp_epub);

      readStream
        .pipe(unzip.Parse())
        .pipe(writeStream)

      writeStream.on('close', function(){

        
        epub.getFileList(tmp_epub,to,function(flist,folder){
          for(var k=0;k<flist.length;k++) {

            var file = flist[k];

            var source_file = path.resolve(folder, file);

            var ext = file.substring(file.lastIndexOf(".") + 1);
            if(ext == "html" || ext == "xhtml" || ext == "ncx") {
              epub.convert(source_file,to);
            }

          }
          epub.changeCSS(tmp_epub,to,function() {

            var ibookPath = path.resolve(tmp_epub,'./META-INF/com.apple.ibooks.display-options.xml');
            var sourceiBookPath = path.resolve(__dirname,'./xml/com.apple.ibooks.display-options.xml');
            fs.createReadStream(sourceiBookPath).pipe(fs.createWriteStream(ibookPath));



              callback();//done
          });


        });
      });

    });



  }
}
