
localStorage.clear(); //Clear old values left behind;
document.addEventListener('keydown', PSDPD_KeyCheck);

let videoFileLoaded = false;
let videoElem;
let audioFileLoaded = false;
let displayVideoControls = false;
let subtitleTable;
let videoDuration;
let youTubeVideoId;
let maxVideoWidth;
let player;
let iframeElement;
let showButtonSection = true;
let toggleVideoSwitch = "on";
let keyListenerForSubtitlesAdded = false;
let keyListenerAdded = false;
let playing = false;				// Flag: If false, the video is not currently playing
let playingContinuously = false;	// Flag: Enable/Disable continuous play until the user stops or the video ends
let looping = false;				// Flag: Enable/Disable playing the currently selected subtitle in a loop
let checkTimeEnabled = false;		// Flag: Enable/Disable checking the endtime of a subtitle while it is playing
let callUpdateTimeEnabled = false;
let	lastSubtitleNumber = 0;			// Total number of subtitles
let totalNumberOfSubtitlesRead = 0;
let selectedSubtitleNumber = 0;		// No subtitle is selected until the subtitle file has been loaded.
let subtitleStartSeconds = [];		// Array: Start time in seconds for each subtitle
let subtitleEndSeconds = [];		// Array: Stop time in seconds for each subtitle
let subtitleTrack = [];				// Array: Track number for each subtitle
let selectionStartSeconds = 0;
let selectionEndSeconds = 0;
let timeoutId;
let	scrollOption = "uninitialized";
let	scrollStepOption = 0;
let marginOption = 0				// Margin (seconds) added around a subtitle; useful when timing is not accurate
let skipForwardSeconds = 3;
let skipBackwardSeconds = 3;
let showSubtitleTrack1 = true;
let showSubtitleTrack2 = false;
let spanSubtitle1Modified = false;
let spanSubtitle2Modified = false;
let spanSubtitle1Selected = false;
let spanSubtitle2Selected = false;
let spanSubtitle1Row = 0;
let spanSubtitle2Row = 0;
let showCounter = true;
let showSelectionInfo = true;
let showControlButtons = true;
let showSubtitleTable = false;
const loadFontFileOptionText = 'Load Font List from a File';
let callUpdateTimeTimeoutId;
const checkTimeInterval = 200;
const updateTimeInterval = 1000;
let timeEditSynchronizeWithTrack1 = true;
let rectifySubtitleStartEnabled = true;
let timeEditPopupRow = 0;
let t1timeEditPopupOldTime;
let t1timeEditPopupOldSeconds;
let t2timeEditPopupOldTime;
let t2timeEditPopupOldSeconds;
let t1timeEditPopupOldTimeOnTrack2;
let t1timeEditPopupOldSecondsOnTrack2;
let t2timeEditPopupOldTimeOnTrack2;
let t2timeEditPopupOldSecondsOnTrack2;
let CaretUtil = { };
let showTimePopup = false;
let customColorsEnabled = false;
let selectedCustomStyle;
let dropDownArrow = "▾";
let selectedThemeNumber;
let themeAttributes;

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


let pointerArray = [];

// sample subtitleFileDataArray[x].array[y] member: 
// 	{track: 0; startSeconds: 120, endSeconds: 123, startTime: "0:02.00", endTime: "0:02.03", 
//		subtitleStyle: "File1", subtitle: "Caption text" }
let subtitleFileDataArray = [];
subtitleFileDataArray[0] = {inputId: "subtitleFileInput0", defaultSubtitleStyle: "", loaded: false, array: []};	
subtitleFileDataArray[1] = {inputId: "subtitleFileInput1", defaultSubtitleStyle: "File1", loaded: false, array: []};
subtitleFileDataArray[2] = {inputId: "subtitleFileInput2", defaultSubtitleStyle: "File2", loaded: false, array: []};

// sample mergeDataArray[x] member: 
// 	{dataIndex: "1", arrayIndex: 0} means subtitleFileDataArray[1].array[0]
let mergeDataArray = [];

const undoArraySize = 10;
const redoArraySize = undoArraySize;
const [undoArray, redoArray] = Array.from({ length: 2 }, () => 
    Array.from({ length: undoArraySize }, () => 
	({
		inUse: false,
		changeNumber: 0,
		action: "",
		rowNumber: 0,
		selectedRowNumber: 0,
		startTime: "",
		endTime: "",
		subtitleStyle: "",
		oldValue: "",
		newValue: "",
		subtitleTrack: 0,
		subtitleStartSeconds: 0,
		subtitleEndSeconds: 0
	}))
);

let changeCounter = 0;
let undoArrayCurrentIndex = -1;
let redoArrayCurrentIndex = -1;

document.addEventListener("DOMContentLoaded", () => {
	DOMInitializations();
	initCaretUtil();
});

function statusMsg(caller, msg) {
	document.getElementById("spanSubtitle1").textContent = msg;
	logTimeStamp("statusMsg ", (caller + " " + msg));
	// console.log(caller, " ", msg);
}

