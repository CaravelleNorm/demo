// Credit:
// https://github.com/papnkukn/subsrt/blob/master/lib/format/ssa.js

'use strict';

var FORMAT_NAME = "ssa";

var ssaHelper = {
  toSeconds: function(s) {
    var match = /^\s*(\d+:)?(\d{1,2}):(\d{1,2})([.,](\d{1,3}))?\s*$/.exec(s);
    var hh = match[1] ? parseInt(match[1].replace(":", "")) : 0;
    var mm = parseInt(match[2]);
    var ss = parseInt(match[3]);
    var ff = match[5] ? parseInt(match[5]) : 0;
    var ms = hh * 3600 * 1000 + mm * 60 * 1000 + ss * 1000 + ff * 10;
    // var totalSeconds = (hh * 60 * 60) + (mm * 60) + (ss) + (ff / 1000);
    return ms;
  },
};

/******************************************************************************************
 * Parses captions in SubStation Alpha format (.ssa)
 ******************************************************************************************/
function parse(content, options) {
  var meta;
  var columns = null;
  var captions = [ ];
  var eol = options.eol || "\r\n";
  var parts = content.split(/\r?\n\s*\r?\n/);
  for (var i = 0; i < parts.length; i++) {
    var regex = /^\s*\[([^\]]+)\]\r?\n([\s\S]*)(\r?\n)*$/gi;
    var match = regex.exec(parts[i]);
    if (match) {
      var tag = match[1];
      var lines = match[2].split(/\r?\n/);
      for (var l = 0; l < lines.length; l++) {
        var line = lines[l];
        if (/^\s*;/.test(line)) {
          continue; //Skip comment
        }
        var m = /^\s*([^:]+):\s*(.*)(\r?\n)?$/.exec(line);
        if (m) {
          if (tag == "Script Info") {
            if (!meta) {
              meta = { };
              meta.type = "meta";
              meta.data = { };
              captions.push(meta);
            }
            var name = m[1].trim();
            var value = m[2].trim();
            meta.data[name] = value;
            continue;
          }
          if (tag == "V4 Styles" || tag == "V4+ Styles") {
            var name = m[1].trim();
            var value = m[2].trim();
            if (name == "Format") {
              columns = value.split(/\s*,\s*/g);
              continue;
            }
            if (name == "Style") {
              var values = value.split(/\s*,\s*/g);
              var caption = { };
              caption.type = "style";
              caption.data = { };
              for (var c = 0; c < columns.length && c < values.length; c++) {
                caption.data[columns[c]] = values[c];
              }
              captions.push(caption);
              continue;
            }
          }
          if (tag == "Events") {
            var name = m[1].trim();
            var value = m[2].trim();
            if (name == "Format") {
              columns = value.split(/\s*,\s*/g);
              continue;
            }
            if (name == "Dialogue") {
              var values = value.split(/\s*,\s*/g);
              var caption = { };
              caption.type = "caption";
              caption.data = { };
              for (var c = 0; c < columns.length && c < values.length; c++) {
                caption.data[columns[c]] = values[c];
              }
              caption.start = ssaHelper.toSeconds(caption.data["Start"]);
              caption.end = ssaHelper.toSeconds(caption.data["End"]);
              caption.subtitleStyle = caption.data["Style"];   // added NWP
              caption.duration = caption.end - caption.start;
              caption.content = caption.data["Text"];

              //Work-around for missing text (when the text contains ',' char)
              function getPosition(s, search, index) {
                return s.split(search, index).join(search).length;
              }
              var indexOfText = getPosition(value, ',', columns.length - 1) + 1;
              caption.content = value.substr(indexOfText);
              caption.data["Text"] = caption.content;

              caption.text = caption.content
                .replace(/\\N/g, eol) //"\N" for new line
                .replace(/\{[^\}]+\}/g, ""); //{\pos(400,570)}
              captions.push(caption);
              continue;
            }
          }
        }
      }
    }

    if (options.verbose) {
      console.log("WARN: Unknown part", parts[i]);
    }
  }
  return captions;
};

