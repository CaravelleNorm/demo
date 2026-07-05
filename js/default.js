"use strict"
let verbose = false;  // Enable/disable verbose tracing
window.onerror = function (msg, url, lineNo, columnNo, error) {
    // Log the error details
    console.log('Error message:', msg);
    console.log('URL:', url);
    console.log('Line:', lineNo);
    console.log('Column:', columnNo);
    console.log('Error object:', error);

    // Trigger a notification (custom implementation)
    alert('An error occurred: ' + msg);

    return; // true; // Prevents the default browser error handling
};

let notification = document.getElementById("notification");
let notificationX = document.getElementById("notificationX");
let notificationDiv1 = document.getElementById("notificationDiv1");
let notificationDiv2 = document.getElementById("notificationDiv2");
let notificationDiv3 = document.getElementById("notificationDiv3");
notificationX.addEventListener('click', (e) => {
	notification.style.display = 'none';
});
dragElement(notification);

let fileNotification = document.getElementById("fileNotification");
let fileNotificationDiv1 = document.getElementById("fileNotificationDiv1");
let fileNotificationDiv2 = document.getElementById("fileNotificationDiv2");
let fileNotificationDiv3 = document.getElementById("fileNotificationDiv3");
dragElement(fileNotification);


document.addEventListener('keydown', PSDPD_KeyCheck);

const tbodyFragmentChunkSize = 100;
const yieldToMain = () => {
  return window.scheduler?.yield 
    ? window.scheduler.yield() 
    : new Promise(resolve => setTimeout(resolve, 0));
};

let userAgentString;
let chromeAgent;
let IExplorerAgent;
let firefoxAgent;
let safariAgent;
let operaAgent;
let fileAPIPickersSupported = false;
let OPFSAvailable = false;

 

let videoFileLoaded = false;

let subtitleFileInput0;
let subtitleFileInput1;
let subtitleFileInput2;
let rangeCount;
let rangeButtonRangeCount;
let videoArea;
let playVideoButton;
let currentLineButton;
let loopButton;
let currentLineOnDashboardButton;
let playVideoOnDashboardButton;
let loopOnDashboardButton;
let duration;
let durationOnDashboard;
let textEditPopupPlaySingleButton;
let splitLineControl;
let timeEditPopupTrackInfo;
let spanStartTime;
let spanEndTime;
let spanTrack;
let spanStartTimeOnDashboard;
let spanEndTimeOnDashboard;
let spanTrackOnDashboard;
let STSpan1;
let STSpan2;
let currentTime;
let currentTimeOnDashboard;
let seekBar;
let color1Input;
let color2Input;
let color3Input;
let seekBarContainer; 
let marginLine1; 
let divSubtitle1; 
let marginLine2; 
let divSubtitle2; 
let videoCounterDiv; 
let selectionInfoDiv; 
let buttonSection; 
let subtitleTableDiv0;
let EOT;
let subtitleWidthMenu;
let wrapper;
let videoSizeMenu;
let fontListFileInput ;
let subtitleFontMenu;
let subtitleFontSizeMenu;
let subtitleFontMenu2;
let subtitleFontSizeMenu2;
let subtitleAlignmentMenu;
let selectSpacebar;
let selectScroll;
let selectScrollStep;
let marginMenu;
let myCheck01;
let myCheck02;
let myCheck03;
let myCheck04;
let myCheck05;
let myCheck06;
let myCheck07;
let myCheck08;
let myCheck09;
let myCheck10;
let myCheck20;
let dashboard;
let selectedTheme;
let customColorsCheckbox;
let save1File;
let save2Files;
let saveBothTracks;
let selectionLabel;
let selectionHyphen;
let selectionLabelOnDashboard;
let selectionHyphenOnDashboard;
let videoURLButton;
let videoURLInput;
let insertLineWrapper;
let t1timeObject = {};
let t2timeObject = {};

let timeEditPopup;
let timeEditPopupV;
let timeEditPopupO;
let timeEditPopupThumb;
let timeEditPopupWrapper1;
let timeEditPopupWrapper2;
let textEditPopupWrapper;
let audioFileLoaded = false;
let displayVideoControls = false;
let subtitleTable;
let subtitleTableSection;
let videoDuration;
let youTubeVideoId;
let maxVideoWidth;
let player;
let iframeElement;
	
let showButtonSection = true;
let showVideo = true;
let keyListenerForSubtitlesAdded = false;
let keyListenerAdded = false;
let playing = false;				// Flag: If false, the video is not currently playing
let playingContinuously = false;	// Flag: Enable/Disable continuous play until the user stops or the video ends
let looping = false;				// Flag: Enable/Disable playing the currently selected subtitle in a loop
let subsetFirstRow = 0;
let subsetLastRow = 0;
let subsetRange = 1;
let checkTimeEnabled = false;		// Flag: Enable/Disable checking the endtime of a subtitle while it is playing
let callUpdateTimeEnabled = false;
let fileNotificationMsg1 = "";
let fileNotificationMsg2 = "";
let fileNotificationMsg3 = "";
let notificationMsg1 = "";
let notificationMsg2 = "";
let notificationMsg3 = "";

let	numberOfSubtitleTables = 1;
let totalNumberOfSubtitlesRead = 0;
let oldTotalNumberOfSubtitlesRead = 0;
let selectedSubtitleNumber = 0;		// No subtitle is selected until the subtitle file has been loaded.
let selectedSubtitleTableIndex = null;
let selectionStartSeconds = 0;
let selectionEndSeconds = 0;
let subtitleTable1;
let subtitleTable2;

let timeoutId;
let	scrollOption = "uninitialized";
let	scrollStepOption = 0;
let marginOption = 0				// Margin (seconds) added around a subtitle; useful when timing is not accurate
let skipForwardSeconds = 3;
let skipBackwardSeconds = 3;
let showMarginLine1 = false;
let showMarginLine2 = false;
let marginLine1MinHeight = 1;
let marginLine2MinHeight = 1;
let showSubtitleTrack1 = true;
let showSubtitleTrack2 = false;
let STSpan1Modified = false;
let STSpan2Modified = false;
let STSpan1Selected = false;
let STSpan2Selected = false;
let STSpan1RowNumber = 0;
let STSpan1STTableIndex;
let STSpan2RowNumber = 0;
let STSpan2STTableIndex;
let showSeekBarContainer = false;
let showCounter = true;
let showSelectionInfo = true;
let showControlButtons = true;
let showSubtitleTable = false;
const loadFontFileOptionText = 'Load Font List from a File';
let callUpdateTimeTimeoutId;
const checkTimeInterval = 200;
const updateTimeInterval = 1000;
let rectifySubtitleStartEnabled = false;
let timeEditPopupRow = 0;
let timeEditPopupSubtitleTrack = null;
let timeEditPopupTableIndex = null;
let t1timeEditPopupOldTime;
let t1timeEditPopupOldSeconds;
let t2timeEditPopupOldTime;
let t2timeEditPopupOldSeconds;
//let t1timeEditPopupOldTimeOnTwinnedTrack;
//let t1timeEditPopupOldSecondsOnTwinnedTrack;
//let t2timeEditPopupOldTimeOnTwinnedTrack;
//let t2timeEditPopupOldSecondsOnTwinnedTrack;
let errorMsg;
let CaretUtil = { };
let showTimePopup = false;
let customColorsEnabled = false;
let selectedCustomStyle;
let dropDownArrow = "▾";
let selectedThemeNumber;
let themeAttributes;
let copyt1;
let copyt2;
let videoCrop = 1;
let configuration = "1Track1Table";


let themeAttributesArray = [
{
	themeName: "light",
	foregroundColor: "#000000", /* black */
	backgroundColor: "#fdfff5", /* ceramic, milk white */
	highlightBackgroundColor: "#cce5ff" /* Hawkes blue */
},
{
	themeName: "dark",
	foregroundColor: "#ffffff", /* white */
	backgroundColor: "#000000", /* black */
	highlightBackgroundColor: "#768798" /* steel */
},
{
	themeName: "OSDefault",
	foregroundColor: "#000000",  /* black */
	backgroundColor: "#ffffff", /* white */
	highlightBackgroundColor: "#338ef0" /* bleu de France */
},
{
	themeName: "preset 1",
	foregroundColor: "#f5f5f5", /* white  smoke*/
	backgroundColor: "#2e9dc2", /* curious blue */
	highlightBackgroundColor: "#057164" /* greenish cyan */
},
{
	themeName: "preset 2",
	foregroundColor: "#f5f5f5", /* white smoke */
	backgroundColor: "#266a78", /* bluish cyan */
	highlightBackgroundColor: "#153b4c" /* Nile blue */
},
{
	themeName: "preset 3",
	foregroundColor: "#f5f5f5", /* white smoke */
	backgroundColor: "#c25a2e", /* ruddy brown */
	highlightBackgroundColor: "#a0390d" /* russet */
},
{
	themeName: "preset 4",
	foregroundColor: "#0a0a0a", /* ? */
	backgroundColor: "#99caf0", /* ? */
	highlightBackgroundColor: "#5e95b0" /* ? */
},
{
	themeName: "preset 5",
	foregroundColor: "#0a0a0a", /* ? */
	backgroundColor: "#d29e0f", /* ? */
	highlightBackgroundColor: "#5e95b0" /* ? */
},
{
	themeName: "preset 6",
	foregroundColor: "#00050f", /* ? */
	backgroundColor: "#05cdf5", /* ? */
	highlightBackgroundColor: "#a5d0e3" /* ? */
}
];

var helper = {
	toTimeString: function(ms) {
  		var hh = Math.floor(ms / 1000 / 3600);
   		var mm = Math.floor(ms / 1000 / 60 % 60);
   		var ss = Math.floor(ms / 1000 % 60);
		var ff = Math.floor(ms % 1000);
		ff = Math.floor(ff / 10);
   		var time = hh + ":" + (mm < 10 ? "0" : "") + mm + ":" 
			+ (ss < 10 ? "0" : "") + ss + "." 
			+ (ff < 10 ? "0" : "") + ff;
   		return time;
 		}
};

let STTableMetadata = [];
STTableMetadata[0] = {STTableId: "subtitleTable0", STTable: null, tbodyFragment: null, tbodyFragmentCounter: 0,
	trackHeader: null, selectedSubtitleNumber: 0, lastSubtitleNumber: 0, 
	subtitleStartSeconds: [], subtitleEndSeconds: [], subtitleTrack: []
};
STTableMetadata[1] = {STTableId: "subtitleTable1", STTable: null, tbodyFragment: null, tbodyFragmentCounter: 0,
	trackHeader: null, selectedSubtitleNumber: 0, lastSubtitleNumber: 0, 
	subtitleStartSeconds: [], subtitleEndSeconds: [], subtitleTrack: []
};

// sample TrkFileMetadata[x].array[y] member: 
// 	{track: 0; startSeconds: 120, endSeconds: 123, startTime: "0:02.00", endTime: "0:02.03", 
//		subtitleStyle: "File1", subtitle: "Caption text" }
const maxTrackNumber = 2;
let TrkFileMetadata = [];
TrkFileMetadata[0] = {inputId: "subtitleFileInput0", STTableIndex: 0, 
	defaultSubtitleStyle: "", twinnedTrack: 0, loaded: false, array: []};	
TrkFileMetadata[1] = {inputId: "subtitleFileInput1", STTableIndex: 0, 
	defaultSubtitleStyle: "File1", twinnedTrack: 2, loaded: false, array: []};
TrkFileMetadata[2] = {inputId: "subtitleFileInput2", STTableIndex: 0, 
	defaultSubtitleStyle: "File2", twinnedTrack: 1, loaded: false, array: []};

// sample mergeDataArray[x] member: 
// 	{trackIndex: "1", arrayIndex: 0} means TrkFileMetadata[1].array[0]
let mergeDataArray = [];

const undoArraySize = 10;
const redoArraySize = undoArraySize;
const [undoArray, redoArray] = Array.from({ length: 2 }, () => 
    Array.from({ length: undoArraySize }, () => 
	({
		inUse: false,
		changeNumber: 0,
		action: "",
		STTableIndex: null,
		rowNumber: 0,
		selectedRowNumber: 0,
		startTime: "",
		endTime: "",
		subtitleStyle: "",
		oldValue: "",
		newValue: "",
		subtitleTrack: 0,
		subtitleStartSeconds: 0,
		subtitleEndSeconds: 0,
		twinnedTrackObj: {}
	}))
);

let changeCounter = 0;
let undoArrayCurrentIndex = -1;
let redoArrayCurrentIndex = -1;

document.addEventListener("DOMContentLoaded", () => {
	DOMInitializations();
	initCaretUtil();
});

function fileNotify(caller, msg) {

	fileNotificationDiv1.innerHTML = fileNotificationMsg1;
	if (fileNotificationMsg2 != "") {
		fileNotificationDiv2.innerHTML = fileNotificationMsg2;
	}
	if (fileNotificationMsg3 != "") {
		fileNotificationDiv3.innerHTML = fileNotificationMsg3;
	}
	fileNotification.style.display = 'block';
	logTimeStamp("fileNotify ", `${caller} ${msg}`);
	fileNotificationMsg1 = "";
	fileNotificationMsg2 = "";
	fileNotificationMsg3 = "";
}


function notify(caller, msg) {

	notificationDiv1.innerHTML = notificationMsg1;
	if (notificationMsg2 != "") {
		notificationDiv2.innerHTML = notificationMsg2;
	}
	if (notificationMsg3 != "") {
		notificationDiv3.innerHTML = notificationMsg3;
	}
	notification.style.display = 'block';
	logTimeStamp("notify ", `${caller} `);
	notificationMsg1 = "";
	notificationMsg2 = "";
	notificationMsg3 = "";
}

function logTimeStamp(caller, msg) {
	let	timeStamp = new Date();
	console.log(`timeStamp ${caller} ${timeStamp} ${msg} ` + 
		`${notificationMsg1}\n${notificationMsg2}\n${notificationMsg3}`);
}

function throwError(msg) {
	console.log(msg);
	alert(msg);
	throw new Error(msg);
}


function unFocus(){
	// Remove focus from any focused element
	if (document.activeElement) {
   	document.activeElement.blur();
	}
}

function computeSubtitleTableHeight() {

	let viewportWidth = getViewportWidth();
	let viewportHeight = getViewportHeight();
	if (verbose) {
	console.log("computeSubtitleTableHeight Viewport w" + viewportWidth + " h" + viewportHeight);
	}

	let totalHeight = 0;
	let residualHeight = 0;
	let divElemWidth = 0;
	let divElemHeight = 0;

	let divElements = [];

	if (showVideo) {
		divElements = [wrapper];
	}

	if (showSeekBarContainer) {
		divElements = divElements.concat([seekBarContainer]);
	} else {
		seekBarContainer.style.display = "none";
	}

	if (showMarginLine1) {
		divElements = divElements.concat([marginLine1]);
	} else {
		marginLine1.style.display = "none";
	}

	if (showSubtitleTrack1) {
		divElements = divElements.concat([divSubtitle1]);
	} else {
		divSubtitle1.style.display = "none";
	}
	
	if (showMarginLine2) {
		divElements = divElements.concat([marginLine2]);
	} else {
		marginLine2.style.display = "none";
	}
	
	if (showSubtitleTrack2) {
		divElements = divElements.concat([divSubtitle2]);
	} else {
		divSubtitle2.style.display = "none";
	}
	
	if (showCounter) {
		divElements = divElements.concat([videoCounterDiv]);
	} else {
		videoCounterDiv.style.display = "none";
	}

	if (showSelectionInfo) {
		divElements = divElements.concat([selectionInfoDiv]);
	} else {
		selectionInfoDiv.style.display = "none";
	}

	if (showControlButtons) {
		divElements = divElements.concat([buttonSection, marginLine3]);
	} else {
		buttonSection.style.display = "none";
	} 
		
	divElements = divElements.concat([EOT]);	
	
	divElements.forEach(function(divElem) {

		if (divElem === divSubtitle1) {
			divSubtitle2.style.display = "none";
		}
		divElem.style.flexShrink = '0';
		divElem.style.display = 'block';
		divElem.style.height = 'auto';
		divElem.style.overflowY = 'hidden';
		divElemHeight = Math.ceil(divElem.getBoundingClientRect().height);
		divElemWidth = Math.ceil(divElem.getBoundingClientRect().width);
	if (verbose) {
		console.log("computeSubtitleTableHeight ", divElem.id, " w" + divElemWidth + " h" + divElemHeight);
	}
		if ((divElem != divSubtitle1) || (divElem != divSubtitle2)) {
			divElem.style.flexShrink = '1';
		}

		if ((divElem === wrapper) && (videoCrop < 1) && (videoFileLoaded)) {
			divElemHeight = Math.ceil(divElemHeight * videoCrop);
			divElem.style.height = divElemHeight + "px";
		}
 
		let availableHeight = viewportHeight - totalHeight;
		totalHeight += divElemHeight;
		residualHeight = viewportHeight - totalHeight;
	if (verbose) {
		console.log("computeSubtitleTableHeight ", divElem.id, " w" + divElemWidth + " h" + divElemHeight,
			" totalHeight ", totalHeight, 
			" availableHeight ", availableHeight,
			" residualHeight ", residualHeight);
	}
		
		switch(divElem) {
		case wrapper:
			break;
		case divSubtitle1:
		case divSubtitle2:
			if (availableHeight <= 0) {
				divElem.style.display = "none";  
			} else {
				if (residualHeight < 0)	{
					divElem.style.height = availableHeight + "px";
	                divElem.style.overflowY = 'auto';
    	            divElem.style.flexShrink = '1';
				} else {
	                divElem.style.height = 'auto';
	                divElem.style.overflowY = 'hidden';
				}
			}
			break;
		case buttonSection:
			if (residualHeight < 0) {
				divElem.style.display = "none";
			} else {
				divElem.style.display = "flex";
			}
			break;
		default:
			if (residualHeight < 0) {
				divElem.style.display = "none";
			} else {
				divElem.style.display = "block";
			}
			break;
		}
	});

	if (verbose) {
	console.log("computeSubtitleTableHeight totalHeight ", totalHeight, 
		" residualHeight", residualHeight);
	}

	if (timeEditPopup.style.display != "none") {
		showTimeEditPopup(selectedSubtitleTableIndex, selectedSubtitleNumber);
	}

	if (residualHeight < 0){
		subtitleTableDiv0.style.display = "none";
		EOT.style.display = "none";
		return;
	}

	// If the ST table is not shown on the video display, do show the ST table on the audio-only display.
	if (((showVideo) && (showSubtitleTable)) || 
		(!showVideo)) {
		subtitleTableDiv0.style.display = "block";
		subtitleTableDiv0.style.height = residualHeight + "px";
	} else {
		subtitleTableDiv0.style.display = "none";
		EOT.style.display = "none";
	}
	return;

	function getHiddenElementWidthandHeightWithClone(element) {
		const clone = element.cloneNode(true);

		clone.style.visibility = 'hidden';	
		clone.style.position = 'absolute';
		clone.style.display = 'block';

		document.body.appendChild(clone);
		const width = clone.offsetWidth;
		const height = clone.offsetHeight;
		document.body.removeChild(clone);
		return [width, height];
	}
}	// computeSubtitleTableHeight

function getViewportWidth(){

	if (verbose) {
	console.log("getViewportWidth window.innerWidth = ", window.innerWidth);
	console.log("getViewportWidth document.documentElement.clientWidth = ", document.documentElement.clientWidth);
	console.log("getViewportWidth document.body.clientWidth = ", document.body.clientWidth);
	}

	let returnWidth = 0;
	let returnWidthSet = false;

	if (window.innerWidth){
	if (verbose) {
		console.log("getViewportWidth selecting window.innerWidth = ", window.innerWidth);
	}
		returnWidth = window.innerWidth;
		returnWidthSet = true;
	}
	
	if (!returnWidthSet && document.documentElement && (document.documentElement.clientWidth != 0)){
	if (verbose) {
		console.log("getViewportWidth selecting document.documentElement.clientWidth = ", document.documentElement.clientWidth);
	}
		returnWidth = document.documentElement.clientWidth;
		returnWidthSet = true;
	}

	if (!returnWidthSet && document.body){
	if (verbose) {
		console.log("getViewportWidth selecting document.body.clientWidth = ", document.body.clientWidth);
	}
		returnWidth = document.body.clientWidth;
		returnWidthSet = true;
	}

	if (returnWidth <= 0) {
		notificationMsg1 = `Viewport width <=0: ${returnWidth}`;
		notify("getViewportWidth");
	}

	return returnWidth;
}

function getViewportHeight () {

	if (verbose) {
	console.log("getViewportHeight window.innerHeight = ", window.innerHeight);
	console.log("getViewportHeight document.documentElement.clientHeight = ", document.documentElement.clientHeight);
	console.log("getViewportHeight document.body.clientHeight = ", document.body.clientHeight);
	}

	let returnHeight = 0;
	let returnHeightSet = false;

	if (window.innerHeight){
	if (verbose) {
		console.log("getViewportHeight selecting window.innerHeight = ", window.innerHeight);
	}
		returnHeight = window.innerHeight;
		returnHeightSet = true;
	}
	
	if (!returnHeightSet && document.documentElement && (document.documentElement.clientHeight != 0)){
	if (verbose) {
		console.log("getViewportHeight selecting document.documentElement.clientHeight = ", document.documentElement.clientHeight);
	}
		returnHeight = document.documentElement.clientHeight;
		returnHeightSet = true;
	}

	if (!returnHeightSet && document.body){
	if (verbose) {
		console.log("getViewportHeight selecting document.body.clientHeight = ", document.body.clientHeight);
	}
		returnHeight = document.body.clientHeight;
		returnHeightSet = true;
	}

	if (returnHeight <= 0) {
		notificationMsg1 = `Viewport height <= 0: ${returnHeight}`;
		notify("getViewportHeight");
	}

	return returnHeight;
}

function convertToSeconds(time){
	let hours = 0;
	let minutes = 0;
	let seconds = 0;
	let hundredths = 0;

	hours = Number(time.substr(0,1)) * 3600;
	minutes = Number(time.substr(2,2)) * 60;
	seconds = Number(time.substr(5,2));
	hundredths = Number(time.substr(8,2)) / 100;
	return (hours+minutes+seconds+hundredths);
}


function findThemeAttributeObject(themeNumber) {

	if (!Number.isInteger(themeNumber)) {
		errorMsg = 'findThemeAttributeObject themeNumber not an integer: ' + themeNumber;
		throwError(errorMsg);
	}

	if ((themeNumber < 0) || ((themeNumber + 1) > themeAttributesArray.length)) {
		errorMsg = 'findThemeAttributeObject themeNumber invalid: ' + themeNumber;
		throwError(errorMsg);
	}

	let themeAttributeObject = themeAttributesArray[themeNumber];

	return themeAttributeObject;

}


function highlightThemeOption(themeNumber, themeElement, action) {

	let themeAttributeObject = findThemeAttributeObject(themeNumber);

	switch (action) {
	case 'off':
		themeElement.style.backgroundColor = 
			themeAttributeObject.backgroundColor;
		break;
	case 'on':
		themeElement.style.backgroundColor = 
			themeAttributeObject.highlightBackgroundColor;
		break;
	default:
		errorMsg = "highlightThemeOption Invalid action: " + action;
		throwError(errorMsg);
	}

}

function sanityCheck(subtitleTableIndex) {

	const tableData = STTableMetadata[subtitleTableIndex];

	let lastSubtitleNumber = tableData.lastSubtitleNumber;

	if (lastSubtitleNumber === 0) {return;}

	errorMsg = 'sanityCheck subtitleTableIndex = ' + subtitleTableIndex + ' ';

	if (lastSubtitleNumber != (tableData.STTable.rows.length - 1)) {
		errorMsg = errorMsg + 'lastSubtitleNumber != (tableData.STTable.rows.length - 1) ' 
			+ lastSubtitleNumber + ' != ' + (tableData.STTable.rows.length - 1);
		throwError(errorMsg);
	}

	if (lastSubtitleNumber != (tableData.subtitleStartSeconds.length - 1)) {
		errorMsg = errorMsg + 'lastSubtitleNumber != (tableData.subtitleStartSeconds.length - 1) ' 
			+ lastSubtitleNumber + ' != ' + (tableData.subtitleStartSeconds.length - 1);
		throwError(errorMsg);
	}

	if (lastSubtitleNumber != (tableData.subtitleEndSeconds.length - 1)) {
		errorMsg = errorMsg + 'lastSubtitleNumber != (tableData.subtitleEndSeconds.length - 1) ' 
			+ lastSubtitleNumber + ' != ' + (tableData.subtitleEndSeconds.length - 1);
		throwError(errorMsg);
	}

	if (lastSubtitleNumber != (tableData.subtitleTrack.length - 1)) {
		errorMsg = errorMsg + 'lastSubtitleNumber != (tableData.subtitleTrack.length - 1) ' 
			+ lastSubtitleNumber + ' != ' + (tableData.subtitleTrack.length - 1);
		throwError(errorMsg);
	}

}

function highlightSelectedRow(subtitleTableIndex, rowNumber) {

	let subtitleTable = STTableMetadata[subtitleTableIndex].STTable;
	if (verbose) {
		console.log(`highlightSelectedRow ${subtitleTableIndex} ${rowNumber}`);
		console.log(subtitleTable);
	}
	sanityCheck(subtitleTableIndex);

	let oldSelectedRow = STTableMetadata[subtitleTableIndex].selectedSubtitleNumber;

	// Remove 'selected' class from previously selected row
	if ((oldSelectedRow < subtitleTable.rows.length) && (oldSelectedRow > 0)) {
		subtitleTable.rows[oldSelectedRow].classList.remove("selectedCustom");
	}			
	subtitleTable.rows[rowNumber].classList.add("selectedCustom");

	return;
}

function videoStateBusy() {
	if (youTubeVideoId) {
		console.log('videoStateBusy player.getPlayerState() ', player.getPlayerState());
		switch(player.getPlayerState()) {
		case YT.PlayerState.PLAYING:
		case YT.PlayerState.BUFFERING:
		case YT.PlayerState.CUED:
			return true;
			break;	
		}
	}
	else {
		if (!videoArea.paused) {
			return true;
		}
	}
	return false;
}

