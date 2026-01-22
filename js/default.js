
localStorage.clear(); //Clear old values left behind;
document.addEventListener('keydown', PSDPD_KeyCheck);

let videoFileLoaded = false;
let videoElem;
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
let selectedSubtitleNumber = 0;			// No subtitle is selected until the subtitle file has been loaded.
const subtitleStartSeconds = [];			// Array: Start time in seconds for each subtitle
const subtitleEndSeconds = [];				// Array: Stop time in seconds for each subtitle
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
let timeEditPopupRow = 0;
let t1timeEditPopupOldTime;
let t1timeEditPopupOldSeconds;
let t2timeEditPopupOldTime;
let t2timeEditPopupOldSeconds;
let CaretUtil = { };
let showTimePopup = false;
let customColorsEnabled = false;
let selectedCustomStyle;
let dropDownArrow = "▾";

let themeAttributes;

let lightThemeAttributes = {
	themeName: "light",
	foregroundColor: "#000000", /* black */
	backgroundColor: "#fdfff5", /* ceramic, milk white */
	highlightBackgroundColor: "#cce5ff" /* Hawkes blue */
}
let darkThemeAttributes = {
	themeName: "dark",
	foregroundColor: "#ffffff", /* white */
	backgroundColor: "#000000", /* black */
	highlightBackgroundColor: "#768798" /* steel */
}
let OSDefaultThemeAttributes = {
	themeName: "OSDefault",
	foregroundColor: "#000000",  /* black */
	backgroundColor: "#ffffff", /* white */
	highlightBackgroundColor: "#338ef0" /* bleu de France */
	}
let preset01ThemeAttributes = {
	themeName: "preset 1",
	foregroundColor: "#f5f5f5", /* white  smoke*/
	backgroundColor: "#2e9dc2", /* curious blue */
	highlightBackgroundColor: "#057164" /* greenish cyan */
}
let preset02ThemeAttributes = {
	themeName: "preset 2",
	foregroundColor: "#f5f5f5", /* white smoke */
	backgroundColor: "#266a78", /* bluish cyan */
	highlightBackgroundColor: "#153b4c" /* Nile blue */
}
let preset03ThemeAttributes = {
	themeName: "preset 3",
	foregroundColor: "#f5f5f5", /* white smoke */
	backgroundColor: "#c25a2e", /* ruddy brown */
	highlightBackgroundColor: "#a0390d" /* russet */
}

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
// 	{startSeconds: 120, endSeconds: 123, startTime: "0:02.00", endTime: "0:02.03", 
//		style: "File1", subtitle: "Caption text" }
let subtitleFileDataArray = [];
subtitleFileDataArray[0] = {inputId: "subtitleFileInput0", defaultStyle: "", loaded: false, array: []};	
subtitleFileDataArray[1] = {inputId: "subtitleFileInput1", defaultStyle: "File1", loaded: false, array: []};
subtitleFileDataArray[2] = {inputId: "subtitleFileInput2", defaultStyle: "File2", loaded: false, array: []};

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
		style: "",
		oldValue: "",
		newValue: "",
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


function findThemeAttributeObject(name) {

	let themeAttributeObject;

	switch(name) {
	case 'light':
		themeAttributeObject = lightThemeAttributes;
		break;
	case 'dark':
		themeAttributeObject = darkThemeAttributes;
		break;
	case 'OSDefault':
		themeAttributeObject = OSDefaultThemeAttributes;
		break;
	case 'preset01':
		themeAttributeObject = preset01ThemeAttributes;
		break;
	case 'preset02':
		themeAttributeObject = preset02ThemeAttributes;
		break;
	case 'preset03':
		themeAttributeObject = preset03ThemeAttributes;
		break;
	default:
		themeAttributeObject = 0;
		break;
	}

	return themeAttributeObject;

}


function highlightThemeOption(optionName, action) {

	let themeAttributeObject = findThemeAttributeObject(optionName);

	if (!themeAttributeObject) { 
		console.log("highlightThemeOption Invalid optionName: ", optionName);
		alert("highlightThemeOption Invalid optionName: " + optionName);
		return;
	}

	switch (action) {
	case 'off':
		document.getElementById(optionName + 'ThemeOption').style.backgroundColor = themeAttributeObject.backgroundColor;
		break;
	case 'on':
		document.getElementById(optionName + 'ThemeOption').style.backgroundColor = 
			themeAttributeObject.highlightBackgroundColor;
		break;
	default:
		console.log("highlightThemeOption Invalid action: ", action);
		alert("highlightThemeOption Invalid action: " + action);
		return;
	}

}