function logTimeStamp(caller, msg) {
	let	timeStamp = new Date();
	console.log("timeStamp ", caller, " ", msg, timeStamp);
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
	console.log("computeSubtitleTableHeight Viewport w" + viewportWidth + " h" + viewportHeight);


	let totalHeight = 0;
	let residualHeight = 0;
	let divElemWidth = 0;
	let divElemHeight = 0;

	let divNames = [];

	if (toggleVideoSwitch != "on") {
		divNames = ['blankLine'];
	}
	else {
		divNames = ['wrapper', 'blankLine'];
	}

	if (showSubtitleTrack1) {
		divNames = divNames.concat(['divSubtitle1']);
	} else {
		document.getElementById("divSubtitle1").style.display = "none";
		document.getElementById("divSubtitle1Wrapper").style.display = "none";
	}
		
	if (showSubtitleTrack2) {
		divNames = divNames.concat(['divSubtitle2']);
	} else {
		document.getElementById("divSubtitle2").style.display = "none";
		document.getElementById("divSubtitle2Wrapper").style.display = "none";
	}
	
	if (showCounter) {
		divNames = divNames.concat(['videoCounterDiv']);
	} else {
		document.getElementById("videoCounterDiv").style.display = "none";
	}

	if (showSelectionInfo) {
		divNames = divNames.concat(['selectionInfoDiv']);
	} else {
		document.getElementById("selectionInfoDiv").style.display = "none";
	}

	if (showControlButtons) {
		divNames = divNames.concat(['buttonSection']);
	} else {
		document.getElementById("buttonSection").style.display = "none";
	} 
		
	divNames = divNames.concat(['EOT']);	
	
	divNames.forEach(function(divName) {
		let divElem = document.getElementById(divName);
		if (divElem.style.display != "none") {
			divElemWidth = divElem.offsetWidth;
			divElemHeight = divElem.offsetHeight;
		} else {
			const clone = divElem.cloneNode(true);
			clone.style.visibility = 'hidden';	
			clone.style.position = 'absolute';
			clone.style.display = 'block';
			document.body.appendChild(clone);
			divElemWidth = clone.offsetWidth;
			divElemHeight = clone.offsetHeight;
			document.body.removeChild(clone);
		}
		let availableHeight = viewportHeight - totalHeight;
		totalHeight += divElemHeight;
		residualHeight = viewportHeight - totalHeight;
		console.log("computeSubtitleTableHeight ", divName, " w" + divElemWidth + " h" + divElemHeight,
			" totalHeight ", totalHeight, 
			" availableHeight ", availableHeight,
			" residualHeight ", residualHeight);
		
		switch(divName) {
		case 'wrapper':
			divElem.style.display = "block";
			break;
		case 'divSubtitle1':
		case 'divSubtitle2':
			let subtitleWrapper = document.getElementById(`${divName}Wrapper`);
			if (availableHeight <= 0) {
				divElem.style.display = "none";  
				subtitleWrapper.style.display = "none";
			} else {
				if (residualHeight < 0)	{
					subtitleWrapper.style.height = availableHeight + "px";
				} else {
					subtitleWrapper.style.height = divElemHeight + "px";
				}
				subtitleWrapper.style.display = "block";
				divElem.style.display = "block";
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

	console.log("computeSubtitleTableHeight totalHeight ", totalHeight, 
		" residualHeight", residualHeight);

	if (document.getElementById("timeEditPopup").style.display == "inline-block") {
		showTimeEditPopup(selectedSubtitleNumber);
	}

	divElem = document.getElementById("subtitleTableDiv");
	divElemEOT = document.getElementById("EOT");

	if (residualHeight < 0){
		divElem.style.display = "none";
		divElemEOT.style.display = "none";
		return;
	}

	if (((toggleVideoSwitch == "on") && (showSubtitleTable)) || 
		(toggleVideoSwitch != "on")) {
		divElem.style.display = "block";
		divElem.style.height = residualHeight + "px";
	} else {
		divElem.style.display = "none";
		divElemEOT.style.display = "none";
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

	console.log("getViewportWidth window.innerWidth = ", window.innerWidth);
	console.log("getViewportWidth document.documentElement.clientWidth = ", document.documentElement.clientWidth);
	console.log("getViewportWidth document.body.clientWidth = ", document.body.clientWidth);

	let returnWidth = 0;
	let returnWidthSet = false;

	if (window.innerWidth){
		console.log("getViewportWidth selecting window.innerWidth = ", window.innerWidth);
		returnWidth = window.innerWidth;
		returnWidthSet = true;
	}
	
	if (!returnWidthSet && document.documentElement && (document.documentElement.clientWidth != 0)){
		console.log("getViewportWidth selecting document.documentElement.clientWidth = ", document.documentElement.clientWidth);
		returnWidth = document.documentElement.clientWidth;
		returnWidthSet = true;
	}

	if (!returnWidthSet && document.body){
		console.log("getViewportWidth selecting document.body.clientWidth = ", document.body.clientWidth);
		returnWidth = document.body.clientWidth;
		returnWidthSet = true;
	}

	if (returnWidth <= 0) {
		console.log("getViewportWidth returning ", returnWidth);
		alert("getViewportWidth returning " + returnWidth);
	}

	return returnWidth;
}

function getViewportHeight () {
	console.log("getViewportHeight window.innerHeight = ", window.innerHeight);
	console.log("getViewportHeight document.documentElement.clientHeight = ", document.documentElement.clientHeight);
	console.log("getViewportHeight document.body.clientHeight = ", document.body.clientHeight);

	let returnHeight = 0;
	let returnHeightSet = false;

	if (window.innerHeight){
		console.log("getViewportHeight selecting window.innerHeight = ", window.innerHeight);
		returnHeight = window.innerHeight;
		returnHeightSet = true;
	}
	
	if (!returnHeightSet && document.documentElement && (document.documentElement.clientHeight != 0)){
		console.log("getViewportHeight selecting document.documentElement.clientHeight = ", document.documentElement.clientHeight);
		returnHeight = document.documentElement.clientHeight;
		returnHeightSet = true;
	}

	if (!returnHeightSet && document.body){
		console.log("getViewportHeight selecting document.body.clientHeight = ", document.body.clientHeight);
		returnHeight = document.body.clientHeight;
		returnHeightSet = true;
	}

	if (returnHeight <= 0) {
		console.log("getViewportHeight returning ", returnHeight);
		alert("getViewportHeight returning " + returnHeight);
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
		let errorMsg = 'findThemeAttributeObject themeNumber not an integer: ' + themeNumber;
		alert(errorMsg);
		throw new Error(errorMsg);
	}

	if ((themeNumber < 0) || ((themeNumber + 1) > themeAttributesArray.length)) {
		let errorMsg = 'findThemeAttributeObject themeNumber invalid: ' + themeNumber;
		alert(errorMsg);
		throw new Error(errorMsg);
	}

	let themeAttributeObject = themeAttributesArray[themeNumber];

	return themeAttributeObject;

}


function highlightThemeOption(themeNumber, action) {

	let themeAttributeObject = findThemeAttributeObject(themeNumber);

	switch (action) {
	case 'off':
		document.getElementById("theme" + themeNumber).style.backgroundColor = 
			themeAttributeObject.backgroundColor;
		break;
	case 'on':
		document.getElementById("theme" + themeNumber).style.backgroundColor = 
			themeAttributeObject.highlightBackgroundColor;
		break;
	default:
		let errorMsg = "highlightThemeOption Invalid action: " + action;
		console.log(errorMsg);
		alert(errorMsg);
		throw new Error(errorMsg);
	}

}

function sanityCheck() {

	if (lastSubtitleNumber === 0) {return;}

	if (lastSubtitleNumber != (subtitleTable.rows.length - 1)) {
		let errorMsg = 'sanityCheck lastSubtitleNumber != (subtitleTable.rows.length - 1) ' 
			+ lastSubtitleNumber + ' != ' + (subtitleTable.rows.length - 1);
		alert(errorMsg);
		throw new Error(errorMsg);
	}

	if (lastSubtitleNumber != (subtitleStartSeconds.length - 1)) {
		let errorMsg = 'sanityCheck lastSubtitleNumber != (subtitleStartSeconds.length - 1) ' 
			+ lastSubtitleNumber + ' != ' + (subtitleStartSeconds.length - 1);
		alert(errorMsg);
		throw new Error(errorMsg);
	}

	if (lastSubtitleNumber != (subtitleEndSeconds.length - 1)) {
		let errorMsg = 'sanityCheck lastSubtitleNumber != (subtitleEndSeconds.length - 1) ' 
			+ lastSubtitleNumber + ' != ' + (subtitleEndSeconds.length - 1);
		alert(errorMsg);
		throw new Error(errorMsg);
	}

	if (lastSubtitleNumber != (subtitleTrack.length - 1)) {
		let errorMsg = 'sanityCheck lastSubtitleNumber != (subtitleTrack.length - 1) ' 
			+ lastSubtitleNumber + ' != ' + (subtitleTrack.length - 1);
		alert(errorMsg);
		throw new Error(errorMsg);
	}

}

function highlightSelectedRow(rowNumber) {

	sanityCheck();

	// Remove 'selected' class from previously selected row
	if ((selectedSubtitleNumber < subtitleTable.rows.length) && (selectedSubtitleNumber > 0)) {
		subtitleTable.rows[selectedSubtitleNumber].classList.remove("selectedCustom");
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
		if (!videoElem.paused) {
			return true;
		}
	}
	return false;
}

function selectRow(rowNumber,directive) {
    console.log("selectRow entered");

	console.log('selectRow current selection ',selectedSubtitleNumber);
	console.log('selectRow current subtitleStartSeconds ',subtitleStartSeconds[selectedSubtitleNumber]);
	console.log('selectRow current subtitleEndSeconds ',subtitleEndSeconds[selectedSubtitleNumber]);
	console.log('selectRow current subtitleTrack ',subtitleTrack[selectedSubtitleNumber]);
	console.log('selectRow new selection ',rowNumber);

	if (!playingContinuously){
		console.log("selectRow !playingContinuously");
		if (videoStateBusy()) {
			console.log("selectRow videoStateBusy");
			playVideo(-1, 0);  // Pause the video
		}
	}

	document.getElementById("spanStartTime").textContent = "";
	document.getElementById("spanEndTime").textContent = "";
	document.getElementById("spanTrack").textContent = "";
	document.getElementById("spanStartTimeOnDashboard").textContent = "";
	document.getElementById("spanEndTimeOnDashboard").textContent = "";
	document.getElementById("spanTrackOnDashboard").textContent = "";

	document.getElementById("spanSubtitle1").textContent = "";
	document.getElementById("spanSubtitle2").textContent = "";
	spanSubtitle1Selected = false;
	spanSubtitle2Selected = false;

	console.log("selectRow highlighting");
	highlightSelectedRow(rowNumber);
    console.log("selectRow highlighted");
				
	selectedSubtitleNumber = rowNumber;
				
	unFocus();

	if ((!playingContinuously) && videoFileLoaded) {
		if (youTubeVideoId) {
			player.seekTo(subtitleStartSeconds[selectedSubtitleNumber], true);
			console.log("selectRow seekTo subtitleStartSeconds[selectedSubtitleNumber] ", 
				subtitleStartSeconds[selectedSubtitleNumber], 
				" player.getCurrentTime ", player.getCurrentTime());

			if (player.getPlayerState() != YT.PlayerState.PAUSED) {
				pauseYouTubeVideo();
			}
		}
		else {
			videoElem.currentTime = subtitleStartSeconds[selectedSubtitleNumber];
		}
		document.getElementById("currentTime").textContent = 
			formatTime(subtitleStartSeconds[selectedSubtitleNumber]);
		document.getElementById("currentTimeOnDashboard").textContent = 
			document.getElementById("currentTime").textContent;
		document.getElementById("seekBar").value =
			(subtitleStartSeconds[selectedSubtitleNumber] / videoDuration) * 100;
		updateSliderFill(document.getElementById("seekBar"));

	} else {
		if (scrollOption == "alwaysVisible"){
			subtitleTable.rows[rowNumber].scrollIntoView({ 
				behavior: "instant", block: "center", inline: "nearest" });
		}
	}

	if (directive != "undefined"){
		if (scrollOption == "alwaysVisible"){
			subtitleTable.rows[rowNumber].scrollIntoView({ 
				behavior: "instant", block: "center", inline: "nearest" });
		}
	}

	if (rectifySubtitleStartEnabled) {
		rectifySubtitleStart(rowNumber);
	}
	
	document.getElementById("spanStartTime").textContent = 
		subtitleTable.rows[rowNumber].querySelector(".classSubtitleStart").textContent;
	document.getElementById("spanEndTime").textContent =
		subtitleTable.rows[rowNumber].querySelector(".classSubtitleEnd").textContent;
	if (subtitleTrack[rowNumber] > 0) {
		document.getElementById("spanTrack").textContent =
			subtitleTable.rows[rowNumber].querySelector(".classSubtitleTrack").textContent;
	}

	document.getElementById("spanStartTimeOnDashboard").textContent =
		document.getElementById("spanStartTime").textContent;
	document.getElementById("spanEndTimeOnDashboard").textContent =
		document.getElementById("spanEndTime").textContent;
	document.getElementById("spanTrackOnDashboard").textContent =
		document.getElementById("spanTrack").textContent;

	spanSubtitle1Row = rowNumber;
	document.getElementById("spanSubtitle1").textContent =
		subtitleTable.rows[rowNumber].querySelector(".classSubtitleText").textContent;
	if (document.getElementById("spanSubtitle1").textContent === "") {
		document.getElementById("spanSubtitle1").textContent = "_";
	}
		
	let spanSubtitle2Track = 0;
	switch (subtitleTrack[rowNumber]) {
	case 1:
		spanSubtitle2Track = 2;
		break;
	case 2:
		spanSubtitle2Track = 1;
		break;
	default:
	}

	spanSubtitle2Row = findTrackRow('next', spanSubtitle2Track, rowNumber);

	if (spanSubtitle2Row) {
	    console.log("selectRow spanSubtitle2Row = ", spanSubtitle2Row);
		document.getElementById("spanSubtitle2").textContent =
			subtitleTable.rows[spanSubtitle2Row].querySelector(".classSubtitleText").textContent;
		if (document.getElementById("spanSubtitle2").textContent === "") {
			document.getElementById("spanSubtitle2").textContent = "_";
		}
	}

    console.log("selectRow exiting");
	computeSubtitleTableHeight();

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
			document.getElementById("color1Input").value = themeAttributes.foregroundColor;
			document.getElementById("color2Input").value = themeAttributes.backgroundColor;
			document.getElementById("color3Input").value = themeAttributes.highlightBackgroundColor;
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
			console.log("setColor Invalid option: ", type);
			alert("setColor Invalid option: " + type);
			return;
	}

	if (enforceCustomColors) {
		document.body.style.backgroundColor = document.getElementById("color2Input").value;
		document.body.style.color = document.getElementById("color1Input").value;
		selectedCustomStyle.textContent = 
			".selectedCustom {background-color: " + `${document.getElementById("color3Input").value}` + " }";
		if (selectedSubtitleNumber > 0){
			highlightSelectedRow(selectedSubtitleNumber);
		}
	}


		/*		case 'foreground':
			document.body.setAttribute('style', `background-color: ${document.getElementById("color2Input").value}`);
			document.body.setAttribute('style', `color: ${document.getElementById("color1Input").value}`);
			break;
		case 'background':
			document.body.setAttribute('style', `background-color: ${document.getElementById("color2Input").value}`);
			document.body.setAttribute('style', `color: ${document.getElementById("color1Input").value}`);
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
		return;
	}

	const wrapperElement = document.getElementById("wrapper");
	const selectVideoSize = document.getElementById("videoSizeMenu");
	const selectedValue = selectVideoSize.value;

	let oldMaxVideoWidth = maxVideoWidth;

	maxVideoWidth = getAdjustedWidthPixels(wrapperElement);
	console.log("changeVideoSize maxVideoWidth = ",maxVideoWidth);

	if (oldMaxVideoWidth != maxVideoWidth) {
		console.log("changeVideoSize maxVideoWidth changed from ", oldMaxVideoWidth, " to ", maxVideoWidth);
	}

	unFocus();

	let fraction = selectVideoSize.value;
	let newWidth;
	if (youTubeVideoId) {
		newWidth = Math.round((maxVideoWidth)*fraction);
		let newHeight = Math.round((newWidth * 9) / 16);
		player.setSize(width=newWidth, height=newHeight);
		wrapperElement.style.width = newWidth + "px";
		document.getElementById("seekBarContainer").style.width = wrapperElement.style.width;
	} else {
		newWidth = Math.round((maxVideoWidth)*fraction);
		let newHeight = Math.ceil((videoElem.videoHeight / videoElem.videoWidth) * newWidth);
		console.log("changeVideoSize newHeight=",newHeight);
		wrapperElement.style.width = newWidth + "px";
		wrapperElement.style.height = newHeight + "px";
		document.getElementById("seekBarContainer").style.width = videoElem.style.width;
	}

	if ((lastSubtitleNumber > 0) && videoFileLoaded) { 
		console.log("changeVideoSize updateTime");
		updateTime();
	}

	//document.getElementById("seekBar").value = (current / videoDuration) * 100;
	//updateSliderFill(document.getElementById("seekBar"));



	console.log("changeVideoSize selectVideoSize.value = ", selectVideoSize.value, 
		" newWidth = ", newWidth);

	computeSubtitleTableHeight();

} // changeVideoSize

function changeFont(){
	var selectSubtitleFont = document.getElementById("subtitleFontMenu");
	var selectedValue = selectSubtitleFont.value;
	//?? If user presses ESC instead of selecting a file, the value displayed in the setting is blank.
	//?? If user presses END and there are 2 tracks, the last subtitle of the second track is selected
	//?? If user presses DEL, the selected row might be out of view (maybe ok if 1st row shown = 1st row when video displayed)
	if (selectedValue == loadFontFileOptionText){
		selectSubtitleFont.value = document.getElementById("spanSubtitle1").style.fontFamily
		const fontListFileElem = document.getElementById("fontListFileInput");
		if (fontListFileElem) {
			fontListFileElem.value = ""; //Clear .value to make this file element reusable
			fontListFileElem.click();
		}
		unFocus();
		return;
	}
	
	// selectSubtitleFont.value = selectedFont;

	var updateElement = document.getElementById("spanSubtitle1");
	console.log("changeFont Font changed from " + updateElement.style.fontFamily + " to " + selectedValue);
	updateElement.style.fontFamily = selectedValue;
	updateElement = document.getElementById("spanSubtitle2");
	updateElement.style.fontFamily = selectedValue;
	computeSubtitleTableHeight();
	unFocus();
}

function changeFontSize(){
	var selectSubtitleFontSize = document.getElementById("subtitleFontSizeMenu");
	var selectedValue = selectSubtitleFontSize.value;
	var updateElement = document.getElementById("spanSubtitle1");
	console.log("Font size changed from " + updateElement.style.fontSize + " to " + selectedValue);
	updateElement.style.fontSize = selectedValue;
	updateElement = document.getElementById("spanSubtitle2");
	updateElement.style.fontSize = selectedValue;
	computeSubtitleTableHeight();
	unFocus();
}

function changeAlignment(){
	//?? Clean up this function
	var updateElement = document.getElementById("divSubtitle1");
    var selectSubtitleAlignment = document.getElementById("subtitleAlignmentMenu");
	var selectedValue = selectSubtitleAlignment.value;
	console.log("Alignment changed from " + updateElement.style.textAlign + " to " + selectedValue);
	updateElement.style.textAlign = selectedValue;

	updateElement = document.getElementById("divSubtitle2");
    selectSubtitleAlignment = document.getElementById("subtitleAlignmentMenu");
	selectedValue = selectSubtitleAlignment.value;
	console.log("Alignment changed from " + updateElement.style.textAlign + " to " + selectedValue);
	updateElement.style.textAlign = selectedValue;
	computeSubtitleTableHeight();
	unFocus();
}

function changeSpacebar(){
    const selectSpacebar = document.getElementById("spacebarMenu");
	const selectedValue = selectSpacebar.value;
	console.log("Spacebar option changed from " + spacebarOption + " to " + selectedValue);
	spacebarOption = selectedValue;
	unFocus();
}

function changeScroll(){
	const selectScroll = document.getElementById("scrollMenu");
	const selectedValue = selectScroll.value;
	console.log("Scroll option changed from " + scrollOption + " to " + selectedValue);
	scrollOption = selectedValue;
	unFocus();
}

function changeScrollStep(){
	const selectScrollStep = document.getElementById("scrollStepMenu");
	const selectedValue = Number(selectScrollStep.value);
	console.log("Scroll Step changed from " + scrollStepOption + " to " + selectedValue);
	scrollStepOption = selectedValue;
	unFocus();

	let span1 = document.getElementById("spanSubtitle1");
	let span2 = document.getElementById("spanSubtitle2");

	var checkBox1 = document.getElementById("myCheck01");
	var checkBox2 = document.getElementById("myCheck02");

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
			console.log('keyup Invalid scroll step option: ', selectScrollStep.value);
			break;
	}
	
	if (lastSubtitleNumber > 0) {
		selectRow(selectedSubtitleNumber);
	}
	else {
		computeSubtitleTableHeight();
	}

}

function changeMargin(){
	const selectMargin = document.getElementById("marginMenu");
	const selectedValue = Number(selectMargin.value);
	console.log("Margin changed from " + marginOption + " to " + selectedValue);
	marginOption = selectedValue;
	unFocus();
}

function copyTime(elemIdTo, rowOffset, elemIdFrom) {

	let fromRow;

	switch (rowOffset) {
	case "-1":
		fromRow = timeEditPopupRow - 1;
		break;
	case "+1":
		fromRow = timeEditPopupRow + 1;
		break;
	default:
	}
	console.log("copyTime source row: ", fromRow);

	if ((fromRow <= 0) || (fromRow > lastSubtitleNumber)){
		console.log("copyTime source row out of bounds: ", fromRow);
		alert("copyTime source row out of bounds: " + fromRow);
		return;
	}

	let toType;
	switch (elemIdTo) {
	case "t1":
		toType = "start";
		break;
	case "t2":
		toType = "end";
		break;
	default:
		console.log('copyTime Invalid target prefix ', elemIdTo);
		alert('copyTime Invalid target prefix ' + elemIdTo);
		return;
	}

	switch (elemIdFrom) {
	case "t1":
	case "t2":
		break;
	default:
		console.log('copyTime Invalid source prefix ', elemIdFrom);
		alert('copyTime Invalid source prefix ' + elemIdFrom);
		return;
	}

	let oldText;
	let oldSeconds;
	let newText;
	let newSeconds;

	if (elemIdTo === 't1') {
		oldText = subtitleTable.rows[timeEditPopupRow].querySelector(".classSubtitleStart").textContent;
		oldSeconds = subtitleStartSeconds[timeEditPopupRow];
	} else {
		oldText = subtitleTable.rows[timeEditPopupRow].querySelector(".classSubtitleEnd").textContent;
		oldSeconds = subtitleEndSeconds[timeEditPopupRow];
	}
	if (elemIdFrom === 't1') {
		newText = subtitleTable.rows[fromRow].querySelector(".classSubtitleStart").textContent;
		newSeconds = subtitleStartSeconds[fromRow];
	} else {
		newText = subtitleTable.rows[fromRow].querySelector(".classSubtitleEnd").textContent;
		newSeconds = subtitleEndSeconds[fromRow];
	}

	console.log("copyTime Row ", elemIdTo, " ", toType, " changed from ",
			oldText, " to ", newText, 
			" seconds changed from ", oldSeconds, " to ", newSeconds);

	if (elemIdTo === 't1') {
		subtitleTable.rows[timeEditPopupRow].querySelector(".classSubtitleStart").textContent = newText;
		subtitleStartSeconds[timeEditPopupRow] = newSeconds;
		if ((subtitleTrack[timeEditPopupRow] === 1) && (timeEditSynchronizeWithTrack1)) {
			synchronizeWithTrack1(timeEditPopupRow, "t1", newSeconds, newText);
		}
	} else {
		subtitleTable.rows[timeEditPopupRow].querySelector(".classSubtitleEnd").textContent = newText;
		subtitleEndSeconds[timeEditPopupRow] = newSeconds;
		if ((subtitleTrack[timeEditPopupRow] === 1) && (timeEditSynchronizeWithTrack1)) {
			synchronizeWithTrack1(timeEditPopupRow, "t2", newSeconds, newText);
		}
	}
	document.getElementById(`copy${elemIdTo}`).style.pointerEvents = 'none';
	setTimeout(() => {document.getElementById(`copy${elemIdTo}`).style.pointerEvents = ''}, 500);
	showTimeEditPopup(timeEditPopupRow);

}

function changeTime(operation, elemId) {

	switch(operation) {
	case "close":
		showTimeEditPopup(0);
		return;
	case "restore":
		timeEditRestore(elemId); /* t1 or t2 */
		showTimeEditPopup(timeEditPopupRow);
		return;
	case "current":
		timeEditCurrent(elemId); /* t1 or t2 */
		showTimeEditPopup(timeEditPopupRow);
		return;
	case "increment":
	case "decrement":
		break;
	default:
		console.log('changeTime Invalid operation ', operation);
		alert("changeTime Invalid operation " + operation);
		return;
	}

	let min = 0;
	let max = 9;

	switch(elemId) {
	case "t1minuteField1":
	case "t2minuteField1":
	case "t1secondField1":
	case "t2secondField1":
		max = 5;		
	}

	let elem = document.getElementById(elemId);
	let value = Number(elem.textContent);

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

	elem.textContent = value;
	saveTime(elemId.substring(0,2));

	return;

function saveTime (prefix) {
	let fractionText = document.getElementById(prefix + "millisecondField1").textContent + 
		document.getElementById(prefix + "millisecondField2").textContent + 
		document.getElementById(prefix + "millisecondField3").textContent;

	let totalSeconds = (Number(document.getElementById(prefix + "hourField1").textContent) * 3600) +
		(Number(document.getElementById(prefix + "minuteField1").textContent) * 600) +
		(Number(document.getElementById(prefix + "minuteField2").textContent) * 60) +
		(Number(document.getElementById(prefix + "secondField1").textContent) * 10) +
		(Number(document.getElementById(prefix + "secondField2").textContent)) +
		(Number(fractionText) / 1000);
			
	let timeText = document.getElementById(prefix + "hourField1").textContent + ":" +
		document.getElementById(prefix + "minuteField1").textContent +
		document.getElementById(prefix + "minuteField2").textContent + ":" +
		document.getElementById(prefix + "secondField1").textContent +
		document.getElementById(prefix + "secondField2").textContent + "." +
		document.getElementById(prefix + "millisecondField1").textContent + 
		document.getElementById(prefix + "millisecondField2").textContent;

	console.log("saveTime fractionText ", fractionText, " timeText ", timeText, 
		" totalSeconds ", totalSeconds);

	switch (prefix) {
	case "t1":
		console.log("saveTime Row ", timeEditPopupRow, " start ", 
			" old ", 
			subtitleTable.rows[timeEditPopupRow].querySelector(".classSubtitleStart").textContent,
			" new ", timeText, 
			" seconds old ", subtitleStartSeconds[timeEditPopupRow], " new ", totalSeconds);
		subtitleStartSeconds[timeEditPopupRow] = totalSeconds;
		subtitleTable.rows[timeEditPopupRow].querySelector(".classSubtitleStart").textContent = timeText;
		if ((subtitleTrack[timeEditPopupRow] === 1) && (timeEditSynchronizeWithTrack1)) {
			synchronizeWithTrack1(timeEditPopupRow, "t1", totalSeconds, timeText);
		}
		break;
	case "t2":
		console.log("saveTime Row ", timeEditPopupRow, " end ",
			" old ", 
			subtitleTable.rows[timeEditPopupRow].querySelector(".classSubtitleEnd").textContent,
			" new ", timeText, 
			" seconds old ", subtitleEndSeconds[timeEditPopupRow], " new ", totalSeconds);
		subtitleEndSeconds[timeEditPopupRow] = totalSeconds;
		subtitleTable.rows[timeEditPopupRow].querySelector(".classSubtitleEnd").textContent = timeText;
		if ((subtitleTrack[timeEditPopupRow] === 1) && (timeEditSynchronizeWithTrack1)) {
			synchronizeWithTrack1(timeEditPopupRow, "t2", totalSeconds, timeText);
		}
		break;
	default:
		console.log('saveTime Invalid prefix ', prefix);
		return;
	}
	
}  // saveTime

function timeEditRestore(prefix) {

	switch (prefix) {
	case "t1":
		console.log("timeEditRestore Row ", timeEditPopupRow, " start restored from ",
			subtitleTable.rows[timeEditPopupRow].querySelector(".classSubtitleStart").textContent,
			" to ", t1timeEditPopupOldTime, 
			" seconds restored from ", subtitleStartSeconds[timeEditPopupRow], 
			" to ", t1timeEditPopupOldSeconds);
		subtitleTable.rows[timeEditPopupRow].querySelector(".classSubtitleStart").textContent = t1timeEditPopupOldTime;
		subtitleStartSeconds[timeEditPopupRow] = t1timeEditPopupOldSeconds;
		if ((subtitleTrack[timeEditPopupRow] === 1) && (timeEditSynchronizeWithTrack1)) {
			synchronizeWithTrack1(timeEditPopupRow, "t1", t1timeEditPopupOldSecondsOnTrack2, t1timeEditPopupOldTimeOnTrack2);
		}
		break;
	case "t2":
		console.log("timeEditRestore Row ", timeEditPopupRow, " end restored from ",
			subtitleTable.rows[timeEditPopupRow].querySelector(".classSubtitleEnd").textContent,
			" to ", t2timeEditPopupOldTime, 
			" seconds restored from ", subtitleEndSeconds[timeEditPopupRow], 
			" to ", t2timeEditPopupOldSeconds);
			subtitleTable.rows[timeEditPopupRow].querySelector(".classSubtitleEnd").textContent = t2timeEditPopupOldTime;
			subtitleEndSeconds[timeEditPopupRow] = t2timeEditPopupOldSeconds;
			if ((subtitleTrack[timeEditPopupRow] === 1) && (timeEditSynchronizeWithTrack1)) {
				synchronizeWithTrack1(timeEditPopupRow, "t2", t2timeEditPopupOldSecondsOnTrack2, t2timeEditPopupOldTimeOnTrack2);
			}
		break;
	default:
		console.log('timeEditRestore Invalid prefix ', prefix);
		return;
	}

}  // timeEditRestore

function timeEditCurrent(prefix) {

	let current;
	if (youTubeVideoId) {
		current = player.getCurrentTime();
	}
	else {
		current = videoElem.currentTime;
	}
	console.log("timeEditCurrent current ", current);

	let timeText = helper.toTimeString(current * 1000);	

	document.getElementById("currentTime").textContent = formatTime(current);
	document.getElementById("currentTimeOnDashboard").textContent = 
		document.getElementById("currentTime").textContent;


	switch (prefix) {
	case "t1":
		console.log("timeEditCurrent Row ", timeEditPopupRow, " start changed from ",
			subtitleTable.rows[timeEditPopupRow].querySelector(".classSubtitleStart").textContent,
			" to ", timeText, 
			" seconds changed from ", subtitleStartSeconds[timeEditPopupRow], 
			" to ", current);
		subtitleTable.rows[timeEditPopupRow].querySelector(".classSubtitleStart").textContent = timeText;
		subtitleStartSeconds[timeEditPopupRow] = current;
		if ((subtitleTrack[timeEditPopupRow] === 1) && (timeEditSynchronizeWithTrack1)) {
			synchronizeWithTrack1(timeEditPopupRow, "t1", current, timeText);
		}
		break;
	case "t2":
		console.log("timeEditCurrent Row ", timeEditPopupRow, " end changed from ",
			subtitleTable.rows[timeEditPopupRow].querySelector(".classSubtitleEnd").textContent,
			" to ", timeText, 
			" seconds changed from ", subtitleEndSeconds[timeEditPopupRow], 
			" to ", current);
		subtitleTable.rows[timeEditPopupRow].querySelector(".classSubtitleEnd").textContent = timeText;
		subtitleEndSeconds[timeEditPopupRow] = current;
		if ((subtitleTrack[timeEditPopupRow] === 1) && (timeEditSynchronizeWithTrack1)) {
			synchronizeWithTrack1(timeEditPopupRow, "t2", current, timeText);
		}
		break;
	default:
		console.log('timeEditCurrent Invalid prefix ', prefix);
		return;
	}

}  // timeEditCurrent

}  // changeTime

function findTrackRow(option, trackNumber, rowNumber) {

	switch (trackNumber) {
		case 0:
		case 1:
		case 2:
			break;
		default:
			let errorMsg = 'findTrackRow invalid trackNumber: ' + trackNumber;
			alert(errorMsg);
			throw new Error(errorMsg);
	}
	 
	let resultRow = 0;

	switch (option) {
		case "next":
			let nextRow = rowNumber + 1;
			while ((!resultRow) && (nextRow <= lastSubtitleNumber)) {
				if (subtitleTrack[nextRow] === trackNumber) {
					resultRow = nextRow;
				} else {
					nextRow++;
				}
			}
			break;
		case "prev":
			let prevRow = rowNumber - 1;
			while ((!resultRow) && (prevRow > 0)) {
				if (subtitleTrack[prevRow] === trackNumber) {
					resultRow = prevRow;
				} else {
					prevRow--;
				}
			}
			break;
		default:
			let errorMsg = 'findTrackRow invalid option: ' + option;
			alert(errorMsg);
			throw new Error(errorMsg);
	}


	return resultRow;

}

function synchronizeWithTrack1(rowNumber, prefix, time, timeText) {
	let sourceTrack = subtitleTrack[rowNumber];
	if (sourceTrack != 1) {
		let errorMsg = 'synchronizeWithTrack1 invalid sourceTrack: ' + sourceTrack + " rowNumber= " + rowNumber;
		alert(errorMsg);
		throw new Error(errorMsg);
	}

	let targetRow = findTrackRow('next', 2, rowNumber);
	if (!targetRow) { return; }

	switch (prefix) {
		case "t1":
			subtitleStartSeconds[targetRow] = time;
			subtitleTable.rows[targetRow].querySelector(".classSubtitleStart").textContent = timeText;
			break;
		case "t2":
			subtitleEndSeconds[targetRow] = time;
			subtitleTable.rows[targetRow].querySelector(".classSubtitleEnd").textContent = timeText;
			break;
		default:
			let errorMsg = 'synchronizeWithTrack1 invalid prefix: ' + prefix;
			alert(errorMsg);
			throw new Error(errorMsg);
	}
}  // synchronizeWithTrack1

function rectifySubtitleStart(rowNumber) {

	let previousRow = rowNumber - 1;
	let previousRowFound = false;
	while ((!previousRowFound) && (previousRow > 0)) {
		if (subtitleTrack[previousRow] === subtitleTrack[rowNumber]) {
			previousRowFound = true;
		} else {
			previousRow--;
		}
	}

	if (!previousRowFound) { return; }

	if (subtitleStartSeconds[rowNumber] >= subtitleEndSeconds[previousRow]) { return; }

	subtitleStartSeconds[rowNumber] = subtitleEndSeconds[previousRow];
	subtitleTable.rows[rowNumber].querySelector(".classSubtitleStart").textContent =
		subtitleTable.rows[previousRow].querySelector(".classSubtitleEnd").textContent;

	if ((subtitleTrack[rowNumber] === 1) && (timeEditSynchronizeWithTrack1)) {
		synchronizeWithTrack1(rowNumber, "t1", 
			subtitleStartSeconds[rowNumber], 
			subtitleTable.rows[rowNumber].querySelector(".classSubtitleStart").textContent);
	}

}  // rectifySubtitleStart

function undo() {
	console.log("undo undoArrayCurrentIndex = ", undoArrayCurrentIndex);
	if (undoArrayCurrentIndex >= 0) {
		console.log("undo undoArray[undoArrayCurrentIndex] = ", undoArray[undoArrayCurrentIndex]);
		console.log("redo undoArray[undoArrayCurrentIndex].inUse = ", undoArray[undoArrayCurrentIndex].inUse);
	}

	if ((undoArrayCurrentIndex < 0) || (!(undoArray[undoArrayCurrentIndex].inUse))) {
		console.log("undo Undo stack empty");
		return;
	}

	switch (undoArray[undoArrayCurrentIndex].action) {
	case "subtitleTextChange":
		subtitleTable.rows[undoArray[undoArrayCurrentIndex].rowNumber].querySelector(".classSubtitleText").textContent =
			undoArray[undoArrayCurrentIndex].oldValue;
		break;
	case "subtitleDeletion":
		let deletedRowNumber = undoArray[undoArrayCurrentIndex].rowNumber;
		insertSubtitle((deletedRowNumber - 1), 
						undoArray[undoArrayCurrentIndex].oldValue, 
						undoArray[undoArrayCurrentIndex].subtitleTrack, 
						"selectNone");
		subtitleTrack[deletedRowNumber] = undoArray[undoArrayCurrentIndex].subtitleTrack;
		subtitleStartSeconds[deletedRowNumber] = undoArray[undoArrayCurrentIndex].subtitleStartSeconds;
		subtitleEndSeconds[deletedRowNumber] = undoArray[undoArrayCurrentIndex].subtitleEndSeconds;
		subtitleTable.rows[deletedRowNumber].querySelector(".classSubtitleStart").textContent =
			undoArray[undoArrayCurrentIndex].startTime;
		subtitleTable.rows[deletedRowNumber].querySelector(".classSubtitleEnd").textContent =
			undoArray[undoArrayCurrentIndex].endTime;
		if (subtitleTrack[deletedRowNumber] > 0) {
			subtitleTable.rows[deletedRowNumber].querySelector(".classSubtitleTrack").textContent =
				undoArray[undoArrayCurrentIndex].subtitleStyle;
		}
		subtitleTable.rows[deletedRowNumber].querySelector(".classSubtitleText").textContent =
			undoArray[undoArrayCurrentIndex].oldValue;
		selectRow(undoArray[undoArrayCurrentIndex].selectedRowNumber);
		break;
	default:
		console.log('undo Invalid action ', undoArray[undoArrayCurrentIndex].action);
		alert("undo Invalid action " + undoArray[undoArrayCurrentIndex].action);
		return;
	}

	selectRow(undoArray[undoArrayCurrentIndex].selectedRowNumber);
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
		console.log('selectCurrentIndex Invalid arrayName ', arrayName);
		alert("selectCurrentIndex Invalid arrayName " + arrayName);
		return;

	}
}

function swapUndoElement() {
    const objFrom1 = undoArray[undoArrayCurrentIndex];
    const objFrom2 = redoArray[redoArrayCurrentIndex];
    undoArray[undoArrayCurrentIndex] = structuredClone(objFrom2);
    redoArray[redoArrayCurrentIndex] = structuredClone(objFrom1);
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
		subtitleTable.rows[redoArray[redoArrayCurrentIndex].rowNumber].querySelector(".classSubtitleText").textContent =
			redoArray[redoArrayCurrentIndex].newValue;
		selectRow(redoArray[redoArrayCurrentIndex].selectedRowNumber);
		selectCurrentIndex("undoArray");
		swapUndoElement();
		break;
	case "subtitleDeletion":
		selectRow(redoArray[redoArrayCurrentIndex].selectedRowNumber);
		textEditPopupAction('delete');
		break;
	default:
		console.log('redo Invalid action ', redoArray[redoArrayCurrentIndex].action);
		alert("redo Invalid action " + redoArray[redoArrayCurrentIndex].action);
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

function enableFields(checkBoxId){

	console.log("enableFields checkBoxId = ", checkBoxId);
	var checkBox = document.getElementById(checkBoxId);

	const selectScrollStep = document.getElementById("scrollStepMenu");

	switch (checkBoxId) {
	case 'myCheck01':
		if (checkBox.checked == true) {
			showSubtitleTrack1 = true;
		} else {
			showSubtitleTrack1 = false;
		}
		break;
	case 'myCheck02':
		if (checkBox.checked == true) {
			showSubtitleTrack2 = true;
			selectScrollStep.value = '2';
		} else {
			showSubtitleTrack2 = false;
			selectScrollStep.value = '1';
		}
		changeScrollStep();
		break;
	case 'myCheck03':
		if (checkBox.checked == true) {
			showCounter = true;
		} else {
			showCounter = false;
		}
		break;
	case 'myCheck04':
		if (checkBox.checked == true) {
			showSelectionInfo = true;
		} else {
			showSelectionInfo = false;
		}
		break;
	case 'myCheck05':
		if (checkBox.checked == true) {
			showControlButtons = true;
		} else {
			showControlButtons = false;
		}
		break;
	case 'myCheck06':
		toggleSubtitleSection();
		break;
	case 'myCheck07':
		toggleEditing();
		break;
	case 'myCheck08':
		if (checkBox.checked == true) {
			showTimePopup = true;
		} else {
			showTimePopup = false;
		}
		break;
	case 'myCheck09':
		toggleDashboard();
		break;
	case 'displayVideoControls':
		if (checkBox.checked == true) {
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
	let x = document.getElementById("dashboard");

	if (x.style.display == "inline-block") {
		x.style.display = "none";
		document.getElementById("myCheck09").checked = false;
		showCounter = true;
		document.getElementById("myCheck03").checked = true;
		showSelectionInfo = true;
		document.getElementById("myCheck04").checked = true;
		showControlButtons = true;
		document.getElementById("myCheck05").checked = true;
	} else {
		x.style.display = "inline-block";
		document.getElementById("myCheck09").checked = true;
		showCounter = false;
		document.getElementById("myCheck03").checked = false;
		showSelectionInfo = false;
		document.getElementById("myCheck04").checked = false;
		showControlButtons = false;
		document.getElementById("myCheck05").checked = false;
	}
}

function toggleEditing() {
	var checkBox = document.getElementById("myCheck07");

	if (document.getElementById("spanSubtitle1").contentEditable == "false") {
		console.log("enableFields editing changing to true");
		document.getElementById("spanSubtitle1").contentEditable = "true";
		document.getElementById("spanSubtitle2").contentEditable = "true";
		checkBox.checked = true;
	} else {
		console.log("enableFields editing changing to false");
		document.getElementById("spanSubtitle1").contentEditable = "false";
		document.getElementById("spanSubtitle2").contentEditable = "false";
		checkBox.checked = false;
	}

	console.log("toggleEditing editing ", 
			document.getElementById("spanSubtitle1").contentEditable);

}


function toggleSubtitleSection() {
	var checkBox = document.getElementById("myCheck06");

	if (showSubtitleTable) {
		showSubtitleTable = false;
		checkBox.checked = false;
	} 
	else {
		showSubtitleTable = true;
		checkBox.checked = true;
	}

	computeSubtitleTableHeight();
}


function toggleVideoSection() {
	let x = document.getElementById("wrapper");

	if (toggleVideoSwitch == "on") {
		toggleVideoSwitch = "off";
		x.style.display = "none";
	} 
	else {
		toggleVideoSwitch = "on";
		x.style.display = "block";
	}

	computeSubtitleTableHeight();
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

	document.getElementById("selectedTheme").style.backgroundColor = themeAttributes.backgroundColor;
	document.getElementById("selectedTheme").style.color = themeAttributes.foregroundColor;
	document.getElementById("selectedTheme").textContent = themeAttributes.themeName + dropDownArrow;

	document.getElementById("myCheck10").checked = false;

	if (selectedSubtitleNumber > 0){
		highlightSelectedRow(selectedSubtitleNumber);
	 }
				
}  // changeTheme

function skipBackward() {

	let videoCurrentTime = 0;

	if (youTubeVideoId) {
		videoCurrentTime = player.getCurrentTime();
	} else {
		videoCurrentTime = videoElem.currentTime;
	}

	let newTime = videoCurrentTime - skipBackwardSeconds;
	console.log("skipBackward newTime ", newTime);

	if (playing && !playingContinuously) {
		if (newTime < subtitleStartSeconds[selectedSubtitleNumber]) {
			newTime = subtitleStartSeconds[selectedSubtitleNumber];
		}
		skipTo(newTime);
		return;
	}
	
	if (newTime >= subtitleStartSeconds[selectedSubtitleNumber]) {
		skipTo(newTime);
		return;
	}

	let stop = false;
	let rowIndex = selectedSubtitleNumber;

	do {
		rowIndex = findTrackRow('prev', subtitleTrack[selectedSubtitleNumber], rowIndex);
		if (!rowIndex) {
			stop = true;
		} else {
			if (newTime > subtitleEndSeconds[rowIndex]) {
				stop = true;
			} 
			else {
				if (newTime >= subtitleStartSeconds[rowIndex]) {
					selectRow(rowIndex);
					stop = true;
				}
			} 
		}
	}
	while ((!stop))

/*	
	while ((!stop) && ((selectedSubtitleNumber - decrement) >= 1)) {
		if ((document.getElementById("spanTrack").textContent) ==
			(subtitleTable.rows[selectedSubtitleNumber - decrement].querySelector(".classSubtitleTrack").textContent)) {
			if (newTime > subtitleEndSeconds[selectedSubtitleNumber - decrement]) {
				stop = true;
			} 
			else {
				if (newTime >= subtitleStartSeconds[selectedSubtitleNumber - decrement]) {
					selectRow(selectedSubtitleNumber - decrement);
					stop = true;
				}
			} 
		}
		if (!stop) {
			decrement += 1;
		}
	}
*/
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
			videoElem.currentTime = time;
	}
	console.log("skipTo updateTime");
	updateTime();
}

function skipForward() {

	let videoCurrentTime = 0;

	if (youTubeVideoId) {
		videoCurrentTime = player.getCurrentTime();
	} else {
		videoCurrentTime = videoElem.currentTime;
	}

	let newTime = videoCurrentTime + skipForwardSeconds;

	if (playing && !playingContinuously) {
		if (newTime > subtitleEndSeconds[selectedSubtitleNumber]) {
			newTime = subtitleEndSeconds[selectedSubtitleNumber] - skipForwardSeconds;
		}
		skipTo(newTime);
		return;
	}

	if (newTime <= subtitleEndSeconds[selectedSubtitleNumber]) {
		skipTo(newTime);
		return;
	}

	let stop = false;
	let rowIndex = selectedSubtitleNumber;

	do {
		rowIndex = findTrackRow('next', subtitleTrack[selectedSubtitleNumber], rowIndex);
		if (!rowIndex) {
			stop = true;
		} else {
			if (newTime < subtitleStartSeconds[rowIndex]) {
				stop = true;
			} 
			else {
				if (newTime <= subtitleEndSeconds[rowIndex]) {
					selectRow(rowIndex);
					stop = true;
				}
			}
		} 
	}
	while ((!stop))

/*	
	let increment = 1;
	let stop = false;
	while ((!stop) && ((selectedSubtitleNumber + increment) >= 1)) {
		if ((document.getElementById("spanTrack").textContent) ==
			(subtitleTable.rows[selectedSubtitleNumber + increment].querySelector(".classSubtitleTrack").textContent)) {
			if (newTime < subtitleStartSeconds[selectedSubtitleNumber + increment]) {
				stop = true;
			} 
			else {
				if (newTime <= subtitleEndSeconds[selectedSubtitleNumber + increment]) {
					selectRow(selectedSubtitleNumber + increment);
					stop = true;
				}
			} 
		}
		if (!stop) {
			increment += 1;
		}
	}
*/
	skipTo(newTime);	

}

function checkTime() {
	if (!checkTimeEnabled) {
		console.log('checkTime entered while NOT Enabled');
		if (!youTubeVideoId) {
			videoElem.removeEventListener("timeupdate",checkTime,true);
		}
		return;
	}
   	console.log('checkTime entered.');
	let videoCurrentTime = 0;
	
	if (playingContinuously) {
		let rowIndex = findTrackRow('next', subtitleTrack[selectedSubtitleNumber], selectedSubtitleNumber);
		if (youTubeVideoId) {
			videoCurrentTime = player.getCurrentTime();
		}
		else {
			videoCurrentTime = videoElem.currentTime;
		}
		if ((rowIndex) && (videoCurrentTime >= subtitleStartSeconds[rowIndex])) {
			selectRow(rowIndex);
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
		videoCurrentTime = videoElem.currentTime;
	}
    	console.log('checkTime videoCurrentTime', videoCurrentTime, 
		' subtitleEndSeconds[selectedSubtitleNumber] ', subtitleEndSeconds[selectedSubtitleNumber]);
    	console.log('checkTime looping = ', looping, ' videoStateBusy() = ', videoStateBusy()); 
		// If the end of the current selection has not been reached, return.
	if (videoCurrentTime < (subtitleEndSeconds[selectedSubtitleNumber] + marginOption)) {
		if (youTubeVideoId) {
			setTimeout(checkTime, checkTimeInterval);
		}
		updateTime();
		return;
	}
		// Playing the current selection once
	if (!looping) {
		//if (videoStateBusy()) {
			pauseVideo();
		//}
		checkTimeEnabled = false;
		updateTime();
		return;
	}
		// Playing the current selection in a loop.
	if (youTubeVideoId) {
		if (player.getPlayerState() != YT.PlayerState.PAUSED) {
			pauseYouTubeVideo();
		}
		player.seekTo(subtitleStartSeconds[selectedSubtitleNumber], true);
		console.log("checkTime seekTo subtitleStartSeconds[selectedSubtitleNumber] ", 
			subtitleStartSeconds[selectedSubtitleNumber], 
			" player.getCurrentTime ", player.getCurrentTime());
		setTimeout(checkTime, checkTimeInterval);
	}
	else {
		videoElem.removeEventListener("timeupdate",checkTime,true);
		clearTimeout(timeoutId);
		playVideo(selectionStartSeconds,selectionEndSeconds);
		//videoElem.currentTime = subtitleStartSeconds[selectedSubtitleNumber];
    	//videoElem.addEventListener("timeupdate", checkTime, true);
		//let delay = (subtitleEndSeconds[selectedSubtitleNumber] 
		//	- subtitleStartSeconds[selectedSubtitleNumber] 
		//	+ (2 * marginOption)) * 1000;
		//console.log("checkTime delay = ", delay);
		//setTimeout(handleSelectionTimeOut, delay);
	}

	console.log("checkTime updateTime");
	updateTime();
	return;
} // checkTime

function pauseVideo() {
	console.log('pauseVideo entered');
	looping = false;
	checkTimeEnabled = false;
	if (youTubeVideoId) {
		pauseYouTubeVideo();
	}
	else {
		clearTimeout(timeoutId);
		videoElem.pause();
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
		videoElem.currentTime = time1;
	}

	console.log("playVideo updateTime");
	updateTime();

	if (time2 == 0) {
		playingContinuously = true;
	}
	issuePlayVideo();
	playing = true;
    if (youTubeVideoId) {
//		setTimeout(checkTime, checkTimeInterval);
	}
	else {
    	console.log('playVideo: Adding timeupdate listener to run checkTime.');
		videoElem.addEventListener("timeupdate", checkTime, true);
	}	
	checkTimeEnabled = true;

} // playVideo


function issuePlayVideo() {
	console.log('issuePlayVideo entered');
	callUpdateTimeEnabled = true;
	callUpdateTimeTimeoutId ??= setTimeout(callUpdateTime, updateTimeInterval);

	if (!youTubeVideoId) {
		issuePlayVideo2();
	}
	else {
		player.playVideo();
		console.log("issuePlayVideo updateTime");
		updateTime();
		checkTimeEnabled = true;
		setTimeout(checkTime, checkTimeInterval);
	}	
}

async function issuePlayVideo2() {
	console.log('issuePlayVideo2 entered');
	try {
    	await videoElem.play();
		if (!playingContinuously) {
			let delay = (selectionEndSeconds - selectionStartSeconds) * 1000;
			console.log("issuePlayVideo2 delay = ", delay);
			timeoutId = setTimeout(handleSelectionTimeOut, delay);
		}

	} catch (err) {
		let errMsg = 'issuePlayVideo2: Play request failed. err = ' + err;
    	console.log(errMsg);
		let playPauseError = "The play() request was interrupted by a call to pause()."
		if ((err.name != 'AbortError') || 
			(err.message.substring(0, (playPauseError.length)) != playPauseError)) {
			alert(errMsg);
		}
	}
}

function handleSelectionTimeOut() {
	if (!playing) {return;}
   	console.log("handleSelectionTimeOut video currentTime = ", videoElem.currentTime);
   	console.log("handleSelectionTimeOut ms elapsed = ",  
		(videoElem.currentTime - subtitleStartSeconds[selectedSubtitleNumber]) * 1000);
	videoElem.currentTime = selectionEndSeconds;
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
}

function handleVideoOnEnded() {
	console.log('handleVideoOnEnded looping = ', looping);
	if (looping) {
		issuePlayVideo();
		return;
	}
	if (!playingContinuously) {
		if (youTubeVideoId) {
			player.seekTo(subtitleStartSeconds[selectedSubtitleNumber], true);
			console.log("handleVideoOnEnded seekTo subtitleStartSeconds[selectedSubtitleNumber]] ", 
				subtitleStartSeconds[selectedSubtitleNumber], 
				" player.getCurrentTime ", player.getCurrentTime());
			if (player.getPlayerState() != YT.PlayerState.PAUSED) {
				pauseYouTubeVideo();
			}
		}
		else {
			videoElem.currentTime = subtitleStartSeconds[selectedSubtitleNumber];
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
}

async function loadVideoFile(file) {

	console.log("loadVideoFile videoFileLoaded = " + videoFileLoaded);

	if (videoFileLoaded) {
		return;
		console.log("loadVideoFile videoFileLoaded true");
	}

//	const file = videoFile.files[0];
    const fileURL = URL.createObjectURL(file);
    videoElem.setAttribute("src", fileURL);
	console.log("loadVideoFile fileURL = ", fileURL);
	// console.log("loadVideoFile videoElem.getAttribute('src') = ", videoElem.getAttribute("src"));
	// console.log("loadVideoFile videoElem.src = ", videoElem.src);
	console.log("loadVideoFile file.name = ", file.name);

	videoElem.onpause = function() {
		handleVideoOnPause();
	}

	videoElem.onended = function() {
		handleVideoOnEnded();
	}

	videoElem.onloadedmetadata = function() {

		if (videoFileLoaded) {
			return;
		}

		if (videoElem.videoWidth === 0 && videoElem.videoHeight === 0) {
			audioFileLoaded = true;
			displayVideoControls = true;
			const selectVideoSize = document.getElementById("videoSizeMenu");
			selectVideoSize.value = '0.10';
		}

		if (displayVideoControls) {
			videoElem.controls = true;
		} else {
			videoElem.controls = false;
		}

		videoElem.style.display = 'inline-block';

		videoDuration = videoElem.duration;
		console.log('loadVideoFile Video duration = ',videoDuration);
		document.getElementById("duration").textContent = formatTime(videoDuration);
		document.getElementById("durationOnDashboard").textContent = 
				document.getElementById("duration").textContent;
		//setInterval(updateTime, updateTimeInterval);


		console.log('loadVideoFile intrinsic height = ',videoElem.videoHeight);
		console.log('loadVideoFile intrinsic width = ',videoElem.videoWidth);

		document.getElementById('wrapper').style.backgroundColor = "transparent";
		document.getElementById('wrapper').style.border = "none";
		document.getElementById('pageTitle').style.display = "none";

		//let newWidth = Math.round((videoElem.videoWidth)*0.50);
		//console.log('loadVideoFile newWidth = ',newWidth);

		//var myWrapper = document.getElementById('wrapper');
		//myWrapper.style.width = newWidth + "px";
		//myWrapper.style.backgroundColor = "transparent";
		//const pageTitle = document.getElementById('pageTitle');
		//pageTitle.style.display = "none";

		console.log(videoElem);
		console.log({videoElem});

		videoFileLoaded = true;

		handleVideoFileLoaded();
		
		console.log("videoElem.onloadedmetadata Exiting");

	}

	console.log("loadVideoFile Exiting");

}  // loadVideoFile

function handleVideoFileLoaded() {

	if (lastSubtitleNumber > 0) {
		subtitleTimeCorrections();
	}

	if (selectedSubtitleNumber > 0){
		selectRow(selectedSubtitleNumber);
 	}

	changeVideoSize(); // Initialize video width.
	addKeyListenerForVideo();
	addKeyListener();

	removeVideoPrompts();
	updateSliderFill(document.getElementById("seekBar"));

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
			if (!event.shiftKey) {
				break;
			}
		case "{":
			var x = document.getElementById("videoSizeMenu");
			if (x.selectedIndex > 0) {
				x.selectedIndex -= 1;
			}
			changeVideoSize();
			break;
		case "+":
			if (!event.shiftKey) {
				break;
			}
		case "}":
			var x = document.getElementById("videoSizeMenu");
			if (x.selectedIndex < (x.length - 1)) {
				x.selectedIndex += 1;
			}
			changeVideoSize();
			break;
		}	
	});
	console.log("addKeyListenerForVideo completed");

}  // addKeyListenerForVideo

function handleSeek(e) {

	console.log("handleSeek entered");
	//	updateSliderFill(document.getElementById("seekBar"));

	let subtitleIndex = 1;
	let stop = false;
	let targetSeconds = (e.target.value / 100) * videoDuration;
	console.log("handleSeek e.target.value = ", e.target.value, 
		" targetSeconds = ", targetSeconds);

	while ((!stop) && (subtitleIndex <= lastSubtitleNumber)) {
		if (targetSeconds <= subtitleEndSeconds[subtitleIndex]) {
			selectRow(subtitleIndex);
			stop = true;
		}
		subtitleIndex += 1;
	}

	if (!stop) {
		selectRow(lastSubtitleNumber);
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
//		videoElem.currentTime = ((e.target.value / 100) * duration);
//	}
//
//	updateSliderFill(document.getElementById("seekBar"));
//
//}

function removeVideoPrompts() {
	// Remove the file selection button.
	let elem = document.getElementById('inputWrapper');
	elem.style.display = 'none';
		
	// Remove the URL entry section.
	//elem = document.getElementById('videoURLContainer');
	//elem.style.display = 'none';
	// elem.parentNode.removeChild(elem);
}

function getYouTubeVideoId(url) {
    var simplifiedPattern = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(simplifiedPattern);
	var result = (match && match[2].length == 11) ? match[2] : null;
	if (!result){
		errorMsg = 'getYouTubeID The YouTube video Id in the link provided is invalid';
		alert(errorMsg);
		return result;
	}

	youTubeVideoId = result;
	console.log("getYouTubeVideoId youTubeVideoId ", youTubeVideoId);

	removeVideoPrompts();
	// Remove the file video player.
	videoElem.style.display = 'none';

	var tag = document.createElement('script');

	tag.src = "https://www.youtube.com/iframe_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

	return result;
}

function onYouTubeIframeAPIReady() {
	
	// const myWrapper = document.getElementById('wrapper');
	// myWrapper.style.backgroundColor = "transparent";
	// document.getElementById('pageTitle').style.display = "none";

	document.getElementById('wrapper').style.backgroundColor = "transparent";
	document.getElementById('wrapper').style.border = "none";
	document.getElementById('pageTitle').style.display = "none";


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
	document.getElementById("duration").textContent = formatTime(videoDuration);
	document.getElementById("durationOnDashboard").textContent = 
		document.getElementById("duration").textContent;
	console.log('onYouTubePlayerReady Video duration = ',videoDuration);
	//setInterval(updateTime, updateTimeInterval);

	videoFileLoaded = true;

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
		current = videoElem.currentTime;
	}
	console.log("updateTime current ", current);

	document.getElementById("currentTime").textContent = formatTime(current);
	document.getElementById("currentTimeOnDashboard").textContent = 
		document.getElementById("currentTime").textContent;

	
	document.getElementById("seekBar").value = (current / videoDuration) * 100;
	updateSliderFill(document.getElementById("seekBar"));

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

async function loadFontListFile(file) {

	console.log("loadFontListFile fileInput.files[0] " + fontListFileInput.files[0]);
	console.log("loadFontListFile file name " + file.name);
	let extension = file.name.substring((file.name.length - 4));
	console.log("loadFontListFile extension " + extension);

	switch(extension) {
	case '.txt':
		break;
	default:
		errorMsg = 'Unsupported file extension: ' + extension;
		alert(errorMsg);
		return;
	}
	// Asynchronously load the file contents.
	const textContent = await file.text();
	const lineArray = textContent.split(/\n/);

	let fileElem = document.getElementById("fontListFileInput");
	console.log("loadFontListFile Clearing fileElem.value");
	console.log(fileElem.value);

	let fontArray = [];
	let fontArrayIndex = 0;
	let alertIssued = false;

	lineArray.filter(line => line.trim() !== "").forEach(createRow);

	if (fontArrayIndex == 0) {
		if (!alertIssued) {
			errorMsg = 'Empty font list file encountered. Operation cancelled';
			alert(errorMsg);
		}
		return;
	}

	var subtitleFontOptions = document.getElementById("subtitleFontMenu");
  	while (subtitleFontOptions.firstChild) {
		subtitleFontOptions.removeChild(subtitleFontOptions.lastChild);
	}
	selectedFont = fontArray[0];
	createSubtitleFontOptions(fontArray);
	changeFont();
	return;

	function createRow(content) {
		if (alertIssued) {return;}
		if (content.length > 50) {
			errorMsg = 'Maximum line length exceeded: \n' + content + '\nOperation cancelled';
			alert(errorMsg);
			alertIssued = true;
			return;
		}
		if (fontArrayIndex > 50) {
			errorMsg = 'Maximum line number exceeded: \n' + content + '\nOperation cancelled';
			alert(errorMsg);
			alertIssued = true;
			return;
		}
		fontArray[fontArrayIndex] = content;
		fontArrayIndex += 1;
	} // createRow
} // loadFontListFile

async function loadSubtitleFile(trackNumber, file) {

	statusMsg("loadSubtitleFile", "Loading subtitle file " + trackNumber);

	// sample mergeDataArray member: 
	// 	{dataIndex: "1", arrayIndex: 0} means subtitleFileDataArray[1].array[0]
	//
	// sample subtitleFileDataArray[x].array[y] member: 
	// 	{track: 0; startSeconds: 120, endSeconds: 123, startTime: "0:02.00", endTime: "0:02.03", 
	//		subtitleStyle: "File1", subtitle: "Caption text" }

	let oldSelectedSubtitleNumber = 0;

	if (trackNumber < 2) {
		if (trackNumber === 0) {
			oldSelectedSubtitleNumber = selectedSubtitleNumber;
		}
		deleteSubtitleTable();
	}

	await extractSubtitleFile(file, subtitleFileDataArray[trackNumber]);
//?? What if totalNumberOfSubtitlesRead = 0?
	if (trackNumber === 0) {
		document.getElementById("save1File").style.display = "inline-block";
		document.getElementById("save2Files").style.display = "none";
		document.getElementById("subtitleTrack").classList.add('notDisplayed');
		if (oldSelectedSubtitleNumber <= totalNumberOfSubtitlesRead) {
			selectedSubtitleNumber = oldSelectedSubtitleNumber;
		}
		if (selectedSubtitleNumber == 0) {	// If no subtitle has yet been selected
			selectedSubtitleNumber = 1;		// by default, select the first subtitle
		}
		displaySubtitles();
		document.getElementById("scrollStepMenu").value = '1';
		changeScrollStep();
		console.log("loadSubtitleFile subtitleFileDataArray[0].loaded = ", 
			subtitleFileDataArray[0].loaded);
		return;
	}
	
	document.getElementById("save1File").style.display = "none";
	document.getElementById("save2Files").style.display = "inline-block";
	document.getElementById("subtitleTrack").classList.remove('notDisplayed');

	console.log("loadSubtitleFile subtitleFileDataArray[1].loaded = ", subtitleFileDataArray[1].loaded);
	console.log("loadSubtitleFile subtitleFileDataArray[2].loaded = ", subtitleFileDataArray[2].loaded);

	if (subtitleFileDataArray[1].loaded && subtitleFileDataArray[2].loaded) {
		statusMsg("loadSubtitleFile", "Merging tracks 1 & 2");
		totalNumberOfSubtitlesRead = 
			interleave(subtitleFileDataArray[1].array, subtitleFileDataArray[2].array);
		console.log("loadSubtitleFile mergeDataArray.length = ", mergeDataArray.length);
		console.log("loadSubtitleFile mergeDataArray[0] = ", mergeDataArray[0]);
		console.log("loadSubtitleFile mergeDataArray[1] = ", mergeDataArray[1]);
		mergeDataArray.forEach(function(dataElement, index) {
			createSubtitleRow(subtitleFileDataArray[dataElement.dataIndex].array[dataElement.arrayIndex], 
			(index + 1));
		});
		selectedSubtitleNumber = 1;		// by default, select the first subtitle
		statusMsg("loadSubtitleFile", "Displaying subtitles");
		displaySubtitles();
		if (trackNumber === 2) {
			document.getElementById("scrollStepMenu").value = '2';
			changeScrollStep();
		}
	}
	logTimeStamp("loadSubtitleFile", "exiting");

}  // loadAndDisplaySubtitles

function displaySubtitles()	 {

	if (totalNumberOfSubtitlesRead == 0) { return; }
	
	document.getElementById("selectionLabel").style.display = "inline";
	document.getElementById("selectionHyphen").style.display = "inline";
	document.getElementById("selectionLabelOnDashboard").style.display = "inline";
	document.getElementById("selectionHyphenOnDashboard").style.display = "inline";
	
	console.log("displaySubtitles lastSubtitleNumber old " + lastSubtitleNumber
		+ " new " + totalNumberOfSubtitlesRead);

	if (lastSubtitleNumber > totalNumberOfSubtitlesRead) {
		console.log("displaySubtitles lastSubtitleNumber ", lastSubtitleNumber, 
			" > totalNumberOfSubtitlesRead ", totalNumberOfSubtitlesRead);
		errorMsg = 'displaySubtitles lastSubtitleNumber > totalNumberOfSubtitlesRead';
		alert(errorMsg);
		throw new Error(errorMsg);
	}

	lastSubtitleNumber = totalNumberOfSubtitlesRead;

	if (videoFileLoaded) {
		subtitleTimeCorrections();
	}

	selectRow(selectedSubtitleNumber);

	if (showSubtitleTable) {
		let elem = document.getElementById("subtitleTableDiv");
		elem.style.display = "block";
	}

	addKeyListenerForSubtitles();

	addKeyListener();

	// unFocus();
	
}  // displaySubtitles

function updateRow() {

	let selectedSpan = "";
	let rowNumber = 0;
	let doNothing = true;

	if (spanSubtitle1Selected) {
		selectedSpan = "spanSubtitle1";
		rowNumber = spanSubtitle1Row;
		spanSubtitle1Selected = false;
		if (spanSubtitle1Modified) {
			doNothing = false;
			spanSubtitle1Modified = false;
		}
	} else if (spanSubtitle2Selected) {
		selectedSpan = "spanSubtitle2";
		rowNumber = spanSubtitle2Row;
		spanSubtitle2Selected = false;
		if (spanSubtitle2Modified) {
			doNothing = false;
			spanSubtitle2Modified = false;
		}
	}

	console.log("updateRow ", selectedSpan, " rowNumber ", rowNumber, " modified = ", !doNothing);

	if (doNothing) { return; }

	let oldValue = subtitleTable.rows[rowNumber].querySelector(".classSubtitleText").textContent;
	let newValue = document.getElementById(selectedSpan).textContent;
	console.log("updateRow ", selectedSpan, " oldValue = ", oldValue);
	console.log("updateRow ", selectedSpan, " newValue = ", newValue);
	if (newValue === "_") {
		newValue = oldValue;
	} 
	if (oldValue != newValue) {
		changeCounter += 1;
		selectCurrentIndex("undoArray");
		undoArray[undoArrayCurrentIndex].inUse = true;
		undoArray[undoArrayCurrentIndex].changeNumber = changeCounter;
		undoArray[undoArrayCurrentIndex].action = "subtitleTextChange";
		undoArray[undoArrayCurrentIndex].rowNumber = rowNumber;
		undoArray[undoArrayCurrentIndex].selectedRowNumber = selectedSubtitleNumber;
		undoArray[undoArrayCurrentIndex].oldValue = oldValue;
		undoArray[undoArrayCurrentIndex].newValue = newValue;
		subtitleTable.rows[rowNumber].querySelector(".classSubtitleText").textContent = newValue;
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
				spanSubtitle1Modified = false;
				spanSubtitle2Modified = false;
				selectRow(selectedSubtitleNumber);
				event.preventDefault();
				return;
			default:
				return;	
			}
		}

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
			insertSubtitle((selectedSubtitleNumber - 1), "", subtitleTrack[selectedSubtitleNumber], 
				"selectNew");
			break;
		case "d":
			console.log("d delete row ", selectedSubtitleNumber);
			deleteSubtitle(selectedSubtitleNumber);
			break;
		case "n":
			console.log("n newLine after ", selectedSubtitleNumber);
			insertSubtitle(selectedSubtitleNumber, "", subtitleTrack[selectedSubtitleNumber], 
				"selectNew");
			break;
		case "r":
			console.log("r redo");
			redo();
			break;
		case "t":
			var d = new Date();
			alert(d);
			break;
		case "u":
			console.log("u undo");
			undo();
			break;
		case "Home":
			selectRow(1,"scroll");
			break;
		case "End":
			selectRow(lastSubtitleNumber,"scroll");
			break;
		case "Delete":
			toggleVideoSection();
			break;
		case "/":
			if (!event.ctrlKey) {
				return;	
			}
			if (document.getElementById("timeEditPopup").style.display == "inline-block") {
				showTimeEditPopup(0);
			} else {
				showTimeEditPopup(selectedSubtitleNumber);
			}
			event.preventDefault();
			break;
		case "-":
			if (event.shiftKey) {
				break;
			}
		case "[":
			var x = document.getElementById("subtitleFontSizeMenu");
			if (x.selectedIndex > 0) {
				x.selectedIndex -= 1;
			}
			changeFontSize();
			break;
		case "+":
			if (event.shiftKey) {
				break;
			}
		case "]":
			var x = document.getElementById("subtitleFontSizeMenu");
			if (x.selectedIndex < (x.length - 1)) {
				x.selectedIndex += 1;
			}
			changeFontSize();
			break;
		case "Insert":
			toggleSubtitleSection();
			break;
		}	
	});

	document.getElementById("spanSubtitle1").addEventListener('input', () => {
		spanSubtitle1Modified = true;
	});

	document.getElementById("spanSubtitle1").addEventListener('click', (e) => {
		if (!(document.getElementById("myCheck07").checked)) { return;}
		spanSubtitle1Selected = true;
		spanSubtitle2Selected = false;
		e.preventDefault();
		return;
	});

	document.getElementById("spanSubtitle1").addEventListener('blur', () => {
		console.log("onBlur spanSubtitle1 spanSubtitle1Modified = ", spanSubtitle1Modified);
		updateRow();
	});


	document.getElementById("spanSubtitle2").addEventListener('input', () => {
		spanSubtitle2Modified = true;
	});

	document.getElementById("spanSubtitle2").addEventListener('click', (e) => {
		if (!(document.getElementById("myCheck07").checked)) { return;}
		spanSubtitle2Selected = true;
		spanSubtitle1Selected = false;
		//document.getElementById("textEditPopup").style.display = "inline-block";
		e.preventDefault();
		return;
	});

	document.getElementById("spanSubtitle2").addEventListener('blur', () => {
		console.log("onBlur spanSubtitle2 spanSubtitle2Modified = ", spanSubtitle2Modified);
		updateRow();
	});

	keyListenerForSubtitlesAdded = true;
	console.log("addKeyListenerForSubtitles completed");


}  // addKeyListenerForSubtitles

function deleteSubtitleTable() {
	console.log("deleteSubtitleTable Deleting subtitle table");
	let new_tbody = document.createElement('tbody');
	let old_tbody = document.getElementById("subtitleTbody");
	old_tbody.parentNode.replaceChild(new_tbody, old_tbody);
	new_tbody.id = "subtitleTbody";
	subtitleStartSeconds = [];
	subtitleEndSeconds = [];
	subtitleTrack = [];
	lastSubtitleNumber = 0;
	selectedSubtitleNumber = 0;
	totalNumberOfSubtitlesRead = 0;
	subtitleFileDataArray[0].loaded = false;
	subtitleFileDataArray[1].loaded = false;
	subtitleFileDataArray[2].loaded = false;
}

function newFile() {

	if (lastSubtitleNumber > 0) {
		if (!confirm("Discard all present subtitles and begin a new file?")) {
    		return;
		}
		deleteSubtitleTable();
	} 

/*	let rowObject = {};
	rowObject.track = 0;
	rowObject.startSeconds = 0;
	rowObject.endSeconds = 2;
	rowObject.startTime = "0:00:00.00";
	rowObject.endTime = "0:00:02.00";
	rowObject.subtitleStyle = subtitleFileDataArray[0].defaultSubtitleStyle;
	rowObject.subtitle = ""; // "…";
*/

	let rowObject = {
		track: 0,
		startSeconds: 0,
		endSeconds: 2,
		startTime: "0:00:00.00",
		endTime: "0:00:02.00",
		subtitle: ""
	};

	rowObject.subtitleStyle = subtitleFileDataArray[0].defaultSubtitleStyle;

	subtitleFileDataArray[0].loaded = true;
	createSubtitleRow(rowObject, 1);

	totalNumberOfSubtitlesRead = 1;
	selectedSubtitleNumber = 1;
	lastSubtitleNumber = 1;
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

	console.log("textEditPopupAction operand = ", operand);

	switch (operand) {
		case 'mousedown':
			spanSubtitle1Modified = false;
			spanSubtitle2Modified = false;
			return;
		case 'updateRow':
			updateRow();
			return;
		case 'splitToNext':
		case 'splitToNextNewline':
		case 'splitToPrev':
			document.getElementById("splitLineWrapper").style.pointerEvents = 'none';
			setTimeout(() => {document.getElementById("splitLineWrapper").style.pointerEvents = ''}, 500);
			break;
		case 'playSingle':
			buttonAction('currentLine');
			return;
		case 'selectPrev':
			buttonAction('prevST');
			return;
		case 'selectNext':
			buttonAction('nextST');
			return;
		case 'insertAbove':
		case 'insertBelow':
			document.getElementById("insertLineWrapper").style.pointerEvents = 'none';
			setTimeout(() => {document.getElementById("insertLineWrapper").style.pointerEvents = ''}, 500);
			if (operand === 'insertAbove') {
				insertSubtitle((selectedSubtitleNumber - 1), "", subtitleTrack[selectedSubtitleNumber], 
					"selectNew");
			} else {
				insertSubtitle(selectedSubtitleNumber, "", subtitleTrack[selectedSubtitleNumber], 
					"selectNew");
			}
			return;
		case 'delete':
			deleteSubtitle(selectedSubtitleNumber);
			return;
		default:
			console.log("textEditPopupAction invalid operand: ", operand);
			return;
	}

	let selectedSpan = "";
	let rowNumber = 0;

	if (spanSubtitle1Selected) {
		selectedSpan = "spanSubtitle1";
		rowNumber = spanSubtitle1Row;
		spanSubtitle1Selected = false;
	} else if (spanSubtitle2Selected) {
		selectedSpan = "spanSubtitle2";
		rowNumber = spanSubtitle2Row;
		spanSubtitle2Selected = false;
	}

	if (selectedSpan == "") {
		console.log("textEditPopupAction operand ", operand, " rowNumber ", rowNumber,
		' selectedSpan = ""', selectedSpan);
		alert("textEditPopupAction Place cursor in edit area before choosing split action");
		return;
	}

	console.log("textEditPopupAction operand ", operand, " rowNumber ", rowNumber,
		" selectedSpan ", selectedSpan);

	let textElement = document.getElementById(selectedSpan);
	
	//updateCursorPosition();
	//document.getElementById("textEditPopup").style.display = "none";
	//return;
	
	let range = window.getSelection().getRangeAt(0);
	let cursorPosition = getCharacterOffsetWithin(range, textElement);
	
//	var editor = document.activeElement;
//	var editor = textElement;
//	while (editor && !editor.classList.contains("editor")) editor = editor.parentElement;
//	if (!editor) return;
// 	let cursorPosition = CaretUtil.getCaretPosition(textElement);

	const text1 = textElement.textContent.substring(0, cursorPosition);
	const text2 = textElement.textContent.substring(cursorPosition);
/*
	let text1 = "";
	let text2 = "";
	if (cursorPosition == 0) {
		text1 = "";
		text2 = textElement.textContent;
	} else {
		if (cursorPosition > (textElement.textContent.length - 1)) {
			text1 = textElement.textContent;
			text2 = "";
		}
		else {
			text1 = textElement.textContent.substring(0, cursorPosition);
			text2 = textElement.textContent.substring(cursorPosition);
			}
		}
*/
	console.log("textEditPopupAction cursorPosition ", cursorPosition, " text1 ", text1, " text2 ", text2);

	if ((operand === "splitToNext") || (operand === "splitToNextNewline")) {
		textElement.textContent = text1.trim();
		subtitleTable.rows[rowNumber].querySelector(".classSubtitleText").textContent = text1.trim();
		let nextRow = findTrackRow('next', subtitleTrack[rowNumber], rowNumber);
		if ((operand === "splitToNextNewline") || (!nextRow)) {
			insertSubtitle(rowNumber, text2.trim(), subtitleTrack[rowNumber], "selectNone");
		} else {
			subtitleTable.rows[nextRow].querySelector(".classSubtitleText").textContent = text2.trim()
				+ subtitleTable.rows[nextRow].querySelector(".classSubtitleText").textContent;
		}
		selectRow(selectedSubtitleNumber);
		return;
	}

	if (operand === "splitToPrev") {
		textElement.textContent = text2.trim();
		subtitleTable.rows[rowNumber].querySelector(".classSubtitleText").textContent = text2.trim();
		let prevRow = findTrackRow('prev', subtitleTrack[rowNumber], rowNumber);
		if (!prevRow) {
			insertSubtitle((rowNumber - 1), text1.trim(), subtitleTrack[rowNumber], "selectNone");
		} else {
			subtitleTable.rows[prevRow].querySelector(".classSubtitleText").textContent = 
				subtitleTable.rows[prevRow].querySelector(".classSubtitleText").textContent
				+ text1.trim();
			selectRow(prevRow);
		}
		return;
	}
}

function insertSubtitle(afterRowNumber, text, trackNumber, selectOption) {

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

	if (lastSubtitleNumber == 0) {
		newFile();
		return;
	}

	// sample subtitleFileDataArray[x].array[y] member: 
	// 	{track: 0; startSeconds: 120, endSeconds: 123, startTime: "0:02.00", endTime: "0:02.03", 
	//		subtitleStyle: "File1", subtitle: "Caption text" }

	let newRowNumber = afterRowNumber + 1;
	subtitleTable.rows[selectedSubtitleNumber].classList.remove("selectedCustom");
	let row = subtitleTable.insertRow(newRowNumber);
	subtitleStartSeconds.splice(newRowNumber, 0, 0);
	subtitleEndSeconds.splice(newRowNumber, 0, 0);
	subtitleTrack.splice(newRowNumber, 0, 0);

	let rowObject = {};
	lastSubtitleNumber++;

	rowObject.track = trackNumber;
	rowObject.subtitleStyle = subtitleFileDataArray[trackNumber].defaultSubtitleStyle;

	if ((newRowNumber != 1) && (newRowNumber != lastSubtitleNumber)) {
		rowObject.startSeconds = subtitleEndSeconds[newRowNumber - 1];
		rowObject.endSeconds = subtitleStartSeconds[newRowNumber + 1];
	} else {
		if (newRowNumber == 1) {
			rowObject.endSeconds = subtitleStartSeconds[newRowNumber + 1];
			rowObject.startSeconds = rowObject.endSeconds - 2;
		} else {
			if (newRowNumber == lastSubtitleNumber) {
				rowObject.startSeconds = subtitleEndSeconds[newRowNumber - 1];
				rowObject.endSeconds = rowObject.startSeconds + 2;
			}
		}
	}
	
	if (rowObject.startSeconds < 0) {
		rowObject.startSeconds = 0;
	}

	// if (rowObject.endSeconds > videoDuration) {
	// 	rowObject.endSeconds = videoDuration;
	// }

	rowObject.startTime = helper.toTimeString(rowObject.startSeconds * 1000);
	rowObject.endTime = helper.toTimeString(rowObject.endSeconds * 1000);
	if (text != "") {
		rowObject.subtitle = text;
	} else {
		rowObject.subtitle = ""; // "…";
	}

	createSubtitleRow(rowObject, newRowNumber);

	let chosenRow = newRowNumber;

	switch (selectOption) {
		case "selectNew": 
			break;
		case "selectOld":
			if (afterRowNumber > 0) {
				chosenRow = afterRowNumber;
			}
			break;
		case "selectNone": 
			return;
		default:
			console.log ("insertSubtitle invalid selectOption ", selectOption);
	}

	selectRow(chosenRow);
	if (showTimePopup) {
		showTimeEditPopup(chosenRow);
	}

}  // insertSubtitle

function deleteSubtitle(rowNumber) {

	if (rowNumber <= 0) {return;}

	changeCounter += 1;
	selectCurrentIndex("undoArray");
	undoArray[undoArrayCurrentIndex].inUse = true;
	undoArray[undoArrayCurrentIndex].changeNumber = changeCounter;
	undoArray[undoArrayCurrentIndex].action = "subtitleDeletion";
	undoArray[undoArrayCurrentIndex].rowNumber = rowNumber;
	undoArray[undoArrayCurrentIndex].selectedRowNumber = selectedSubtitleNumber;
	undoArray[undoArrayCurrentIndex].startTime = 
		subtitleTable.rows[rowNumber].querySelector(".classSubtitleStart").textContent;
	undoArray[undoArrayCurrentIndex].endTime = 
		subtitleTable.rows[rowNumber].querySelector(".classSubtitleEnd").textContent;
	if (subtitleTrack[rowNumber] > 0) {
		undoArray[undoArrayCurrentIndex].subtitleStyle = 
			subtitleTable.rows[rowNumber].querySelector(".classSubtitleTrack").textContent;
	}
	undoArray[undoArrayCurrentIndex].oldValue = 
		subtitleTable.rows[rowNumber].querySelector(".classSubtitleText").textContent;
	undoArray[undoArrayCurrentIndex].subtitleTrack = subtitleTrack[rowNumber];
	undoArray[undoArrayCurrentIndex].subtitleStartSeconds = subtitleStartSeconds[rowNumber];
	undoArray[undoArrayCurrentIndex].subtitleEndSeconds = subtitleEndSeconds[rowNumber];

	let isLast = false;
	if (rowNumber === lastSubtitleNumber) {
		isLast = true;
	}

	subtitleTable.deleteRow(rowNumber); 
	subtitleTrack.splice(rowNumber, 1);
	subtitleStartSeconds.splice(rowNumber, 1);
	subtitleEndSeconds.splice(rowNumber, 1);
	lastSubtitleNumber--;

	if (!isLast) {
		selectRow(rowNumber);
	} else {
		if (lastSubtitleNumber >= 1) {
			selectRow(lastSubtitleNumber);
		} else {
			selectedSubtitleNumber = 0;
			document.getElementById("spanSubtitle1").textContent = "";
			document.getElementById("spanSubtitle2").textContent = "";
		}
	}
}

function createSubtitleRow(rowObject, rowIndex) {

	subtitleStartSeconds[rowIndex] = rowObject.startSeconds;
	subtitleEndSeconds[rowIndex] = rowObject.endSeconds;
	subtitleTrack[rowIndex] = rowObject.track;

	let newRow;

	if ((rowIndex + 1) > subtitleTable.rows.length) {
		newRow = document.createElement("tr");
		subtitleTable.tBodies[0].appendChild(newRow);
	} else {
		newRow = subtitleTable.rows[rowIndex];
	}

	newRow.style.display = 'table-row'; /* Ensure that the row is visible. */


	let rowColumns = `
		<tr class="classSubtitleRow">
		<td headers="subtitleNumber" class="classSubtitleNumber"></td>
		<td headers="subtitleStart" class="classSubtitleStart">${rowObject.startTime}</td>
		<td headers="subtitleEnd" class="classSubtitleEnd">${rowObject.endTime}</td>
		`;
		
//	if (!subtitleFileDataArray[0].loaded) {
	if (subtitleTrack[rowIndex] > 0) {
		rowColumns += 
			`<td headers="subtitleTrack" class="classSubtitleTrack">${rowObject.subtitleStyle}</td>`;
	}

	rowColumns += 
		`<td headers="subtitleText" class="classSubtitleText">${rowObject.subtitle}</td>
		</tr>`;

	newRow.innerHTML = rowColumns;

//  Sample syntax:
//	document.getElementById("spanStartTime").innerHTML =
//		document.getElementById(`row${rowNumber}SubtitleStart`).innerHTML;

}  // createSubtitleRow


function showTimeEditPopup(rowNumber) {

	console.log('showTimeEditPopup rowNumber ', rowNumber);

	let newDisplay = (timeEditPopupRow === 0);

	if (rowNumber < 1) {
		document.getElementById("timeEditPopup").style.display = "none";
		timeEditPopupRow = 0;
		return;
	}

	if (timeEditPopupRow != rowNumber) {
		timeEditPopupRow = rowNumber;
		t1timeEditPopupOldTime = subtitleTable.rows[rowNumber].querySelector(".classSubtitleStart").textContent;
		t1timeEditPopupOldSeconds = subtitleStartSeconds[rowNumber];
		t2timeEditPopupOldTime = subtitleTable.rows[rowNumber].querySelector(".classSubtitleEnd").textContent;
		t2timeEditPopupOldSeconds = subtitleEndSeconds[rowNumber];
		if ((subtitleTrack[rowNumber] === 1) && (timeEditSynchronizeWithTrack1)) {
			let pairedTrack2Row = findTrackRow('next', 2, rowNumber);
			t1timeEditPopupOldTimeOnTrack2 = 
				subtitleTable.rows[pairedTrack2Row].querySelector(".classSubtitleStart").textContent;
			t1timeEditPopupOldSecondsOnTrack2 = subtitleStartSeconds[pairedTrack2Row];
			t2timeEditPopupOldTimeOnTrack2 = 
				subtitleTable.rows[pairedTrack2Row].querySelector(".classSubtitleEnd").textContent;
			t2timeEditPopupOldSecondsOnTrack2 = subtitleEndSeconds[pairedTrack2Row];
		}
	}

	fillTimeFields((subtitleStartSeconds[rowNumber] * 1000), "t1");
	fillTimeFields((subtitleEndSeconds[rowNumber] * 1000), "t2");

	if (newDisplay) {
		document.getElementById("timeEditPopup").style.display = "inline-block";
	}

	return;

function fillTimeFields (ms, prefix) {
	let hh = Math.floor(ms / 1000 / 3600);
	let mm = Math.floor(ms / 1000 / 60 % 60);
	let ss = Math.floor(ms / 1000 % 60);
	let ff = Math.floor(ms % 1000);


	document.getElementById(prefix + "hourField1").textContent = hh - (Math.floor(hh / 10) * 10);

	document.getElementById(prefix + "minuteField1").textContent = Math.floor(mm / 10);
	document.getElementById(prefix + "minuteField2").textContent = mm - (Math.floor(mm / 10) * 10);

	document.getElementById(prefix + "secondField1").textContent = Math.floor(ss / 10);
	document.getElementById(prefix + "secondField2").textContent = ss - (Math.floor(ss / 10) * 10);


	let millisecondHundreds = Math.floor(ff / 100);
	let millisecondTens = Math.floor((ff - (millisecondHundreds * 100)) / 10);
	let millisecondsOnes = ff - (Math.floor(ff / 10) * 10);
	document.getElementById(prefix + "millisecondField1").textContent = millisecondHundreds;
	document.getElementById(prefix + "millisecondField2").textContent = millisecondTens;
	document.getElementById(prefix + "millisecondField3").textContent = millisecondsOnes;

}  // fillTimeFields

}  // showTimeEditPopup

function dragElement(elmnt) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "Header")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id + "Header").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
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
	// 	{dataIndex: "1", arrayIndex: 0} means subtitleFileDataArray[1].array[0]
	mergeDataArray = [];

	while (index1 < array1.length && index2 < array2.length) {
		const time1 = array1[index1].startSeconds;
		const time2 = array2[index2].startSeconds;

	    if (time1 == time2) {
    		mergeDataArray.push({ dataIndex: 1, arrayIndex: index1 });
			mergeDataArray.push({ dataIndex: 2, arrayIndex: index2 });
			index1++;
		    index2++;
		} else if (time1 < time2) {
			mergeDataArray.push({ dataIndex: 1, arrayIndex: index1 });
			index1++;
	    } else {
			mergeDataArray.push({ dataIndex: 2, arrayIndex: index2 });
			index2++;
		}
  	}

	// Add remaining elements from array1
	while (index1 < array1.length) {
		mergeDataArray.push({ dataIndex: 1, arrayIndex: index1 });
		index1++;
	}

	// Add remaining elements from array2
	while (index2 < array2.length) {
		mergeDataArray.push({ dataIndex: 2, arrayIndex: index2 });
		index2++;
	}

	console.log("interleave mergeDataArray ", mergeDataArray); 
	return mergeDataArray.length;

}