function selectRow(subtitleTableIndex, rowNumber, directive) {

	if (verbose) {
	console.log("selectRow new selection: subtitleTableIndex = ", subtitleTableIndex, 
		" rowNumber = ", rowNumber, " directive = ", directive);

	console.log('selectRow current subtitle table ', selectedSubtitleTableIndex);
	console.log('selectRow current selection ', selectedSubtitleNumber);
	console.log('selectRow current subtitleStartSeconds ', STTableMetadata[subtitleTableIndex].subtitleStartSeconds[selectedSubtitleNumber]);
	console.log('selectRow current subtitleEndSeconds ', STTableMetadata[subtitleTableIndex].subtitleEndSeconds[selectedSubtitleNumber]);
	console.log('selectRow current subtitleTrack ', STTableMetadata[subtitleTableIndex].subtitleTrack[selectedSubtitleNumber]);
	}

	if (rowNumber < 1) {
		errorMsg = 'selectRow Invalid selection ' + rowNumber;
		throwError(errorMsg);
	}

	if (!playingContinuously){
	if (verbose) {
		console.log("selectRow !playingContinuously");
	}
		if (videoStateBusy()) {
	if (verbose) {
			console.log("selectRow videoStateBusy");
	}
			playVideo(-1, 0);  // Pause the video
		}
	}

	spanStartTime.textContent = "";
	spanEndTime.textContent = "";
	spanTrack.textContent = "";
	spanStartTimeOnDashboard.textContent = "";
	spanEndTimeOnDashboard.textContent = "";
	spanTrackOnDashboard.textContent = "";

	STSpan1.innerHTML = "";
	STSpan2.innerHTML = "";
	STSpan1Selected = false;
	if (verbose) {
	console.log("STSpan1Selected = f 1");
	}
	STSpan2Selected = false;

	if (verbose) {
	console.log("selectRow highlighting");
	}
	highlightSelectedRow(subtitleTableIndex, rowNumber);
	if (verbose) {
    console.log("selectRow highlighted");
	}
				
	selectedSubtitleTableIndex = subtitleTableIndex;
	selectedSubtitleNumber = rowNumber;
	STTableMetadata[subtitleTableIndex].selectedSubtitleNumber = rowNumber;

	let subtitleStartSeconds = STTableMetadata[subtitleTableIndex].subtitleStartSeconds[selectedSubtitleNumber];
	let subtitleTable = STTableMetadata[subtitleTableIndex].STTable;
	let subtitleTrack = STTableMetadata[subtitleTableIndex].subtitleTrack[selectedSubtitleNumber];
				
	unFocus();

	if ((!playingContinuously) && videoFileLoaded) {
		if (youTubeVideoId) {
			player.seekTo(subtitleStartSeconds, true);
	if (verbose) {
			console.log("selectRow seekTo subtitleStartSeconds ", subtitleStartSeconds,
				" player.getCurrentTime ", player.getCurrentTime());
	}
				if (player.getPlayerState() != YT.PlayerState.PAUSED) {
				pauseYouTubeVideo();
			}
		}
		else {
			videoArea.currentTime = subtitleStartSeconds;
		}
		currentTime.textContent = formatTime(subtitleStartSeconds);
		currentTimeOnDashboard.textContent = currentTime.textContent;
		seekBar.value = (subtitleStartSeconds / videoDuration) * 100;
		updateSliderFill(seekBar);

	} else {
		if (scrollOption == "alwaysVisible"){
			subtitleTable.rows[rowNumber].scrollIntoView({ 
				behavior: "instant", block: "center", inline: "nearest" });
		}
	}

	// if directive is "scroll"
	if (directive != "undefined"){
		if (scrollOption == "alwaysVisible"){
			subtitleTable.rows[rowNumber].scrollIntoView({ 
				behavior: "instant", block: "center", inline: "nearest" });
		}
	}

	if (rectifySubtitleStartEnabled) {
		rectifySubtitleStart(subtitleTableIndex, rowNumber);
	}
	
	spanStartTime.textContent = subtitleTable.rows[rowNumber].querySelector(".classSubtitleStart").textContent;
	spanEndTime.textContent = subtitleTable.rows[rowNumber].querySelector(".classSubtitleEnd").textContent;
	if (subtitleTrack > 0) { 
		// If more than 1 track, display track number
		spanTrack.textContent = subtitleTable.rows[rowNumber].querySelector(".classSubtitleTrack").textContent;
	}

	spanStartTimeOnDashboard.textContent = spanStartTime.textContent;
	spanEndTimeOnDashboard.textContent = spanEndTime.textContent;
	spanTrackOnDashboard.textContent = spanTrack.textContent;

	STSpan1STTableIndex = subtitleTableIndex;
	STSpan1RowNumber = rowNumber;
	STSpan1.innerHTML = subtitleTable.rows[rowNumber].querySelector(".classSubtitleText").innerHTML;
	if (STSpan1.innerHTML === "") {
		STSpan1.innerHTML = "_";
	}

	if (scrollStepOption === 1) {
		computeSubtitleTableHeight();
	if (verbose) {
	  console.log("selectRow exiting scrollStepOption = 1");
	}
	  return;
	}	
	
	let STSpan2TrackIndex = 0;
	switch (subtitleTrack) {
	case 1:
		STSpan2TrackIndex = 2;
		break;
	case 2:
		STSpan2TrackIndex = 1;
		break;
	default:
	}

	STSpan2STTableIndex = TrkFileMetadata[STSpan2TrackIndex].STTableIndex;
	const STSpan2STTable = STTableMetadata[STSpan2STTableIndex].STTable;

	if (TrkFileMetadata[STSpan2TrackIndex].STTableIndex != subtitleTableIndex) {
		STSpan2RowNumber = rowNumber;
		STTableMetadata[subtitleTableIndex].selectedSubtitleNumber = rowNumber;
		STSpan2.innerHTML = STSpan2STTable.rows[STSpan2RowNumber].querySelector(".classSubtitleText").innerHTML;
	} else {
		let otherRow = findTrackRow('next', STSpan2TrackIndex, subtitleTableIndex, rowNumber);

		if (otherRow) {
			STSpan2RowNumber = otherRow;
			STSpan2.innerHTML = STSpan2STTable.rows[STSpan2RowNumber].querySelector(".classSubtitleText").innerHTML;
			if (STSpan2.innerHTML === "") {
				STSpan2.innerHTML = "_";
			}
		}
	}

	if (verbose) {
    console.log("selectRow exiting");
	}
	computeSubtitleTableHeight();
	return;

} // selectRow

function setColor (type) {

	console.log("setColor type = ", type);

	let enforceCustomColors = false;

	if (customColorsEnabled) {
		enforceCustomColors = true;
	}

	switch (type) {
		case 'foreground':
		case 'background':
		case 'highlightedRow':
			break;
		case 'copyThemeColors':
			color1Input.value = themeAttributes.foregroundColor;
			color2Input.value = themeAttributes.backgroundColor;
			color3Input.value = themeAttributes.highlightBackgroundColor;
			break;
		case 'toggle':
			if (customColorsEnabled) {
				customColorsEnabled = false;
				changeTheme(selectedThemeNumber);
				return;
			}
			else {
				enforceCustomColors = true;
				customColorsEnabled = true;
			}
			break;
		default:
			notificationMsg1 = `Invalid option: ${type}`;
			notify("setColor");
			return;
	}

	if (enforceCustomColors) {
		document.body.style.backgroundColor = color2Input.value;
		document.body.style.color = color1Input.value;
		selectedCustomStyle.textContent = 
			".selectedCustom {background-color: " + `${color3Input.value}` + " }";
		if (selectedSubtitleNumber > 0){
			highlightSelectedRow(selectedSubtitleTableIndex, selectedSubtitleNumber);
		}
	}


		/*		case 'foreground':
			document.body.setAttribute('style', `background-color: ${color2Input.value}`);
			document.body.setAttribute('style', `color: ${color1Input.value}`);
			break;
		case 'background':
			document.body.setAttribute('style', `background-color: ${color2Input.value}`);
			document.body.setAttribute('style', `color: ${color1Input.value}`);
			break;
		default:
			console.log("setColor Invalid option: ", type);
*/
}


function getAdjustedWidthPixels(element) {
  // 1. Get parent width in pixels (100%)
  const parent = element.parentElement;
  const parentWidth = parent.getBoundingClientRect().width;

  // 2. Get the root font size (1rem in pixels)
  const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
  const threeRem = 3 * rootFontSize;

  // 3. Subtract 3rem from parent width
  const adjustedWidth = parentWidth - threeRem;

  return adjustedWidth; // in pixels
}

function detectInnerSizeChange(){

	console.log("detectInnerSizeChange H ", window.innerHeight, " W ", window.innerWidth);
	changeVideoSize();

}

function changeVideoSize(){

	if (!videoFileLoaded) {
		computeSubtitleTableHeight();
		return;
	}

	const selectedValue = videoSizeMenu.value;

	let oldMaxVideoWidth = maxVideoWidth;

	maxVideoWidth = getAdjustedWidthPixels(wrapper);
	console.log("changeVideoSize maxVideoWidth = ",maxVideoWidth);

	if (oldMaxVideoWidth != maxVideoWidth) {
		console.log("changeVideoSize maxVideoWidth changed from ", oldMaxVideoWidth, " to ", maxVideoWidth);
	}

	unFocus();

	let fraction = videoSizeMenu.value;
	let newWidth;
	if (youTubeVideoId) {
		newWidth = Math.round((maxVideoWidth)*fraction);
		let newHeight = Math.round((newWidth * 9) / 16);
		console.log(`changeVideoSize fraction: ${fraction}, newWidth: ${newWidth}, newHeight: ${newHeight}, maxVideoWidth: ${maxVideoWidth}`);
		player.setSize(newWidth, newHeight);
		wrapper.style.width = newWidth + "px";
		seekBarContainer.style.width = wrapper.style.width;
	} else {
		newWidth = Math.round((maxVideoWidth)*fraction);
		let newHeight = Math.ceil((videoArea.videoHeight / videoArea.videoWidth) * newWidth);
		wrapper.style.width = newWidth + "px";
		wrapper.style.height = newHeight + "px";
		seekBarContainer.style.width = wrapper.style.width; // videoArea.style.width;
		console.log("changeVideoSize newHeight= ", newHeight, " newWidth = ", newWidth,
			" videoArea.style.width = ", videoArea.style.width);
	}

	if ((totalNumberOfSubtitlesRead > 0) && videoFileLoaded) { 
		console.log("changeVideoSize updateTime");
		updateTime();
	}

	//seekBar.value = (current / videoDuration) * 100;
	//updateSliderFill(seekBar);



	console.log("changeVideoSize videoSizeMenu.value = ", videoSizeMenu.value, 
		" newWidth = ", newWidth);

	computeSubtitleTableHeight();

} // changeVideoSize


function changeSubtitleWidth() {

	const selectedValue = Number(subtitleWidthMenu.value);

	console.log("changeSubtitleWidth subtitleWidth changed from ", divSubtitle1.style.width, 
		" to ", selectedValue, "%");
	divSubtitle1.style.width = selectedValue + '%';
	divSubtitle2.style.width = selectedValue + '%';

	unFocus();

	computeSubtitleTableHeight();

} // changeSubtitleWidth

function changeFont(){

	var selectedValue = subtitleFontMenu.value;
	//?? If user presses ESC instead of selecting a file, the value displayed in the setting is blank.
	//?? If user presses END and there are 2 tracks, the last subtitle of the second track is selected
	//?? If user presses DEL, the selected row might be out of view (maybe ok if 1st row shown = 1st row when video displayed)
	if (selectedValue === loadFontFileOptionText) {
		subtitleFontMenu.value = STSpan1.style.fontFamily;
		if (fontListFileInput) {
			fontListFileInput.value  = ""; //Clear .value to make this file element reusable
			fontListFileInput.click();
		}
		unFocus();
		return;
	}
	
	// selectSubtitleFont.value = selectedFont;

	console.log("changeFont Font changed from " + STSpan1.style.fontFamily + " to " + selectedValue);
	STSpan1.style.fontFamily = `"` + selectedValue + `"`;
	computeSubtitleTableHeight();
	unFocus();
}

function changeFont2() {

	var selectedValue = subtitleFontMenu2.value;
	//?? If user presses ESC instead of selecting a file, the value displayed in the setting is blank.
	//?? If user presses END and there are 2 tracks, the last subtitle of the second track is selected
	//?? If user presses DEL, the selected row might be out of view (maybe ok if 1st row shown = 1st row when video displayed)
	if (selectedValue === loadFontFileOptionText) {
		subtitleFontMenu2.value = STSpan2.style.fontFamily;
		if (fontListFileInput) {
			fontListFileInput.value  = ""; //Clear .value to make this file element reusable
			fontListFileInput.click();
		}
		unFocus();
		return;
	}
	
	// selectSubtitleFont.value = selectedFont;

	console.log("changeFont2 Font changed from " + STSpan2.style.fontFamily + " to " + selectedValue);
	STSpan2.style.fontFamily = `"` + selectedValue + `"`;
	computeSubtitleTableHeight();
	unFocus();

}

function changeFontSize(){
	var selectedValue = subtitleFontSizeMenu.value;
	var selectedValue2 = subtitleFontSizeMenu2.value;
	console.log("Font size 1 changed from " + STSpan1.style.fontSize + " to " + selectedValue);
	console.log("Font size 2 changed from " + STSpan2.style.fontSize + " to " + selectedValue2);
	STSpan1.style.fontSize = selectedValue;
	STSpan2.style.fontSize = selectedValue2;
	computeSubtitleTableHeight();
	unFocus();
}

function changeAlignment(){
	//?? Clean up this function
	var selectedValue = subtitleAlignmentMenu.value;
	console.log("Alignment changed from " + divSubtitle1.style.textAlign + " to " + selectedValue);
	divSubtitle1.style.textAlign = selectedValue;

	console.log("Alignment changed from " + divSubtitle2.style.textAlign + " to " + selectedValue);
	divSubtitle2.style.textAlign = selectedValue;
	computeSubtitleTableHeight();
	unFocus();
}

function changeSpacebar(){
	const selectedValue = spacebarMenu.value;
	console.log("Spacebar option changed from " + spacebarOption + " to " + selectedValue);
	spacebarOption = selectedValue;
	unFocus();
}

function changeScroll(){
	const selectedValue = scrollMenu.value;
	console.log("Scroll option changed from " + scrollOption + " to " + selectedValue);
	scrollOption = selectedValue;
	unFocus();
}

function selectMarginLineMinHeight(e) {
	const selectedMargin = e.currentTarget;
	const selectedValue = Number(selectedMargin.value);
	let varName;
	let oldValue;
	let marginElement;
	switch (selectedMargin.id) {
	case 'marginLine1Menu':
		varName = "marginLine1MinHeight";
		oldValue = marginLine1MinHeight;
		marginLine1MinHeight = selectedValue;
		marginElement = marginLine1;
		break;
	case 'marginLine2Menu':
		varName = "marginLine2MinHeight";
		oldValue = marginLine2MinHeight;
		marginLine2MinHeight = selectedValue;
		marginElement = marginLine2;
		break;
	default:
		errorMsg = 'selectMarginLineMinHeight invalid selectedMargin.id: ' + selectedMargin.id;
		throwError(errorMsg);
	}

	console.log("selectMarginLineMinHeight ", varName, " changed from " + oldValue + 
		" to " + selectedValue);
	
	changeMarginLineMinHeight(marginElement);

	unFocus();
}

function changeMarginLineMinHeight(marginElement) {

	let newMinHeight = 0;
	switch (marginElement) {
	case marginLine1:
		newMinHeight = marginLine1MinHeight;
		showMarginLine1 = (newMinHeight > 0);
		break;
	case marginLine2:
		newMinHeight = marginLine2MinHeight;
		showMarginLine2 = (newMinHeight > 0);
		break;
	default:
		errorMsg = 'changeMarginLineMinHeight invalid marginElement: ' + marginElement;
		throwError(errorMsg);
	}
	console.log("changeMarginLineMinHeight ", marginElement.id, " minHeight changed from ", 
		marginElement.style.minHeight, " to ", newMinHeight + "rem");
	
	marginElement.style.minHeight = newMinHeight + "rem";
	
	computeSubtitleTableHeight();

}

function changeScrollStep(){
	
	const selectedValue = Number(scrollStepMenu.value);
	console.log("Scroll Step changed from " + scrollStepOption + " to " + selectedValue);
	scrollStepOption = selectedValue;
	unFocus();

	var checkBox1 = myCheck01;
	var checkBox2 = myCheck02;

	switch(selectedValue) {
		case 1:
			console.log("Scroll Step is 1");
			showSubtitleTrack1 = true;
			showSubtitleTrack2 = false;
			checkBox1.checked = true;
			checkBox2.checked = false;
			break;
		case 2:
			console.log("Scroll Step is 2");
			showSubtitleTrack1 = true;
			showSubtitleTrack2 = true;
			checkBox1.checked = true;
			checkBox2.checked = true;
			break;
		default:
			console.log('keyup Invalid scroll step option: ', scrollStepMenu.value);
			break;
	}
	
	if (totalNumberOfSubtitlesRead > 0) {
		selectRow(selectedSubtitleTableIndex, selectedSubtitleNumber);
	}
	else {
		computeSubtitleTableHeight();
	}

}

function changeMargin(){

	const selectedValue = Number(marginMenu.value);
	console.log("Margin changed from " + marginOption + " to " + selectedValue);
	marginOption = selectedValue;
	unFocus();
}

function copyTime(elemIdTo, rowOffset, elemIdFrom) {

	switch (elemIdTo) {
	case "t1":
	case "t2":
		break;
	default:
		errorMsg = `copyTime Invalid target: ${elemIdTo}`;
		throwError(errorMsg);
		return;
	}

	switch (elemIdFrom) {
	case "t1":
	case "t2":
		break;
	default:
		errorMsg = `copyTime Invalid source: ${elemIdFrom}`;
		throwError(errorMsg);
		return;
	}

	let fromRow;
	switch (rowOffset) {
	case "-1":
		fromRow = timeEditPopupRow - 1;
		if (configuration === "2TwinnedTracks1Table") { 
			fromRow = findTrackRow('prev', timeEditPopupSubtitleTrack, timeEditPopupTableIndex, timeEditPopupRow);
		}
		break;
	case "+1":
		fromRow = timeEditPopupRow + 1;
		if (configuration === "2TwinnedTracks1Table") {
			fromRow = findTrackRow('next', timeEditPopupSubtitleTrack, timeEditPopupTableIndex, timeEditPopupRow);
		}
		break;
	default:
		errorMsg = `copyTime Invalid rowOffset: ${rowOffset}`;
		throwError(errorMsg);
	}

	console.log(`copyTime table: ${timeEditPopupTableIndex} from row: ${fromRow} to row: ${timeEditPopupRow}`);

	const tableData = STTableMetadata[timeEditPopupTableIndex];
	const trackData = TrkFileMetadata[timeEditPopupSubtitleTrack];

	if ((fromRow <= 0) || (fromRow > tableData.lastSubtitleNumber)){
		notificationMsg1 = `Source out of bounds, table: ${timeEditPopupTableIndex} row: ${fromRow}`;
		notify("copyTime");
		return;
	}

	let oldText;
	let oldSeconds;
	let newText;
	let newSeconds;

	if (elemIdTo === 't1') {
		oldText = tableData.STTable.rows[timeEditPopupRow].querySelector(".classSubtitleStart").textContent;
		oldSeconds = tableData.subtitleStartSeconds[timeEditPopupRow];
	} else {
		oldText = tableData.STTable.rows[timeEditPopupRow].querySelector(".classSubtitleEnd").textContent;
		oldSeconds = tableData.subtitleEndSeconds[timeEditPopupRow];
	}
	if (elemIdFrom === 't1') {
		newText = tableData.STTable.rows[fromRow].querySelector(".classSubtitleStart").textContent;
		newSeconds = tableData.subtitleStartSeconds[fromRow];
	} else {
		newText = tableData.STTable.rows[fromRow].querySelector(".classSubtitleEnd").textContent;
		newSeconds = tableData.subtitleEndSeconds[fromRow];
	}

	console.log(`copyTime table: ${timeEditPopupTableIndex} row: ${timeEditPopupRow} ${elemIdTo} changed from ${oldText} to ${newText}`,
		`seconds changed from ${oldSeconds} to ${newSeconds}`);

	let twinnedTrack = trackData.twinnedTrack;
	let wrapperElement;

	if (elemIdTo === 't1') {
		tableData.STTable.rows[timeEditPopupRow].querySelector(".classSubtitleStart").textContent = newText;
		tableData.subtitleStartSeconds[timeEditPopupRow] = newSeconds;
		if (twinnedTrack != 0) {
			synchronizeTwinnedTrack(timeEditPopupTableIndex, timeEditPopupRow, "t1");
		}
		wrapperElement = copyt1;
	} else {
		tableData.STTable.rows[timeEditPopupRow].querySelector(".classSubtitleEnd").textContent = newText;
		tableData.subtitleEndSeconds[timeEditPopupRow] = newSeconds;
		if (twinnedTrack != 0) {
			synchronizeTwinnedTrack(timeEditPopupTableIndex, timeEditPopupRow, "t2");
		}
		wrapperElement = copyt2;
	}

	wrapperElement.style.pointerEvents = 'none';
	setTimeout(() => {wrapperElement.style.pointerEvents = ''}, 500);

	showTimeEditPopup(timeEditPopupTableIndex, timeEditPopupRow);

}

function changeRange (operation) {
	switch(operation) {
	case "clear":
		subsetRange = 1;
		break;
	case "increment":
		subsetRange += 1;
		if (subsetRange > 12) {
			subsetRange = 12;
		}
		break;
	case "decrement":
		subsetRange -= 1;
		if (subsetRange < 1) {
			subsetRange = 1;
		}
		break;
	default:
		notificationMsg1 = `Invalid operation: ${operation}`;
		notify("changeRange");
		return;
	}
	rangeCount.textContent = subsetRange;
	if (subsetRange > 1) {
		rangeButtonRangeCount.textContent = subsetRange;
	} else {
		rangeButtonRangeCount.textContent = "";
	}
}

function changeTime(operation, timeSelector, element) {

	switch(operation) {
	case "increment":
	case "decrement":
		break;
	case "close":
		showTimeEditPopup(selectedSubtitleTableIndex, 0);
		return;
	case "restore":
		timeEditRestore(timeSelector); /* t1 or t2 */
		showTimeEditPopup(selectedSubtitleTableIndex, timeEditPopupRow);
		return;
	case "current":
		timeEditCurrent(timeSelector); /* t1 or t2 */
		showTimeEditPopup(selectedSubtitleTableIndex, timeEditPopupRow);
		return;
	default:
		notificationMsg1 = `Invalid operation: ${operation}`;
		notify("changeTime");
		return;
	}

	let min = 0;
	let max = 9;

	switch(timeSelector) {
	case "t1minuteField1":
	case "t2minuteField1":
	case "t1secondField1":
	case "t2secondField1":
		max = 5;		
		break;
	}

	let value = Number(element.textContent);

	switch(operation) {
	case "increment":
		value += 1;
		if (value > max) {
			value = min;
		}
		break;
	case "decrement":
		value -= 1;
		if (value < min) {
			value = max;
		}
		break;
	}

	element.textContent = value;
	saveTime(timeSelector.substring(0,2));

	return;

function saveTime (timeSelector) {

	let timeObject = {};

	switch (timeSelector) {
		case "t1":
			timeObject = t1timeObject;
			break;
		case "t2":
			timeObject = t2timeObject;
			break;
		default:
			errorMsg = 'saveTime invalid timeSelector: ' + timeSelector;
			throwError(errorMsg);
	}

	let fractionText = timeObject.millisecondField1.textContent + 
		timeObject.millisecondField2.textContent + 
		timeObject.millisecondField3.textContent;

	let totalSeconds = (Number(timeObject.hourField1.textContent) * 3600) +
		(Number(timeObject.minuteField1.textContent) * 600) +
		(Number(timeObject.minuteField2.textContent) * 60) +
		(Number(timeObject.secondField1.textContent) * 10) +
		(Number(timeObject.secondField2.textContent)) +
		(Number(fractionText) / 1000);
			
	let timeText = timeObject.hourField1.textContent + ":" +
		timeObject.minuteField1.textContent +
		timeObject.minuteField2.textContent + ":" +
		timeObject.secondField1.textContent +
		timeObject.secondField2.textContent + "." +
		timeObject.millisecondField1.textContent + 
		timeObject.millisecondField2.textContent;

	console.log("saveTime fractionText ", fractionText, " timeText ", timeText, 
		" totalSeconds ", totalSeconds);

	const tableData = STTableMetadata[timeEditPopupTableIndex];
	const trackData = TrkFileMetadata[timeEditPopupSubtitleTrack];
	const twinnedTrack = trackData.twinnedTrack;

	switch (timeSelector) {
	case "t1":
		console.log("saveTime table ", timeEditPopupTableIndex, " row ", timeEditPopupRow, " start ", 
			" old ", 
			tableData.STTable.rows[timeEditPopupRow].querySelector(".classSubtitleStart").textContent,
			" new ", timeText, 
			" seconds old ", tableData.subtitleStartSeconds[timeEditPopupRow], " new ", totalSeconds);
		tableData.subtitleStartSeconds[timeEditPopupRow] = totalSeconds;
		tableData.STTable.rows[timeEditPopupRow].querySelector(".classSubtitleStart").textContent = timeText;
		if (twinnedTrack != 0) {
			synchronizeTwinnedTrack(timeEditPopupTableIndex, timeEditPopupRow, "t1");
		}
		break;
	case "t2":
		console.log("saveTime table ", timeEditPopupTableIndex, " row ", timeEditPopupRow, " end ",
			" old ", 
			tableData.STTable.rows[timeEditPopupRow].querySelector(".classSubtitleEnd").textContent,
			" new ", timeText, 
			" seconds old ", tableData.subtitleEndSeconds[timeEditPopupRow], " new ", totalSeconds);
		tableData.subtitleEndSeconds[timeEditPopupRow] = totalSeconds;
		tableData.STTable.rows[timeEditPopupRow].querySelector(".classSubtitleEnd").textContent = timeText;
		if (twinnedTrack != 0) {
			synchronizeTwinnedTrack(timeEditPopupTableIndex, timeEditPopupRow, "t2");
		}
		break;
	default:
	}
	
}  // saveTime

function timeEditRestore(timeSelector) {

	const tableData = STTableMetadata[timeEditPopupTableIndex];
	const trackData = TrkFileMetadata[timeEditPopupSubtitleTrack];
	const twinnedTrack = trackData.twinnedTrack;

	switch (timeSelector) {
	case "t1":
		console.log("timeEditRestore table ", timeEditPopupTableIndex, " row ", timeEditPopupRow, " start restored from ",
			tableData.STTable.rows[timeEditPopupRow].querySelector(".classSubtitleStart").textContent,
			" to ", t1timeEditPopupOldTime, 
			" seconds restored from ", tableData.subtitleStartSeconds[timeEditPopupRow], 
			" to ", t1timeEditPopupOldSeconds);
		tableData.STTable.rows[timeEditPopupRow].querySelector(".classSubtitleStart").textContent = t1timeEditPopupOldTime;
		tableData.subtitleStartSeconds[timeEditPopupRow] = t1timeEditPopupOldSeconds;
		if (twinnedTrack != 0) {
				synchronizeTwinnedTrack(timeEditPopupTableIndex, timeEditPopupRow, "t1");
		}
		break;
	case "t2":
		console.log("timeEditRestore table ", timeEditPopupTableIndex, " row ", timeEditPopupRow, " end restored from ",
			tableData.STTable.rows[timeEditPopupRow].querySelector(".classSubtitleEnd").textContent,
			" to ", t2timeEditPopupOldTime, 
			" seconds restored from ", tableData.subtitleEndSeconds[timeEditPopupRow], 
			" to ", t2timeEditPopupOldSeconds);
		tableData.STTable.rows[timeEditPopupRow].querySelector(".classSubtitleEnd").textContent = t2timeEditPopupOldTime;
		tableData.subtitleEndSeconds[timeEditPopupRow] = t2timeEditPopupOldSeconds;
		if (twinnedTrack != 0) {
			synchronizeTwinnedTrack(timeEditPopupTableIndex, timeEditPopupRow, "t2");
		}
		break;
	default:
		console.log('timeEditRestore Invalid timeSelector ', timeSelector);
		return;
	}

}  // timeEditRestore

function timeEditCurrent(prefix) {

	let current;
	if (youTubeVideoId) {
		current = player.getCurrentTime();
	}
	else {
		current = videoArea.currentTime;
	}
	console.log("timeEditCurrent current ", current);

	let timeText = helper.toTimeString(current * 1000);	

	currentTime.textContent = formatTime(current);
	currentTimeOnDashboard.textContent = currentTime.textContent;

	const tableData = STTableMetadata[timeEditPopupTableIndex];
	const trackData = TrkFileMetadata[timeEditPopupSubtitleTrack];
	const twinnedTrack = trackData.twinnedTrack;
	
	switch (prefix) {
	case "t1":
		console.log("timeEditCurrent table ", timeEditPopupTableIndex, " row ", timeEditPopupRow, 
			" start changed from ", 
			tableData.STTable.rows[timeEditPopupRow].querySelector(".classSubtitleStart").textContent,
			" to ", timeText, 
			" seconds changed from ", tableData.subtitleStartSeconds[timeEditPopupRow], 
			" to ", current);
		tableData.STTable.rows[timeEditPopupRow].querySelector(".classSubtitleStart").textContent = timeText;
		tableData.subtitleStartSeconds[timeEditPopupRow] = current;
		if (twinnedTrack != 0) {
			synchronizeTwinnedTrack(timeEditPopupTableIndex, timeEditPopupRow, "t1");
		}
		break;
	case "t2":
		console.log("timeEditCurrent table ", timeEditPopupTableIndex, " row ", timeEditPopupRow, 
			" end changed from ",
			tableData.STTable.rows[timeEditPopupRow].querySelector(".classSubtitleEnd").textContent,
			" to ", timeText, 
			" seconds changed from ", tableData.subtitleEndSeconds[timeEditPopupRow], 
			" to ", current);
		tableData.STTable.rows[timeEditPopupRow].querySelector(".classSubtitleEnd").textContent = timeText;
		tableData.subtitleEndSeconds[timeEditPopupRow] = current;
		if (twinnedTrack != 0) {
			synchronizeTwinnedTrack(timeEditPopupTableIndex, timeEditPopupRow, "t2");
		}
		break;
	default:
		console.log('timeEditCurrent Invalid prefix ', prefix);
		return;
	}

}  // timeEditCurrent

}  // changeTime

