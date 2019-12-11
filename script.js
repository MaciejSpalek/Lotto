const fragment = document.createDocumentFragment();

//zmienne
const number = [];
const ball = [];
const result = [];
let counter = 0;
let numberCounter = 0;


function addBalls(amount) {
	for(let i=0; i<amount; i++) {
		ball[i] = $('<div>').addClass('ball').text(i+1);
		$(fragment).append(ball[i]);
	}
	$('#ball-box').append(fragment);
	$('#list').fadeOut(0);
}
function manipulateButtonState(drawState, resetState) {
	$('#draw-button').prop('disabled', drawState);
	$('#reset-button').prop('disabled', resetState);
}
function addNumbersToList() {
	const numberBox = $('<div>').addClass('numberBox');
	$('#list').append(numberBox);
	for(let i=0; i<6; i++) {
		number[numberCounter] = $('<div>').addClass('ball ball-modifier').text(result[i]); 
		$(numberBox).append(number[numberCounter]);
		numberCounter++;
	}
}
function drawMoreNumbers() { // losuje 6 liczb
	for(let i=0; i<6; i++) {
		drawSingleNumber(); // losowanie pojedynczej liczby
	}
	showRandoms(); // pokazuje wyloswane liczby dodając klasę co określony czas
}   
function showRandoms() {
	let show = setInterval(()=>{
		ball[result[counter]-1].addClass("dark-ball");
		counter++;
		if(counter>result.length-1) {
			manipulateButtonState(true, false);
			clearInterval(show);
		}
	}, 500);
	counter = 0;
}
function drawSingleNumber() {
      const randomNumber = Math.floor(Math.random() * 49 + 1);
      for (let i = 0; i < result.length; i++) {
        if (randomNumber === result[i]) {
			return drawSingleNumber();
		}
      }
	  result.push(randomNumber);
}
function resetBoard() {
	for(let i=0; i<result.length; i++) {
		ball[result[i]-1].removeClass('dark-ball');
	}
	result.length = 0;
}
function drawButton() {
	$('#draw-button').click(() => { // nasłuchiwanie na przycisk losujący liczby
		manipulateButtonState(true, true);
		drawMoreNumbers();
		addNumbersToList();
	}); 
}
function resetButton() {
	$('#reset-button').click(()  => { // nasłuchiwanie na przycisk restujący całą plansze
		resetBoard();
		manipulateButtonState(false, false);
	}); 
}
function listButton() {
	$('#list-button, .flaticon-close').click(() => { // nasłuchiwanie na przycisk restujący całą plansze
		$('#list').slideToggle(1500, 'easeOutBounce')
	}); 
}

addBalls(49);

//nasłuchiwanie
drawButton();
resetButton();
listButton();