function highlightSelectedRow(rowNumber) {

	// Remove 'selected' class from previously selected row
	document.getElementById("row" + selectedSubtitleNumber).classList.remove("selectedCustom");
				
	document.getElementById("row" + rowNumber).classList.add("selectedCustom");

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
    console.log("selectrow entered");

	console.log('selectRow current selection ',selectedSubtitleNumber);
	console.log('selectRow current subtitleStartSeconds ',subtitleStartSeconds[selectedSubtitleNumber]);
	console.log('selectRow current subtitleEndSeconds ',subtitleEndSeconds[selectedSubtitleNumber]);
	console.log('selectRow new selection ',rowNumber);

	if (!playingContinuously){
		console.log("selectrow !playingContinuously");
		if (videoStateBusy()) {
			console.log("selectrow videoStateBusy");
			playVideo(-1, 0);  // Pause the video
		}
	}

	document.getElementById("spanStartTime").innerHTML = "";
	document.getElementById("spanEndTime").innerHTML = "";
	document.getElementById("spanTrack").innerHTML = "";
	document.getElementById("spanStartTimeOnDashboard").innerHTML = "";
	document.getElementById("spanEndTimeOnDashboard").innerHTML = "";
	document.getElementById("spanTrackOnDashboard").innerHTML = "";

	document.getElementById("spanSubtitle1").innerHTML = "";
	document.getElementById("spanSubtitle2").innerHTML = "";
	spanSubtitle1Selected = false;
	spanSubtitle2Selected = false;

	console.log("selectrow highlighting");
	highlightSelectedRow(rowNumber);
    console.log("selectrow highlighted");
				
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
			document.getElementById("row" + rowNumber).scrollIntoView({ 
				behavior: "instant", block: "center", inline: "nearest" });
		}
	}

	if (directive != "undefined"){
		if (scrollOption == "alwaysVisible"){
			document.getElementById("row" + rowNumber).scrollIntoView({
				behavior: "instant", block: "center", inline: "nearest" });
		}
	}

	document.getElementById("spanStartTime").innerHTML =
		document.getElementById(`row${rowNumber}SubtitleStart`).innerHTML;
	document.getElementById("spanEndTime").innerHTML =
		document.getElementById(`row${rowNumber}SubtitleEnd`).innerHTML;
	document.getElementById("spanTrack").innerHTML =
		document.getElementById(`row${rowNumber}SubtitleTrack`).innerHTML;
	document.getElementById("spanSubtitle1").innerHTML =
   		document.getElementById(`row${rowNumber}SubtitleText`).innerHTML;

	document.getElementById("spanStartTimeOnDashboard").innerHTML =
		document.getElementById("spanStartTime").innerHTML;
	document.getElementById("spanEndTimeOnDashboard").innerHTML =
		document.getElementById("spanEndTime").innerHTML;
	document.getElementById("spanTrackOnDashboard").innerHTML =
		document.getElementById("spanTrack").innerHTML;

	spanSubtitle1Row = rowNumber;

    console.log("selectrow scrollStepOption = ", scrollStepOption);

	if (scrollStepOption == 1) {
		computeSubtitleTableHeight();
		return;
	}

    console.log("selectrow lastSubtitleNumber = ", lastSubtitleNumber);
    console.log("selectrow (rowNumber + 1) = ", (rowNumber + 1));

	if ((rowNumber + 1) <= lastSubtitleNumber) {
    console.log("selectrow updating s2");
		document.getElementById("spanSubtitle2").innerHTML =
			document.getElementById(`row${rowNumber+1}SubtitleText`).innerHTML;
			spanSubtitle2Row = rowNumber + 1;
		if (scrollStepOption == 2) {
			computeSubtitleTableHeight();
			return;
		}
	}

    console.log("selectrow exiting");
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
				changeTheme(theme);
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
		oldText = document.getElementById(`row${timeEditPopupRow}SubtitleStart`).innerText;
		oldSeconds = subtitleStartSeconds[timeEditPopupRow];
	} else {
		oldText = document.getElementById(`row${timeEditPopupRow}SubtitleEnd`).innerText;
		oldSeconds = subtitleEndSeconds[timeEditPopupRow];
	}
	if (elemIdFrom === 't1') {
		newText = document.getElementById(`row${fromRow}SubtitleStart`).innerText;
		newSeconds = subtitleStartSeconds[fromRow];
	} else {
		newText = document.getElementById(`row${fromRow}SubtitleEnd`).innerText;
		newSeconds = subtitleEndSeconds[fromRow];
	}

	console.log("copyTime Row ", elemIdTo, " ", toType, " changed from ",
			oldText, " to ", newText, 
			" seconds changed from ", oldSeconds, " to ", newSeconds);

	if (elemIdTo === 't1') {
		document.getElementById(`row${timeEditPopupRow}SubtitleStart`).innerText = newText;
		subtitleStartSeconds[timeEditPopupRow] = newSeconds;
	} else {
		document.getElementById(`row${timeEditPopupRow}SubtitleEnd`).innerText = newText;
		subtitleEndSeconds[timeEditPopupRow] = newSeconds;
	}

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
	let value = Number(elem.innerText);

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

	elem.innerText = value;
	saveTime(elemId.substring(0,2));

	return;