function findTrackRow(option, trackNumber, subtitleTableIndex, rowNumber) {

	console.log("findTrackRow ", option, " ", trackNumber, " ", subtitleTableIndex, " ", rowNumber);
	switch (trackNumber) {
		case 0:
		case 1:
		case 2:
			break;
		default:
			errorMsg = 'findTrackRow invalid trackNumber: ' + trackNumber;
			throwError(errorMsg);
	}
	 
	let resultRow = 0;
 
	switch (option) {
		case "next":
			let nextRow = rowNumber + 1;
	console.log("findTrackRow ", nextRow);
	console.log("findTrackRow ", STTableMetadata[subtitleTableIndex].lastSubtitleNumber);
			while ((!resultRow) && (nextRow <= STTableMetadata[subtitleTableIndex].lastSubtitleNumber)) {
				if (STTableMetadata[subtitleTableIndex].subtitleTrack[nextRow] === trackNumber) {
					resultRow = nextRow;
				} else {
					nextRow++;
				}
			}
			break;
		case "prev":
			let prevRow = rowNumber - 1;
			while ((!resultRow) && (prevRow > 0)) {
				if (STTableMetadata[subtitleTableIndex].subtitleTrack[prevRow] === trackNumber) {
					resultRow = prevRow;
				} else {
					prevRow--;
				}
			}
			break;
		default:
			errorMsg = 'findTrackRow invalid option: ' + option;
			throwError(errorMsg);
	}


	return resultRow;

}

function findTwinnedRow(subtitleTableIndex, rowNumber) {

	const tableData = STTableMetadata[subtitleTableIndex];
	const subtitleTrack = tableData.subtitleTrack[rowNumber];
	const trackData = TrkFileMetadata[subtitleTrack];

	let twinnedTrack = trackData.twinnedTrack;

	if (twinnedTrack === 0) {
		errorMsg = `findTwinnedRow Twinned track not defined, table: ${subtitleTableIndex} row: ${rowNumber}`;
		throwError(errorMsg);
	}

	const twinnedTrackData = TrkFileMetadata[twinnedTrack];
	const twinnedTableData = STTableMetadata[twinnedTrackData.STTableIndex];

	let twinnedRow = 0;

	if (trackData.STTableIndex != twinnedTrackData.STTableIndex) {
		if (rowNumber <= twinnedTrackData.lastSubtitleNumber) {
			twinnedRow = rowNumber;
		}
	} else {
		if (subtitleTrack < twinnedTrack) {
			twinnedRow = findTrackRow('next', twinnedTrack, trackData.STTableIndex, rowNumber);
		} else {
			twinnedRow = findTrackRow('prev', twinnedTrack, trackData.STTableIndex, rowNumber);
		}
	};

	if (twinnedRow <= 0) {
		errorMsg = `findTwinnedRow Twinned row not found, table: ${subtitleTableIndex} row: ${rowNumber}`;
		throwError(errorMsg);
	}

	return twinnedRow;

}  //  findTwinnedRow

function synchronizeTwinnedTrack(subtitleTableIndex, rowNumber, timeSelector) {

	switch (timeSelector) {
		case "t1":
		case "t2":
			break;
		default:
			errorMsg = `synchronizeTwinnedTrack Invalid timeSelector: ${timeSelector}`;
			throwError(errorMsg);
	}
	
	const tableData = STTableMetadata[subtitleTableIndex];
	const subtitleTrack = tableData.subtitleTrack[rowNumber];
	const trackData = TrkFileMetadata[subtitleTrack];

	let twinnedTrack = trackData.twinnedTrack;

	if (twinnedTrack === 0) { return; }

	const twinnedTrackData = TrkFileMetadata[twinnedTrack];
	const twinnedTableData = STTableMetadata[twinnedTrackData.STTableIndex];
	let twinnedRow = findTwinnedRow(subtitleTableIndex, rowNumber);
/*
	let twinnedRow = 0;
	const twinnedTrackData = TrkFileMetadata[twinnedTrack];
	const twinnedTableData = STTableMetadata[twinnedTrackData.STTableIndex];

	if (trackData.STTableIndex != twinnedTrackData.STTableIndex) {
		if (rowNumber <= twinnedTrackData.lastSubtitleNumber) {
			twinnedRow = rowNumber;
		}
	} else {
		if (subtitleTrack < twinnedTrack) {
			twinnedRow = findTrackRow('next', twinnedTrack, trackData.STTableIndex, rowNumber);
		} else {
			twinnedRow = findTrackRow('prev', twinnedTrack, trackData.STTableIndex, rowNumber);
		}
	};

	if (twinnedRow <= 0) {
		errorMsg = `synchronizeTwinnedTrack Twinned row not found, table: ${subtitleTableIndex} row: ${rowNumber}`;
		throwError(errorMsg);
	}
*/
	switch (timeSelector) {
		case "t1":
			twinnedTableData.subtitleStartSeconds[twinnedRow] = tableData.subtitleStartSeconds[rowNumber];
			twinnedTableData.STTable.rows[twinnedRow].querySelector(".classSubtitleStart").textContent = 
				tableData.STTable.rows[rowNumber].querySelector(".classSubtitleStart").textContent;
			break;
		case "t2":
			twinnedTableData.subtitleEndSeconds[twinnedRow] = tableData.subtitleEndSeconds[rowNumber];
			twinnedTableData.STTable.rows[twinnedRow].querySelector(".classSubtitleEnd").textContent = 
				tableData.STTable.rows[rowNumber].querySelector(".classSubtitleEnd").textContent;
			break;
		default:
	}
}  // synchronizeTwinnedTrack

function rectifySubtitleStart(subtitleTableIndex, rowNumber) {

	const tableData = STTableMetadata[subtitleTableIndex];
	const subtitleTrack = tableData.subtitleTrack[rowNumber];
	const trackData = TrkFileMetadata[subtitleTrack];

	let previousRow = findTrackRow('prev', subtitleTrack, subtitleTableIndex, rowNumber);

	if (previousRow === 0) { return; }

	if (tableData.subtitleStartSeconds[rowNumber] >= 
		tableData.subtitleEndSeconds[previousRow]) { return; }

	tableData.subtitleStartSeconds[rowNumber] = tableData.subtitleEndSeconds[previousRow];
	tableData.STTable.rows[rowNumber].querySelector(".classSubtitleStart").textContent =
		tableData.STTable.rows[previousRow].querySelector(".classSubtitleEnd").textContent;

	let twinnedTrack = trackData.twinnedTrack;

	if (twinnedTrack != 0) {
		synchronizeTwinnedTrack(subtitleTableIndex, rowNumber, "t1");
	}

}  // rectifySubtitleStart

function undo() {

	console.log("undo undoArrayCurrentIndex = ", undoArrayCurrentIndex);

	if (undoArrayCurrentIndex >= 0) {
		console.log("undo undoArray[undoArrayCurrentIndex] = ", undoArray[undoArrayCurrentIndex]);
		console.log("undo undoArray[undoArrayCurrentIndex].inUse = ", undoArray[undoArrayCurrentIndex].inUse);
	}

	if ((undoArrayCurrentIndex < 0) || (!(undoArray[undoArrayCurrentIndex].inUse))) {
		console.log("undo Undo stack empty");
		return;
	}

	const tableData = STTableMetadata[undoArray[undoArrayCurrentIndex].selectedSubtitleTableIndex];
	tableData.STTable.rows[tableData.selectedSubtitleNumber].classList.remove("selectedCustom");

	switch (undoArray[undoArrayCurrentIndex].action) {
	case "subtitleTextChange":
		let rowNumber = undoArray[undoArrayCurrentIndex].rowNumber;
		tableData.STTable.rows[rowNumber].querySelector(".classSubtitleText").textContent =
			undoArray[undoArrayCurrentIndex].oldValue;
		break;

	case "subtitleInsertion":
			if (!(undoArray[undoArrayCurrentIndex].hasOwnProperty("twinnedTrackObj"))) {
			let subtitleTableIndex = undoArray[undoArrayCurrentIndex].subtitleTableIndex;
			let tableData1 = STTableMetadata[subtitleTableIndex];
			let row = undoArray[undoArrayCurrentIndex].newRowNumber;
			console.log("subtitleInsertion row ", row, " tableData1 ", tableData1);
			deleteRow(tableData1, row); 
		} else {
			// let tableData1 = STTableMetadata[undoArray[undoArrayCurrentIndex].twinnedTrackObj.subtitleTableIndex1].STTable;
			//let tableData1 = undoArray[undoArrayCurrentIndex].twinnedTrackObj.tableData1;
			let subtitleTableIndex1 = undoArray[undoArrayCurrentIndex].twinnedTrackObj.subtitleTableIndex1;
			let tableData1 = STTableMetadata[subtitleTableIndex1];
			let row1 = undoArray[undoArrayCurrentIndex].twinnedTrackObj.newRowNumber;
			//let tableData2 = undoArray[undoArrayCurrentIndex].twinnedTrackObj.tableData2;
			//let tableData2 = STTableMetadata[undoArray[undoArrayCurrentIndex].twinnedTrackObj.subtitleTableIndex2].STTable;
			let subtitleTableIndex2 = undoArray[undoArrayCurrentIndex].twinnedTrackObj.subtitleTableIndex2;
			let tableData2 = STTableMetadata[subtitleTableIndex2];
			let row2 = undoArray[undoArrayCurrentIndex].twinnedTrackObj.newRowNumber2;
			deleteRow(tableData2, row2); 
			deleteRow(tableData1, row1); 
		}
		break;

	case "subtitleDeletion":
		let subtitleTableIndex = undoArray[undoArrayCurrentIndex].selectedSubtitleTableIndex;
		let deletedRowNumber = undoArray[undoArrayCurrentIndex].rowNumber;

		let rowObject = {};
		rowObject.startSeconds = undoArray[undoArrayCurrentIndex].subtitleStartSeconds;
		rowObject.endSeconds = undoArray[undoArrayCurrentIndex].subtitleEndSeconds;
		rowObject.track = undoArray[undoArrayCurrentIndex].subtitleTrack;

		rowObject.startTime = undoArray[undoArrayCurrentIndex].startTime;
		rowObject.endTime = undoArray[undoArrayCurrentIndex].endTime;
		rowObject.subtitleStyle = undoArray[undoArrayCurrentIndex].subtitleStyle;
		rowObject.subtitle = undoArray[undoArrayCurrentIndex].oldValue;

		if (!(undoArray[undoArrayCurrentIndex].hasOwnProperty("twinnedTrackObj"))) {
			insertRow(tableData, deletedRowNumber);
			createSubtitleRow(rowObject, subtitleTableIndex, deletedRowNumber);
		} else {
			let rowObject2 = {};
			rowObject2.startSeconds = undoArray[undoArrayCurrentIndex].twinnedTrackObj.subtitleStartSeconds;
			rowObject2.endSeconds = undoArray[undoArrayCurrentIndex].twinnedTrackObj.subtitleEndSeconds;
			rowObject2.track = undoArray[undoArrayCurrentIndex].twinnedTrackObj.twinnedTrack;

			rowObject2.startTime = undoArray[undoArrayCurrentIndex].twinnedTrackObj.startTime;
			rowObject2.endTime = undoArray[undoArrayCurrentIndex].twinnedTrackObj.endTime;
			rowObject2.subtitleStyle = undoArray[undoArrayCurrentIndex].twinnedTrackObj.subtitleStyle;
			rowObject2.subtitle = undoArray[undoArrayCurrentIndex].twinnedTrackObj.oldValue;

			let deletedRowNumber2 = undoArray[undoArrayCurrentIndex].twinnedTrackObj.twinnedRow;
			let twinnedTrackData = TrkFileMetadata[rowObject2.track];
			let twinnedTableData = STTableMetadata[twinnedTrackData.STTableIndex];
			let subtitleTableIndex2 = undoArray[undoArrayCurrentIndex].twinnedTrackObj.STTableIndex;

			if (deletedRowNumber >= deletedRowNumber2) { 
				deleteRow(tableData, deletedRowNumber);
				deleteRow(twinnedTableData, deletedRowNumber2);
			} else {
				deleteRow(twinnedTableData, deletedRowNumber2);
				deleteRow(tableData, deletedRowNumber);
			}
			createSubtitleRow(rowObject, subtitleTableIndex, deletedRowNumber);
			createSubtitleRow(rowObject2, subtitleTableIndex2, deletedRowNumber2);
		};
		break;

	default:
		notificationMsg1 = `Invalid action: ${undoArray[undoArrayCurrentIndex].action}`;
		notify("undo");
		return;
	}

	selectRow(undoArray[undoArrayCurrentIndex].selectedSubtitleTableIndex,
	undoArray[undoArrayCurrentIndex].selectedSubtitleNumber);

	selectCurrentIndex("redoArray");
	swapUndoElement();

	undoArray[undoArrayCurrentIndex].inUse = false;

	if ((undoArrayCurrentIndex === 0) && (undoArray[undoArraySize - 1].inUse)) {
		undoArrayCurrentIndex = undoArraySize - 1;
		return;
	}

	if (undoArrayCurrentIndex === 0) {
		return;
	}

	undoArrayCurrentIndex -= 1;

}

function selectCurrentIndex(arrayName) {
	switch (arrayName) {
	case "undoArray":
		undoArrayCurrentIndex += 1;
		if (undoArrayCurrentIndex >= undoArraySize){
			undoArrayCurrentIndex = 0;
		}
		break;
	case "redoArray":
		redoArrayCurrentIndex += 1;
		if (redoArrayCurrentIndex >= redoArraySize){
			redoArrayCurrentIndex = 0;
		}
		break;
	default:
		notificationMsg1 = `Invalid arrayName: ${arrayName}`;
		notify("selectCurrentIndex");
		return;

	}
}

function swapUndoElement() {
    const objFrom1 = undoArray[undoArrayCurrentIndex];
    const objFrom2 = redoArray[redoArrayCurrentIndex];
	console.log("swapUndoElement objFrom1 ", objFrom1);
	console.log("swapUndoElement objFrom2 ", objFrom2);
    let clone1 = structuredClone(objFrom2);
    undoArray[undoArrayCurrentIndex] = clone1;
    let clone2 = structuredClone(objFrom1);
    redoArray[redoArrayCurrentIndex] = clone2;
    //undoArray[undoArrayCurrentIndex] = structuredClone(objFrom2);
    //redoArray[redoArrayCurrentIndex] = structuredClone(objFrom1);
}

function redo() {

	console.log("redo redoArrayCurrentIndex = ", redoArrayCurrentIndex);
	if (redoArrayCurrentIndex >= 0) {
		console.log("redo redoArray[redoArrayCurrentIndex] = ", redoArray[redoArrayCurrentIndex]);
		console.log("redo redoArray[redoArrayCurrentIndex].inUse = ", redoArray[redoArrayCurrentIndex].inUse);
	}

	if ((redoArrayCurrentIndex < 0) || (!(redoArray[redoArrayCurrentIndex].inUse))) {
		console.log("redo Redo stack empty");
		return;
	}

	switch (redoArray[redoArrayCurrentIndex].action) {
	case "subtitleTextChange":
		let subtitleTable = STTableMetadata[redoArray[redoArrayCurrentIndex].selectedSubtitleTableIndex].STTable;
		subtitleTable.rows[redoArray[redoArrayCurrentIndex].rowNumber].querySelector(".classSubtitleText").innerHTML =
			redoArray[redoArrayCurrentIndex].newValue;
		selectRow(redoArray[redoArrayCurrentIndex].selectedSubtitleTableIndex,
			redoArray[redoArrayCurrentIndex].selectedSubtitleNumber);
		selectCurrentIndex("undoArray");
		swapUndoElement();
		break;

		case "subtitleInsertion":
		selectRow(redoArray[redoArrayCurrentIndex].selectedSubtitleTableIndex,
			redoArray[redoArrayCurrentIndex].selectedSubtitleNumber);
		insertSubtitle(redoArray[redoArrayCurrentIndex].trackNumber,
			redoArray[redoArrayCurrentIndex].subtitleTableIndex,
			redoArray[redoArrayCurrentIndex].insertDirection,
			redoArray[redoArrayCurrentIndex].rowNumber,
			redoArray[redoArrayCurrentIndex].text,
			redoArray[redoArrayCurrentIndex].selectOption);
		break;

		case "subtitleDeletion":
		selectRow(redoArray[redoArrayCurrentIndex].selectedSubtitleTableIndex,
			redoArray[redoArrayCurrentIndex].selectedSubtitleNumber);
		textEditPopupAction('delete');
		break;

		default:
		notificationMsg1 = `Invalid action: ${redoArray[redoArrayCurrentIndex].action}`;
		notify("redo");
		return;
	}

	redoArray[redoArrayCurrentIndex].inUse = false;

	if ((redoArrayCurrentIndex === 0) && (redoArray[redoArraySize - 1].inUse)) {
		redoArrayCurrentIndex = redoArraySize - 1;
		return;
	}

	if (redoArrayCurrentIndex === 0) {
		return;
	}

	redoArrayCurrentIndex -= 1;

}

function enableFields(checkBox){

	console.log("enableFields checkBox Id = ", checkBox.id);

	switch (checkBox) {
	case myCheck01:
		if (myCheck01.checked == true) {
			showSubtitleTrack1 = true;
		} else {
			showSubtitleTrack1 = false;
		}
		break;
	case myCheck02:
		if (myCheck02.checked == true) {
			showSubtitleTrack2 = true;
			scrollStepMenu.value = '2';
		} else {
			showSubtitleTrack2 = false;
			scrollStepMenu.value = '1';
		}
		changeScrollStep();
		break;
	case myCheck03:
		if (myCheck03.checked == true) {
			showCounter = true;
		} else {
			showCounter = false;
		}
		break;
	case myCheck04:
		if (myCheck04.checked == true) {
			showSelectionInfo = true;
		} else {
			showSelectionInfo = false;
		}
		break;
	case myCheck05:
		if (myCheck05.checked == true) {
			showControlButtons = true;
		} else {
			showControlButtons = false;
		}
		break;
	case myCheck06:
		toggleSubtitleSection();
		break;
	case myCheck07:
		toggleEditing();
		break;
	case myCheck08:
		if (myCheck08.checked == true) {
			rectifySubtitleStartEnabled = true;
		} else {
			rectifySubtitleStartEnabled = false;
		}
		break;
	case myCheck09:
		//if (myCheck09.checked == true) {
		//	timeEditSynchronizeTwinnedTrack = true;
		//} else {
		//	timeEditSynchronizeTwinnedTrack = false;
		//}
		break;
	case myCheck10:
		toggleDashboard();
		break;
	case myCheck20:
		if (myCheck20.checked == true) {
			displayVideoControls = true;
		} else {
			displayVideoControls = false;
		}
		break;
	default:
		break;
	}

	computeSubtitleTableHeight();
	unFocus();

}

function toggleDashboard() {

	if (dashboard.style.display == "inline-block") {
		dashboard.style.display = "none";
		myCheck10.checked = false;
		showCounter = true;
		myCheck03.checked = true;
		showSelectionInfo = true;
		myCheck04.checked = true;
		showControlButtons = true;
		myCheck05.checked = true;
	} else {
		dashboard.style.display = "inline-block";
		myCheck10.checked = true;
		showCounter = false;
		myCheck03.checked = false;
		showSelectionInfo = false;
		myCheck04.checked = false;
		showControlButtons = false;
		myCheck05.checked = false;
	}
}

function toggleEditing() {

	if (STSpan1.contentEditable == "false") {
		console.log("toggleEditing editing changing to true");
		STSpan1.contentEditable = "true";
		STSpan2.contentEditable = "true";
		myCheck07.checked = true;
	} else {
		console.log("toggleEditing editing changing to false");
		STSpan1.contentEditable = "false";
		STSpan2.contentEditable = "false";
		myCheck07.checked = false;
	}

	console.log("toggleEditing editing ", STSpan1.contentEditable);

}


function toggleSubtitleSection() {

	if (showSubtitleTable) {
		showSubtitleTable = false;
		myCheck06.checked = false;
	} 
	else {
		showSubtitleTable = true;
		myCheck06.checked = true;
	}

	computeSubtitleTableHeight();
}


function toggleVideoSection() {

	if (showVideo) {
		showVideo = false;
		wrapper.style.height = 0;
		wrapper.style.marginTop = 0;
		wrapper.style.marginBottom = 0;
		wrapper.style.paddingTop = 0;
		wrapper.style.paddingBottom = 0;
	} 
	else {
		showVideo = true;
		wrapper.style.height = 'auto';
		wrapper.style.paddingTop = '5px';
		wrapper.style.paddingBottom = '5px';
	}
	console.log("toggleVideoSection showVideo = ", showVideo);
	computeSubtitleTableHeight();
	selectRow(selectedSubtitleTableIndex, selectedSubtitleNumber);

}

function changeTheme(newThemeNumber) {
    
	customColorsEnabled = false;
	themeAttributes = findThemeAttributeObject(newThemeNumber);

	console.log("Theme changed from " + selectedThemeNumber + " to " + newThemeNumber);
	selectedThemeNumber = newThemeNumber;

	document.body.style.backgroundColor = themeAttributes.backgroundColor;
	document.body.style.color = themeAttributes.foregroundColor;
	selectedCustomStyle.textContent = 
		".selectedCustom {background-color: " + themeAttributes.highlightBackgroundColor + "}";

	selectedTheme.style.backgroundColor = themeAttributes.backgroundColor;
	selectedTheme.style.color = themeAttributes.foregroundColor;
	selectedTheme.textContent = themeAttributes.themeName + dropDownArrow;

	customColorsCheckbox.checked = false;

	if (selectedSubtitleNumber > 0){
		highlightSelectedRow(selectedSubtitleTableIndex, selectedSubtitleNumber);
	 }
				
}  // changeTheme

function skipBackward() {

	let videoCurrentTime = 0;

	if (youTubeVideoId) {
		videoCurrentTime = player.getCurrentTime();
	} else {
		videoCurrentTime = videoArea.currentTime;
	}

	let newTime = videoCurrentTime - skipBackwardSeconds;
	console.log("skipBackward newTime ", newTime);

	const tableData = STTableMetadata[selectedSubtitleTableIndex];

	if (playing && !playingContinuously) {
		if (newTime < tableData.subtitleStartSeconds[selectedSubtitleNumber]) {
			newTime = tableData.subtitleStartSeconds[selectedSubtitleNumber];
		}
		skipTo(newTime);
		return;
	}
	
	if (newTime >= tableData.subtitleStartSeconds[selectedSubtitleNumber]) {
		skipTo(newTime);
		return;
	}

	let stop = false;
	let rowIndex = selectedSubtitleNumber;

	do {
		let trackNumber = tableData.subtitleTrack[selectedSubtitleNumber];
		rowIndex = findTrackRow('prev', trackNumber, selectedSubtitleTableIndex, rowIndex);
		if (!rowIndex) {
			stop = true;
		} else {
			if (newTime > tableData.subtitleEndSeconds[rowIndex]) {
				stop = true;
			} 
			else {
				if (newTime >= tableData.subtitleStartSeconds[rowIndex]) {
					selectRow(selectedSubtitleTableIndex, rowIndex);
					stop = true;
				}
			} 
		}
	}
	while ((!stop))

	skipTo(newTime);	

}

function skipTo(time) {
	if (youTubeVideoId) {
		//player.seekTo(time, true);
		player.seekTo(time, true);
		console.log("skipTo seekTo time ", time, " player.getCurrentTime ", player.getCurrentTime());
		if (!playing) {
			if (player.getPlayerState() != YT.PlayerState.PAUSED) {
				pauseYouTubeVideo();
			}
		}
	} else {
			videoArea.currentTime = time;
	}
	console.log("skipTo updateTime");
	updateTime();
}

