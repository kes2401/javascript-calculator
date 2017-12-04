//----- Declare all variables -----
const ac = $('#acBtn'),
	ce = $('#ceBtn'),
	divide = $('#divideBtn'),
	minus = $('#minusBtn'),
	plus = $('#plusBtn'),
	multiply = $('#multiplyBtn'),
	equals = $('#equalsBtn'),
	point = $('#pointBtn'),
	seven = $('#sevenBtn'),
	eight = $('#eightBtn'),
	nine = $('#nineBtn'),
	four = $('#fourBtn'),
	five = $('#fiveBtn'),
	six = $('#sixBtn'),
	one = $('#oneBtn'),
	two = $('#twoBtn'),
	three = $('#threeBtn'),
	zero = $('#zeroBtn');

let calcString = '';
let result = 0;
let currentEntry = '';

let displayEntry = $('#result');
let displayString = $('#string');

let decimal = false;
let cont = false;
let stop = false;

//----- Declare all basic functions -----
function init() {
	clearString();
	reset();
	resetDecimal();	
}

function clearString() {
	calcString = '';
	displayString.text(0);	
}

function reset() {
	result = 0;
	displayEntry.text(0);
	currentEntry = '';
}

function resetDecimal() {
	decimal = false;
}

function round(value) {
	let tempValue = value.toString();
	let dp;
	if (tempValue.indexOf('.') === -1) {
		return value;
	} else {
		let index = tempValue.indexOf('.');
		dp = tempValue.substring(index + 1).length;	
	}
	if (dp > 0 && dp < 2) {
		return value.toFixed(1);
	} else if (dp >= 2) {
		return value.toFixed(2);
	}
}

function chkDisplayStr(string) {
	if (string.length >= 24) {
		let temp = string.substring(string.length - 24);
		return '...' + temp;
	} else {
		return string;
	}
}

function chkEntryLimit(string) {
	if (string.length >= 8) {
		displayEntry.text('MAX');
		stop = true;
	} else {
		return string
	}
}

function chkLastChar(str) {
	if(str[str.length - 1] === undefined || str[str.length - 1] === '+' || str[str.length - 1] === '-' || 
		str[str.length - 1] === '*' || str[str.length - 1] === '/' || str[str.length - 1] === '.'){
		return true;
	} else {
		return false;
	}
}

function numFunc(str) {
	if(!stop){
		if(cont){
			cont = false;
		}
		currentEntry += str;
		displayEntry.text(chkEntryLimit(currentEntry));
	}
}

function operatorFunc(str) {
	if(!stop){
		if(!chkLastChar(currentEntry)){
			if(cont){
				currentEntry = result.toString();
				cont = false;
			}
			currentEntry += str;
			calcString += currentEntry;
			displayString.text(chkDisplayStr(calcString));
			currentEntry = '';
			resetDecimal();				
		}
	}	
}

//----- Set onload function to initialize the app when DOM loads -----
window.onload = init();


//----- Set all button event handlers -----
ac.on('click', function(){
	init();
});

ce.on('click', function(){
	currentEntry = '';
	displayEntry.text(0);
	resetDecimal();
	stop = false;
});

one.on('click', function(){
	numFunc('1');
});

two.on('click', function(){
	numFunc('2');
});

three.on('click', function(){
	numFunc('3');
});

four.on('click', function(){
	numFunc('4');
});

five.on('click', function(){
	numFunc('5');
});

six.on('click', function(){
	numFunc('6');
});

seven.on('click', function(){
	numFunc('7');
});

eight.on('click', function(){
	numFunc('8');
});

nine.on('click', function(){
	numFunc('9');
});

zero.on('click', function(){
	numFunc('0');
});

divide.on('click', function(){
	operatorFunc('/');
});

multiply.on('click', function(){
	operatorFunc('*');
});

plus.on('click', function(){
	operatorFunc('+');
});

minus.on('click', function(){
	operatorFunc('-');
});

point.on('click', function(){
	if(!stop){
		if(!decimal){
			if(currentEntry === '' || currentEntry === ' '){
				currentEntry = '0';
				displayEntry.text(0);
			}
			currentEntry += '.';
			displayEntry.text(chkEntryLimit(currentEntry));
			decimal = true;
		}	
	}
});

equals.on('click', function(){
	if(!stop){
		calcString += currentEntry;
		if(chkLastChar(calcString)) {
			calcString = calcString.substring(0, calcString.length - 1);
		}
		if(!cont){
			result = eval(calcString);
			result = round(result);
			calcString = '';
			currentEntry = result.toString();
		}
		displayEntry.text(result);
		displayString.text(0);
		currentEntry = ' ';
		resetDecimal();
		cont = true;		
	}
});