async function extractSubtitleFile(file, subtitleFile) {

	console.log('extractSubtitleFile subtitleFile ', subtitleFile);
	console.log('extractSubtitleFile document.getElementById(subtitleFile.inputId) ',
		document.getElementById(subtitleFile.inputId)); 

	console.log('extractSubtitleFile document.getElementById(subtitleFile.inputId).files[0] ' 
		+ document.getElementById(subtitleFile.inputId).files[0]);
	console.log("extractSubtitleFile file.name " + file.name);
	let extension = file.name.substring((file.name.length - 4));
	console.log("extractSubtitleFile extension " + extension);

	// Asynchronously load the file contents.
	const textContent = await file.text();

	console.log("extractSubtitleFile file ", file);
	console.log("extractSubtitleFile {file} ", {file});

	subtitleFile.array = [];
	subtitleFile.loaded = false;

	let counter = 0;

	switch(extension) {
		case '.ass':
			let parseOptions = {};
			const lineArray = parse(textContent, parseOptions);
			lineArray.filter(filterSsaCaptions).forEach(function(content) {
				captureSingleSubtitle(content, subtitleFile.inputId); 
			});
			break;
		case '.srt':
			const srtArray = parseSrt(textContent);
			srtArray.forEach(function(content) {
				captureSingleSubtitle(content, subtitleFile.inputId); 
			});
			break;
		default:
			errorMsg = 'unsupported file extension: ' + extension;
			alert(errorMsg);
			throw new Error(errorMsg);
			break;
	}

	if (counter !== 0) {
		subtitleFile.loaded = true;
		console.log('extractSubtitleFile ', counter, ' ', counter, 
			' subtitles read');
		if (subtitleFile.inputId == "subtitleFileInput0") {
			totalNumberOfSubtitlesRead = counter;
		}
	}

	return counter;

function filterSsaCaptions(arrayElement) {
    return (arrayElement.type == "caption");
}

function captureSingleSubtitle(content, inputId) {

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
	switch (inputId) {
		case 'subtitleFileInput0':
			rowData.track = 0;
			break;
		case 'subtitleFileInput1':
			rowData.track = 1;
			break;
		case 'subtitleFileInput2':
			rowData.track = 2;
			break;
		default:
			let errorMsg = 'captureSingleSubtitle invalid inputId: ' + inputId;
			alert(errorMsg);
			throw new Error(errorMsg);
	}

	rowData.startTime = helper.toTimeString(content.start);
	rowData.endTime = helper.toTimeString(content.end);
	
	if (content.subtitleStyle == '') {
		rowData.subtitleStyle = subtitleFile.defaultSubtitleStyle;
	}
	else {
		if (inputId == "subtitleFileInput0") {
			rowData.subtitleStyle = content.subtitleStyle;
		}
		else {
			rowData.subtitleStyle = subtitleFile.defaultSubtitleStyle + '-' + content.subtitleStyle;
		}
	}

	rowData.subtitle = content.text;

	if (inputId == "subtitleFileInput0") {
		createSubtitleRow(rowData, counter);
	}
	else {
		subtitleFile.array.push(rowData);
	}
	
} // captureSingleSubtitle
} // extractSubtitleFile

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