function skipForward() {

	let videoCurrentTime = 0;

	if (youTubeVideoId) {
		videoCurrentTime = player.getCurrentTime();
	} else {
		videoCurrentTime = videoArea.currentTime;
	}

	let newTime = videoCurrentTime + skipForwardSeconds;

	const tableData = STTableMetadata[selectedSubtitleTableIndex];

	if (playing && !playingContinuously) {
		if (newTime > tableData.subtitleEndSeconds[selectedSubtitleNumber]) {
			newTime = tableData.subtitleEndSeconds[selectedSubtitleNumber] - skipForwardSeconds;
		}
		skipTo(newTime);
		return;
	}

	if (newTime <= tableData.subtitleEndSeconds[selectedSubtitleNumber]) {
		skipTo(newTime);
		return;
	}

	let stop = false;
	let rowIndex = selectedSubtitleNumber;

	do {
		rowIndex = findTrackRow('next', tableData.subtitleTrack[selectedSubtitleNumber], 
			selectedSubtitleTableIndex, rowIndex);
		if (!rowIndex) {
			stop = true;
		} else {
			if (newTime < tableData.subtitleStartSeconds[rowIndex]) {
				stop = true;
			} 
			else {
				if (newTime <= tableData.subtitleEndSeconds[rowIndex]) {
					selectRow(selectedSubtitleTableIndex, rowIndex);
					stop = true;
				}
			}
		} 
	}
	while ((!stop))

	skipTo(newTime);	

}

function checkTime() {
	if (!checkTimeEnabled) {
	if (verbose) {
		console.log('checkTime entered while NOT Enabled');
	}
		if (!youTubeVideoId) {
			videoArea.removeEventListener("timeupdate",checkTime,true);
		}
		return;
	}
	if (verbose) {
   	console.log('checkTime entered.');
	}
	let videoCurrentTime = 0;
	
	const tableData = STTableMetadata[selectedSubtitleTableIndex];

	if (playingContinuously) {
		let rowIndex = findTrackRow('next', tableData.subtitleTrack[selectedSubtitleNumber], 
			selectedSubtitleTableIndex, selectedSubtitleNumber);
		if (youTubeVideoId) {
			videoCurrentTime = player.getCurrentTime();
		}
		else {
			videoCurrentTime = videoArea.currentTime;
		}
		if ((rowIndex) && (videoCurrentTime >= tableData.subtitleStartSeconds[rowIndex])) {
			if ((!STSpan1Selected) && (!STSpan2Selected)) {
				selectRow(selectedSubtitleTableIndex, rowIndex);
			} else {
				pauseVideo();
				let subtitleStartSeconds = tableData.subtitleStartSeconds[selectedSubtitleNumber];
				if (youTubeVideoId) {
					player.seekTo(subtitleStartSeconds, true);
	if (verbose) {
		console.log("checkTime seekTo subtitleStartSeconds ", subtitleStartSeconds,
				" player.getCurrentTime ", player.getCurrentTime());
	}
				}
				else {
					videoArea.currentTime = subtitleStartSeconds;
				}
				checkTimeEnabled = false;
				updateTime();
				return;
			}
		}
		if (youTubeVideoId) {
			setTimeout(checkTime, checkTimeInterval);
		}
		updateTime();
		return;
	}

		// Playing the current selection once or in a loop.
	if (youTubeVideoId) {
		videoCurrentTime = player.getCurrentTime();
	}
	else {
		videoCurrentTime = videoArea.currentTime;
	}
	if (verbose) {
   	console.log('checkTime videoCurrentTime', videoCurrentTime, 
		' tableData.subtitleEndSeconds[selectedSubtitleNumber] ', 
		tableData.subtitleEndSeconds[selectedSubtitleNumber]);

   	console.log('checkTime looping = ', looping, ' videoStateBusy() = ', videoStateBusy()); 
	}
	// If the end of the current selection has not been reached, return.
	if (videoCurrentTime < selectionEndSeconds) {
		if (youTubeVideoId) {
			setTimeout(checkTime, checkTimeInterval);
		}
		updateTime();
		return; 
	}

	// Playing the current selection once
	if (!looping) {
		pauseVideo();
		checkTimeEnabled = false;
		updateTime();
		return;
	}
		// Playing the current selection in a loop.
	if (youTubeVideoId) {
		if (player.getPlayerState() != YT.PlayerState.PAUSED) {
			pauseYouTubeVideo();
		}
		player.seekTo(tableData.subtitleStartSeconds[selectedSubtitleNumber], true);
	if (verbose) {
		console.log("checkTime seekTo tableData.subtitleStartSeconds[selectedSubtitleNumber] ", 
			tableData.subtitleStartSeconds[selectedSubtitleNumber], 
			" player.getCurrentTime ", player.getCurrentTime());
	}
			setTimeout(checkTime, checkTimeInterval);
	}
	else {
		videoArea.removeEventListener("timeupdate", checkTime, true);
		clearTimeout(timeoutId);
		playVideo(selectionStartSeconds, selectionEndSeconds);
	}

	if (verbose) {
	console.log("checkTime updateTime");
	}
	updateTime();
	return;
} // checkTime

function checkTime2() {

	// Playing continuously more than one subtitle in the selected track
	// until the end time of the subtitle subset is exceeded


	if (!checkTimeEnabled) {
	if (verbose) {
		console.log('checkTime2 entered while NOT Enabled');
	}
		if (!youTubeVideoId) {
			videoArea.removeEventListener("timeupdate",checkTime2,true);
		}
		return;
	}

	let videoCurrentTime = 0;
	if (youTubeVideoId) {
		videoCurrentTime = player.getCurrentTime();
	}
	else {
		videoCurrentTime = videoArea.currentTime;
	}

	const tableData = STTableMetadata[selectedSubtitleTableIndex];

	if (verbose) {
	console.log('checkTime2 videoCurrentTime', videoCurrentTime, 
		' tableData.subtitleEndSeconds[selectedSubtitleNumber] ',tableData.subtitleEndSeconds[selectedSubtitleNumber],
		' selectionEndSeconds ', selectionEndSeconds);
   	console.log('checkTime2 looping = ', looping, ' videoStateBusy() = ', videoStateBusy()); 
	}

	if (videoCurrentTime >= selectionEndSeconds) {
		// Playing the current selection once
		if (!looping) {
			pauseVideo();
			checkTimeEnabled = false;
			updateTime();
			selectRow(selectedSubtitleTableIndex, subsetFirstRow);
			return;
		}

		// Playing the current selection in a loop.
		if (youTubeVideoId) {
			if (player.getPlayerState() != YT.PlayerState.PAUSED) {
				pauseYouTubeVideo();
			}
			player.seekTo(selectionStartSeconds, true);
	if (verbose) {
			console.log("checkTime2 seekTo selectionStartSeconds ", selectionStartSeconds, 
				" player.getCurrentTime ", player.getCurrentTime());
	}
				setTimeout(checkTime2, checkTimeInterval);
		}
		else {
			videoArea.removeEventListener("timeupdate", checkTime2, true);
			clearTimeout(timeoutId);
			selectRow(selectedSubtitleTableIndex, subsetFirstRow);
			playVideo(selectionStartSeconds, selectionEndSeconds);
		}
		return;
	}

	let rowIndex = findTrackRow('next', tableData.subtitleTrack[selectedSubtitleNumber], 
		selectedSubtitleTableIndex, selectedSubtitleNumber);

	if (youTubeVideoId) {
		videoCurrentTime = player.getCurrentTime();
	}
	else {
		videoCurrentTime = videoArea.currentTime;
	}
	if ((rowIndex) && (videoCurrentTime >= tableData.subtitleStartSeconds[rowIndex])) {
		selectRow(selectedSubtitleTableIndex, rowIndex);
	}
	if (youTubeVideoId) {
		setTimeout(checkTime2, checkTimeInterval);
	}

	if (verbose) {
	console.log("checkTime2 updateTime");
	}
	updateTime();

} // checkTime2

function pauseVideo() {
	console.log('pauseVideo entered');
	looping = false;
	checkTimeEnabled = false;
	if (youTubeVideoId) {
		pauseYouTubeVideo();
	}
	else {
		clearTimeout(timeoutId);
		videoArea.pause();
	}
}

function playVideo(time1, time2) {
	console.log('playVideo time1 ',time1);
	console.log('playVideo time2 ',time2);

   	if (time1 == -1) {
		pauseVideo();
		return;
	}

//	console.log('time1 type ',typeof(time1));
//	console.log('subtitleStartSeconds type ',typeof(subtitleStartSeconds[selectedSubtitleNumber]));

	/* set video start time */
	if (youTubeVideoId) {
//		if (player.getPlayerState() != YT.PlayerState.PAUSED) {
//			pauseYouTubeVideo();
//		}
		player.seekTo(time1, true);
		console.log('playVideo seekTo time1 ', time1, 
			' player.getCurrentTime() ', player.getCurrentTime());
//		document.getElementsByTagName('video')[0].currentTime = time1;  // also player.playerInfo.currentTime
		console.log('playVideo seekTo time1 (2)', time1, 
			' player.getCurrentTime() ', player.getCurrentTime());
		console.log('playVideo seekTo time1 (3)', time1, 
			'playVideo player.playerInfo.currentTime ', player.playerInfo.currentTime);
	} else {
		videoArea.currentTime = time1;
	}

	console.log("playVideo updateTime");
	updateTime();

	if (time2 == 0) {
		playingContinuously = true;
	}
	issuePlayVideo();
	playing = true;
    if (youTubeVideoId) {
//	??	setTimeout(checkTime, checkTimeInterval);
	}
	else {
    	console.log('playVideo: Adding timeupdate listener to run checkTime.');
		if (playingContinuously && (selectionEndSeconds != 0)) {
			videoArea.addEventListener("timeupdate", checkTime2, true);
		} else {
			videoArea.addEventListener("timeupdate", checkTime, true);
		}

	}	
	checkTimeEnabled = true;

} // playVideo


function issuePlayVideo() {
	console.log('issuePlayVideo entered');
	callUpdateTimeEnabled = true;
	callUpdateTimeTimeoutId ??= setTimeout(callUpdateTime, updateTimeInterval);

	currentLineButton.textContent = "Pause";
	playVideoButton.textContent = "Pause";
	loopButton.textContent = "Pause";
	currentLineOnDashboardButton.textContent = "Pause";
	playVideoOnDashboardButton.textContent = "Pause";
	loopOnDashboardButton.textContent = "Pause";
	textEditPopupPlaySingleButton.textContent = "Pause";

	if (!youTubeVideoId) {
		issuePlayVideo2();
	}
	else {
		player.playVideo();
		console.log("issuePlayVideo updateTime");
		updateTime();
		checkTimeEnabled = true;
		if (playingContinuously && (selectionEndSeconds != 0)) {
			setTimeout(checkTime2, checkTimeInterval);
		} else {
			setTimeout(checkTime, checkTimeInterval);
		}
	}	
}

async function issuePlayVideo2() {
	console.log('issuePlayVideo2 entered');
	try {
    	await videoArea.play();
		if (!playingContinuously) {
			let delay = (selectionEndSeconds - selectionStartSeconds) * 1000;
			console.log("issuePlayVideo2 delay = ", delay);
			timeoutId = setTimeout(handleSelectionTimeOut, delay);
		}

	} catch (err) {
		notificationMsg1 = `Play request failed, err = ${err}`;
    	console.log(`issuePlayVideo2 ${notificationMsg1}`);
		let playPauseError = "The play() request was interrupted by a call to pause()."
		if ((err.name != 'AbortError') || 
			(err.message.substring(0, (playPauseError.length)) != playPauseError)) {
			notify("issuePlayVideo2");
		}
	}
}

function handleSelectionTimeOut() {
	if (!playing) {return;}
   	console.log("handleSelectionTimeOut video currentTime = ", videoArea.currentTime);
	const tableData = STTableMetadata[selectedSubtitleTableIndex];
   	console.log("handleSelectionTimeOut ms elapsed = ",  
		(videoArea.currentTime - tableData.subtitleStartSeconds[selectedSubtitleNumber]) * 1000);
	videoArea.currentTime = selectionEndSeconds;
}

function handleVideoOnPause() {
	console.log('handleVideoOnPause looping = ',looping);
	if (looping) {
		issuePlayVideo();
		return;
	}
	playingContinuously = false;
	playing = false;
	looping = false;
	checkTimeEnabled = false;
	clearInterval(callUpdateTimeTimeoutId);
	callUpdateTimeEnabled = false;
	console.log("handleVideoOnPause updateTime");
	updateTime();
	currentLineButton.textContent = "Play single";
	playVideoButton.textContent = "Play";
	loopButton.textContent = "Loop";
	currentLineOnDashboardButton.textContent = "Play single";
	playVideoOnDashboardButton.textContent = "Play";
	loopOnDashboardButton.textContent = "Loop";
	textEditPopupPlaySingleButton.textContent = "Play single";

}

function handleVideoOnEnded() {
	console.log('handleVideoOnEnded looping = ', looping);
	if (looping) {
		issuePlayVideo();
		return;
	}
	const tableData = STTableMetadata[selectedSubtitleTableIndex];
	if (!playingContinuously) {
		if (youTubeVideoId) {
			player.seekTo(subtitleStartSeconds[selectedSubtitleNumber], true);
			console.log("handleVideoOnEnded seekTo tableData.subtitleStartSeconds[selectedSubtitleNumber]] ", 
				tableData.subtitleStartSeconds[selectedSubtitleNumber], 
				" player.getCurrentTime ", player.getCurrentTime());
			if (player.getPlayerState() != YT.PlayerState.PAUSED) {
				pauseYouTubeVideo();
			}
		}
		else {
			videoArea.currentTime = tableData.subtitleStartSeconds[selectedSubtitleNumber];
		}
		console.log("handleVideoOnEnded updateTime");
		updateTime();
	}
	playingContinuously = false;
	playing = false;
	looping = false;
	checkTimeEnabled = false;
	clearInterval(callUpdateTimeTimeoutId);
	callUpdateTimeEnabled = false;
	console.log("handleVideoOnEnded updateTime(2)");
	updateTime();
	currentLineButton.textContent = "Play single";
	playVideoButton.textContent = "Play";
	loopButton.textContent = "Loop";
	currentLineOnDashboardButton.textContent = "Play single";
	playVideoOnDashboardButton.textContent = "Play";
	loopOnDashboardButton.textContent = "Loop";
	textEditPopupPlaySingleButton.textContent = "Play single";

}

async function loadVideoFile(file) {

	console.log("loadVideoFile videoFileLoaded = " + videoFileLoaded);

	if (videoFileLoaded) {
		console.log("loadVideoFile videoFileLoaded true");
		return;
	}

//	const file = videoFile.files[0];
    const fileURL = URL.createObjectURL(file);
    videoArea.setAttribute("src", fileURL);
	console.log("loadVideoFile fileURL = ", fileURL);
	// console.log("loadVideoFile videoArea.getAttribute('src') = ", videoArea.getAttribute("src"));
	// console.log("loadVideoFile videoArea.src = ", videoArea.src);
	console.log("loadVideoFile file.name = ", file.name);

	videoArea.onpause = function() {
		handleVideoOnPause();
	}

	videoArea.onended = function() {
		handleVideoOnEnded();
	}

	videoArea.onloadedmetadata = function() {

		if (videoFileLoaded) {
			return;
		}

		if (videoArea.videoWidth === 0 && videoArea.videoHeight === 0) {
			audioFileLoaded = true;
			displayVideoControls = true;
			videoSizeMenu.value = '0.10';
		}

		if (displayVideoControls) {
			videoArea.controls = true;
		} else {
			videoArea.controls = false;
		}

		videoArea.style.display = 'inline-block';

		videoDuration = videoArea.duration;
		console.log('loadVideoFile Video duration = ',videoDuration);
		duration.textContent = formatTime(videoDuration);
		durationOnDashboard.textContent = duration.textContent;
		//setInterval(updateTime, updateTimeInterval);


		console.log('loadVideoFile intrinsic height = ',videoArea.videoHeight);
		console.log('loadVideoFile intrinsic width = ',videoArea.videoWidth);

		wrapper.style.backgroundColor = "transparent";
		wrapper.style.border = "none";
		pageTitle.style.display = "none";


		//let newWidth = Math.round((videoArea.videoWidth)*0.50);
		//console.log('loadVideoFile newWidth = ',newWidth);

		//var myWrapper = document.getElementById('wrapper');
		//myWrapper.style.width = newWidth + "px";
		//myWrapper.style.backgroundColor = "transparent";

		console.log(videoArea);
		console.log({videoArea});

		videoFileLoaded = true;
		showSeekBarContainer = true;

		handleVideoFileLoaded();
		
		console.log("videoArea.onloadedmetadata Exiting");

	}

	console.log("loadVideoFile Exiting");

}  // loadVideoFile

function handleVideoFileLoaded() {

	if (totalNumberOfSubtitlesRead > 0) {
		subtitleTimeCorrections();
	}

	if (selectedSubtitleNumber > 0){
		selectRow(selectedSubtitleTableIndex, selectedSubtitleNumber);
 	}

	changeVideoSize(); // Initialize video width.
	addKeyListenerForVideo();
	addKeyListener();

	removeVideoPrompts();
	updateSliderFill(seekBar);

}


function addKeyListenerForVideo() {

	document.addEventListener("keyup", function onEvent(event) {
		
		if ((document.activeElement.hasAttribute("contentEditable")) && 
			(document.activeElement.isContentEditable)) {
			switch (event.key) {
			default:
				return;	
			}
		}

		switch (event.key) {
		case "-":
			if (event.altKey) {
				videoCrop -= 0.1;
				if (videoCrop < 0.3) {
					videoCrop = 0.3;
				}
				computeSubtitleTableHeight();
			}
			if (!event.shiftKey) {
				break;
			}
		case "{":
			if (videoSizeMenu.selectedIndex > 0) {
				videoSizeMenu.selectedIndex -= 1;
			}
			changeVideoSize();
			break;
		case "+":
			if (event.altKey) {
				videoCrop += 0.1;
				if (videoCrop > 1) {
					videoCrop = 1;
				}
				computeSubtitleTableHeight();
			}
			if (!event.shiftKey) {
				break;
			}
		case "}":
			if (videoSizeMenu.selectedIndex < (videoSizeMenu.length - 1)) {
				videoSizeMenu.selectedIndex += 1;
			}
			changeVideoSize();
			break;
		}	
	});
	console.log("addKeyListenerForVideo completed");

}  // addKeyListenerForVideo

function handleSeek(e) {

	console.log("handleSeek entered");
	//	updateSliderFill(seekBar);

	let subtitleIndex = 1;
	let stop = false;
	let targetSeconds = (e.target.value / 100) * videoDuration;
	console.log("handleSeek e.target.value = ", e.target.value, 
		" targetSeconds = ", targetSeconds);

	const tableData = STTableMetadata[selectedSubtitleTableIndex];

	while ((!stop) && (subtitleIndex <= tableData.lastSubtitleNumber)) {
		if (targetSeconds <= tableData.subtitleEndSeconds[subtitleIndex]) {
			selectRow(selectedSubtitleTableIndex, subtitleIndex);
			stop = true;
		}
		subtitleIndex += 1;
	}

	if (!stop) {
		selectRow(selectedSubtitleTableIndex, tableData.lastSubtitleNumber);
	}

	if (playingContinuously) {
		playVideo(targetSeconds, 0);
	}

}

//function handleSeek(e) {
//	if (youTubeVideoId) {
//		player.seekTo((e.target.value / 100) * duration, true);
//		console.log("handleVideoOnEnded seekTo (e.target.value / 100) * duration ", 
//			((e.target.value / 100) * duration), 
//			" player.getCurrentTime ", player.getCurrentTime());
//
//	} else {
//		videoArea.currentTime = ((e.target.value / 100) * duration);
//	}
//
//	updateSliderFill(seekBar);
//
//}

function removeVideoPrompts() {
	document.getElementById('inputWrapper').remove();
	videoURLInput = null;
	videoURLButton = null;
	myCheck20 = null;
	document.getElementById('pageTitleWrapper').remove();	
	if (youTubeVideoId) {
		document.getElementById('videoFileInputDiv').remove();
		document.getElementById('videoArea').remove();
	} else {
		document.getElementById('player').remove();
	}
}

function getYouTubeVideoId(url) {
    var simplifiedPattern = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(simplifiedPattern);
	var result = (match && match[2].length == 11) ? match[2] : null;
	if (!result){
		notificationMsg1 = 'The YouTube video Id in the link provided is invalid';
		notify("getYouTubeID");
		return result;
	}

	youTubeVideoId = result;
	console.log("getYouTubeVideoId youTubeVideoId ", youTubeVideoId);

	var tag = document.createElement('script');

	tag.src = "https://www.youtube.com/iframe_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

	return result;
}

function onYouTubeIframeAPIReady() {
	
	wrapper.style.backgroundColor = "transparent";
	wrapper.style.border = "none";
	pageTitle.style.display = "none";


	// This function creates an <iframe> (and YouTube player)
	// after the API code downloads.

	let playerParms = {
		videoId: youTubeVideoId,
		frameborder: 0,
		width: 640,
		height: 360,
		autoplay: false,
		// allowfullscreen: true,
		class: 'video',
		controls: 0,
		disablekb: 1, // 1 = keyboard controls disabled
		rel: 0,
		iv_load_policy: 3, // 1 = annotations shown, 3 = annotations not shown
		playerVars: {
			'playsinline': 1, 'autoplay': 0, 'controls': 0
		},
		// playerVars: { 'start': 159, 'autoplay': 1, 'controls': 1, 'showinfo': 0, 'rel': 0 },
		events: {
			'onReady': onYouTubePlayerReady,
			'onStateChange': onYouTubePlayerStateChange,
			'enablejsapi': 1
		}
	}

	console.log("onYouTubeIframeAPIReady playerParms.controls = ", playerParms.controls);

	if (displayVideoControls) {
		playerParms.controls = 1;
		playerParms.playerVars = {'playsinline': 1, 'autoplay': 0, 'controls': 1}
	} else {
		playerParms.controls = 0;
		playerParms.playerVars = {'playsinline': 1, 'autoplay': 0, 'controls': 0}

	}

	player = new YT.Player('player', playerParms);

/*
	player = new YT.Player('player', {
		videoId: youTubeVideoId,
		frameborder: 0,
		width: 640,
		height: 360,
		autoplay: false,
		// allowfullscreen: true,
		class: 'video',
		controls: 0,
		disablekb: 1, // 1 = keyboard controls disabled
		rel: 0,
		iv_load_policy: 3, // 1 = annotations shown, 3 = annotations not shown
		playerVars: {
			'playsinline': 1, 'autoplay': 0, 'controls': 0 
		},
		// playerVars: { 'start': 159, 'autoplay': 1, 'controls': 1, 'showinfo': 0, 'rel': 0 },
		events: {
			'onReady': onYouTubePlayerReady,
			'onStateChange': onYouTubePlayerStateChange,
			'enablejsapi': 1
		}
	});


*/	
	//let elem = document.getElementById('player');
	//elem.classList.add('responsive-iframe');

}

// The API will call this function when the video player is ready.

function onYouTubePlayerReady(event) {
	console.log('onYouTubePlayerReady entered');
	iframeElement = document.getElementById("player");
	videoDuration = player.getDuration();
	duration.textContent = formatTime(videoDuration);
	durationOnDashboard.textContent = duration.textContent;
	console.log('onYouTubePlayerReady Video duration = ', videoDuration);
	//setInterval(updateTime, updateTimeInterval);

	videoFileLoaded = true;
	showSeekBarContainer = true;

	handleVideoFileLoaded();
}

function callUpdateTime() {
	if (!callUpdateTimeEnabled) {
		console.log("callUpdateTime entered when not enabled");
		return;
	}
	updateTime();
	if (callUpdateTimeEnabled) {
		setTimeout(callUpdateTime, updateTimeInterval);
	}
}

function updateTime() {
	let current;
	if (youTubeVideoId) {
		current = player.getCurrentTime();
	}
	else {
		current = videoArea.currentTime;
	}
	console.log("updateTime current ", current);

	currentTime.textContent = formatTime(current);
	currentTimeOnDashboard.textContent = currentTime.textContent;
	
	seekBar.value = (current / videoDuration) * 100;
	updateSliderFill(seekBar);

}

function updateSliderFill(slider) {
	const percentage = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
	slider.style.backgroundColor = 
		`linear-gradient(to right, #ffffff 0%,(255, 255, 255, 0.1) ${percentage}%)`;
}


