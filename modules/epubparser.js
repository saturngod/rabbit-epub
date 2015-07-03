exports.getFileList = function(folderPath,to,callback,folder) {

  var fs = require('fs'),
  xml2js = require('xml2js'),
  path = require('path');

  var parser = new xml2js.Parser();
  var files = [];
  var container =  path.resolve(folderPath, 'META-INF/container.xml');
  var that = this;
  fs.readFile(container, function(err, data) {

    parser.parseString(data, function (err, result) {
      var root = result.container.rootfiles[0].rootfile[0].$;
      var fullpath = root["full-path"];

      var fullpath =  path.resolve(folderPath, fullpath);
      
      
      fs.readFile(fullpath, function(err, data) {
        parser.parseString(data, function (err, result) {
          var mainfest = result.package.manifest[0].item;
          for (var i = 0; i < mainfest.length; i++) {
            var itemLink = mainfest[i].$.href;
            files.push(itemLink);
          }

          var removeFileName = require(path.resolve(__dirname,"./removeFileName.js"));
          //convert title and meta
          that.convert(fullpath,to);
          
          callback(files,removeFileName(fullpath));

        });
      });

    });
  });

}

exports.convert = function (file,to) {

  var fs = require('fs'),
    rabbit = require(__dirname + '/rabbit.js');



  var string = fs.readFileSync(file,'utf8');

  var newContent = "";
  if (to=="zg") {
    newContent = rabbit.uni2zg(string);
  }
  else if (to == "uni") {
    newContent = rabbit.zg2uni(string);
  }

  fs.writeFileSync(file,newContent,'utf8');

}

exports.changeCSS = function (folder,to,callback) {

  var path = require('path');
  var mmfontfile = path.resolve(__dirname , "./font/mmrCensus.v5.minbe5.ttf");
  var fs = require('fs');
  var removeFileName = require(path.resolve(__dirname,"./removeFileName.js"));

  var copyfile = "";
  var fontfile = "";
  var fontfamily = "";
  if(to == "uni") {
    fontfile = "'./mmrCensus.v5.minbe5.ttf'";
    fontfamily = "'Myanmar Census'";
    copyfile = "mmrCensus.v5.minbe5.ttf";
  }
  else if(to == "zg") {
    fontfile = "'./zawgyi.ttf'";
    fontfamily = "'Zawgyi-One'";
    copyfile = "zawgyi.ttf";
  }
  else {
    return;
  }
  var appendCSS = "@font-face {\n";
  appendCSS += "font-family:"+fontfamily+";\n";
  appendCSS += "src : url("+fontfile+");\n"
  appendCSS += "}\n";

  appendCSS += "body, div, dl, dt, dd, h1, h2, h3, h4, h5, h6, p, pre, blockquote,table,tr,td,span,div,li,ul,b,i,u,strong { font-family:"+fontfamily+" !important }\n";

  var fontfamily = "";
  if(to=="zg") {
    fontfamily = "Zawgyi-One";
  }
  else if (to == "uni"){
    fontfamily = "Myanmar Census"
  }
  else {
    return;
  }

  var getCss = require(path.resolve(__dirname,"./getCSS.js"));
  var cssFiles = getCss(folder);

  for(var i=0 ; i < cssFiles.length ; i++) {
    var fullpath = cssFiles[i];


    var folder = removeFileName(fullpath);

    var fontfile =  path.resolve(folder, copyfile);
    if (!fs.existsSync(fontfile)) {
      //copy file
      fs.createReadStream(mmfontfile).pipe(fs.createWriteStream(fontfile));
    }

    //read and append it
    var data = fs.readFileSync(fullpath,'utf8');
    data += appendCSS;
    fs.writeFileSync(fullpath,data,'utf8');
  }
  callback();

}