function saveTime (prefix) {
	let fractionText = document.getElementById(prefix + "millisecondField1").innerText + 
		document.getElementById(prefix + "millisecondField2").innerText + 
		document.getElementById(prefix + "millisecondField3").innerText;

	let totalSeconds = (Number(document.getElementById(prefix + "hourField1").innerText) * 3600) +
		(Number(document.getElementById(prefix + "minuteField1").innerText) * 600) +
		(Number(document.getElementById(prefix + "minuteField2").innerText) * 60) +
		(Number(document.getElementById(prefix + "secondField1").innerText) * 10) +
		(Number(document.getElementById(prefix + "secondField2").innerText)) +
		(Number(fractionText) / 1000);
			
	let timeText = document.getElementById(prefix + "hourField1").innerText + ":" +
		document.getElementById(prefix + "minuteField1").innerText +
		document.getElementById(prefix + "minuteField2").innerText + ":" +
		document.getElementById(prefix + "secondField1").innerText +
		document.getElementById(prefix + "secondField2").innerText + "." +
		document.getElementById(prefix + "millisecondField1").innerText + 
		document.getElementById(prefix + "millisecondField2").innerText;

	console.log("saveTime fractionText ", fractionText, " timeText ", timeText, 
		" totalSeconds ", totalSeconds);

	switch (prefix) {
	case "t1":
		console.log("saveTime Row ", timeEditPopupRow, " start ", 
			" old ", document.getElementById(`row${timeEditPopupRow}SubtitleStart`).innerText, 
			" new ", timeText, 
			" seconds old ", subtitleStartSeconds[timeEditPopupRow], " new ", totalSeconds);
		subtitleStartSeconds[timeEditPopupRow] = totalSeconds;
		document.getElementById(`row${timeEditPopupRow}SubtitleStart`).innerText = timeText;
		break;
	case "t2":
		console.log("saveTime Row ", timeEditPopupRow, " end ",
			" old ", document.getElementById(`row${timeEditPopupRow}SubtitleEnd`).innerText, 
			" new ", timeText, 
			" seconds old ", subtitleEndSeconds[timeEditPopupRow], " new ", totalSeconds);
		subtitleEndSeconds[timeEditPopupRow] = totalSeconds;
		document.getElementById(`row${timeEditPopupRow}SubtitleEnd`).innerText = timeText;
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
			document.getElementById(`row${timeEditPopupRow}SubtitleStart`).innerText, 
			" to ", t1timeEditPopupOldTime, 
			" seconds restored from ", subtitleStartSeconds[timeEditPopupRow], 
			" to ", t1timeEditPopupOldSeconds);
		document.getElementById(`row${timeEditPopupRow}SubtitleStart`).innerText = t1timeEditPopupOldTime;
		subtitleStartSeconds[timeEditPopupRow] = t1timeEditPopupOldSeconds;
		break;
	case "t2":
		console.log("timeEditRestore Row ", timeEditPopupRow, " end restored from ",
			document.getElementById(`row${timeEditPopupRow}SubtitleEnd`).innerText, 
			" to ", t2timeEditPopupOldTime, 
			" seconds restored from ", subtitleEndSeconds[timeEditPopupRow], 
			" to ", t2timeEditPopupOldSeconds);
		document.getElementById(`row${timeEditPopupRow}SubtitleEnd`).innerText = t2timeEditPopupOldTime;
		subtitleEndSeconds[timeEditPopupRow] = t2timeEditPopupOldSeconds;
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
			document.getElementById(`row${timeEditPopupRow}SubtitleStart`).innerText, 
			" to ", timeText, 
			" seconds changed from ", subtitleStartSeconds[timeEditPopupRow], 
			" to ", current);
		document.getElementById(`row${timeEditPopupRow}SubtitleStart`).innerText = timeText;
		subtitleStartSeconds[timeEditPopupRow] = current;
		break;
	case "t2":
		console.log("timeEditCurrent Row ", timeEditPopupRow, " end changed from ",
			document.getElementById(`row${timeEditPopupRow}SubtitleEnd`).innerText, 
			" to ", t2timeEditPopupOldTime, 
			" seconds changed from ", subtitleEndSeconds[timeEditPopupRow], 
			" to ", current);
		document.getElementById(`row${timeEditPopupRow}SubtitleEnd`).innerText = timeText;
		subtitleEndSeconds[timeEditPopupRow] = current;
		break;
	default:
		console.log('timeEditCurrent Invalid prefix ', prefix);
		return;
	}

}  // timeEditCurrent

}  // changeTime


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
		document.getElementById(`row${undoArray[undoArrayCurrentIndex].rowNumber}SubtitleText`).innerText = 
			undoArray[undoArrayCurrentIndex].oldValue;
		break;
	case "subtitleDeletion":
		let deletedRowNumber = undoArray[undoArrayCurrentIndex].rowNumber;
		insertSubtitle((deletedRowNumber - 1), 
						undoArray[undoArrayCurrentIndex].oldValue, 
						"selectNone");
		document.getElementById(`row${deletedRowNumber}SubtitleStart`).innerText =
			undoArray[undoArrayCurrentIndex].startTime;
		document.getElementById(`row${deletedRowNumber}SubtitleEnd`).innerText =
			undoArray[undoArrayCurrentIndex].endTime;
		document.getElementById(`row${deletedRowNumber}SubtitleTrack`).innerText =
			undoArray[undoArrayCurrentIndex].style;
		document.getElementById(`row${deletedRowNumber}SubtitleText`).innerText =
			undoArray[undoArrayCurrentIndex].oldValue;
		subtitleStartSeconds[deletedRowNumber] = undoArray[undoArrayCurrentIndex].subtitleStartSeconds;
		subtitleEndSeconds[deletedRowNumber] = undoArray[undoArrayCurrentIndex].subtitleEndSeconds;
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
		document.getElementById(`row${redoArray[redoArrayCurrentIndex].rowNumber}SubtitleText`).innerText = 
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