function formatTime(seconds) {
	const h = (Math.floor(seconds / 3600)).toString().padStart(1, "0");
	const m = (Math.floor((seconds - (h * 3600)) / 60)).toString().padStart(2, "0");
	const s = (Math.floor(seconds % 60)).toString().padStart(2, "0");
	return `${h}:${m}:${s}`;
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.

function onYouTubePlayerStateChange(event) {
	console.log('onYouTubePlayerStateChange entered ', event.data );
	switch (event.data ) {
	case YT.PlayerState.PAUSED:
		handleVideoOnPause();
		break;
	case YT.PlayerState.ENDED:
		handleVideoOnEnded();
		break;
	case YT.PlayerState.PLAYING: // occurs after subtitles loaded
		if (!playing) {
			pauseYouTubeVideo();
			break;
		}
	default:
		break;
	}
}

function pauseYouTubeVideo() {
	console.log('pauseYouTubeVideo entered');
	player.pauseVideo();
	unFocus();
}


function createSubtitleFontOptions(fontArray, selectElement, chosenFont) {

  	while (selectElement.firstChild) {
		selectElement.removeChild(selectElement.lastChild);
	}

	let selectionFound = false;

	appendOption(loadFontFileOptionText);

	fontArray.forEach(function(fontName) {
		appendOption(fontName);
		if (fontName == chosenFont) {
			selectElement.value = chosenFont;
			selectionFound = true;
		}
	});

	return selectionFound;

	function appendOption(fontName) {
		var fontOption = document.createElement("option");
		fontOption.value = fontName;
		fontOption.text = fontName;
		fontOption.classList.add('selectOption');
		//fontOption.style.fontSize = "20px";
		selectElement.appendChild(fontOption);
	};
}

async function loadFontListFile(file) {

	console.log("loadFontListFile fileInput.files[0] " + fontListFileInput.files[0]);
	console.log("loadFontListFile file name " + file.name);
	let extension = file.name.substring((file.name.length - 4));
	console.log("loadFontListFile extension " + extension);

	switch(extension) {
	case '.txt':
		break;
	default:
		notificationMsg1 = `Unsupported file extension: ${extension}`;
		notify("loadFontListFile");
		return;
	}
	// Asynchronously load the file contents.
	const textContent = await file.text();
	const lineArray = textContent.split(/\n/);

	console.log("loadFontListFile Clearing fontListFileInput.value");
	fontListFileInput.value  = ""; //Clear .value to make this file element reusable
	console.log(fontListFileInput.value);

	let fontArray = [];
	let fontArrayIndex = 0;
	let problemEncountered = false;

	lineArray.filter(line => line.trim() !== "").forEach(createRow);

	if (fontArrayIndex == 0) {
		if (!problemEncountered) {
			notificationMsg1 = 'Empty font list file encountered. Operation cancelled';
			notify("loadFontListFile");
		}
		return;
	}

	selectedFont = fontArray[0];
	createSubtitleFontOptions(fontArray, subtitleFontMenu, selectedFont);
	changeFont();

	selectedFont2 = selectedFont;
	createSubtitleFontOptions(fontArray, subtitleFontMenu2, selectedFont2);
	changeFont2();
	
	return;

	function createRow(content) {
		if (problemEncountered) {return;}
		if (content.length > 50) {
			notificationMsg1 = 'Maximum line length exceeded: \n' + content + '\nOperation cancelled';
			notify("createRow");
			problemEncountered = true;
			return;
		}
		if (fontArrayIndex > 50) {
			notificationMsg1 = 'Maximum line number exceeded: \n' + content + '\nOperation cancelled';
			notify("createRow");
			problemEncountered = true;
			return;
		}
		fontArray[fontArrayIndex] = content;
		fontArrayIndex += 1;
	} // createRow
} // loadFontListFile

async function loadSubtitleFile(trackNumber, file) {

	if ((trackNumber < 0) || (trackNumber > maxTrackNumber)) {
		errorMsg = `loadSubtitleFile Invalid trackNumber: ${trackNumber}`;
		throwError(errorMsg);
	}

	notificationMsg1 = `Loading subtitle file ${trackNumber}`;
	notify("loadSubtitleFile");

	// sample mergeDataArray member: 
	// 	{trackIndex: "1", arrayIndex: 0} means TrkFileMetadata[1].array[0]
	//
	// sample TrkFileMetadata[x].array[y] member: 
	// 	{track: 0; startSeconds: 120, endSeconds: 123, startTime: "0:02.00", endTime: "0:02.03", 
	//		subtitleStyle: "File1", subtitle: "Caption text" }

	let oldSelectedSubtitleNumber = 0;
	let oldSelectedSubtitleTableIndex = null;

	if (trackNumber < maxTrackNumber) {  // if track is 0 or 1, but not 2
		if (trackNumber === 0) {
			oldSelectedSubtitleNumber = selectedSubtitleNumber;
			oldSelectedSubtitleTableIndex = selectedSubtitleTableIndex;
		}
		deleteAllSubtitleTables();
	}

	const subtitleTableIndex = TrkFileMetadata[trackNumber].STTableIndex;
	const tableData = STTableMetadata[subtitleTableIndex];  
	console.log("loadSubtitleFile subtitleTableIndex: ", subtitleTableIndex);  

	if (trackNumber === 0) {
		configuration = "1Track1Table";
		tableData.tbodyFragment = document.createDocumentFragment();
		tableData.tbodyFragmentCounter = 0;
	}

	await extractSubtitleFile(file, trackNumber);
//?? What if totalNumberOfSubtitlesRead = 0?


	// 1 track, single subtitle table

	if (trackNumber === 0) {
		console.log("loadSubtitleFile ", subtitleTableIndex, " ", STTableMetadata[subtitleTableIndex], " ", 
			STTableMetadata[subtitleTableIndex].STTable.rows.length);
		STTableMetadata[subtitleTableIndex].lastSubtitleNumber = 
			STTableMetadata[subtitleTableIndex].STTable.rows.length - 1;
		save1File.style.display = "inline-block";
		save2Files.style.display = "none";
		STTableMetadata[subtitleTableIndex].trackHeader.classList.add('notDisplayed');
		if (oldSelectedSubtitleNumber <= totalNumberOfSubtitlesRead) {
			selectedSubtitleNumber = oldSelectedSubtitleNumber;
			selectedSubtitleTableIndex = oldSelectedSubtitleTableIndex;
		}
		if (selectedSubtitleNumber == 0) {	// If no subtitle has yet been selected
			selectedSubtitleNumber = 1;		// by default, select the first subtitle
			selectedSubtitleTableIndex = trackNumber;
		}
		displaySubtitles();
		scrollStepMenu.value = '1';
		changeScrollStep();
		console.log("loadSubtitleFile TrkFileMetadata[0].loaded = ", TrkFileMetadata[0].loaded);
		logTimeStamp("loadSubtitleFile", "exiting");
		return;
	}
	
	save1File.style.display = "none";
	if (!fileAPIPickersSupported) {
		saveBothTracks.style.display = "none";
	}
	save2Files.style.display = "inline-block";
	STTableMetadata[subtitleTableIndex].trackHeader.classList.remove('notDisplayed');


	console.log("loadSubtitleFile TrkFileMetadata[1].loaded = ", TrkFileMetadata[1].loaded);
	console.log("loadSubtitleFile TrkFileMetadata[2].loaded = ", TrkFileMetadata[2].loaded);

	// 2 tracks, single subtitle table

	if ((numberOfSubtitleTables === 1) && 
		(TrkFileMetadata[1].loaded && TrkFileMetadata[2].loaded)) {
		if (TrkFileMetadata[1].twinnedTrack === 2) {
			const length1 = TrkFileMetadata[1].array.length;
			const length2 = TrkFileMetadata[2].array.length;
			if (length1 != length2) {
				notificationMsg1 = `File 1 contains ${length1} subtitles.`;
				notificationMsg2 = `File 2 contains ${length2} subtitles.`;
				notificationMsg3 = `Twinning requires an equal number of subtitles.`;
				notify("loadSubtitleFile");
				return;
			}
		}
		configuration = "2TwinnedTracks1Table";
		notificationMsg1 = "Merging tracks";
		notify("loadSubtitleFile");
		totalNumberOfSubtitlesRead = 
			interleave(TrkFileMetadata[1].array, TrkFileMetadata[2].array);
		console.log("loadSubtitleFile mergeDataArray.length = ", mergeDataArray.length);
		console.log("loadSubtitleFile mergeDataArray[0] = ", mergeDataArray[0]);
		console.log("loadSubtitleFile mergeDataArray[1] = ", mergeDataArray[1]);
		const subtitleTableIndex = TrkFileMetadata[mergeDataArray[0].trackIndex].STTableIndex;
		const tableData = STTableMetadata[subtitleTableIndex];  
		tableData.tbodyFragment = document.createDocumentFragment();
		tableData.tbodyFragmentCounter = 0;
		let mergeDataArrayLast = mergeDataArray.length - 1;
		for (let index = 0; index <= mergeDataArrayLast; index++) {
			let dataElement = mergeDataArray[index];
			let rowIndex = index + 1;
			createSubtitleRow(TrkFileMetadata[dataElement.trackIndex].array[dataElement.arrayIndex], 
				subtitleTableIndex, rowIndex);
			if ((tableData.tbodyFragmentCounter === tbodyFragmentChunkSize) || (rowIndex >= totalNumberOfSubtitlesRead)) {
				tableData.STTable.tBodies[0].appendChild(tableData.tbodyFragment);
				tableData.tbodyFragment = null;
				tableData.tbodyFragmentCounter = 0;
				await yieldToMain();
				// requestAnimationFrame(renderMsg);
				if (rowIndex < totalNumberOfSubtitlesRead) {
					tableData.tbodyFragment = document.createDocumentFragment();
				}
			}
		}
		tableData.lastSubtitleNumber = tableData.STTable.rows.length - 1;
		console.log("loadSubtitleFile 2 files 1 table ", subtitleTableIndex, " ", 
		tableData, " ", tableData.STTable.rows.length);
		selectedSubtitleTableIndex = 0;
		selectedSubtitleNumber = 1;		// by default, select the first subtitle
		displaySubtitles();
		if (trackNumber === 2) {
			scrollStepMenu.value = '2';
			changeScrollStep();
		}
		logTimeStamp("loadSubtitleFile", "exiting 1");
		return;
	}

	// 2 tracks, 2 subtitle tables
	//	configuration = "2TwinnedTracks2Tables";
	//	configuration = "2Tracks2Tables";


	logTimeStamp("loadSubtitleFile", "exiting 2");
	notification.style.display = 'none';

	console.log(`loadSubtitleFile trackNumber: ${trackNumber} TrkFileMetadata[2].loaded ${TrkFileMetadata[2].loaded}`);

	if ((firefoxAgent) && (trackNumber === 1) && (!TrkFileMetadata[2].loaded)) {
		console.log(`loadSubtitleFile calling fileNotify`);
		fileNotificationMsg1 =	`<div><p>Click OK to load file 2</p><br>` + 
				`<button class="button color4" style="float: left"` + 
				`onclick="subtitleFileInput2.click(); fileNotification.style.display = 'none'">OK</button>` + 
				`<button class="button color4" style="float: right"` +
				`onclick="deleteAllSubtitleTables(); fileNotification.style.display = 'none'">Cancel</button></div>`;
		fileNotify("loadSubtitleFile");
	}


}  // loadAndDisplaySubtitles

function displaySubtitles()	 {

	if (totalNumberOfSubtitlesRead == 0) { return; }

	notificationMsg1 = "Displaying subtitles";
	notify("loadSubtitleFile");

	selectionLabel.style.display = "inline";
	selectionHyphen.style.display = "inline";
	selectionLabelOnDashboard.style.display = "inline";
	selectionHyphenOnDashboard.style.display = "inline";
	
	console.log("displaySubtitles old totalNumberOfSubtitlesRead: " + oldTotalNumberOfSubtitlesRead
		+ " new " + totalNumberOfSubtitlesRead);

	let totalSubtitles = 0;
	STTableMetadata.forEach(function(content, index) { 
		console.log(`${index} ${totalSubtitles}`, content);
		totalSubtitles += content.lastSubtitleNumber; 
		console.log(`${index} ${totalSubtitles} `);
	});

	if (totalSubtitles != totalNumberOfSubtitlesRead) {
		errorMsg = `displaySubtitles totalSubtitles: ${totalSubtitles} != totalNumberOfSubtitlesRead: ${totalNumberOfSubtitlesRead}`;
		throwError(errorMsg);
	}

	if (videoFileLoaded) {
		subtitleTimeCorrections();
	}

	selectRow(selectedSubtitleTableIndex, selectedSubtitleNumber);

	if (showSubtitleTable) {
		subtitleTableDiv0.style.display = "block";
	}

	addKeyListenerForSubtitles();

	addKeyListener();
	
	notification.style.display = 'none';
	// unFocus();
	
}  // displaySubtitles

function updateRow() {

	let selectedSpan = "";
	let spanElement;
	let STTableIndex = null;
	let rowNumber = 0;
	let doNothing = true;

	if (STSpan1Selected) {
		selectedSpan = "STSpan1";
		spanElement = STSpan1;
		STTableIndex = STSpan1STTableIndex;
		rowNumber = STSpan1RowNumber;
		STSpan1Selected = false;
		console.log("updateRow STSpan1Selected = f 2");
		if (STSpan1Modified) {
			doNothing = false;
			STSpan1Modified = false;
		}
	} else if (STSpan2Selected) {
		selectedSpan = "STSpan2";
		spanElement = STSpan2;
		STTableIndex = STSpan2STTableIndex;
		rowNumber = STSpan2RowNumber;
		STSpan2Selected = false;
		if (STSpan2Modified) {
			doNothing = false;
			STSpan2Modified = false;
		}
	}

	// if (selectedSpan === "") {
	//	errorMsg = "updateRow No subtitle span selected";
	//	throwError(errorMsg);
	// }

	console.log(`updateRow ${selectedSpan} STTableIndex ${STTableIndex} rowNumber ${rowNumber} modified = ${!doNothing}`);

	if (doNothing) { return; }

	const tableData = STTableMetadata[STTableIndex];

	let oldValue = tableData.STTable.rows[rowNumber].querySelector(".classSubtitleText").innerHTML;
	let newValue = spanElement.innerHTML;
	console.log("updateRow ", selectedSpan, " oldValue = ", oldValue);
	console.log("updateRow ", selectedSpan, " newValue = ", newValue);
	if (spanElement.innerHTML === "_") {
		newValue = oldValue;
	} 
	if (oldValue != newValue) {
		changeCounter += 1;
		console.log("updateRow updating with newValue ", newValue);
		selectCurrentIndex("undoArray");
		undoArray[undoArrayCurrentIndex].inUse = true;
		undoArray[undoArrayCurrentIndex].changeNumber = changeCounter;
		undoArray[undoArrayCurrentIndex].action = "subtitleTextChange";
		undoArray[undoArrayCurrentIndex].selectedSubtitleTableIndex = STTableIndex;
		undoArray[undoArrayCurrentIndex].rowNumber = rowNumber;
		undoArray[undoArrayCurrentIndex].selectedSubtitleNumber = selectedSubtitleNumber;
		undoArray[undoArrayCurrentIndex].oldValue = oldValue;
		undoArray[undoArrayCurrentIndex].newValue = newValue;
		tableData.STTable.rows[rowNumber].querySelector(".classSubtitleText").innerHTML = newValue;
	}

	computeSubtitleTableHeight();
	unFocus();

}  // updateRow

function addKeyListenerForSubtitles() {

	if (keyListenerForSubtitlesAdded) { return; }

	document.addEventListener("keyup", function onEvent(event) {

		if ((document.activeElement.hasAttribute("contentEditable")) && 
			(document.activeElement.isContentEditable)) {
			switch (event.key) {
			case "Escape":
				STSpan1Modified = false;
				STSpan2Modified = false;
				selectRow(selectedSubtitleTableIndex, selectedSubtitleNumber);
				event.preventDefault();
				return;
			default:
				return;	
			}
		}

		const tableData = STTableMetadata[selectedSubtitleTableIndex];

		switch (event.key) {
		case "ArrowUp":
			buttonAction('prevST');
			event.preventDefault();
			break;
		case "ArrowDown":
			buttonAction('nextST');
			event.preventDefault();
			//if (computeSubtitleTableHeight < 0) {
  	    		//	event.preventDefault();
			//}
			break;
		case "b":
			console.log("b newLine before ", selectedSubtitleNumber);
			insertSubtitle(tableData.subtitleTrack[selectedSubtitleNumber],
				selectedSubtitleTableIndex,
				"before",
				selectedSubtitleNumber,
				"",
				"selectNew");
			break;
		case "d":
			console.log("d delete row ", selectedSubtitleNumber);
			textEditPopupAction('delete');
			// deleteSubtitle(selectedSubtitleTableIndex, selectedSubtitleNumber);
			break;
		case "n":
			console.log("n newLine after ", selectedSubtitleNumber);
			insertSubtitle(tableData.subtitleTrack[selectedSubtitleNumber],
				selectedSubtitleTableIndex,
				"after",
				selectedSubtitleNumber,
				"",
				"selectNew");
			break;
		case "r":
			console.log("r redo");
			redo();
			break;
		case "t":
			notificationMsg1 = new Date();
			notify("keyup");
			break;
		case "u":
			console.log("u undo");
			undo();
			break;
		case "Home":
			selectRow(selectedSubtitleTableIndex, 1, "scroll");
			break;
		case "End":
			selectRow(selectedSubtitleTableIndex, tableData.lastSubtitleNumber, "scroll");
			break;
		case "Delete":
			toggleVideoSection();
			break;
		case "/":
			if (!event.ctrlKey) {
				return;	
			}
			if (timeEditPopup.style.display != "none") {
				showTimeEditPopup(selectedSubtitleTableIndex, 0);
			} else {
				showTimeEditPopup(selectedSubtitleTableIndex, selectedSubtitleNumber);
			}
			event.preventDefault();
			break;
		case "-":
			if ((event.shiftKey) || (event.altKey)) {
				break;
			}
		case "[":
			if (subtitleFontSizeMenu.selectedIndex > 0) {
				subtitleFontSizeMenu.selectedIndex -= 1;
			}
			changeFontSize();
			break;
		case "+":
			if ((event.shiftKey) || (event.altKey)) {
				break;
			}
		case "]":
			if (subtitleFontSizeMenu.selectedIndex < (subtitleFontSizeMenu.length - 1)) {
				subtitleFontSizeMenu.selectedIndex += 1;
			}
			changeFontSize();
			break;
		case "Insert":
			toggleSubtitleSection();
			break;
		}	
	});

	STSpan1.addEventListener('click', (e) => {
		if (!(myCheck07.checked)) { return;}
		STSpan1Selected = true;
		//console.log("click STSpan1Selected = true");
		STSpan2Selected = false;
		e.preventDefault();
		return;
	});

	STSpan1.addEventListener('input', () => {
		STSpan1Modified = true;
		STSpan1Selected = true;
		STSpan2Selected = false;
	});

	STSpan1.addEventListener('paste', handlePaste, false);
		
	STSpan1.addEventListener('blur', () => {
		console.log("onblur STSpan1 STSpan1Modified = ", STSpan1Modified);
		STSpan1Selected = true;
		STSpan2Selected = false;
		updateRow();
	});

	STSpan2.addEventListener('click', (e) => {
		if (!(myCheck07.checked)) { return;}
		STSpan2Selected = true;
		STSpan1Selected = false;
		e.preventDefault();
		return;
	});
	STSpan2.addEventListener('input', () => {
		STSpan2Modified = true;
		STSpan1Selected = false;
		STSpan2Selected = true;
	});

	STSpan2.addEventListener('paste', handlePaste, false);

	STSpan2.addEventListener('blur', () => {
		console.log("onBlur STSpan2 STSpan2Modified = ", STSpan2Modified);
		STSpan1Selected = false;
		STSpan2Selected = true;
		updateRow();
	});

	keyListenerForSubtitlesAdded = true;
	console.log("addKeyListenerForSubtitles completed");


}  // addKeyListenerForSubtitles

function handlePaste(e) {
	
	e.preventDefault();
	let pasteTarget = e.currentTarget;

	// Get the clipboard data as plain text only
	// This completely strips any HTML tags from the copied content
	let pasteText = (e.originalEvent || e).clipboardData.getData('text/plain');

    // Get the current cursor position (selection)
    const selection = window.getSelection();

    // Make sure the user actually has a cursor active on the page
    if (selection.rangeCount <= 0) {
		STSpan1Modified = false;
		STSpan2Modified = false;
		STSpan1Selected = false;
		STSpan2Selected = false;
		notificationMsg1 = `selection.rangeCount <= 0; pasteTarget.id = ${pasteTarget.id}`;
		notify("handlePaste");
		return;
	}

	// Get the active range of the cursor
	const range = selection.getRangeAt(0);

	// 5. Delete any text the user might have currently highlighted
	range.deleteContents();

	// 6. Create a new text node with the plain text
	const textNode = document.createTextNode(pasteText);

	// 7. Insert the text node at the cursor's exact position
	range.insertNode(textNode);

	// 8. Move the cursor to the end of the newly pasted text
	// This ensures if the user keeps typing, it appears after the paste
	range.setStartAfter(textNode);
	range.collapse(true);

	// Update the selection with the new cursor position
	selection.removeAllRanges();
	selection.addRange(range);

	pasteTarget.focus();

	switch (pasteTarget.id) {
	case 'STSpan1':
		STSpan1Modified = true;
		STSpan1Selected = true;
		STSpan2Selected = false;
		break;
	case 'STSpan2':
		STSpan2Modified = true;
		STSpan1Selected = false;
		STSpan2Selected = true;
		break;
	default:
		errorMsg = 'handlePaste unexpected pasteTarget.id ' + pasteTarget.id;
		throwError(errorMsg);
	}

	return;
}

function deleteAllSubtitleTables() {

	if (timeEditPopup.style.display != "none") {
		showTimeEditPopup(selectedSubtitleTableIndex, 0);
	}

	STTableMetadata.forEach(function(content, index) { deleteSubtitleTable(index); });

	TrkFileMetadata[0].loaded = false;
	TrkFileMetadata[1].loaded = false;
	TrkFileMetadata[2].loaded = false;

	selectedSubtitleNumber = 0;
	selectedSubtitleTableIndex = null;
	oldTotalNumberOfSubtitlesRead = totalNumberOfSubtitlesRead
	totalNumberOfSubtitlesRead = 0;

	changeCounter = 0;
	undoArrayCurrentIndex = -1;
	redoArrayCurrentIndex = -1;
	configuration = "1Track1Table";

}

function deleteSubtitleTable(subtitleTableIndex) {

	const tableData = STTableMetadata[subtitleTableIndex];
	console.log(`deleteSubtitleTable Deleting subtitle table ${subtitleTableIndex} ${tableData.STTableId}`);

	let new_tbody = document.createElement('tbody');
	let old_tbody = document.getElementById(`subtitleTbody${subtitleTableIndex}`);
	old_tbody.parentNode.replaceChild(new_tbody, old_tbody);
	new_tbody.id = `subtitleTbody${subtitleTableIndex}`;
	old_tbody.remove();
	old_tbody = null;

	tableData.selectedSubtitleNumber = 0;
	tableData.lastSubtitleNumber = 0;
	tableData.subtitleStartSeconds = [];
	tableData.subtitleEndSeconds = [];
	tableData.subtitleTrack = [];
}

function newFile() {
	
	let index = 0;
	let totalSubtitles = 0;
	do {
		totalSubtitles += STTableMetadata[index].lastSubtitleNumber;
		index++;
	} while (index < STTableMetadata.length);

	if (totalSubtitles > 0) {
		if (!confirm("Discard all present subtitles and begin a new file?")) {
    		return;
		}
		deleteAllSubtitleTables();
	} 

	const trackIndex = 0;  // New track will be track 0
	const trackData = TrkFileMetadata[trackIndex];
	const subtitleTableIndex = trackData.STTableIndex;
	const tableData = STTableMetadata[subtitleTableIndex];
	
	let rowObject = {
		track: null,
		startSeconds: 0,
		endSeconds: 2,
		startTime: "0:00:00.00",
		endTime: "0:00:02.00",
		subtitleStyle: "",
		subtitle: ""
	};

	rowObject.track = trackIndex;
	rowObject.subtitleStyle = trackData.defaultSubtitleStyle;

	trackData.loaded = true;

	createSubtitleRow(rowObject, TrkFileMetadata[0].STTableIndex, 1);

	totalNumberOfSubtitlesRead = 1;
	selectedSubtitleTableIndex = trackIndex;
	selectedSubtitleNumber = 1;

	tableData.lastSubtitleNumber = 1;
	tableData.selectedSubtitleNumber = 1;

	addKeyListenerForSubtitles();
	displaySubtitles();

}

function getCharacterOffsetWithin(range, node) {
    var treeWalker = document.createTreeWalker(
        node,
        NodeFilter.SHOW_TEXT,
        function(node) {
            var nodeRange = document.createRange();
            nodeRange.selectNode(node);
            return nodeRange.compareBoundaryPoints(Range.END_TO_END, range) < 1 ?
                NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
        },
        false
    );

    var charCount = 0;
    while (treeWalker.nextNode()) {
        charCount += treeWalker.currentNode.length;
    }
    if (range.startContainer.nodeType == 3) {
        charCount += range.startOffset;
    }
    return charCount;
}

 
function textEditPopupAction(operand) {

	let STSpan1SelectedOnEntry = STSpan1Selected;
	let STSpan2SelectedOnEntry = STSpan2Selected;

	if (STSpan1SelectedOnEntry && STSpan2SelectedOnEntry) {
		notificationMsg1 = "Anomally: STSpan1 & STSpan2 both selected";
		notify("textEditPopupAction");
	}

	console.log("textEditPopupAction operand = ", operand);
	const tableData = STTableMetadata[selectedSubtitleTableIndex];

	switch (operand) {
		case 'splitToNext':
		case 'splitToNextNewline':
		case 'splitToPrev':
			STSpan1Modified = false; // Prevent onblur routine from updating the row
			STSpan2Modified = false;
			//document.getElementById("splitLineControl").style.pointerEvents = 'none';
			//setTimeout(() => {document.getElementById("splitLineControl").style.pointerEvents = ''}, 500);
			break;
		case 'playSingle':
			buttonAction('currentLine');
			return;
		case 'selectPrev':
			updateRow();
			buttonAction('prevST');
			return;
		case 'selectNext':
			updateRow();
			buttonAction('nextST');
			return;
		case 'insertAbove':
		case 'insertBelow':
			updateRow();
			insertLineWrapper.style.pointerEvents = 'none';
			setTimeout(() => {insertLineWrapper.style.pointerEvents = ''}, 500);
			if (operand === 'insertAbove') {
				insertSubtitle(tableData.subtitleTrack[selectedSubtitleNumber],
					selectedSubtitleTableIndex,
					"before",
					selectedSubtitleNumber,
					"",
					"selectNew");
			} else {
				insertSubtitle(tableData.subtitleTrack[selectedSubtitleNumber],
					selectedSubtitleTableIndex,
					"after",
					selectedSubtitleNumber,
					"",
					"selectNew");
			}
			return;
		case 'delete':
			updateRow();
			deleteSubtitle(selectedSubtitleTableIndex, selectedSubtitleNumber);
			return;
		default:
			console.log("textEditPopupAction invalid operand: ", operand);
			return;
	}

	// Handle splitToNext, splitToNextNewline, splitToPrev

	let selectedSpan = "";
	let spanElement;
	let rowNumber = 0;

	if (STSpan1SelectedOnEntry) {
		selectedSpan = "STSpan1";
		spanElement = STSpan1;
		rowNumber = STSpan1RowNumber;
		if (!STSpan1Selected) {
			notificationMsg1 = "STSpan1Selected already set to false";
			notify("textEditPopupAction");
		}
		STSpan1Selected = false;
		console.log("STSpan1Selected = f 4");
	} else if (STSpan2SelectedOnEntry) {
		selectedSpan = "STSpan2";
		spanElement = STSpan2;
		rowNumber = STSpan2RowNumber;
		STSpan2Selected = false;
	}

	console.log("textEditPopupAction operand ", operand, " rowNumber ", rowNumber,
		" selectedSpan ", selectedSpan);

	if (selectedSpan == "") {
		notificationMsg1 = "Place the cursor in an editable area before choosing a split action";
		notify("textEditPopupAction");
		return;
	}

    // Get the current cursor position (selection)
    const selection = window.getSelection();

    // Make sure the user actually has a cursor active on the page
    if (selection.rangeCount <= 0) {
		console.log("textEditPopupAction operand ", operand, " rowNumber ", rowNumber,
		' selectedSpan = ', selectedSpan);
		notificationMsg1 = "selection.rangeCount <= 0";
		notify("textEditPopupAction");
		return;
	}

	// Get the active range of the cursor
	const activeRange = selection.getRangeAt(0);

	// Check if the cursor is actually inside the span
	if (spanElement.contains(activeRange.startContainer)) { 
 	} else {
		console.log("textEditPopupAction operand ", operand, " rowNumber ", rowNumber,
		' selectedSpan = ""', selectedSpan);
		notificationMsg1 = `The cursor is not in the expected edit area: ${selectedSpan}`;
		notify("textEditPopupAction");
		spanElement.removeAllRanges();
		return;
	}

	if (operand === "splitToPrev") {
		// Extend the START of the range back to the very beginning of spanElement.
		// The end of the range stays exactly where the cursor is currently located.
		// The '0' indicates the very first position inside span2.
        activeRange.setStart(spanElement, 0);

	} else {
		// Extend the range from the cursor to the very end of spanElement.
		// spanElement.childNodes.length represents the absolute end of the span
		activeRange.setEnd(spanElement, spanElement.childNodes.length);
	}

	// Extract the contents.
	// This safely removes the text and <br> tags from spanElement
	// and packages them into a DocumentFragment.
	const extractedContent = activeRange.extractContents();
	tableData.STTable.rows[rowNumber].querySelector(".classSubtitleText").innerHTML = spanElement.innerHTML;

	if ((operand === "splitToNext") || (operand === "splitToNextNewline")) {
		// Insert the extracted content at the beginning of the next subtitle
		let nextRow = findTrackRow('next', tableData.subtitleTrack[rowNumber], selectedSubtitleTableIndex, rowNumber);
		if ((operand === "splitToNextNewline") || (!nextRow)) {
			nextRow = insertSubtitle(tableData.subtitleTrack[rowNumber],
				selectedSubtitleTableIndex,
				"after",
				rowNumber,
				"",
				"selectNone");
		}
		tableData.STTable.rows[nextRow].querySelector(".classSubtitleText").prepend(extractedContent);
		selectRow(selectedSubtitleTableIndex, selectedSubtitleNumber);
		return;
	} else {
		// Insert the extracted content at the end of the previous subtitle
		let prevRow = findTrackRow('prev', tableData.subtitleTrack[rowNumber], selectedSubtitleTableIndex, rowNumber);
		if (!prevRow) {
			prevRow = insertSubtitle(tableData.subtitleTrack[rowNumber],
				selectedSubtitleTableIndex,
				"before",
				rowNumber,
				"",
				"selectNone");
		} 
		tableData.STTable.rows[prevRow].querySelector(".classSubtitleText").append(extractedContent);
		selectRow(selectedSubtitleTableIndex, prevRow);
	}

	// Optional: clear the selection so the cursor doesn't jump weirdly
	selection.removeAllRanges();

	return;

}

function insertSubtitle(trackNumber, subtitleTableIndex, insertDirection, rowNumber, text, selectOption) {

	let helper = {
  		toTimeString: function(ms) {
    		let hh = Math.floor(ms / 1000 / 3600);
    		let mm = Math.floor(ms / 1000 / 60 % 60);
    		let ss = Math.floor(ms / 1000 % 60);
			let ff = Math.floor(ms % 1000);
			ff = Math.floor(ff / 10);
    		let time = hh + ":" + (mm < 10 ? "0" : "") + mm + ":" 
				+ (ss < 10 ? "0" : "") + ss + "." 
				+ (ff < 10 ? "0" : "") + ff;
    		return time;
  		}
	};

	// Is this needed??
	// if (tableData.lastSubtitleNumber === 0) {
	//	newFile();
	//	return 1;
	//}

	// sample TrkFileMetadata[x].array[y] member: 
	// 	{track: 0; startSeconds: 120, endSeconds: 123, startTime: "0:02.00", endTime: "0:02.03", 
	//		subtitleStyle: "File1", subtitle: "Caption text" }

	switch (insertDirection) {
	case "before": 
	case "after": 
		break;
	default:
		errorMsg = `insertSubtitle Invalid insertDirection: ${insertDirection}`;
		throwError(errorMsg);
	}

	switch (selectOption) {
	case "selectNew": 
	case "selectOld":
	case "selectNone": 
		break;
	default:
		errorMsg = `insertSubtitle Invalid selectOption: ${selectOption}`;
		throwError(errorMsg);
	}
	
	const trackData = TrkFileMetadata[trackNumber];
	const tableData = STTableMetadata[subtitleTableIndex];
	tableData.STTable.rows[tableData.selectedSubtitleNumber].classList.remove("selectedCustom");

	let rowObject = {};

	rowObject.track = trackNumber;
	rowObject.subtitleStyle = TrkFileMetadata[trackNumber].defaultSubtitleStyle;


	// ??  if (rowObject.endSeconds > videoDuration) {
	// 	rowObject.endSeconds = videoDuration;
	// }

	if (text != "") {
		rowObject.subtitle = text;
	} else {
		rowObject.subtitle = ""; // "…";
	}

	let twinnedTrack = trackData.twinnedTrack;
	let twinnedRow = 0;
	let newRowNumber = 0;
	let newRowNumber2 = 0;
	let track1 = 0;
	let track2 = 0;
	let futureSelectedRow = 0;
	// let configuration = "";
	let trackData1;
	let tableData1;
	let subtitleTableIndex1;
	let trackData2;
	let tableData2;
	let subtitleTableIndex2;


	// if (twinnedTrack === 0) {
	// 	configuration = "1Track1Table";
	// } else {
	// 	twinnedRow = findTwinnedRow(subtitleTableIndex, rowNumber);
	// 	if (twinnedRow === rowNumber) {  // twinned tracks reside in matched separate ST tables
	// 		configuration = "2TwinnedTracks2Tables";
	// 	} else {
	// 		configuration = "2TwinnedTracks1Table";
	// 	}
	// }

	if ((configuration === "2TwinnedTracks1Table") || (configuration === "2TwinnedTracks2Tables")) {
		twinnedRow = findTwinnedRow(subtitleTableIndex, rowNumber);
	}

	switch (configuration) {
	case "1Track1Table":
		switch (insertDirection) {
		case "before": 
			newRowNumber = rowNumber;
			if (rowNumber > 1) {
				rowObject.startSeconds = tableData.subtitleEndSeconds[rowNumber - 1];
			} else {
				rowObject.startSeconds = 0;
			}
			rowObject.endSeconds = tableData.subtitleStartSeconds[rowNumber];
			break;
		case "after": 
			newRowNumber = rowNumber + 1;
			rowObject.startSeconds = tableData.subtitleEndSeconds[rowNumber];
			if (rowNumber < tableData.lastSubtitleNumber) {
				rowObject.endSeconds = tableData.subtitleStartSeconds[rowNumber + 1];
			} else {
				rowObject.endSeconds = rowObject.startSeconds + 2;
			}
			break;
		}  // switch (insertDirection) 
		futureSelectedRow = newRowNumber;
		rowObject.startTime = helper.toTimeString(rowObject.startSeconds * 1000);
		rowObject.endTime = helper.toTimeString(rowObject.endSeconds * 1000);
		insertRow(tableData, newRowNumber);
		createSubtitleRow(rowObject, TrkFileMetadata[0].STTableIndex, newRowNumber);
		break;

	case "2TwinnedTracks2Tables":  // twinned tracks reside in matched separate ST tables
		switch (insertDirection) {
		case "before": 
			newRowNumber = rowNumber;
			if (rowNumber > 1) {
				rowObject.StartSeconds = tableData.subtitleEndSeconds[rowNumber - 1];
			} else {
				rowObject.StartSeconds = 0;
			}
			rowObject.endSeconds = tableData.subtitleStartSeconds[rowNumber];
			break;
		case "after": 
			newRowNumber = rowNumber + 1;
			rowObject.startSeconds = tableData.subtitleEndSeconds[rowNumber];
			if (rowNumber < tableData.lastSubtitleNumber) {
				rowObject.endSeconds = tableData.subtitleStartSeconds[rowNumber + 1];
			} else {
				rowObject.endSeconds = rowObject.startSeconds + 2;
			}
			break;
		}
		newRowNumber2 = newRowNumber;
		track1 = trackNumber;
		track2 = twinnedTrack;
		break;

	case "2TwinnedTracks1Table": // twinned tracks reside in a single ST table
		let selectionConfiguration = ""	;
		if (rowNumber < twinnedRow) {
			selectionConfiguration = "1stOf2Selected";
		} else {
			selectionConfiguration = "2ndOf2Selected";
		}

		switch (selectionConfiguration) {
		case "1stOf2Selected":
			switch (insertDirection) {
			case "before": 
				newRowNumber = rowNumber;
				if (rowNumber > 1) {
					rowObject.startSeconds = tableData.subtitleEndSeconds[rowNumber - 1];
				} else {
					rowObject.startSeconds = 0;
				}
				rowObject.endSeconds = tableData.subtitleStartSeconds[rowNumber];
				break;
			case "after": 
				newRowNumber = rowNumber + 2;
				rowObject.startSeconds = tableData.subtitleEndSeconds[rowNumber];
				if ((rowNumber + 2) < tableData.lastSubtitleNumber) {
					rowObject.endSeconds = tableData.subtitleStartSeconds[rowNumber + 2];
				} else {
					rowObject.endSeconds = rowObject.startSeconds + 2;
				}
				break;
			}
			track1 = trackNumber;
			track2 = twinnedTrack;
			break;
		case "2ndOf2Selected":
			switch (insertDirection) {
			case "before": 
				newRowNumber = twinnedRow;
				if (rowNumber > 1) {
					rowObject.startSeconds = tableData.subtitleEndSeconds[twinnedRow - 1];
				} else {
					rowObject.startSeconds = 0;
				}
				rowObject.endSeconds = tableData.subtitleStartSeconds[rowNumber];
				break;
			case "after": 
				newRowNumber = twinnedRow + 2;
				rowObject.startSeconds = tableData.subtitleEndSeconds[twinnedRow];
				if (rowNumber < tableData.lastSubtitleNumber) {
					rowObject.endSeconds = tableData.subtitleStartSeconds[rowNumber + 1];
				} else {
					rowObject.endSeconds = rowObject.startSeconds + 2;
				}
				break;
			}
			track1 = twinnedTrack;
			track2 = trackNumber;
			break;
		}  // switch (selectionConfiguration)
		newRowNumber2 = newRowNumber + 1;
		if (track1 === trackNumber) {
			futureSelectedRow = newRowNumber;
		} else {
			futureSelectedRow = newRowNumber2;
		}
		break;			
	}  // switch (configuration)

	if ((configuration === "2TwinnedTracks1Table") || (configuration === "2TwinnedTracks2Tables")) {
		rowObject.track = track1;
		rowObject.subtitleStyle = TrkFileMetadata[track1].defaultSubtitleStyle;
		rowObject.startTime = helper.toTimeString(rowObject.startSeconds * 1000);
		rowObject.endTime = helper.toTimeString(rowObject.endSeconds * 1000);

		let rowObject2 = {};
		rowObject2.track = track2;
		rowObject2.subtitleStyle = TrkFileMetadata[track2].defaultSubtitleStyle;
		rowObject2.startSeconds = rowObject.startSeconds;
		rowObject2.endSeconds = rowObject.endSeconds;
		rowObject2.startTime = rowObject.startTime;
		rowObject2.endTime = rowObject.endTime;
		rowObject2.subtitle = rowObject.subtitle;

		trackData1 = TrkFileMetadata[track1];
		tableData1 = STTableMetadata[trackData1.STTableIndex];
		subtitleTableIndex1 = trackData1.STTableIndex;
		trackData2 = TrkFileMetadata[track2];
		tableData2 = STTableMetadata[trackData2.STTableIndex];
		subtitleTableIndex2 = trackData2.STTableIndex;

		console.log(`insertSubtitle track1: ${track1} track2: ${track2}`);
		console.log(`insertSubtitle newRowNumber: ${newRowNumber} newRowNumber2: ${newRowNumber2}`);
		console.log("rowObject: ", rowObject);
		console.log("rowObject2: ", rowObject2);
		insertRow(tableData1, newRowNumber);
		insertRow(tableData2, newRowNumber2);
		createSubtitleRow(rowObject, subtitleTableIndex1, newRowNumber);
		createSubtitleRow(rowObject2, subtitleTableIndex2, newRowNumber2);
	}

	prepareUndo();

	let chosenRow = futureSelectedRow;

	switch (selectOption) {
		case "selectNew": 
			break;
		case "selectOld":
			if (rowNumber > 0) {
				chosenRow = rowNumber;
			}
			break;
		case "selectNone": 
			return newRowNumber;
	}

	selectRow(selectedSubtitleTableIndex, chosenRow);
	if (showTimePopup) {
		showTimeEditPopup(subtitleTableIndex, chosenRow);
	}

	return newRowNumber;

function prepareUndo() {

	changeCounter += 1;
	selectCurrentIndex("undoArray");
	undoArray[undoArrayCurrentIndex].inUse = true;
	undoArray[undoArrayCurrentIndex].changeNumber = changeCounter;
	undoArray[undoArrayCurrentIndex].action = "subtitleInsertion";
	
	undoArray[undoArrayCurrentIndex].selectedSubtitleTableIndex = selectedSubtitleTableIndex;
	undoArray[undoArrayCurrentIndex].selectedSubtitleNumber = selectedSubtitleNumber;

	// insertSubtitle(trackNumber, subtitleTableIndex, insertDirection, rowNumber, text, selectOption)	
	undoArray[undoArrayCurrentIndex].trackNumber = trackNumber;
	undoArray[undoArrayCurrentIndex].subtitleTableIndex = subtitleTableIndex;
	undoArray[undoArrayCurrentIndex].insertDirection = insertDirection;
	undoArray[undoArrayCurrentIndex].rowNumber = rowNumber;
	undoArray[undoArrayCurrentIndex].text = text;
	undoArray[undoArrayCurrentIndex].selectOption = selectOption;
	
	undoArray[undoArrayCurrentIndex].newRowNumber = newRowNumber;

	if (twinnedTrack === 0) {
		delete undoArray[undoArrayCurrentIndex].twinnedTrackObj;
	} else {
		undoArray[undoArrayCurrentIndex].twinnedTrackObj = {};
		undoArray[undoArrayCurrentIndex].twinnedTrackObj.subtitleTableIndex1 = subtitleTableIndex1;
		undoArray[undoArrayCurrentIndex].twinnedTrackObj.newRowNumber = newRowNumber;
		undoArray[undoArrayCurrentIndex].twinnedTrackObj.subtitleTableIndex2 = subtitleTableIndex2;
		undoArray[undoArrayCurrentIndex].twinnedTrackObj.newRowNumber2 = newRowNumber2;
	}

}  // insertSubtitle prepareUndo

}  // insertSubtitle

function insertRow(tableData, row) {
		tableData.STTable.insertRow(row);
		tableData.subtitleStartSeconds.splice(row, 0, 0);
		tableData.subtitleEndSeconds.splice(row, 0, 0);
		tableData.subtitleTrack.splice(row, 0, 0);
		tableData.lastSubtitleNumber++;
}  // insertRow

function deleteRow(tableData, row) {

	console.log("deleteRow row ", row, " tableData: ", tableData);

	tableData.STTable.deleteRow(row); 
	tableData.subtitleTrack.splice(row, 1);
	tableData.subtitleStartSeconds.splice(row, 1);
	tableData.subtitleEndSeconds.splice(row, 1);
	tableData.lastSubtitleNumber--;

}  //deleteRow

function deleteSubtitle(subtitleTableIndex, rowNumber) {

	console.log(`deleteSubtitle entered table: ${subtitleTableIndex} row: ${rowNumber}`);

	if (rowNumber <= 0) {return;}

	const tableData = STTableMetadata[subtitleTableIndex];
	const subtitleTrack = tableData.subtitleTrack[rowNumber];
	const trackData = TrkFileMetadata[subtitleTrack];

	let twinnedTrack = trackData.twinnedTrack;
	let twinnedTrackData;
	let twinnedTableData;
	let twinnedRow;

	if (twinnedTrack != 0) {
		twinnedTrackData = TrkFileMetadata[twinnedTrack];
		twinnedTableData = STTableMetadata[twinnedTrackData.STTableIndex];
		twinnedRow = findTwinnedRow(subtitleTableIndex, rowNumber);
	}

	prepareUndo();

	let isLast = false;
	if (rowNumber === tableData.lastSubtitleNumber) {
		isLast = true;
	}

	if (twinnedTrack === 0) { 
		deleteRow(tableData, rowNumber);
		selectRow(selectedSubtitleTableIndex, selectedSubtitleNumber);
		return;
	}

	console.log(`deleteSubtitle twinnedTrack: ${twinnedTrack} twinnedRow: ${twinnedRow}`);

	if (twinnedRow > rowNumber) { 
		deleteRow(twinnedTableData, twinnedRow);
		deleteRow(tableData, rowNumber);
	} else {
		deleteRow(tableData, rowNumber);
		deleteRow(twinnedTableData, twinnedRow);
	}

	if (!isLast) {
		selectRow(selectedSubtitleTableIndex, rowNumber);
	} else {
		if (tableData.lastSubtitleNumber >= 1) {
			selectRow(selectedSubtitleTableIndex, tableData.lastSubtitleNumber);
		} else {
			selectedSubtitleNumber = 0;
			STSpan1.innerHTML = "";
			STSpan2.innerHTML = "";
		}
	}

	console.log("deleteSubtitle exiting rowNumber = ", rowNumber);
	selectRow(selectedSubtitleTableIndex, selectedSubtitleNumber);

function prepareUndo() {

	changeCounter += 1;
	selectCurrentIndex("undoArray");
	undoArray[undoArrayCurrentIndex].inUse = true;
	undoArray[undoArrayCurrentIndex].changeNumber = changeCounter;
	undoArray[undoArrayCurrentIndex].action = "subtitleDeletion";
	undoArray[undoArrayCurrentIndex].selectedSubtitleNumber = selectedSubtitleNumber;

	undoArray[undoArrayCurrentIndex].selectedSubtitleTableIndex = selectedSubtitleTableIndex;
	undoArray[undoArrayCurrentIndex].rowNumber = rowNumber;

	undoArray[undoArrayCurrentIndex].startTime = 
		tableData.STTable.rows[rowNumber].querySelector(".classSubtitleStart").textContent;
	undoArray[undoArrayCurrentIndex].endTime = 
		tableData.STTable.rows[rowNumber].querySelector(".classSubtitleEnd").textContent;
	undoArray[undoArrayCurrentIndex].subtitleStyle = "";
	if (tableData.subtitleTrack[rowNumber] > 0) {
		undoArray[undoArrayCurrentIndex].subtitleStyle = 
			tableData.STTable.rows[rowNumber].querySelector(".classSubtitleTrack").textContent;
	}
	undoArray[undoArrayCurrentIndex].oldValue = 
		tableData.STTable.rows[rowNumber].querySelector(".classSubtitleText").innerHTML;
	undoArray[undoArrayCurrentIndex].subtitleTrack = tableData.subtitleTrack[rowNumber];
	undoArray[undoArrayCurrentIndex].subtitleStartSeconds = tableData.subtitleStartSeconds[rowNumber];
	undoArray[undoArrayCurrentIndex].subtitleEndSeconds = tableData.subtitleEndSeconds[rowNumber];

	delete undoArray[undoArrayCurrentIndex].twinnedTrackObj;

	if (twinnedTrack === 0) {
		delete undoArray[undoArrayCurrentIndex].twinnedTrackObj;
	} else {
		undoArray[undoArrayCurrentIndex].twinnedTrackObj = {};
		undoArray[undoArrayCurrentIndex].twinnedTrackObj.twinnedTrack = twinnedTrack;
		undoArray[undoArrayCurrentIndex].twinnedTrackObj.STTableIndex = twinnedTrackData.STTableIndex
		undoArray[undoArrayCurrentIndex].twinnedTrackObj.twinnedRow = twinnedRow;
		undoArray[undoArrayCurrentIndex].twinnedTrackObj.startTime = 
			twinnedTableData.STTable.rows[twinnedRow].querySelector(".classSubtitleStart").textContent;
		undoArray[undoArrayCurrentIndex].twinnedTrackObj.endTime = 
			twinnedTableData.STTable.rows[twinnedRow].querySelector(".classSubtitleEnd").textContent;
		undoArray[undoArrayCurrentIndex].twinnedTrackObj.subtitleStyle = 
				twinnedTableData.STTable.rows[twinnedRow].querySelector(".classSubtitleTrack").textContent;
		undoArray[undoArrayCurrentIndex].twinnedTrackObj.oldValue = 
			twinnedTableData.STTable.rows[twinnedRow].querySelector(".classSubtitleText").innerHTML;
		undoArray[undoArrayCurrentIndex].twinnedTrackObj.subtitleTrack = 
			twinnedTableData.subtitleTrack[twinnedRow];
		undoArray[undoArrayCurrentIndex].twinnedTrackObj.subtitleStartSeconds = 
			twinnedTableData.subtitleStartSeconds[twinnedRow];
		undoArray[undoArrayCurrentIndex].twinnedTrackObj.subtitleEndSeconds = 
			twinnedTableData.subtitleEndSeconds[twinnedRow];
	}

}  // deleteSubtitle prepareUndo

}  // deleteSubtitle

function createSubtitleRow(rowObject, subtitleTableIndex, rowIndex) {

	const tableData = STTableMetadata[subtitleTableIndex];

	tableData.subtitleStartSeconds[rowIndex] = rowObject.startSeconds;
	tableData.subtitleEndSeconds[rowIndex] = rowObject.endSeconds;
	tableData.subtitleTrack[rowIndex] = rowObject.track;

	let newRow;

	if ((rowIndex + 1) > tableData.STTable.rows.length) {
		newRow = document.createElement("tr");
	} else {
		newRow = tableData.STTable.rows[rowIndex];
	}

	newRow.style.display = 'table-row'; /* Ensure that the row is visible. */
	newRow.style.borderTop = "1px solid #001858";

	let rowColumns = `
		<tr class="classSubtitleRow">
		<td class="classSubtitleNumber"></td>
		<td class="classSubtitleStart">${rowObject.startTime}</td>
		<td class="classSubtitleEnd">${rowObject.endTime}</td>
		`;
		
//	if (!TrkFileMetadata[0].loaded) {
	if (tableData.subtitleTrack[rowIndex] > 0) {
		rowColumns += 
			`<td class="classSubtitleTrack">${rowObject.subtitleStyle}</td>`;
	}

	rowColumns += 
		`<td class="classSubtitleText">${rowObject.subtitle}</td>
		</tr>`;

	newRow.innerHTML = rowColumns;

	if ((rowIndex + 1) > tableData.STTable.rows.length) {
		tableData.tbodyFragment.appendChild(newRow);
		tableData.tbodyFragmentCounter += 1;
	}

//  Sample syntax:
//	spanStartTime.innerHTML = document.getElementById(`row${rowNumber}SubtitleStart`).innerHTML;

}  // createSubtitleRow


function showTimeEditPopup(subtitleTableIndex, rowNumber) {

	if (rowNumber < 1) {
		if (timeEditPopup.style.display === "none") {
		    alert('showTimeEditPopup Hide requested, but timeEditPopup not displayed');
			return;
		};
		console.log(`showTimeEditPopup Hiding timeEditPopup, table: ${subtitleTableIndex} rowNumber: ${rowNumber}`);
		timeEditPopup.style.display = "none";
		timeEditPopupRow = 0;
		timeEditPopupTableIndex = null;
		timeEditPopupSubtitleTrack = null;
		toggleHideShow('timeEditPopupOToOff');
		return;
	}

	const tableData = STTableMetadata[subtitleTableIndex];
	const subtitleTrack = tableData.subtitleTrack[rowNumber];
	const trackData = TrkFileMetadata[subtitleTrack];

	console.log(`showTimeEditPopup table: ${subtitleTableIndex} rowNumber: ${rowNumber} track: ${subtitleTrack}`);

	let newDisplay = (timeEditPopupRow === 0);

	fillTimeFields((tableData.subtitleStartSeconds[rowNumber] * 1000), "t1");
	fillTimeFields((tableData.subtitleEndSeconds[rowNumber] * 1000), "t2");

	if (newDisplay) {
		timeEditPopup.style.display = "flex"; // "inline-block";
		timeEditPopup.style.visibility = "visible"; 
		timeEditPopup.style.opacity = "0.1"; 

		let width1 = Math.ceil(timeEditPopupWrapper1.getBoundingClientRect().width);
		let width2 = Math.ceil(timeEditPopupWrapper2.getBoundingClientRect().width);
		let width3 = Math.ceil(textEditPopupWrapper.getBoundingClientRect().width);

		let width = width1 + width2 + width3;
		console.log(`showTimeEditPopup width1 = ${width1}`);
		console.log(`showTimeEditPopup width2= ${width2}`);
		console.log(`showTimeEditPopup width3= ${width3}`);
		console.log(`showTimeEditPopup width = ${width}`);
		timeEditPopup.style.width =  `${width+0}px`;
		//timeEditPopup.style.width =  `900px`;
	}

	if ((timeEditPopupRow === rowNumber) && (timeEditPopupSubtitleTrack === subtitleTrack)) {
		return;
	}

	timeEditPopupRow = rowNumber;
	timeEditPopupTableIndex = subtitleTableIndex;
	timeEditPopupSubtitleTrack = subtitleTrack;
	t1timeEditPopupOldTime = tableData.STTable.rows[rowNumber].querySelector(".classSubtitleStart").textContent;
	t1timeEditPopupOldSeconds = tableData.subtitleStartSeconds[rowNumber];
	t2timeEditPopupOldTime = tableData.STTable.rows[rowNumber].querySelector(".classSubtitleEnd").textContent;
	t2timeEditPopupOldSeconds = tableData.subtitleEndSeconds[rowNumber];

	let trackInfo = `&nbsp;-&nbsp;`;
	if (TrkFileMetadata[2].loaded) {
		trackInfo += `Track ${timeEditPopupSubtitleTrack}`;
	}
	trackInfo += `&nbsp;Row ${timeEditPopupRow}`;
	timeEditPopupTrackInfo.innerHTML = trackInfo;
/*
	let twinnedTrack = trackData.twinnedTrack;

	if (twinnedTrack === 0) { return; }

	const twinnedTrackData = TrkFileMetadata[twinnedTrack];
	const twinnedTableData = STTableMetadata[twinnedTrackData.STTableIndex];

	let twinnedRow = findTwinnedRow(subtitleTableIndex, rowNumber);

	let twinnedRow = 0;
	const twinnedTrackData = TrkFileMetadata[twinnedTrack];
	const twinnedTableData = STTableMetadata[twinnedTrackData.STTableIndex];

	if (trackData.STTableIndex != twinnedTrackData.STTableIndex) {
		if (rowNumber <= twinnedTrackData.lastSubtitleNumber) {
			twinnedRow = rowNumber;
		}
	} else {
		if (subtitleTrack < twinnedTrack) {
			twinnedRow = findTrackRow('next', twinnedTrack, trackData.STTableIndex, rowNumber);
		} else {
			twinnedRow = findTrackRow('prev', twinnedTrack, trackData.STTableIndex, rowNumber);
		}
	};

	if (twinnedRow <= 0) {
		errorMsg = `showTimeEditPopup Twinned row not found, table: ${subtitleTableIndex} row: ${rowNumber}`;
		throwError(errorMsg);
	}


	t1timeEditPopupOldTimeOnTwinnedTrack = 
		twinnedTableData.STTable.rows[twinnedRow].querySelector(".classSubtitleStart").textContent;
	t1timeEditPopupOldSecondsOnTwinnedTrack = twinnedTableData.subtitleStartSeconds[twinnedRow];
	t2timeEditPopupOldTimeOnTwinnedTrack = 
		twinnedTableData.STTable.rows[twinnedRow].querySelector(".classSubtitleEnd").textContent;
	t2timeEditPopupOldSecondsOnTwinnedTrack = twinnedTableData.subtitleEndSeconds[twinnedRow];
*/
	return;

function fillTimeFields (ms, timeSelector) {

	let timeObject = {};

	switch (timeSelector) {
		case "t1":
			timeObject = t1timeObject;
			break;
		case "t2":
			timeObject = t2timeObject;
			break;
		default:
			errorMsg = 'saveTime invalid timeSelector: ' + timeSelector;
			throwError(errorMsg);
	}

	let hh = Math.floor(ms / 1000 / 3600);
	let mm = Math.floor(ms / 1000 / 60 % 60);
	let ss = Math.floor(ms / 1000 % 60);
	let ff = Math.floor(ms % 1000);


	timeObject.hourField1.textContent = hh - (Math.floor(hh / 10) * 10);

	timeObject.minuteField1.textContent = Math.floor(mm / 10);
	timeObject.minuteField2.textContent = mm - (Math.floor(mm / 10) * 10);

	timeObject.secondField1.textContent = Math.floor(ss / 10);
	timeObject.secondField2.textContent = ss - (Math.floor(ss / 10) * 10);

	let millisecondHundreds = Math.floor(ff / 100);
	let millisecondTens = Math.floor((ff - (millisecondHundreds * 100)) / 10);
	let millisecondsOnes = ff - (Math.floor(ff / 10) * 10);
	timeObject.millisecondField1.textContent = millisecondHundreds;
	timeObject.millisecondField2.textContent = millisecondTens;
	timeObject.millisecondField3.textContent = millisecondsOnes;

}  // fillTimeFields

}  // showTimeEditPopup

function toggleHideShow(triggerId) {

	console.log("toggleHideShow ", triggerId, " timeEditPopup.style.opacity ", timeEditPopup.style.opacity);

	if (triggerId === "timeEditPopupV") {
		if (timeEditPopupV.classList.contains('selected')) {
			timeEditPopupV.classList.remove("selected");
		}
		else {
			timeEditPopupV.classList.add("selected");
			if (timeEditPopupO.classList.contains('selected')) {
				timeEditPopupO.classList.remove("selected");
				timeEditPopupThumb.style.display = 'none';
				timeEditPopup.style.visibility = "visible"; 
				timeEditPopup.style.opacity = "1"; 
			}
		}
		return;
	}

	// timeEditPopupOToOff or timeEditPopupO
	if (timeEditPopupThumb.style.display === 'none') {
		if (triggerId === "timeEditPopupOToOff") {return;}

		console.log("toggleHideShow 1 timeEditPopup.style.opacity ", timeEditPopup.style.opacity);
		if (timeEditPopupV.classList.contains('selected')) {
			timeEditPopupV.classList.remove("selected");
		}
		timeEditPopupO.classList.add("selected");
		timeEditPopupThumb.style.top = (timeEditPopup.offsetTop + timeEditPopupWrapper2.offsetTop - 8) + 'px';
		timeEditPopupThumb.style.left = (timeEditPopup.offsetLeft + timeEditPopupWrapper2.offsetLeft - 18) + 'px';
		timeEditPopupThumb.style.display = 'block';
		timeEditPopupThumb.addEventListener('mouseover', (e) => { 
			timeEditPopup.style.visibility = "visible"; 
			timeEditPopup.style.opacity = "1"; 
		} );
		timeEditPopupThumb.addEventListener('mouseleave', (e) => { 
			console.log("timeEditPopupThumb mouseleave");
			timeEditPopup.style.visibility = "hidden"; 
		} );
	} else {
		console.log("toggleHideShow 2 timeEditPopup.style.opacity ", timeEditPopup.style.opacity);
		timeEditPopupThumb.style.display = 'none';
		if (timeEditPopupO.classList.contains('selected')) {
			timeEditPopupO.classList.remove("selected");
		}
	}

} // toggleHideShow

function dragElement(elmnt) {
	let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
	//if (document.getElementById(elmnt.id + "Header")) {
	//	/* if present, the header is where you move the DIV from:*/
	//	console.log("dragElement 1");
	//	document.getElementById(elmnt.id + "Header").onmousedown = dragMouseDown;
	//} else {
		/* otherwise, move the DIV from anywhere inside the DIV:*/
		console.log("dragElement 2");
		elmnt.onmousedown = dragMouseDown;
	//}

function dragMouseDown(e) {
	// e = e || window.event;
	e.preventDefault();
	// get the mouse cursor position at startup:
	pos3 = e.clientX;
	pos4 = e.clientY;
	document.onmouseup = closeDragElement;
	// call a function whenever the cursor moves:
	document.onmousemove = elementDrag;
}

function elementDrag(e) {
	// e = e || window.event;
	e.preventDefault();
	// calculate the new cursor position:
	pos1 = pos3 - e.clientX;
	pos2 = pos4 - e.clientY;
	pos3 = e.clientX;
	pos4 = e.clientY;
	// set the element's new position:
	elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
	elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
	if (elmnt.style.visibility === "hidden") {
		elmnt.style.visibility = "visible";
	}
}

function closeDragElement() {
	/* stop moving when mouse button is released:*/
	document.onmouseup = null;
	document.onmousemove = null;
}

}  // dragElement

function interleave(array1, array2) {

	console.log("interleave entered");

	let index1 = 0;
	let index2 = 0;

	// sample mergeDataArray[x] member: 
	// 	{trackIndex: "1", arrayIndex: 0} means TrkFileMetadata[1].array[0]
	mergeDataArray = [];

	while (index1 < array1.length && index2 < array2.length) {
		const time1 = array1[index1].startSeconds;
		const time2 = array2[index2].startSeconds;

	    if ((configuration === "2TwinnedTracks1Table") || (time1 == time2)) {
    		mergeDataArray.push({ trackIndex: 1, arrayIndex: index1 });
			mergeDataArray.push({ trackIndex: 2, arrayIndex: index2 });
			index1++;
		    index2++;
		} else if (time1 < time2) {
			mergeDataArray.push({ trackIndex: 1, arrayIndex: index1 });
			index1++;
	    } else {
			mergeDataArray.push({ trackIndex: 2, arrayIndex: index2 });
			index2++;
		}
  	}

	// Add remaining elements from array1
	while (index1 < array1.length) {
		mergeDataArray.push({ trackIndex: 1, arrayIndex: index1 });
		index1++;
	}

	// Add remaining elements from array2
	while (index2 < array2.length) {
		mergeDataArray.push({ trackIndex: 2, arrayIndex: index2 });
		index2++;
	}

	console.log("interleave mergeDataArray ", mergeDataArray); 
	return mergeDataArray.length;

}

async function extractSubtitleFile(file, trackNumber) {

	const trackData = TrkFileMetadata[trackNumber];

	console.log("extractSubtitleFile trackData: ", trackData);

	console.log(`extractSubtitleFile file.name = ${file.name}`);
	let extension = file.name.substring((file.name.length - 4));
	console.log(`extractSubtitleFile extension = ${extension}`);

	// Asynchronously load the file contents.
	const textContent = await file.text();

	console.log("extractSubtitleFile file ", file);
	console.log("extractSubtitleFile {file} ", {file});

	trackData.array = [];
	trackData.loaded = false;

	let counter = 0;

	switch(extension) {
		case '.ass':
			let parseOptions = {};
			const lineArray = parse(textContent, parseOptions);
			let lineArrayLast = lineArray.length - 1;
			for (let index = 0; index < lineArrayLast; index++) {
				let content = lineArray[index];
				await captureSingleSubtitle(content, trackNumber); 
			}
			break;
		case '.srt':
			const srtArray = parseSrt(textContent);
			let srtArrayLast = srtArray.length - 1;
			for (let index = 0; index < srtArrayLast; index++) {
				let content = srtArray[index];
				await captureSingleSubtitle(content, trackNumber); 
			}
			break;
		default:
			errorMsg = 'unsupported file extension: ' + extension;
			throwError(errorMsg);
			break;
	}

	if (trackNumber === 0) {
		const tableData = STTableMetadata[0];
		if (tableData.tbodyFragmentCounter != 0) {
			tableData.STTable.tBodies[0].appendChild(tableData.tbodyFragment);
			tableData.tbodyFragment = null;
			tableData.tbodyFragmentCounter = 0;
			await yieldToMain();
			// requestAnimationFrame(renderMsg);
		}
	}

	if (counter !== 0) {
		trackData.loaded = true;
		console.log(`extractSubtitleFile ${counter} subtitles read`);
		if (trackNumber === 0) {
			totalNumberOfSubtitlesRead = counter;
		}
	}

	return counter;

function filterSsaCaptions(arrayElement) {
    return (arrayElement.type == "caption");
}

async function captureSingleSubtitle(content, trackNumber) {

// helper adapted from https://github.com/papnkukn/subsrt/blob/master/lib/format/srt.js

	let helper = {
  		toTimeString: function(ms) {
    		let hh = Math.floor(ms / 1000 / 3600);
    		let mm = Math.floor(ms / 1000 / 60 % 60);
    		let ss = Math.floor(ms / 1000 % 60);
			let ff = Math.floor(ms % 1000);
			ff = Math.floor(ff / 10);
    		/* let time = (hh < 10 ? "0" : "") 
				+ hh + ":" + (mm < 10 ? "0" : "") + mm + ":" 
				+ (ss < 10 ? "0" : "") + ss + "," 
				+ (ff < 100 ? "0" : "") + (ff < 10 ? "0" : "") + ff;
			*/
    		let time = hh + ":" + (mm < 10 ? "0" : "") + mm + ":" 
				+ (ss < 10 ? "0" : "") + ss + "." 
				+ (ff < 10 ? "0" : "") + ff;
    		return time;
  		}
	};

	let rowData = {};
	counter += 1;

	rowData.startSeconds = content.start / 1000;
	rowData.endSeconds = content.end / 1000;
	rowData.track = trackNumber;
	rowData.startTime = helper.toTimeString(content.start);
	rowData.endTime = helper.toTimeString(content.end);
	
	if (content.subtitleStyle == '') {
		rowData.subtitleStyle = trackData.defaultSubtitleStyle;
	}
	else {
		if (trackNumber === 0) {
			rowData.subtitleStyle = content.subtitleStyle;
		}
		else {
			rowData.subtitleStyle = `${trackData.defaultSubtitleStyle}-${content.subtitleStyle}`;
		}
	}

	//rowData.subtitle = content.text;  
	//rowData.subtitle = clearHTMLTags(content.text);  // Sanitize text to remove possibly malicious HTML code.
	rowData.subtitle = sanitizeHTML(content.text, ['br', 'i']);  // Sanitize text to remove possibly malicious HTML code.

	if (trackNumber != 0) {
		trackData.array.push(rowData);
	} else {
		const subtitleTableIndex = TrkFileMetadata[trackNumber].STTableIndex;
		const tableData = STTableMetadata[subtitleTableIndex];  
		if ((tableData.tbodyFragmentCounter === 0) && (tableData.tbodyFragment === null)) {
			tableData.tbodyFragment = document.createDocumentFragment();
		}
		createSubtitleRow(rowData, subtitleTableIndex, counter);
		if (tableData.tbodyFragmentCounter === tbodyFragmentChunkSize) {
			tableData.STTable.tBodies[0].appendChild(tableData.tbodyFragment);
			tableData.tbodyFragment = null;
			tableData.tbodyFragmentCounter = 0;
			await yieldToMain();
			// requestAnimationFrame(renderMsg);
		}
	}


} // captureSingleSubtitle
} // extractSubtitleFile

function sanitizeHTML(htmlString, allowedTags) {
    // 1. Parse the string into a temporary DOM Document
    const doc = new DOMParser().parseFromString(htmlString, 'text/html');
    const allowed = new Set(allowedTags.map(tag => tag.toUpperCase()));

    // 2. Recursive function to clean nodes bottom-up
    function clean(node) {
        // Convert to array to avoid live NodeList mutation issues
        const children = Array.from(node.childNodes);
        
        for (const child of children) {
            if (child.nodeType === Node.ELEMENT_NODE) {
                // Clean the children first
                clean(child);

                // Remove scripts and styles completely (don't keep their text)
                if (child.nodeName === 'SCRIPT' || child.nodeName === 'STYLE') {
                    child.remove();
                    continue;
                }

                if (allowed.has(child.nodeName)) {
                    // TAG IS ALLOWED: Strip all attributes to prevent XSS (e.g., onclick="")
                    while (child.attributes.length > 0) {
                        child.removeAttribute(child.attributes[0].name);
                    }
                } else {
                    // TAG IS NOT ALLOWED: Replace the tag with its text/children (unwrap it)
                    // e.g., <b>Text</b> becomes just "Text"
                    child.replaceWith(...child.childNodes);
                }
            }
        }
    }

    clean(doc.body);
    return doc.body.innerHTML;
}


/**
* Returns a string containing plain text format by removing HTML tags
* @param {string} strToSanitize - String to be sanitized
* @returns {string} - Sanitized plain text string
* Source: https://dev.to/alvisonhunter/removing-html-tags-in-javascript-using-regex-9h3
*/
const clearHTMLTags = (strToSanitize) => {
  try {
    let myHTML = new DOMParser().parseFromString(strToSanitize, 'text/html');
    return myHTML.body.textContent || '';
  } catch (error) {
    console.error("clearHTMLTags Error parsing HTML string:", error);
    return '';
  }
}

function convertSecondsToSrtTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);
	const milliseconds = (seconds.toFixed(3)).split('.')[1];
    return `${hours.toString().padStart(2, '0')}:` + 
		`${minutes.toString().padStart(2, '0')}:` + 
		`${remainingSeconds.toString().padStart(2, '0')},` + 
		`${milliseconds}`;
