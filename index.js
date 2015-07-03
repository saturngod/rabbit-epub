#! /usr/bin/env node

var args = require('cli-args')(process.argv.slice(2));
var path = require('path');
var converter = require(path.resolve(__dirname,"./modules/converter.js"));

if(args.hasOwnProperty('h')) {
  showhelp();
}
else if(args.hasOwnProperty('i')) {
  if(args.hasOwnProperty('t')) {
    if(args.t == "zg" || args.t == "uni") {
      converter.parse(args.i,args.t,function() {
        var zipit = require(path.resolve(__dirname,"./modules/zipit.js"));
        zipit(args.i,function(err) {
          if(err) {
            console.log('Sorry, cannot make epub file');
          }
          else {
            console.log('Done');

          }
        });

      });
    }
    else {
      showhelp();
    }
  }
  else {
    showhelp();
  }
}
else {
  showhelp();
}

function showhelp() {
  var command = "\nrabbit-epub -i file.epub -t [uni|zg]\n\n"
  command +="-i filename\tinput epub file\n";
  command +="-t uni\tto convert unicode from zawgyi\n";
  command +="-t zg\tto convert zg from unicode\n";
  console.log(command);
}