function changeTheme(newTheme) {
    
	customColorsEnabled = false;

	themeAttributes = findThemeAttributeObject(newTheme);

	if (!themeAttributes) { 
		console.log("changeTheme Invalid newTheme: ", newTheme);
		alert("changeTheme Invalid newTheme: " + newTheme);
		return;
	}

	console.log("Theme changed from " + theme + " to " + newTheme);
	theme = newTheme;

	document.body.style.backgroundColor = themeAttributes.backgroundColor;
	document.body.style.color = themeAttributes.foregroundColor;
	selectedCustomStyle.textContent = 
		".selectedCustom {background-color: " + themeAttributes.highlightBackgroundColor + "}";

	document.getElementById("selectedTheme").style.backgroundColor = themeAttributes.backgroundColor;
	document.getElementById("selectedTheme").style.color = themeAttributes.foregroundColor;
	document.getElementById("selectedTheme").innerText = themeAttributes.themeName + dropDownArrow;

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

	let decrement = 1;
	let stop = false;
	while ((!stop) && ((selectedSubtitleNumber - decrement) >= 1)) {
		if ((document.getElementById("spanTrack").innerHTML) ==
			(document.getElementById(`row${(selectedSubtitleNumber - decrement)}SubtitleTrack`).innerHTML)) {
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

	let increment = 1;
	let stop = false;
	while ((!stop) && ((selectedSubtitleNumber + increment) >= 1)) {
		if ((document.getElementById("spanTrack").innerHTML) ==
			(document.getElementById(`row${(selectedSubtitleNumber + increment)}SubtitleTrack`).innerHTML)) {
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
		let increment = 1;
		let trackMatched = false;
		while ((!trackMatched) &&
			((selectedSubtitleNumber + increment) <= (document.getElementById("subtitleTable").rows.length - 1))){
			if ((document.getElementById("spanTrack").innerHTML) !=
				(document.getElementById(`row${(selectedSubtitleNumber + increment)}SubtitleTrack`).innerHTML)) {
					increment += 1;
				} else {
					trackMatched = true;
				}
			}
			if (youTubeVideoId) {
				videoCurrentTime = player.getCurrentTime();
			}
			else {
				videoCurrentTime = videoElem.currentTime;
			}
			if ((trackMatched) && (videoCurrentTime >= subtitleStartSeconds[selectedSubtitleNumber + increment])) {
			selectRow(selectedSubtitleNumber + increment);
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
    	console.log('issuePlayVideo: Play request failed.');
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

	// ??
//	const file = videoFile.files[0];
    const videourl = URL.createObjectURL(file);
    videoElem.setAttribute("src", videourl);

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
		
		console.log("loadVideoFile Exiting");

	}
}

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
	let elem = document.getElementById('videoArea');
	elem.style.display = 'none';

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

async function loadSubtitleFile0(file) {

	subtitleFileDataArray[0].loaded = false;
	totalNumberOfSubtitlesRead = 0;

	await extractSubtitleFile(file, subtitleFileDataArray[0]);

	document.getElementById("scrollStepMenu").value = '1';
	changeScrollStep();

	displaySubtitles();

	console.log("loadSubtitleFile0 subtitleFileDataArray[0].loaded = ", subtitleFileDataArray[0].loaded);
}

async function loadSubtitleFile1(file) {

	// sample mergeDataArray member: 
	// 	{dataIndex: "1", arrayIndex: 0} means subtitleFileDataArray[1].array[0]
	//
	// sample subtitleFileDataArray[x].array[y] member: 
	// 	{startSeconds: 120, endSeconds: 123, startTime: "0:02.00", endTime: "0:02.03", 
	//		style: "File1", subtitle: "Caption text" }

	subtitleFileDataArray[1].loaded = false;
	if (selectedSubtitleNumber != 0) {
		document.getElementById("row" + selectedSubtitleNumber).classList.remove("selectedCustom");
		selectedSubtitleNumber = 0;
	}
	totalNumberOfSubtitlesRead = 0;

	await extractSubtitleFile(file, subtitleFileDataArray[1]);

	console.log("loadSubtitleFile1 subtitleFileDataArray[1].loaded = ", subtitleFileDataArray[1].loaded);
	console.log("loadSubtitleFile1 subtitleFileDataArray[2].loaded = ", subtitleFileDataArray[2].loaded);

	if (subtitleFileDataArray[1].loaded && subtitleFileDataArray[2].loaded) {
		totalNumberOfSubtitlesRead = 
			interleave(subtitleFileDataArray[1].array, subtitleFileDataArray[2].array);
		console.log("loadSubtitleFile1 mergeDataArray.length = ", mergeDataArray.length);
		console.log("loadSubtitleFile1 mergeDataArray[0] = ", mergeDataArray[0]);
		console.log("loadSubtitleFile1 mergeDataArray[1] = ", mergeDataArray[1]);
		mergeDataArray.forEach(function(dataElement, index) {
			createSubtitleRow(subtitleFileDataArray[dataElement.dataIndex].array[dataElement.arrayIndex], 
			(index + 1));
		});
		displaySubtitles();
	}
}

async function loadSubtitleFile2(file) {

	// sample mergeDataArray member: 
	// 	{dataIndex: "1", arrayIndex: 0} means subtitleFileDataArray[1].array[0]
	//
	// sample subtitleFileDataArray[x].array[y] member: 
	// 	{startSeconds: 120, endSeconds: 123, startTime: "0:02.00", endTime: "0:02.03", 
	//		style: "File1", subtitle: "Caption text" }

	subtitleFileDataArray[2].loaded = false;
	selectedSubtitleNumber = 0;
	totalNumberOfSubtitlesRead = 0;

	await extractSubtitleFile(file, subtitleFileDataArray[2]);

	console.log("loadSubtitleFile2 subtitleFileDataArray[1].loaded = ", subtitleFileDataArray[1].loaded);
	console.log("loadSubtitleFile2 subtitleFileDataArray[2].loaded = ", subtitleFileDataArray[2].loaded);

	if (subtitleFileDataArray[1].loaded && subtitleFileDataArray[2].loaded) {
		totalNumberOfSubtitlesRead = 
			interleave(subtitleFileDataArray[1].array, subtitleFileDataArray[2].array);
		console.log("loadSubtitleFile2 mergeDataArray.length = ", mergeDataArray.length);
		console.log("loadSubtitleFile2 mergeDataArray[0] = ", mergeDataArray[0]);
		console.log("loadSubtitleFile2 mergeDataArray[1] = ", mergeDataArray[1]);
		mergeDataArray.forEach(function(dataElement, index) {
			createSubtitleRow(subtitleFileDataArray[dataElement.dataIndex].array[dataElement.arrayIndex], 
			(index + 1));
		});

		document.getElementById("scrollStepMenu").value = '2';
		changeScrollStep();

		displaySubtitles();

	}
}

function hideSubtitles(numberOfSubtitles) {

	while (numberOfSubtitles > 0) {
			let rowId = "row" + lastSubtitleNumber;
			let r = document.getElementById(rowId);
			if (r) {
				console.log("hideSubtitles Hiding rowId ",rowId);
				r.style.display = 'none';
				lastSubtitleNumber--;
			}
			numberOfSubtitles--;
	}

}

function displaySubtitles()	 {

	if (totalNumberOfSubtitlesRead == 0) { return; }
	
	document.getElementById("selectionLabel").style.display = "inline";
	document.getElementById("selectionHyphen").style.display = "inline";
	document.getElementById("selectionLabelOnDashboard").style.display = "inline";
	document.getElementById("selectionHyphenOnDashboard").style.display = "inline";
	
	console.log("displaySubtitles lastSubtitleNumber old " + lastSubtitleNumber
		+ " new " + totalNumberOfSubtitlesRead);

	if (lastSubtitleNumber > totalNumberOfSubtitlesRead) {
		hideSubtitles(lastSubtitleNumber - totalNumberOfSubtitlesRead);
	}

/*
	while (lastSubtitleNumber > totalNumberOfSubtitlesRead) {
		let rowId = "row" + lastSubtitleNumber;
		let r = document.getElementById(rowId);
		if (r) {
			console.log("Hiding rowId ",rowId);
			r.style.display = 'none';
			lastSubtitleNumber -= 1;
		}
	}
*/

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

function addKeyListenerForSubtitles() {

	if (keyListenerForSubtitlesAdded) { return; }

	document.addEventListener("keyup", function onEvent(event) {

		if ((document.activeElement.hasAttribute("contentEditable")) && 
			(document.activeElement.isContentEditable)) {
			switch (event.key) {
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
			insertSubtitle((selectedSubtitleNumber - 1), "", "selectNew");
			break;
		case "d":
			console.log("d delete row ", selectedSubtitleNumber);
			deleteSubtitle(selectedSubtitleNumber);
			break;
		case "n":
			console.log("n newLine after ", selectedSubtitleNumber);
			insertSubtitle(selectedSubtitleNumber, "",  "selectNew");
			break;
		case "r":
			console.log("r redo");
			redo();
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

/*	document.getElementById("spanSubtitle1").addEventListener('contextmenu', (e) => {
		if (e.ctrlKey)	{
			spanSubtitle1Selected = true;
			document.getElementById("textEditPopup").style.display = "inline-block";
			e.preventDefault();
		}
		return;
	});
*/

	document.getElementById("spanSubtitle1").addEventListener('click', (e) => {
		if (!(document.getElementById("myCheck07").checked)) { return;}
		spanSubtitle1Selected = true;
		spanSubtitle2Selected = false;
		//document.getElementById("textEditPopup").style.display = "inline-block";
		e.preventDefault();
		return;
	});

	document.getElementById("spanSubtitle1").addEventListener('blur', () => {
		if (spanSubtitle1Modified) {
			console.log("spanSubtitle1 modified - updating subtitle row ", selectedSubtitleNumber);
			let oldValue = document.getElementById(`row${selectedSubtitleNumber}SubtitleText`).innerHTML;
			let newValue = document.getElementById("spanSubtitle1").innerHTML;
			if (oldValue != newValue) {
				changeCounter += 1;
				selectCurrentIndex("undoArray");
				undoArray[undoArrayCurrentIndex].inUse = true;
				undoArray[undoArrayCurrentIndex].changeNumber = changeCounter;
				undoArray[undoArrayCurrentIndex].action = "subtitleTextChange";
				undoArray[undoArrayCurrentIndex].rowNumber = selectedSubtitleNumber;
				undoArray[undoArrayCurrentIndex].selectedRowNumber = selectedSubtitleNumber;
				undoArray[undoArrayCurrentIndex].oldValue = oldValue;
				undoArray[undoArrayCurrentIndex].newValue = newValue;
				document.getElementById(`row${selectedSubtitleNumber}SubtitleText`).innerHTML = newValue;
			}
			spanSubtitle1Modified = false;
			computeSubtitleTableHeight();
			unFocus();
		}
	});


	document.getElementById("spanSubtitle2").addEventListener('input', () => {
		spanSubtitle2Modified = true;
	});

/*	document.getElementById("spanSubtitle2").addEventListener('contextmenu', (e) => {
		if (e.ctrlKey)	{
			spanSubtitle2Selected = true;
			document.getElementById("textEditPopup").style.display = "inline-block";
			e.preventDefault();
		}
	return;
	});
*/

	document.getElementById("spanSubtitle2").addEventListener('click', (e) => {
		if (!(document.getElementById("myCheck07").checked)) { return;}
		spanSubtitle2Selected = true;
		spanSubtitle1Selected = false;
		//document.getElementById("textEditPopup").style.display = "inline-block";
		e.preventDefault();
		return;
	});

	document.getElementById("spanSubtitle2").addEventListener('blur', () => {
		if (spanSubtitle2Modified) {
			let oldValue = document.getElementById(`row${(selectedSubtitleNumber + 1)}SubtitleText`).innerHTML; 
			let newValue = document.getElementById("spanSubtitle2").innerHTML;
			if (oldValue != newValue) {
				changeCounter += 1;
				selectCurrentIndex("undoArray");
				undoArray[undoArrayCurrentIndex].inUse = true;
				undoArray[undoArrayCurrentIndex].changeNumber = changeCounter;
				undoArray[undoArrayCurrentIndex].action = "subtitleTextChange";
				undoArray[undoArrayCurrentIndex].rowNumber = selectedSubtitleNumber + 1;
				undoArray[undoArrayCurrentIndex].selectedRowNumber = selectedSubtitleNumber;
				undoArray[undoArrayCurrentIndex].oldValue = oldValue;
				undoArray[undoArrayCurrentIndex].newValue = newValue;
				document.getElementById(`row${selectedSubtitleNumber + 1}SubtitleText`).innerHTML = newValue;
			}
			spanSubtitle2Modified = false;
			spanSubtitle2Selected = false;
			computeSubtitleTableHeight();
			unFocus();
		}

	});

	keyListenerForSubtitlesAdded = true;
	console.log("addKeyListenerForSubtitles completed");


}  // addKeyListenerForSubtitles

function newFile() {

	if (lastSubtitleNumber > 0) {
		if (!confirm("Discard all present subtitles and begin a new file?")) {
    		return;
		}
		hideSubtitles(lastSubtitleNumber);
	}

	let rowObject = {};
	rowObject.startSeconds = 0;
	rowObject.endSeconds = 2;
	rowObject.startTime = "0:00:00.00";
	rowObject.endTime = "0:00:02.00";
	rowObject.style = "";
	rowObject.subtitle = ""; // "…";
	createSubtitleRow(rowObject, 1);

	totalNumberOfSubtitlesRead = 1;
	selectedSubtitleNumber = 1;
	lastSubtitleNumber = 1;
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
	
	switch (operand) {
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
			insertSubtitle((selectedSubtitleNumber - 1), "", "selectNew");
			return;
		case 'insertBelow':
			insertSubtitle(selectedSubtitleNumber, "", "selectNew");
			return;
		case 'delete':
			deleteSubtitle(selectedSubtitleNumber);
			return;
		case 'splitToNext':
		case 'splitToNextNewline':
		case 'splitToPrev':
		case 'splitToPrevNewline':
			break;
		default:
			console.log("textEditPopupAction invalid operand: ", operand);
			return;
	}

	let selectedSpan = "";
	let RowNumber = 0;
	if (spanSubtitle1Selected) {
		selectedSpan = "spanSubtitle1";
		RowNumber = spanSubtitle1Row;
		spanSubtitle1Selected = false;
	} else if (spanSubtitle2Selected) {
		selectedSpan = "spanSubtitle2";
		RowNumber = spanSubtitle2Row;
		spanSubtitle2Selected = false;
	}
	if (selectedSpan == "") {
		// ?? tell user to click on subtitle span to select
		console.log("textEditPopupAction operand ", operand, " RowNumber ", RowNumber,
		' selectedSpan = ""', selectedSpan);
		alert("textEditPopupAction Place cursor in edit area before choosing split action");
		return;
	}

	console.log("textEditPopupAction operand ", operand, " RowNumber ", RowNumber,
		" selectedSpan ", selectedSpan);

	let textElement = document.getElementById(selectedSpan);
	
	//updateCursorPosition();
	//document.getElementById("textEditPopup").style.display = "none";
	//return;
	
	var range = window.getSelection().getRangeAt(0);
	let cursorPosition = getCharacterOffsetWithin(range, textElement);
	
//	var editor = document.activeElement;
//	var editor = textElement;
//	while (editor && !editor.classList.contains("editor")) editor = editor.parentElement;
//	if (!editor) return;
// 	let cursorPosition = CaretUtil.getCaretPosition(textElement);

	text1 = textElement.innerText.substring(0, cursorPosition);
	text2 = textElement.innerText.substring(cursorPosition);
/*
	let text1 = "";
	let text2 = "";
	if (cursorPosition == 0) {
		text1 = "";
		text2 = textElement.innerText;
	} else {
		if (cursorPosition > (textElement.innerText.length - 1)) {
			text1 = textElement.innerText;
			text2 = "";
		}
		else {
			text1 = textElement.innerText.substring(0, cursorPosition);
			text2 = textElement.innerText.substring(cursorPosition);
			}
		}
*/
	console.log("textEditPopupAction cursorPosition ", cursorPosition, " text1 ", text1, " text2 ", text2);

	// if (text1.trim() == "") {
	// 	text1 = "…";
	// }
	if ((operand === "splitToNext") || (operand === "splitToNextNewline")) {
		textElement.innerText = text1.trim();
		document.getElementById(`row${selectedSubtitleNumber}SubtitleText`).innerText = text1.trim();
		if ((operand === "splitToNextNewline") || (selectedSubtitleNumber === lastSubtitleNumber)) {
			insertSubtitle(RowNumber, text2.trim(), "selectOld");
		} else {
			document.getElementById(`row${selectedSubtitleNumber + 1}SubtitleText`).innerText = text2.trim()
				+ document.getElementById(`row${selectedSubtitleNumber + 1}SubtitleText`).innerText;
		}
		return;
	}

	if ((operand === "splitToPrev") || (operand === "splitToPrevNewline")) {
		textElement.innerText = text2.trim();
		document.getElementById(`row${selectedSubtitleNumber}SubtitleText`).innerText = text2.trim();
		if ((operand === "splitToPrevNewline") || (selectedSubtitleNumber === 1)) {
			insertSubtitle((RowNumber - 1), text1.trim(), "selectOld");
		} else {
			document.getElementById(`row${selectedSubtitleNumber - 1}SubtitleText`).innerText = 
				document.getElementById(`row${selectedSubtitleNumber - 1}SubtitleText`).innerText
				+ text1.trim();
		}
		return;
	}
}

function insertSubtitle(afterRowNumber, text, selectOption) {

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

	if (lastSubtitleNumber == 0) {
		newFile();
		return;
	}

	// sample subtitleFileDataArray[x].array[y] member: 
	// 	{startSeconds: 120, endSeconds: 123, startTime: "0:02.00", endTime: "0:02.03", 
	//		style: "File1", subtitle: "Caption text" }

	let newRowNumber = afterRowNumber + 1;
	let backwardRowCounter = lastSubtitleNumber;
	let rowObject = {};

	while (backwardRowCounter >= newRowNumber) {
		rowObject.startSeconds = subtitleStartSeconds[backwardRowCounter];
		rowObject.endSeconds = subtitleEndSeconds[backwardRowCounter];
		rowObject.startTime = document.getElementById(`row${backwardRowCounter}SubtitleStart`).innerText;
		rowObject.endTime = document.getElementById(`row${backwardRowCounter}SubtitleEnd`).innerText;
		rowObject.style = document.getElementById(`row${backwardRowCounter}SubtitleTrack`).innerText;
		rowObject.subtitle = document.getElementById(`row${backwardRowCounter}SubtitleText`).innerText;
		createSubtitleRow(rowObject, (backwardRowCounter + 1));
		backwardRowCounter -= 1;
	}

	lastSubtitleNumber += 1;

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
	rowObject.style = "";
	if (text != "") {
		rowObject.subtitle = text;
	} else {
		rowObject.subtitle = ""; // "…";
	}

	createSubtitleRow(rowObject, newRowNumber);

	switch (selectOption) {
		case "selectNew": 
			processSelectOption(newRowNumber);
			break;
		case "selectOld":
			if (afterRowNumber > 0) {
				processSelectOption(afterRowNumber);
			} else {
				processSelectOption(newRowNumber);
			}
			break;
		case "selectNone": 
			break;
		default:
			console.log ("insertSubtitle invalid selectOption ", selectOption);
	}

	function processSelectOption(targetRow) {
		selectRow(targetRow);
		if (showTimePopup) {
			showTimeEditPopup(targetRow);
		}
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
	// undoArray[undoArrayCurrentIndex].oldValue = 
	//	document.getElementById(`row${rowNumber}SubtitleText`).innerHTML
	undoArray[undoArrayCurrentIndex].startTime = 
		document.getElementById(`row${rowNumber}SubtitleStart`).innerText;
	undoArray[undoArrayCurrentIndex].endTime = 
		document.getElementById(`row${rowNumber}SubtitleEnd`).innerText;
	undoArray[undoArrayCurrentIndex].style = 
		document.getElementById(`row${rowNumber}SubtitleTrack`).innerText;
	undoArray[undoArrayCurrentIndex].oldValue = 
		document.getElementById(`row${rowNumber}SubtitleText`).innerText;
	undoArray[undoArrayCurrentIndex].subtitleStartSeconds = subtitleStartSeconds[rowNumber];
	undoArray[undoArrayCurrentIndex].subtitleEndSeconds = subtitleEndSeconds[rowNumber];

	let rowCounter = rowNumber + 1;
	let rowObject = {};

	while (rowCounter <= lastSubtitleNumber) {
		rowObject.startSeconds = subtitleStartSeconds[rowCounter];
		rowObject.endSeconds = subtitleEndSeconds[rowCounter];
		rowObject.startTime = document.getElementById(`row${rowCounter}SubtitleStart`).innerText;
		rowObject.endTime = document.getElementById(`row${rowCounter}SubtitleEnd`).innerText;
		rowObject.style = document.getElementById(`row${rowCounter}SubtitleTrack`).innerText;
		rowObject.subtitle = document.getElementById(`row${rowCounter}SubtitleText`).innerText;
		createSubtitleRow(rowObject, (rowCounter - 1));
		rowCounter += 1;
	}

	let isLast = false;
	if (rowNumber === lastSubtitleNumber) {
		isLast = true;
	}

	hideSubtitles(1);

	if (!isLast) {
		selectRow(rowNumber);
	} else {
		if (lastSubtitleNumber >= 1) {
			selectRow(lastSubtitleNumber);
		} else {
			selectedSubtitleNumber = 0;
			document.getElementById("spanSubtitle1").innerHTML = "";
			document.getElementById("spanSubtitle2").innerHTML = "";
		}
	}

}

function createSubtitleRow(rowObject, rowIndex) {

	subtitleStartSeconds[rowIndex] = rowObject.startSeconds;
	subtitleEndSeconds[rowIndex] = rowObject.endSeconds;

	let t = document.getElementById("subtitleTable");

	let rowId = "row" + (rowIndex);
	let r = document.getElementById(rowId);
	let rowIsNew = false;

	if (!r) {
		r = document.createElement("tr");
		r.id = rowId;
		r.addEventListener("click", function(e) {
			selectRow(Number(document.getElementById(`${rowId}SubtitleNumber`).innerHTML));
		});
		t.tBodies[0].appendChild(r);
		rowIsNew = true;
	}

	r.style.display = 'table-row'; /* Ensure that the row is visible. */

	r.innerHTML = `
			<tr style="min-height: 1.875em;">
            <td id="${rowId}SubtitleNumber" headers="subtitleNumber"
			 	style="font-weight: bold; font-size: 1.5em; vertical-align:top; 
				padding-top: 10px">${rowIndex}</td>
            <td id="${rowId}SubtitleStart" headers="subtitleStart"
			 	style="font-size: 1.5em; vertical-align:top; 
				padding-top: 10px">${rowObject.startTime}</td>
            <td id="${rowId}SubtitleEnd" headers="subtitleEnd"
			 	style="font-size: 1.5em; vertical-align:top; 
				padding-top: 10px">${rowObject.endTime}</td>
            <td id="${rowId}SubtitleTrack" headers="subtitleTrack "
			 	style="font-size: 1.5em; vertical-align:top; 
				padding-top: 10px" >${rowObject.style}</td>
            <td id="${rowId}SubtitleText" headers="subtitleText"
			 	style="font-size: 1.875em; 
				vertical-align:top;">${rowObject.subtitle}</td>
			</tr>
        	`
	document.getElementById(`${rowId}SubtitleStart`).addEventListener("click", function(e) {
		showTimeEditPopup(rowIndex);
	});

	document.getElementById(`${rowId}SubtitleEnd`).addEventListener("click", function(e) {
		showTimeEditPopup(rowIndex);
	});
}

//  Sample syntax:
//	document.getElementById("spanStartTime").innerHTML =
//		document.getElementById(`row${rowNumber}SubtitleStart`).innerHTML;


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
		t1timeEditPopupOldTime = document.getElementById(`row${rowNumber}SubtitleStart`).innerText;
		t1timeEditPopupOldSeconds = subtitleStartSeconds[rowNumber];
		t2timeEditPopupOldTime = document.getElementById(`row${rowNumber}SubtitleEnd`).innerText;
		t2timeEditPopupOldSeconds = subtitleEndSeconds[rowNumber];
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


	document.getElementById(prefix + "hourField1").innerText = hh - (Math.floor(hh / 10) * 10);

	document.getElementById(prefix + "minuteField1").innerText = Math.floor(mm / 10);
	document.getElementById(prefix + "minuteField2").innerText = mm - (Math.floor(mm / 10) * 10);

	document.getElementById(prefix + "secondField1").innerText = Math.floor(ss / 10);
	document.getElementById(prefix + "secondField2").innerText = ss - (Math.floor(ss / 10) * 10);


	let millisecondHundreds = Math.floor(ff / 100);
	let millisecondTens = Math.floor((ff - (millisecondHundreds * 100)) / 10);
	let millisecondsOnes = ff - (Math.floor(ff / 10) * 10);
	document.getElementById(prefix + "millisecondField1").innerText = millisecondHundreds;
	document.getElementById(prefix + "millisecondField2").innerText = millisecondTens;
	document.getElementById(prefix + "millisecondField3").innerText = millisecondsOnes;

}  // fillTimeFields

}  // showTimeEditPopup

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
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

	if (selectedSubtitleNumber == 0) {	// If no subtitle has yet been selected
		selectedSubtitleNumber = 1;		// by default, select the first subtitle
	}

	let counter = 0;

	switch(extension) {
		case '.ass':
			let parseOptions = {};
			const lineArray = parse(textContent,parseOptions);
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

	var helper = {
  		toTimeString: function(ms) {
    		var hh = Math.floor(ms / 1000 / 3600);
    		var mm = Math.floor(ms / 1000 / 60 % 60);
    		var ss = Math.floor(ms / 1000 % 60);
			var ff = Math.floor(ms % 1000);
			ff = Math.floor(ff / 10);
    		/* var time = (hh < 10 ? "0" : "") 
				+ hh + ":" + (mm < 10 ? "0" : "") + mm + ":" 
				+ (ss < 10 ? "0" : "") + ss + "," 
				+ (ff < 100 ? "0" : "") + (ff < 10 ? "0" : "") + ff;
			*/
    		var time = hh + ":" + (mm < 10 ? "0" : "") + mm + ":" 
				+ (ss < 10 ? "0" : "") + ss + "." 
				+ (ff < 10 ? "0" : "") + ff;
    		return time;
  		}
	};

	let rowData = {};
	counter += 1;

	rowData.startSeconds = content.start / 1000;
	rowData.endSeconds = content.end / 1000;

	rowData.startTime = helper.toTimeString(content.start);
	rowData.endTime = helper.toTimeString(content.end);
	
	if (content.style == '') {
		rowData.style = subtitleFile.defaultStyle;
	}
	else {
		if (inputId == "subtitleFileInput0") {
			rowData.style = content.style;
		}
		else {
			rowData.style = subtitleFile.defaultStyle + '-' + content.style;
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

function saveFile() {
	console.log("saveFile entered");
	if (lastSubtitleNumber <= 0) {return;}
	console.log("saveFile after checking lastSubtitleNumber");

	const table = document.getElementById("subtitleTable");
	
	let targetTrack = document.getElementById("spanTrack").innerHTML.trim();
	if (targetTrack != "") {
		targetTrack = targetTrack.substring(0,6);
	}

	console.log("saveFile targetTrack ", targetTrack);
	console.log("saveFile document.getElementById('spanTrack').innerHTML x", 
		document.getElementById("spanTrack").innerHTML, "x");

	let filename = (targetTrack + " output.srt").trim();
	
	let fileContent = "";
	let subtitleIndex = 1;
	let outputIndex = 0;

	while (subtitleIndex <= lastSubtitleNumber) {
	
		let matchFound = false;
			
		if (targetTrack == "") {
			matchFound = true;
		} else {
			while ((!matchFound) && (subtitleIndex <= lastSubtitleNumber)) {
				if (document.getElementById(`row${subtitleIndex}SubtitleTrack`).innerHTML.trim().startsWith(targetTrack)) {
					matchFound = true;
				} else {
					subtitleIndex += 1;
				}
			}
		}
		/*
		if (document.getElementById(`row${subtitleIndex}SubtitleTrack`).innerHTML.substring(0,5) != targetTrack) {
				subtitleIndex += 1;
				if (subtitleIndex <= lastSubtitleNumber)
			}
		document.getElementById("spanTrack").innerHTML != " " {
		
		}
		*/
		
		if (matchFound) {
			outputIndex += 1;
			fileContent += outputIndex + 
				"\n" +
				convertSecondsToSrtTime(subtitleStartSeconds[subtitleIndex]) + 
				" --> " + 
				convertSecondsToSrtTime(subtitleEndSeconds[subtitleIndex]) + 
				"\n" +
				document.getElementById(`row${subtitleIndex}SubtitleText`).innerHTML.replaceAll('<br>', '\n').trim() +
				"\n\n";
		}

		subtitleIndex += 1;
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
			if (selectedSubtitleNumber > scrollStepOption) {
				selectRow(selectedSubtitleNumber - scrollStepOption);
				skipTo(subtitleStartSeconds[selectedSubtitleNumber]);
			}
			return;
		case 'nextST':
			if (selectedSubtitleNumber < document.getElementById("subtitleTable").rows.length - scrollStepOption) {
				selectRow(selectedSubtitleNumber + scrollStepOption);
				skipTo(subtitleStartSeconds[selectedSubtitleNumber]);
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

}

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
			let errorMsg = 'Invalid numberOfFiles: ', numberOfFiles;
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

let viewportWidth = getViewportWidth();
let viewportHeight = getViewportHeight();
console.log("DOMInitializations Viewport Width " + viewportWidth + " Height " + viewportHeight);

videoElem = document.getElementById("videoArea");

const urlParams = new URLSearchParams(window.location.search);
const allUrlParamsObject = Object.fromEntries(urlParams.entries());
console.log("DOMInitializations All Query Parameters as Object:", allUrlParamsObject);
if (allUrlParamsObject.yturl == undefined) { console.log("parm is null");}
else {console.log("DOMInitializations parm is present: ",allUrlParamsObject.yturl);}
if (allUrlParamsObject.yturl = "") { console.log("parm is null2");}
else {console.log("DOMInitializations parm is present2: ", allUrlParamsObject.yturl);}

const wrapperElement = document.getElementById("wrapper");
maxVideoWidth = getAdjustedWidthPixels(wrapperElement);
console.log("DOMInitializations maxVideoWidth = ",maxVideoWidth);

console.log("DOMInitializations wrapper.style.width = ", wrapperElement.style.width, 
		" wrapper.style.height = ", wrapperElement.style.height);

enableFileSelection();

toggleSubtitleSection(); 

configInitializations(); // Process config.js

changeTheme(theme);		// Initialize theme option
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
	
	let themeAttributeObject = findThemeAttributeObject(theme);

	if (!themeAttributeObject) { 
		errorReason = 'theme = ' + theme + ' invalid';
		initError(errorReason);
		return;
	}

	document.getElementById("color1Input").value = themeAttributeObject.foregroundColor;
	document.getElementById("color2Input").value = themeAttributeObject.backgroundColor;
	document.getElementById("color3Input").value = themeAttributeObject.highlightBackgroundColor;

	document.getElementById("lightThemeOption").style.color = lightThemeAttributes.foregroundColor;
	document.getElementById("lightThemeOption").style.backgroundColor = lightThemeAttributes.backgroundColor;
	// document.getElementById("lightThemeOption").style.backgroundColor = lightThemeAttributes.highlightBackgroundColor;

	document.getElementById("darkThemeOption").style.color = darkThemeAttributes.foregroundColor;
	document.getElementById("darkThemeOption").style.backgroundColor = darkThemeAttributes.backgroundColor;
	// document.getElementById("darkThemeOption").style.backgroundColor = darkThemeAttributes.highlightBackgroundColor;

	document.getElementById("OSDefaultThemeOption").style.color = OSDefaultThemeAttributes.foregroundColor;
	document.getElementById("OSDefaultThemeOption").style.backgroundColor = OSDefaultThemeAttributes.backgroundColor;
	// document.getElementById("OSDefaultThemeOption").style.backgroundColor = OSDefaultThemeAttributes.highlightBackgroundColor;

	document.getElementById("preset01ThemeOption").innerText = preset01ThemeAttributes.themeName;
	document.getElementById("preset01ThemeOption").style.color = preset01ThemeAttributes.foregroundColor;
	document.getElementById("preset01ThemeOption").style.backgroundColor = preset01ThemeAttributes.backgroundColor;
	// document.getElementById("preset01ThemeOption").style.backgroundColor = preset01ThemeAttributes.highlightBackgroundColor;

	document.getElementById("preset02ThemeOption").innerText = preset02ThemeAttributes.themeName;
	document.getElementById("preset02ThemeOption").style.color = preset02ThemeAttributes.foregroundColor;
	document.getElementById("preset02ThemeOption").style.backgroundColor = preset02ThemeAttributes.backgroundColor;
	// document.getElementById("preset02ThemeOption").style.backgroundColor = preset02ThemeAttributes.highlightBackgroundColor;

	document.getElementById("preset03ThemeOption").innerText = preset03ThemeAttributes.themeName;
	document.getElementById("preset03ThemeOption").style.color = preset03ThemeAttributes.foregroundColor;
	document.getElementById("preset03ThemeOption").style.backgroundColor = preset03ThemeAttributes.backgroundColor;
	// document.getElementById("preset03ThemeOption").style.backgroundColor = preset03ThemeAttributes.highlightBackgroundColor;

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