//    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')},${milliseconds}`;
}

async function saveBothFiles() {

    const savedFirst = await saveFile(1);
	const savedSecond = await saveFile(2);

}

async function saveFile(targetTrack) {

	console.log("saveFile targetTrack ", targetTrack);

	const trackData = TrkFileMetadata[targetTrack];
	const tableData = STTableMetadata[trackData.STTableIndex];

	if (tableData.lastSubtitleNumber <= 0) {return;}
	if ((targetTrack === 0) && (!TrkFileMetadata[0].loaded)) {return;}

	let filename = ("track" + targetTrack + "-output.srt").trim();
	
	let fileContent = "";
	let subtitleIndex = 1;
	let outputIndex = 0;
	let subtitleOutput = "";

	while (subtitleIndex <= tableData.lastSubtitleNumber) {
	
		let matchFound = false;

		while ((!matchFound) && (subtitleIndex <= tableData.lastSubtitleNumber)) {
			if (tableData.subtitleTrack[subtitleIndex] === targetTrack) {
				matchFound = true;
			} else {
				subtitleIndex += 1;
			}
		}

//?? First remove all HTML except <br>		
		if (matchFound) {
			outputIndex += 1;
			subtitleOutput = tableData.STTable.rows[subtitleIndex].querySelector(".classSubtitleText").innerHTML;
		if (outputIndex === 2) {
			console.log(`saveFile subtitleOutput ` + subtitleOutput);
		}
			fileContent += outputIndex + 
				"\n" +
				convertSecondsToSrtTime(tableData.subtitleStartSeconds[subtitleIndex]) + 
				" --> " + 
				convertSecondsToSrtTime(tableData.subtitleEndSeconds[subtitleIndex]) + 
				"\n" +
				subtitleOutput.replaceAll('<br>', '\n').trim() +
				"\n\n";
		if (outputIndex === 2) {
			console.log(`saveFile innerHTML ` + tableData.STTable.rows[subtitleIndex].querySelector(".classSubtitleText").innerHTML);
			console.log(`saveFile subtitleOutput ` + subtitleOutput);
			console.log(`saveFile fileContent ` + fileContent);
		}
		}

		subtitleIndex += 1;
	}

	if (!outputIndex) {
		notificationMsg1 = `Track ${targetTrack} empty, save cancelled`;
		notify("saveFile");
		return false;
	}

	const savedFlag = await writeFile(fileContent, filename);
	return savedFlag;

}  // saveFile

