// Credit:
// https://gist.github.com/korny/c31e1017b2e23c2f4042#file-srt-parser-js

function srtTimeToSeconds(time) {
  var match = time.match(/(\d\d):(\d\d):(\d\d),(\d\d\d)/);
  var hours        = +match[1],
      minutes      = +match[2],
      seconds      = +match[3],
      milliseconds = +match[4];

  return ((((hours * 3600) + (minutes * 60) + (seconds)) * 1000) + milliseconds);
}

function parseSrtLine(line) {

  var match = line.match(/(\d\d:\d\d:\d\d,)(\d+) --> (\d\d:\d\d:\d\d,)(\d+)\n([\S\s]*)/m);
  // console.log("parseSrtLine match 1 ", match);

  if (!match) {
    match = line.match(/(\d\d:\d\d:\d\d,)(\d+) --> (\d\d:\d\d:\d\d,)(\d+)/m);  // empty subtitle
    if (!match) {
		errorMsg = 'parseSrtLine Failure at .srt file line: ' + line;
		alert(errorMsg);
		throw new Error(errorMsg);
	}
    match[5] = "";
  }

  // console.log("parseSrtLine match 2 ", match);

  match[2] = match[2].padEnd(3,"0");
  match[4] = match[4].padEnd(3,"0");

  // var tempText1 = match[5].trim();
  // let tempText2 = tempText1.replace(/\s/gm, ' ');
	// tempText2 = tempText2.replace(/\s/gm, ' ');
	// let tempText3 = tempText2.replace(/[\r\n]+/gm, "");

  return {
    start: srtTimeToSeconds(match[1] + match[2]),
    end:   srtTimeToSeconds(match[3] + match[4]),
    subtitleStyle: '',
    text:  match[5].replaceAll('\n', '<br>').trim() // tempText3 // match[3].trim()
  };
}

function parseSrt(srt) {

  var lines = [];

  (srt.replaceAll('\r', '').split(/(?:^|\n\n)\d+\n|\n+$/g)).forEach(function(content) {
    // console.log("parseSrt content ", content);
    if (content != "") {
      lines.push(content.trim());
    }
	});

  // console.log("parseSrt lines ", lines);

	return lines.map(parseSrtLine);

}

/* ChatGPT
In your JavaScript code, $.map() is a jQuery utility function used to transform a list of items (like an array) by applying a function to each item.

Meaning of $.map(lines, parseSrtLine);
lines is an array of SRT subtitle blocks.

parseSrtLine is a function that takes one subtitle block and returns a structured object with start, end, and text fields.

$.map() applies parseSrtLine to each item in lines, and returns a new array of the results.

How $.map() differs from native Array.prototype.map()
$.map() is part of jQuery, and while it behaves similarly to native .map(), there are two differences:

Falsy values (like null or undefined) are skipped in $.map() results. In native .map(), they would be included as-is.

$.map() flattens arrays by one level if the callback returns an array, while native .map() would return an array of arrays.

In Your Code
function parseSrt(srt) {
  var lines = srt.split(/(?:^|\n\n)\d+\n|\n+$/g).slice(1, -2);
  return $.map(lines, parseSrtLine);
}

This means:
It breaks the SRT file into chunks (skipping numbering and empty lines).
It then maps each chunk to a parsed subtitle object using parseSrtLine.
Returns an array of those parsed subtitle objects.

Note
If you're not using jQuery in the rest of your code, consider using native .map() instead:
  return lines.map(parseSrtLine);
This is cleaner and doesn't require jQuery.

*/