function saveFile(targetTrack) {
	console.log("saveFile targetTrack ", targetTrack);

	if (lastSubtitleNumber <= 0) {return;}
	if ((targetTrack === 0) && (!subtitleFileDataArray[0].loaded)) {return;}

	let filename = ("track" + targetTrack + "-output.srt").trim();
	
	let fileContent = "";
	let subtitleIndex = 1;
	let outputIndex = 0;

	while (subtitleIndex <= lastSubtitleNumber) {
	
		let matchFound = false;

		while ((!matchFound) && (subtitleIndex <= lastSubtitleNumber)) {
			if (subtitleTrack[subtitleIndex] === targetTrack) {
				matchFound = true;
			} else {
				subtitleIndex += 1;
			}
		}
			
		if (matchFound) {
			outputIndex += 1;
			fileContent += outputIndex + 
				"\n" +
				convertSecondsToSrtTime(subtitleStartSeconds[subtitleIndex]) + 
				" --> " + 
				convertSecondsToSrtTime(subtitleEndSeconds[subtitleIndex]) + 
				"\n" +
				subtitleTable.rows[subtitleIndex].querySelector(".classSubtitleText").textContent.replaceAll('<br>', '\n').trim() +
				"\n\n";
		}

		subtitleIndex += 1;
	}

	if (!outputIndex) {
		let msg = "saveFile Track " + targetTrack + " empty, save cancelled";
		alert(msg);
		console.log(msg);
		return;
	}

    // Create a Blob containing the text data
    const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });

    // Create a link element
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;

    // Programmatically click the link to trigger the download
    document.body.appendChild(link); // Append to body is good practice
    link.click();
    document.body.removeChild(link); // Clean up the DOM

    // Revoke the object URL to free up memory
    URL.revokeObjectURL(link.href);

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
	if (key.target.nodeName == "INPUT" || key.target.nodeName == "TEXTAREA" 
		|| key.target.nodeName == "SELECT") return;
	if ((key.target.hasAttribute("contenteditable"))
		&& (key.target.getAttribute("contenteditable")) == "true") {
		if ((key.ctrlKey) && (key.key == ' ')){
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

	if (!((lastSubtitleNumber > 0) && videoFileLoaded)) { return; }

	document.getElementById("seekBarContainer").style.display = "inline";

	console.log("addKeyListener Adding event listener for seekBar");
	let seekBar = document.getElementById("seekBar");
	//seekBar.oninput = () => {
	//	console.log(seekBar.value);
	//}
	seekBar.addEventListener("input", handleSeek);

	const buttons = ['playVideo','currentLine','loop', 
					'currentLineOnDashboard', 'playVideoOnDashboard', 'loopOnDashboard']; 

	buttons.forEach(function(bn) {
    	document.getElementById(bn).addEventListener(
        	'click', buttonEvents, !1
    	);
	});

	document.addEventListener("keyup", function onEvent(event) {
		if ((document.activeElement.hasAttribute("contentEditable")) && 
			(document.activeElement.isContentEditable)) {
				switch (event.key) {
				case " ":
					if (!event.ctrlKey) {
					return;	
					} else {
						buttonAction('currentLine');
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
	if (!(lastSubtitleNumber > 0)) {
		return;
	}
	let element_id = e.target.id;
	buttonAction(element_id);
}

function buttonAction(actionType) {

	switch(actionType) {
		case 'prevST':
			if ((subtitleTrack[selectedSubtitleNumber] === 0) &&
				(selectedSubtitleNumber > scrollStepOption)) {
				selectRow(selectedSubtitleNumber - scrollStepOption);
				skipTo(subtitleStartSeconds[selectedSubtitleNumber]);
			} else {
				nextTrack1Row = findTrackRow('prev', 1, selectedSubtitleNumber);
				if (nextTrack1Row > 0) {
					selectRow(nextTrack1Row);
					skipTo(subtitleStartSeconds[selectedSubtitleNumber]);
				}
			}
			return;
		case 'nextST':
			if ((subtitleTrack[selectedSubtitleNumber] === 0) &&
				(selectedSubtitleNumber < subtitleTable.rows.length - scrollStepOption)) {
				selectRow(selectedSubtitleNumber + scrollStepOption);
				skipTo(subtitleStartSeconds[selectedSubtitleNumber]);
			} else {
				nextTrack1Row = findTrackRow('next', 1, selectedSubtitleNumber);
				if (nextTrack1Row > 0) {
					selectRow(nextTrack1Row);
					skipTo(subtitleStartSeconds[selectedSubtitleNumber]);
				}
			}
			return;
	}

	if (!((lastSubtitleNumber > 0) && videoFileLoaded)) { 
		return;
	}

	if (videoStateBusy()) {
		playVideo(-1, 0); // Pause video
		return;
	}

	switch(actionType) {
		case 'playVideo':
		case 'playVideoOnDashboard':
			if (youTubeVideoId) {
				selectionStartSeconds = player.getCurrentTime();
			}
			else {
				selectionStartSeconds = videoElem.currentTime;
			}
			selectionEndSeconds = 0;
			playingContinuously = true;
			break;
		case 'currentLine':
		case 'currentLineOnDashboard':
			if (selectedSubtitleNumber !== 0) {
				selectionStartSeconds = subtitleStartSeconds[selectedSubtitleNumber] - marginOption;
				selectionEndSeconds = subtitleEndSeconds[selectedSubtitleNumber] + marginOption;
			} else {
				return; // no action
			}
			break;
		case 'restOfcurrentLine':
			if (selectedSubtitleNumber !== 0) {
				if (youTubeVideoId) {
					selectionStartSeconds = player.getCurrentTime();
				}
				else {
					selectionStartSeconds = videoElem.currentTime;
				}
				selectionEndSeconds = subtitleEndSeconds[selectedSubtitleNumber] + marginOption;
			} else {
				return; // no action
			}
			break;
		case 'loop':
			looping = true;
			if (selectedSubtitleNumber !== 0) {
				selectionStartSeconds = subtitleStartSeconds[selectedSubtitleNumber] - marginOption;
				selectionEndSeconds = subtitleEndSeconds[selectedSubtitleNumber] + marginOption;
			} else {
				return; // no action
			}
			console.log('loop Selected row ',selectedSubtitleNumber);
			console.log('loop subtitleStartSeconds ',subtitleStartSeconds[selectedSubtitleNumber]);
			console.log('loop subtitleEndSeconds ',subtitleEndSeconds[selectedSubtitleNumber]);
			console.log('loop selectionStartSeconds ',selectionStartSeconds);
			console.log('loop selectionEndSeconds ',selectionEndSeconds);

			break;
		default:
			console.log('buttonAction Invalid actionType: ', actionType);
			break;
	}

	console.log("buttonAction calling playVideo. actionType ", actionType);
    playVideo(selectionStartSeconds, selectionEndSeconds);

}  // buttonAction

function subtitleTimeCorrections(){
	let index = 1; 

	while (index <= lastSubtitleNumber) {
		if (subtitleStartSeconds[index] > videoDuration) {
		console.log('subtitleTimeCorrections subtitleStartSeconds for subtitle ', index, ' corrected from ',
		subtitleStartSeconds[index], ' to ',videoDuration);
		subtitleStartSeconds[index] = videoDuration;
		}
		if (subtitleEndSeconds[index] > videoDuration) {
		console.log('subtitleTimeCorrections subtitleEndSeconds for subtitle ', index, ' corrected from ',
		subtitleEndSeconds[index], ' to ',videoDuration);
		subtitleEndSeconds[index] = videoDuration;
		}
		index += 1;	
	}
};

function createSubtitleFontOptions(fontArray) {
	var subtitleFontOptions = document.getElementById("subtitleFontMenu");
	let selectionFound = false;

	appendOption(loadFontFileOptionText);

	fontArray.forEach(function(fontName) {
		appendOption(fontName);
		if (fontName == selectedFont) {
			subtitleFontOptions.value = selectedFont;
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
		subtitleFontOptions.appendChild(fontOption);
	};
}

function clickSubtitleFileInput(numberOfFiles) {

	console.log("clickSubtitleFileInput entered ", numberOfFiles);

	if ((numberOfFiles < 1) || (numberOfFiles > 2)) {
		console.log("clickSubtitleFileInput numberOfFiles = ", numberOfFiles);
			let errorMsg = 'Invalid numberOfFiles: ' + numberOfFiles;
			alert(errorMsg);
			throw new Error(errorMsg);
	}
	
	console.log("clickSubtitleFileInput numberOfFiles = ", numberOfFiles);
	
	const subtitleFileElem0 = document.getElementById("subtitleFileInput0");
	console.log("clickSubtitleFileInput subtitleFileElem0", subtitleFileElem0);
	if (!subtitleFileElem0) {return;}
	
	const subtitleFileElem1 = document.getElementById("subtitleFileInput1");
	console.log("clickSubtitleFileInput subtitleFileElem1", subtitleFileElem1);
	if (!subtitleFileElem1) {return;}
	
	const subtitleFileElem2 = document.getElementById("subtitleFileInput2");
	console.log("clickSubtitleFileInput subtitleFileElem2", subtitleFileElem2);
	if (!subtitleFileElem2) {return;}

	console.log("clickSubtitleFileInput proceeding");

	if (numberOfFiles == 1) {
		subtitleFileElem0.value = ""; //Clear .value to make this file element reusable
		subtitleFileElem0.click();
		return;
	}

	// 2 files

	subtitleFileDataArray[1].loaded = false;
	subtitleFileDataArray[2].loaded = false;

	subtitleFileElem1.value = ""; //Clear .value to make this file element reusable
	subtitleFileElem1.click();
	
	subtitleFileElem2.value = ""; //Clear .value to make this file element reusable
	subtitleFileElem2.click();

}

function DOMInitializations() {

selectedCustomStyle = document.createElement('style');
document.head.appendChild(selectedCustomStyle);
document.getElementById("subtitleTrack").classList.add('notDisplayed');

let viewportWidth = getViewportWidth();
let viewportHeight = getViewportHeight();
console.log("DOMInitializations Viewport Width " + viewportWidth + " Height " + viewportHeight);

videoElem = document.getElementById("videoArea");

subtitleTable = document.getElementById("subtitleTable");

subtitleTable.addEventListener('mousedown', (e) => {
	const cell = e.target.closest('td');
	if (!cell) {return;}
	const row = cell.parentElement;
   	console.log("EventListener-subtitleTable-mousedown row.rowIndex:", row.rowIndex);
	updateRow();
});

subtitleTable.addEventListener('click', (e) => {
	const cell = e.target.closest('td');
	if (!cell) {return;}
	const row = cell.parentElement;
   	console.log("EventListener-subtitleTable-click row.rowIndex:", row.rowIndex, 
		" cell.textContent: ", cell.textContent);
	selectRow(row.rowIndex);
	if ((cell.classList.contains('classSubtitleStart')) || 
		(cell.classList.contains('classSubtitleEnd'))) {
		showTimeEditPopup(row.rowIndex);
	}
});


const urlParams = new URLSearchParams(window.location.search);
const allUrlParamsObject = Object.fromEntries(urlParams.entries());
console.log("DOMInitializations All Query Parameters as Object:", allUrlParamsObject);

if (allUrlParamsObject.yturl == undefined) {
	console.log("DOMInitializations parm is undefined");
} else {
	if (allUrlParamsObject.yturl = "") {
		console.log('DOMInitializations parm is ""');
	} else {
		console.log("DOMInitializations parm is present: ",allUrlParamsObject.yturl);
	}
}

const wrapperElement = document.getElementById("wrapper");
maxVideoWidth = getAdjustedWidthPixels(wrapperElement);
console.log("DOMInitializations maxVideoWidth = ",maxVideoWidth);

console.log("DOMInitializations wrapper.style.width = ", wrapperElement.style.width, 
		" wrapper.style.height = ", wrapperElement.style.height);

enableFileSelection();

toggleSubtitleSection(); 

configInitializations(); // Process config.js

changeTheme(selectedThemeNumber); // Initialize theme option
changeSpacebar();		// Initialize spacebar option
changeFont();			// Initialize font option
changeFontSize();		// Initialize font size option
changeAlignment();		// Initialize alignment option
changeScroll();			// Initialize scroll option
changeScrollStep();		// Initialize scroll step option
changeMargin();			// Initialize margin option

const controls = [
	{id: "subtitleFontMenu", changeFunction: changeFont},
	{id: "subtitleFontSizeMenu", changeFunction: changeFontSize},
	{id: "subtitleAlignmentMenu", changeFunction: changeAlignment},
	{id: "videoSizeMenu", changeFunction: changeVideoSize},
	{id: "spacebarMenu", changeFunction: changeSpacebar},
	{id: "scrollMenu", changeFunction: changeScroll},
	{id: "scrollStepMenu", changeFunction: changeScrollStep},
	{id: "marginMenu", changeFunction: changeMargin},
]; 

controls.forEach(function(item) {
	const selectedControl = document.getElementById(item.id);
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
			alert(errorMsg);
			throw new Error(errorMsg);
		}
	yturl = yturl.substring(1, (yturl.length - 1));	
	console.log("DOMInitializations  edited yturl = ", yturl);
	document.getElementById("videoURLInput").value = yturl;
	document.getElementById("videoURLButton").click();
}

dragElement(document.getElementById("dashboard"));
dragElement(document.getElementById("timeEditPopup"));
// dragElement(document.getElementById("textEditPopup"));

return;

function enableFileSelection() {

const videoFileSelect = document.getElementById("videoFileButton");
const videoFileElem = document.getElementById("videoFileInput");

videoFileSelect.addEventListener(
  "click",
  (e) => {
		logTimeStamp("videoFileButton", "clicking on videoFileInput");
		if (videoFileElem) {
			videoFileElem.value = ""; 
			videoFileElem.click();
	}
  },
  false,
);

const videoURLSelect = document.getElementById("videoURLButton");
const videoURLElem = document.getElementById("videoURLInput");
// https://www.youtube.com/watch?v=b4-AZT60GFw

videoURLSelect.addEventListener(
  "click",
  (e) => {
		if (videoURLElem) {
			getYouTubeVideoId(videoURLElem.value);
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
	
	console.log("Configuration: editEnabled = ", editEnabled);

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
		let errorMsg = "configInitializations Invalid theme: " + theme;
		console.log(errorMsg);
		alert(errorMsg);
		throw new Error(errorMsg);
	}

	let themeAttributeObject = findThemeAttributeObject(selectedThemeNumber);

	document.getElementById("color1Input").value = themeAttributeObject.foregroundColor;
	document.getElementById("color2Input").value = themeAttributeObject.backgroundColor;
	document.getElementById("color3Input").value = themeAttributeObject.highlightBackgroundColor;

	themeAttributesArray.forEach(function(content, index) {
		let themeElement = document.getElementById("theme" + index);
		if (!themeElement) {
			let errorMsg = "configInitializations HTML element not found: theme" + index;
			console.log(errorMsg);
			alert(errorMsg);
			throw new Error(errorMsg);
		}
		themeElement.textContent = themeAttributesArray[index].themeName;
		themeElement.style.color = themeAttributesArray[index].foregroundColor;
		themeElement.style.backgroundColor = themeAttributesArray[index].backgroundColor;
		themeElement.addEventListener('click', (e) => { changeTheme(index); } );
		themeElement.addEventListener('mouseover', (e) => { highlightThemeOption(index, "on"); } );
		themeElement.addEventListener('mouseleave', (e) => { highlightThemeOption(index, "off"); } );
	});

	if (typeof spacebarOption == 'undefined') {
		errorReason = 'spacebarOption missing';
		initError(errorReason);
	}

	switch(spacebarOption) {
		case 'playPause':
		case 'currentLine':
		case 'loop':
		    const selectSpacebar = document.getElementById("spacebarMenu");
			selectSpacebar.value = spacebarOption;
			console.log("Configuration: spacebarOption = " + selectSpacebar.value);
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

	if (!createSubtitleFontOptions(fontList)) {
		errorReason = 'selectedFont = ' + selectedFont + ' not in fontList';
		initError(errorReason);
	}

	console.log('Configuration: selectedFont = ', selectedFont);

	if (typeof videoWidthScale == 'undefined') {
		errorReason = 'videoWidthScale missing';
		initError(errorReason);
	}

	const selectVideoSize = document.getElementById("videoSizeMenu");
	selectVideoSize.value = videoWidthScale;

	if (selectVideoSize.value != videoWidthScale){
		errorReason = 'videoWidthScale = ' + videoWidthScale + ' not in list of allowed values';
		initError(errorReason);
	}

	console.log("Configuration: videoWidthScale = " + selectVideoSize.value);

	if (typeof fontSize == 'undefined') {
		errorReason = 'fontSize missing';
		initError(errorReason);
	}

	const selectFontSize = document.getElementById("subtitleFontSizeMenu");
	selectFontSize.value = fontSize;

	if (selectFontSize.value != fontSize){
		errorReason = 'fontSize = ' + fontSize + ' not in list of allowed values';
		initError(errorReason);
	}

	console.log("Configuration: fontSize = " + selectFontSize.value);

function initError(errorType){
	let errorMsg = 'Configuration error. ' + errorType + '\nCheck config.js';
	alert(errorMsg);
	throw new Error(errorMsg);
}

}  // configInitializations

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