async function writeFile(fileContent, defaultFileName) {

	if (!fileAPIPickersSupported) {
	    // Create a Blob containing the text data
    	const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });

	    // Create a link element
	    const link = document.createElement('a');
	    link.href = URL.createObjectURL(blob);
	    link.download = defaultFileName;

	    // Programmatically click the link to trigger the download
	    document.body.appendChild(link); // Append to body is good practice
	    link.click();
	    document.body.removeChild(link); // Clean up the DOM

	    // Revoke the object URL to free up memory
	    URL.revokeObjectURL(link.href);

		return true;
	}

    try {
        // 1. Open the browser's Save File dialog
        // Execution PAUSES here until the user saves or cancels
        const fileHandle = await window.showSaveFilePicker({
            suggestedName: defaultFileName,
            types: [{
                accept: { 'text/plain': ['.srt'] }, // Adjust mime-type and extension as needed
            }],
        });

        // 2. The user selected a location. Create a writable stream to that file.
        const writable = await fileHandle.createWritable();

        // 3. Write the data to the file
        await writable.write(fileContent);

        // 4. Close the file to finalize the save
        await writable.close();
        
        console.log(`writeFile Successfully saved: ${defaultFileName}`);
        return true; 

    } catch (error) {
        // If the user clicks "Cancel" in the save dialog, it throws an AbortError
        if (error.name === 'AbortError') {
            console.log(`User cancelled saving: ${defaultFileName}`);
            return false; // Return false indicating cancellation
        }
        
        // Handle other unexpected errors (e.g., disk full, permissions issue)
        console.error("An error occurred while saving:", error);
        return false;
    }
}

	// Monitor the keydown event
	// https://greasyfork.org/en/scripts/38545-prevent-spacebar-doing-page-down/code
	// ==UserScript==
	// @name        Prevent Spacebar Doing Page Down
	// @author      Jefferson "jscher2000" Scher
	// @namespace   JeffersonScher
	// @description When the Spacebar key is received outside a text entry area, discard it
	// @include     *
	// @version     1.0
	// @grant       none
	// @copyright   Copyright 2018 Jefferson Scher
	// @license     BSD 3-clause
	// ==/UserScript== START

function PSDPD_KeyCheck(key){
	//console.log("PSDPD_KeyCheck key ", key, " key.target.nodeName ", key.target.nodeName);
	//console.log("PSDPD_KeyCheck key ", key, " key.target.hasAttribute('contenteditable') ", key.target.hasAttribute('contenteditable'));
	//console.log("PSDPD_KeyCheck key ", key, " key.target.getAttribute('contenteditable') ", key.target.getAttribute('contenteditable'));
	//if (key.target.getAttribute("contenteditable") == "true") {
	//	console.log("PSDPD_KeyCheck key ", key, " contenteditable true");
	//} else {console.log("PSDPD_KeyCheck key ", key, " contenteditable not true");}
	
	// Don't modify text editing
	if (key.target.nodeName == 'INPUT' || key.target.nodeName == "TEXTAREA" 
		|| key.target.nodeName == "SELECT") return;
	if ((key.target.hasAttribute("contenteditable"))
		&& (key.target.getAttribute("contenteditable")) == "true") {
		if (((key.ctrlKey) || (key.shiftKey)) && (key.key == ' ')){
			key.stopPropagation();
			key.preventDefault();
		}
		return;
	}
	// Don't modify certain combinations
	if (key.ctrlKey || key.altKey || key.metaKey) return;
	// If it's a space character, kill the event
	if (key.key == ' '){
		key.stopPropagation();
		key.preventDefault();
	return false;
	}
}
	// ==/UserScript== END

function addKeyListener(){

	if (keyListenerAdded) { return; }

	if (videoFileLoaded) {
		
	}

	if (!((totalNumberOfSubtitlesRead > 0) && videoFileLoaded)) { return; }

	seekBarContainer.style.display = "inline";

	console.log("addKeyListener Adding event listener for seekBar");
	//seekBar.oninput = () => {
	//	console.log(seekBar.value);
	//}
	seekBar.addEventListener('input', handleSeek);

	const buttons = [playVideoButton, currentLineButton, loopButton, 
					currentLineOnDashboardButton, playVideoOnDashboardButton, loopOnDashboardButton]; 

	buttons.forEach(function(bn) {
		//let buttonElement = bn;
    	bn.addEventListener('click', buttonEvents);
	});

	document.addEventListener("keyup", function onEvent(event) {
		if ((document.activeElement.hasAttribute("contentEditable")) && 
			(document.activeElement.isContentEditable)) {
				switch (event.key) {
				case ' ':
					if ((event.shiftKey) && (!event.altKey) && (!event.ctrlKey)) {
						buttonAction('currentLine');
						event.stopPropagation();
						event.preventDefault();
						return;	
					}
					return;	
				case 'p':
					if ((event.altKey) && (!event.shiftKey) && (!event.ctrlKey)) {
						buttonAction('playVideo');
						event.stopPropagation();
						event.preventDefault();
						return;	
					}
				default:
					return;	
				}
		}

		switch (event.key) {
		case " ":
			console.log('Spacebar', event.key);
			console.log('Active element ', document.activeElement);
			switch(spacebarOption) {
			case 'playPause':
				buttonAction('playVideo');
				break;
			case 'currentLine':
				if (!event.shiftKey) {
					buttonAction('currentLine');
				}
				else {
					buttonAction('restOfcurrentLine');
				}
				break;
			case 'loop':
			case'loopOnDashboard':
				buttonAction('loop');
				break;
			default:
				console.log('keyup Invalid spacebar option: ', spacebarOption);
				break;
			}
			break;
		case "p":
			buttonAction('playVideo');
			break;
		case "l":
			buttonAction('loop');
			break;
		case "s":
			buttonAction('currentLine');
			break;
		case "S":
			buttonAction('restOfcurrentLine');
			break;
		case "U":
			console.log("U updateTime");
			updateTime();
			break;
		case "ArrowLeft":
			skipBackward();
			event.preventDefault();
			break;
		case "ArrowRight":
			skipForward();
			event.preventDefault();
			break;
		case "F11":
			computeSubtitleTableHeight();
			break;
		/* case "Shift":
			playVideo(-1, 0);  // Pause the video
			break; */
		}
	});

	keyListenerAdded = true;
	console.log("addKeyListener completed");


} // addKeyListener

function buttonEvents(e) {
	if (!(totalNumberOfSubtitlesRead > 0)) {
		return;
	}
	let element_id = e.target.id;
	buttonAction(element_id);
}

function buttonAction(actionType) {

	if (selectedSubtitleNumber <= 0) {
		return; // no action
	}

	const tableData = STTableMetadata[selectedSubtitleTableIndex];

	switch(actionType) {
	case 'prevST':
		if ((tableData.subtitleTrack[selectedSubtitleNumber] === 0) &&
			(selectedSubtitleNumber > scrollStepOption)) {
			selectRow(selectedSubtitleTableIndex, (selectedSubtitleNumber - scrollStepOption));
			skipTo(tableData.subtitleStartSeconds[selectedSubtitleNumber]);
		} else {
			const prevTrack1Row = findTrackRow('prev', 1, selectedSubtitleTableIndex, selectedSubtitleNumber);
			if (prevTrack1Row > 0) {
				selectRow(selectedSubtitleTableIndex, prevTrack1Row);
				skipTo(tableData.subtitleStartSeconds[selectedSubtitleNumber]);
			}
		}
		return;
	case 'nextST':
		console.log(`nextST tableData.subtitleTrack[selectedSubtitleNumber] = ${tableData.subtitleTrack[selectedSubtitleNumber]}`);
		if ((tableData.subtitleTrack[selectedSubtitleNumber] === 0) &&
			(selectedSubtitleNumber < tableData.STTable.rows.length - scrollStepOption)) {
			selectRow(selectedSubtitleTableIndex, (selectedSubtitleNumber + scrollStepOption));
			skipTo(tableData.subtitleStartSeconds[selectedSubtitleNumber]);
		} else {
			const nextTrack1Row = findTrackRow('next', 1, selectedSubtitleTableIndex, selectedSubtitleNumber);
			console.log("nextST nextTrack1Row = ", nextTrack1Row);
			if (nextTrack1Row > 0) {
				selectRow(selectedSubtitleTableIndex, nextTrack1Row);
				skipTo(tableData.subtitleStartSeconds[selectedSubtitleNumber]);
			}
		}
		return;
	}

	if (!((tableData.lastSubtitleNumber > 0) && videoFileLoaded)) { 
		return;
	}

	if (videoStateBusy()) {
		playVideo(-1, 0); // Pause video
		return;
	}

	switch(actionType) {
	case 'currentLine':
	case 'currentLineOnDashboard':
		selectionStartSeconds = tableData.subtitleStartSeconds[selectedSubtitleNumber] - marginOption;
		selectionEndSeconds = tableData.subtitleEndSeconds[selectedSubtitleNumber] + marginOption;
		break;
	case 'restOfcurrentLine':
		if (youTubeVideoId) {
			selectionStartSeconds = player.getCurrentTime();
		}
		else {
			selectionStartSeconds = videoArea.currentTime;
		}
		selectionEndSeconds = tableData.subtitleEndSeconds[selectedSubtitleNumber] + marginOption;
		break;
	case 'playVideo':
	case 'playVideoOnDashboard':
		if (!(subsetting())) {
			if (youTubeVideoId) {
				selectionStartSeconds = player.getCurrentTime();
			}
			else {
				selectionStartSeconds = videoArea.currentTime;
			}
			selectionEndSeconds = 0;
		}
		playingContinuously = true;
		break;
	case 'loop':
		if (subsetting()) {
			playingContinuously = true;
		} else {
			selectionStartSeconds = tableData.subtitleStartSeconds[selectedSubtitleNumber] - marginOption;
			selectionEndSeconds = tableData.subtitleEndSeconds[selectedSubtitleNumber] + marginOption;
			console.log('loop Selected row ',selectedSubtitleNumber);
			console.log('loop subtitleStartSeconds ', tableData.subtitleStartSeconds[selectedSubtitleNumber]);
			console.log('loop subtitleEndSeconds ', tableData.subtitleEndSeconds[selectedSubtitleNumber]);
			console.log('loop selectionStartSeconds ', selectionStartSeconds);
			console.log('loop selectionEndSeconds ', selectionEndSeconds);
		}
		looping = true;
		break;
	default:
		console.log('buttonAction Invalid actionType: ', actionType);
		break;
	}

	console.log("buttonAction calling playVideo. actionType ", actionType);
    playVideo(selectionStartSeconds, selectionEndSeconds);

function subsetting() {

	if (subsetRange <= 1){
		return false;
	}

	// if ((!(subsetFirstRow && subsetLastRow)) && (subsetRange === 1)) {
	//	return false;
	// }

	if ((subsetFirstRow && subsetLastRow) && (subsetFirstRow > subsetLastRow)) {
		let temp = subsetFirstRow;
		subsetFirstRow = subsetLastRow;
		subsetLastRow = temp;
	}
	
	if (subsetRange > 1) {
		subsetFirstRow = selectedSubtitleNumber;
		let subsetFirstRowTrack = tableData.subtitleTrack[subsetFirstRow];
		subsetLastRow = selectedSubtitleNumber;
		for (let i = 2; i <= subsetRange; i++) {
			let nextRow = findTrackRow('next', subsetFirstRowTrack, selectedSubtitleTableIndex, subsetLastRow);
			if (nextRow) {
				subsetLastRow = nextRow;
			} else {
				i = subsetRange + 1;
			}
		}
	}

	selectionStartSeconds = tableData.subtitleStartSeconds[subsetFirstRow] - marginOption;
	selectionEndSeconds = tableData.subtitleEndSeconds[subsetLastRow] + marginOption;
	
	if (selectedSubtitleNumber != subsetFirstRow) {
		selectRow(selectedSubtitleTableIndex, subsetFirstRow);
	}
	
	return true;

}  // subsetting
}  // buttonAction

function subtitleTimeCorrections(){

	STTableMetadata.forEach(function(content, subtitleTableIndex) { doTimeCorrections(subtitleTableIndex); });

function doTimeCorrections (subtitleTableIndex) {	

	const tableData = STTableMetadata[subtitleTableIndex];
	let index = 1; 

	while (index <= tableData.lastSubtitleNumber) {
		if (tableData.subtitleStartSeconds[index] > videoDuration) {
		console.log('subtitleTimeCorrections subtitleStartSeconds for track ', tableData.subtitleTrack[index],
			' subtitle ', index, ' corrected from ',
		tableData.subtitleStartSeconds[index], ' to ',videoDuration);
		tableData.subtitleStartSeconds[index] = videoDuration;
		}
		if (tableData.subtitleEndSeconds[index] > videoDuration) {
		console.log('subtitleTimeCorrections subtitleEndSeconds for track ', tableData.subtitleTrack[index],
			' subtitle ', index, ' corrected from ',
		tableData.subtitleEndSeconds[index], ' to ',videoDuration);
		tableData.subtitleEndSeconds[index] = videoDuration;
		}
		index += 1;	
	}
}  // doTimeCorrections
}; // subtitleTimeCorrections

function clickSubtitleFileInput(numberOfFiles, numberOfTables, directive) {

	if ((numberOfFiles < 1) || (numberOfFiles > 2)) {
		errorMsg = 'clickSubtitleFileInput Invalid numberOfFiles: ' + numberOfFiles;
		throwError(errorMsg);
	}
	
	if ((numberOfTables < 1) || (numberOfTables > 2)) {
		errorMsg = 'clickSubtitleFileInput Invalid numberOfTables: ' + numberOfTables;
		throwError(errorMsg);
	}
	
	numberOfSubtitleTables = numberOfTables;

	if (numberOfSubtitleTables > 1) {
		notificationMsg1 = "Under construction";
		notify("clickSubtitleFileInput");
		return;
	}

	console.log("clickSubtitleFileInput numberOfFiles = ", numberOfFiles, 
		" numberOfSubtitleTables = ", numberOfSubtitleTables);
	
	console.log("clickSubtitleFileInput subtitleFileInput0", subtitleFileInput0);
	
	console.log("clickSubtitleFileInput subtitleFileInput1", subtitleFileInput1);
	
	console.log("clickSubtitleFileInput subtitleFileInput2", subtitleFileInput2);

	if (numberOfFiles == 1) {
		subtitleFileInput0.value = ""; //Clear .value to make this file element reusable
		subtitleFileInput0.click();
		splitLineControl.style.display = "block";
		return;
	}

	// 2 files: ?? distinguish between twinned and independent tracks

	splitLineControl.style.display = "none";

	TrkFileMetadata[1].loaded = false;
	TrkFileMetadata[2].loaded = false;
	TrkFileMetadata[1].twinnedTrack = 0;
	TrkFileMetadata[2].twinnedTrack = 0;
	if ((directive != "undefined") && directive === 'twinned') {
		TrkFileMetadata[1].twinnedTrack = 2;
		TrkFileMetadata[2].twinnedTrack = 1;
	}

	subtitleFileInput1.value = ""; //Clear .value to make this file element reusable
	subtitleFileInput1.click();
	
	subtitleFileInput2.value = ""; //Clear .value to make this file element reusable
	if (!firefoxAgent) {
		subtitleFileInput2.click();
	}

}

function DOMInitializations() {

checkBrowser();

videoURLButton = document.getElementById("videoURLButton");
videoURLInput = document.getElementById("videoURLInput");

subtitleFileInput0 = document.getElementById("subtitleFileInput0");
subtitleFileInput1 = document.getElementById("subtitleFileInput1");
subtitleFileInput2 = document.getElementById("subtitleFileInput2");

subtitleTableSection = document.getElementById("subtitleTableSection");
subtitleTableDiv0 = document.getElementById("subtitleTableDiv0");

let index = 0;
do {
	STTableMetadata[index].STTable = document.getElementById(STTableMetadata[index].STTableId);
	// console.log("DOMInitializations index = ", index, " ", STTableMetadata[index].STTable );
	STTableMetadata[index].trackHeader = document.getElementById(`subtitleTrackHeader${index}`);
	STTableMetadata[index].trackHeader.classList.add('notDisplayed');
	addSubtitleTableEventListeners (index);
	index++;
} while (index < STTableMetadata.length);

selectedCustomStyle = document.createElement('style');
document.head.appendChild(selectedCustomStyle);

save1File = document.getElementById("save1File");
save2Files = document.getElementById("save2Files");
saveBothTracks = document.getElementById("saveBothTracks");

let viewportWidth = getViewportWidth();
let viewportHeight = getViewportHeight();
console.log("DOMInitializations Viewport Width " + viewportWidth + " Height " + viewportHeight);

videoArea = document.getElementById("videoArea");
wrapper = document.getElementById("wrapper");
videoSizeMenu = document.getElementById("videoSizeMenu");
marginMenu = document.getElementById("marginMenu");
duration = document.getElementById("duration");
durationOnDashboard = document.getElementById("durationOnDashboard");

timeEditPopup = document.getElementById("timeEditPopup");
timeEditPopupO = document.getElementById("timeEditPopupO");
timeEditPopupThumb = document.getElementById("timeEditPopupThumb");
timeEditPopupThumb = document.getElementById("timeEditPopupThumb");
timeEditPopupV = document.getElementById("timeEditPopupV");
timeEditPopupWrapper1 = document.getElementById("timeEditPopupWrapper1");
timeEditPopupWrapper2 = document.getElementById("timeEditPopupWrapper2");
textEditPopupWrapper = document.getElementById("textEditPopupWrapper");

t1timeObject = createTimeObject ("t1");
t2timeObject = createTimeObject ("t2");
copyt1 = document.getElementById("copyt1");
copyt2 = document.getElementById("copyt2");

rangeCount = document.getElementById("rangeCount");
rangeCount.textContent = subsetRange;
rangeButtonRangeCount = document.getElementById("rangeButtonRangeCount");
insertLineWrapper = document.getElementById("insertLineWrapper");

currentLineButton = document.getElementById("currentLine");
playVideoButton = document.getElementById("playVideo");
loopButton = document.getElementById("loop");
dashboard = document.getElementById("dashboard");
currentLineOnDashboardButton = document.getElementById("currentLineOnDashboard");
playVideoOnDashboardButton = document.getElementById("playVideoOnDashboard");
loopOnDashboardButton = document.getElementById("loopOnDashboard");
textEditPopupPlaySingleButton = document.getElementById("textEditPopupPlaySingle");
splitLineControl = document.getElementById("splitLineControl");
timeEditPopupTrackInfo = document.getElementById("timeEditPopupTrackInfo");

spanStartTime = document.getElementById("spanStartTime");
spanEndTime = document.getElementById("spanEndTime");
spanTrack = document.getElementById("spanTrack");
spanStartTimeOnDashboard = document.getElementById("spanStartTimeOnDashboard");
spanEndTimeOnDashboard = document.getElementById("spanEndTimeOnDashboard");
spanTrackOnDashboard = document.getElementById("spanTrackOnDashboard");

STSpan1 = document.getElementById("STSpan1");
STSpan2 = document.getElementById("STSpan2");
subtitleAlignmentMenu = document.getElementById("subtitleAlignmentMenu");

selectionLabel = document.getElementById("selectionLabel");
selectionHyphen = document.getElementById("selectionHyphen");
selectionLabelOnDashboard = document.getElementById("selectionLabelOnDashboard");
selectionHyphenOnDashboard = document.getElementById("selectionHyphenOnDashboard");

currentTime = document.getElementById("currentTime");
currentTimeOnDashboard = document.getElementById("currentTimeOnDashboard");
seekBar = document.getElementById("seekBar");

color1Input = document.getElementById("color1Input");
color2Input = document.getElementById("color2Input");
color3Input	= document.getElementById("color3Input");

selectedTheme =	document.getElementById("selectedTheme");
customColorsCheckbox = document.getElementById("customColorsCheckbox");

selectSpacebar = document.getElementById("spacebarMenu");
selectScroll = document.getElementById("scrollMenu");
selectScrollStep = document.getElementById("scrollStepMenu");

myCheck01 = document.getElementById("myCheck01");
myCheck02 = document.getElementById("myCheck02");
myCheck03 = document.getElementById("myCheck03");
myCheck04 = document.getElementById("myCheck04");
myCheck05 = document.getElementById("myCheck05");
myCheck06 = document.getElementById("myCheck06");
myCheck07 = document.getElementById("myCheck07");
myCheck08 = document.getElementById("myCheck08");
myCheck09 = document.getElementById("myCheck00");
myCheck10 = document.getElementById("myCheck10");
myCheck20 = document.getElementById("myCheck20");


seekBarContainer = document.getElementById("seekBarContainer");
marginLine1 = document.getElementById("marginLine1");
divSubtitle1 = document.getElementById("divSubtitle1");
marginLine2 = document.getElementById("marginLine2");
divSubtitle2 = document.getElementById("divSubtitle2");
videoCounterDiv = document.getElementById("videoCounterDiv");
selectionInfoDiv = document.getElementById("selectionInfoDiv");
buttonSection = document.getElementById("buttonSection");
subtitleWidthMenu = document.getElementById("subtitleWidthMenu");
subtitleFontMenu = document.getElementById("subtitleFontMenu");
fontListFileInput = document.getElementById("fontListFileInput");
subtitleFontSizeMenu = document.getElementById("subtitleFontSizeMenu");
subtitleFontMenu2 = document.getElementById("subtitleFontMenu2");
// fontListFileInput = document.getElementById("fontListFileInput");
subtitleFontSizeMenu2 = document.getElementById("subtitleFontSizeMenu2");

EOT = document.getElementById("EOT");


const urlParams = new URLSearchParams(window.location.search);
const allUrlParamsObject = Object.fromEntries(urlParams.entries());
console.log("DOMInitializations All Query Parameters as Object:", allUrlParamsObject);

if (allUrlParamsObject.yturl == undefined) {
	console.log("DOMInitializations URL parm is undefined");
} else {
	if (allUrlParamsObject.yturl = "") {
		console.log('DOMInitializations URL parm is ""');
	} else {
		console.log("DOMInitializations URL parm is present: ",allUrlParamsObject.yturl);
	}
}

maxVideoWidth = getAdjustedWidthPixels(wrapper);
console.log("DOMInitializations maxVideoWidth = ",maxVideoWidth);

console.log("DOMInitializations wrapper.style.width = ", wrapper.style.width, 
		" wrapper.style.height = ", wrapper.style.height);

enableFileSelection();

toggleSubtitleSection(); // 1st invocation of computeSubtitleTableHeight

configInitializations(); // Process config.js

changeTheme(selectedThemeNumber); // Initialize theme option
changeSpacebar();		// Initialize spacebar option
changeFont();			// Initialize font option
changeFont2();			// Initialize font option
changeFontSize();		// Initialize font size option
changeAlignment();		// Initialize alignment option
changeScroll();			// Initialize scroll option
changeScrollStep();		// Initialize scroll step option
changeMargin();			// Initialize margin option
changeMarginLineMinHeight(marginLine1);
changeMarginLineMinHeight(marginLine2);
changeSubtitleWidth();

const controls = [
	{element: subtitleFontMenu, changeFunction: changeFont},
	{element: subtitleFontSizeMenu, changeFunction: changeFontSize},
	{element: subtitleFontMenu2, changeFunction: changeFont2},
	{element: subtitleFontSizeMenu2, changeFunction: changeFontSize},
	{element: subtitleAlignmentMenu, changeFunction: changeAlignment},
	{element: videoSizeMenu, changeFunction: changeVideoSize},
	{element: subtitleWidthMenu, changeFunction: changeSubtitleWidth},
	{element: spacebarMenu, changeFunction: changeSpacebar},
	{element: scrollMenu, changeFunction: changeScroll},
	{element: scrollStepMenu, changeFunction: changeScrollStep},
	{element: marginMenu, changeFunction: changeMargin},
	{element: marginLine1Menu, changeFunction: selectMarginLineMinHeight},
	{element: marginLine2Menu, changeFunction: selectMarginLineMinHeight},
]; 

controls.forEach(function(item) {
	const selectedControl = item.element;
	selectedControl.addEventListener("change", item.changeFunction);
	selectedControl.addEventListener("mouseout", unFocus);
});

window.addEventListener("load", detectInnerSizeChange);
window.addEventListener("resize", detectInnerSizeChange);

if (urlParams.has('yturl')) {
	let yturl = urlParams.get('yturl');
	let yturlFirst = yturl.substring(0,1);
	let yturlLast = yturl.substring(yturl.length - 1);
	console.log("DOMInitializations yturl = ", yturl);
	console.log("DOMInitializations yturlFirst = ", yturlFirst, " yturlLast = ", yturlLast);

	if ((yturlFirst != yturlLast) || 
		((yturlFirst != '"') && (yturlFirst != "'"))) {
			errorMsg = 'DOMInitializations yturl: Quotes missing or mismatched';
			throwError(errorMsg);
		}
	yturl = yturl.substring(1, (yturl.length - 1));	
	console.log("DOMInitializations  edited yturl = ", yturl);
	videoURLInput.value = yturl;
	videoURLButton.click();
}

dragElement(dashboard);
dragElement(timeEditPopup);
dragElement(timeEditPopupThumb);
timeEditPopupThumb.style.display = 'none';
timeEditPopup.addEventListener('mouseover', (e) => { 
	timeEditPopup.style.visibility = "visible"; 
	timeEditPopup.style.opacity = "1"; 
} );
timeEditPopup.addEventListener('mousedown', (e) => { 
	console.log("timeEditPopup mousedown 1");
	timeEditPopup.style.visibility = "visible"; 
	timeEditPopup.style.opacity = "1"; 
} );
timeEditPopup.addEventListener('mouseleave', (e) => { 
	if (timeEditPopupThumb.style.display != 'none') {
		console.log("timeEditPopup mouseleave 1");
		timeEditPopup.style.visibility = "hidden";
	}
	else {
		console.log("timeEditPopup mouseleave 2");
		if (!(timeEditPopupV.classList.contains('selected'))) {
			timeEditPopup.style.opacity = "0.1"; 
		}
	}
} );

const rangeButton = document.getElementById('rangeButton');
const rangePopup = document.getElementById('rangePopup');

rangeButton.addEventListener('mouseenter', () => {
    // Get the exact coordinates of button on the screen
    const rect = rangeButton.getBoundingClientRect();
    
    // Position the popup
    rangePopup.style.display = 'flex';
    rangePopup.style.left = rect.left + 'px';
    // rangePopup.style.top = (rect.top - rangePopup.offsetHeight - 0) + 'px'; // 10px gap above button
    rangePopup.style.top = (rect.top - rangePopup.offsetHeight + 3) + 'px'; // 10px gap above button
});

// Add a mouseleave listener to hide it
rangeButton.addEventListener('mouseleave', () => {
    rangePopup.style.display = 'none';
});

rangePopup.addEventListener('mouseover', () => {
    rangePopup.style.display = 'flex';
});

rangePopup.addEventListener('mouseleave', () => {
    rangePopup.style.display = 'none';
});

document.getElementById('splashScreen').remove();

return;

function addSubtitleTableEventListeners (subtitleTableIndex) {

subtitleTable = STTableMetadata[subtitleTableIndex].STTable;
STTableMetadata[1].STTable = document.getElementById(STTableMetadata[1].STTableId);

subtitleTable.addEventListener('mousedown', (e) => {
	const cell = e.target.closest('td');
	if (!cell) {return;}
	const row = cell.parentElement;
   	console.log(`EventListener mousedown subtitleTableIndex = ${subtitleTableIndex}`, 
		`STTableId = ${STTableMetadata[subtitleTableIndex].STTableId}`,
		`row = ${row.rowIndex}`);

});

subtitleTable.addEventListener('click', (e) => {
	const cell = e.target.closest('td');
	if (!cell) {return;}
	const row = cell.parentElement;
   	console.log(`EventListener click subtitleTableIndex = ${subtitleTableIndex}`,
		`\n STTableId = ${STTableMetadata[subtitleTableIndex].STTableId}`,
		`\n row = ${row.rowIndex} \n cell.textContent: ${cell.textContent}`);
	selectRow(subtitleTableIndex, row.rowIndex);
	if ((cell.classList.contains('classSubtitleStart')) || 
		(cell.classList.contains('classSubtitleEnd'))) {
		showTimeEditPopup(subtitleTableIndex, row.rowIndex);
	}
});

}  // addSubtitleTableEventListeners

function createTimeObject(prefix) {

	let timeObject = {};

	timeObject.hourField1 = document.getElementById(prefix + "hourField1");
	timeObject.minuteField1 = document.getElementById(prefix + "minuteField1");
	timeObject.minuteField2 = document.getElementById(prefix + "minuteField2");
	timeObject.secondField1 = document.getElementById(prefix + "secondField1");
	timeObject.secondField2 = document.getElementById(prefix + "secondField2");
	timeObject.millisecondField1 = document.getElementById(prefix + "millisecondField1");
	timeObject.millisecondField2 = document.getElementById(prefix + "millisecondField2");
	timeObject.millisecondField3 = document.getElementById(prefix + "millisecondField3");

	return timeObject;
	
}  // createTimeObject


function enableFileSelection() {


document.getElementById("videoFileButton").addEventListener(
  "click",
  (e) => {
		const videoFileElem = document.getElementById("videoFileInput");
		logTimeStamp("videoFileButton", "clicking on videoFileInput");
		if (videoFileElem) {
			videoFileElem.value = ""; 
			videoFileElem.click();
	}
  },
  false,
);

// https://www.youtube.com/watch?v=b4-AZT60GFw

videoURLButton.addEventListener(
  "click",
  (e) => {
		if (videoURLInput) {
			getYouTubeVideoId(videoURLInput.value);
			if (!youTubeVideoId){
				return;
			}
			console.log("videoURLSelect youTubeVideoId ", youTubeVideoId);
		}
  	},
);

} // enableFileSelection

function configInitializations() {

	let errorReason;

	if (typeof editEnabled == 'undefined') {
		errorReason = 'editEnabled missing';
		initError(errorReason);
	}
	
	console.log("Initialization: editEnabled = ", editEnabled);

	if (editEnabled) {
		toggleEditing();
	} 
	 

	if (typeof theme == 'undefined') {
		errorReason = 'theme missing';
		initError(errorReason);
	}

	let index = 0;
	let found = false;
	do {
		if (themeAttributesArray[index].themeName === theme) {
			selectedThemeNumber = index;
			found = true;
		} else {
			index++;
		}
	} while ((!found) && (index < themeAttributesArray.length));

	if (!found) {
		errorMsg = "configInitializations Invalid theme: " + theme;
		throwError(errorMsg);
	}

	let themeAttributeObject = findThemeAttributeObject(selectedThemeNumber);

	color1Input.value = themeAttributeObject.foregroundColor;
	color2Input.value = themeAttributeObject.backgroundColor;
	color3Input.value = themeAttributeObject.highlightBackgroundColor;

	themeAttributesArray.forEach(function(content, index) {
		let themeElement = document.getElementById("theme" + index);
		if (!themeElement) {
			errorMsg = "configInitializations HTML element not found: theme" + index;
			throwError(errorMsg);
		}
		themeElement.textContent = themeAttributesArray[index].themeName;
		themeElement.style.color = themeAttributesArray[index].foregroundColor;
		themeElement.style.backgroundColor = themeAttributesArray[index].backgroundColor;
		themeElement.addEventListener('click', (e) => { changeTheme(index); } );
		themeElement.addEventListener('mouseover', (e) => { highlightThemeOption(index, e.currentTarget, "on"); } );
		themeElement.addEventListener('mouseleave', (e) => { highlightThemeOption(index, e.currentTarget, "off"); } );
	});

	if (typeof spacebarOption == 'undefined') {
		errorReason = 'spacebarOption missing';
		initError(errorReason);
	}

	switch(spacebarOption) {
		case 'playPause':
		case 'currentLine':
		case 'loop':
			spacebarMenu.value = spacebarOption;
			console.log("Initialization: spacebarOption = " + spacebarMenu.value);
			break;
		default:
			errorReason = 'spacebarOption = ' + spacebarOption + ' invalid';
			initError(errorReason);
			break;
	}

	if (typeof fontList == 'undefined') {
		errorReason = 'fontList missing';
		initError(errorReason);
	}

	if (typeof selectedFont == 'undefined') {
		errorReason = 'selectedFont missing';
		initError(errorReason);
	}

	if (typeof selectedFont2 == 'undefined') {
		errorReason = 'selectedFont2 missing';
		initError(errorReason);
	}

	if (!createSubtitleFontOptions(fontList, subtitleFontMenu, selectedFont)) {
		errorReason = 'selectedFont = ' + selectedFont + ' not in fontList';
		initError(errorReason);
	}

	if (!createSubtitleFontOptions(fontList, subtitleFontMenu2, selectedFont2)) {
		errorReason = 'selectedFont2 = ' + selectedFont2 + ' not in fontList';
		initError(errorReason);
	}

	console.log('Initialization: selectedFont = ', selectedFont);
	console.log('Initialization: selectedFont2 = ', selectedFont2);

	if (typeof videoWidthScale == 'undefined') {
		errorReason = 'videoWidthScale missing';
		initError(errorReason);
	}

	videoSizeMenu.value = videoWidthScale;

	if (videoSizeMenu.value != videoWidthScale){
		errorReason = 'videoWidthScale = ' + videoWidthScale + ' not in list of allowed values';
		initError(errorReason);
	}

	console.log("Initialization: videoWidthScale = " + videoSizeMenu.value);

	if (typeof subtitleWidthScale == 'undefined') {
		errorReason = 'subtitleWidthScale missing';
		initError(errorReason);
	}

	subtitleWidthMenu.value = subtitleWidthScale;

	if (subtitleWidthMenu.value != subtitleWidthScale){
		errorReason = 'subtitleWidthScale = ' + subtitleWidthScale + ' not in list of allowed values';
		initError(errorReason);
	}

	console.log("Initialization: subtitleWidthScale = " + subtitleWidthMenu.value);

	if (typeof fontSize == 'undefined') {
		errorReason = 'fontSize missing';
		initError(errorReason);
	}

	subtitleFontSizeMenu.value = fontSize;
	subtitleFontSizeMenu2.value = fontSize;

	if (subtitleFontSizeMenu.value != fontSize){
		errorReason = 'fontSize = ' + fontSize + ' not in list of allowed values';
		initError(errorReason);
	}

	console.log("Initialization: fontSize = " + subtitleFontSizeMenu.value);

function initError(errorType){
	errorMsg = 'Initialization error. ' + errorType + '\nCheck config.js';
	throwError(errorMsg);
}

}  // configInitializations

function checkBrowser() {

	// Source: https://www.geeksforgeeks.org/javascript/how-to-detect-the-user-browser-safari-chrome-ie-firefox-and-opera-using-javascript/

	userAgentString = navigator.userAgent;
	chromeAgent = userAgentString.indexOf("Chrome") > -1;
	IExplorerAgent = userAgentString.indexOf("MSIE") > -1 || userAgentString.indexOf("rv:") > -1;
	firefoxAgent = userAgentString.indexOf("Firefox") > -1;
	safariAgent = userAgentString.indexOf("Safari") > -1;
	if ((chromeAgent) && (safariAgent)) 
		safariAgent = false;
	operaAgent = userAgentString.indexOf("OP") > -1;
	if ((chromeAgent) && (operaAgent)) 
		chromeAgent = false;

	// Source: https://www.testmuai.com/learning-hub/file-system-access-api-browser-support/

	const pickers = ["showOpenFilePicker", "showSaveFilePicker", "showDirectoryPicker"];
	const supported = pickers.filter((method) => method in window);

	if (supported.length === pickers.length) {
		console.log("File System Access API pickers available:", supported.join(", "));
		fileAPIPickersSupported = true;
	} else if (supported.length > 0) {
		console.log("Partial support. Available:", supported.join(", "));
	} else {
		console.log("File System Access API pickers are not supported in this browser.");
	}

	// Separate check for the Origin Private File System half of the API.
	if (navigator.storage && "getDirectory" in navigator.storage) {
		console.log("OPFS is available via navigator.storage.getDirectory().");
		OPFSAvailable = true;
	} else {
		console.log("OPFS is not supported.");
	}
	
}

} // DOMInitializations


function initCaretUtil() {
// CaretUtil library, based on
// https://stackoverflow.com/questions/6249095/41034697#41034697


/**
 * Get the current caret position inside a contentEditable container
 */
CaretUtil.getCaretPosition = function(container) {
	var selection = window.getSelection();
	var charCount = -1;
	var node;
	if(selection.focusNode != null) {
		if(CaretUtil.isDescendantOf(selection.focusNode,container)) {
			node = selection.focusNode;
			charCount = selection.focusOffset;
			while(node != null) {
				if(node == container) {
					break;
				}
				if(node.previousSibling != null) {
					node = node.previousSibling;
					charCount += node.textContent.length;
				} else {
					node = node.parentNode;
					if(node == null) {
						break;
					}
				}
			}
		}
	}
	return charCount;
};

/**
 * Returns true if the node is a descendant (or equal to) a parent
 */
CaretUtil.isDescendantOf = function(node,parent) {
	while(node != null) {
		if(node == parent) {
			return true;
		}
		node = node.parentNode;
	}
	return false;
};

CaretUtil.createRange = function(node,chars,range) {
	if(range == null) {
		range = window.document.createRange();
		range.selectNode(node);
		range.setStart(node,0);
	}
	if(chars.count == 0) {
		range.setEnd(node,chars.count);
	} else if(node != null && chars.count > 0) {
		if(node.nodeType == 3) {
			if(node.textContent.length < chars.count) {
				chars.count -= node.textContent.length;
			} else {
				range.setEnd(node,chars.count);
				chars.count = 0;
			}
		} else {
			var _g = 0;
			var _g1 = node.childNodes.length;
			while(_g < _g1) {
				var lp = _g++;
				range = CaretUtil.createRange(node.childNodes[lp],chars,range);
				if(chars.count == 0) {
					break;
				}
			}
		}
	}
	return range;
};


}