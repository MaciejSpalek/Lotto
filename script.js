const fragment = document.createDocumentFragment(); 
const number = []; // array saves number on the list
const ball = []; //elements from main board (1-49)
const result = []; // array gather six variables (current draw)

const cors = "https://cors-anywhere.herokuapp.com/";
const url = `${cors}http://serwis.mobilotto.pl/mapi_v6/index.php?json=getGames`;

let numberCounter = 0; //counter for list with all draws
const responseNumbers = []; //array with all numbers from official draw

function fetchAPI() {
	fetch(url)
		.then(response => response.json())
		.then(response => {

			const {Lotto: {numerki: numbers, data_losowania:data}} = response;
			let convertedNumber = numbers.split(",").map(number => parseInt(number))
			$('.data').html(`${data.substr(0, 10)}`)

			convertedNumber.forEach(number => {
				responseNumbers.push(number);
				const ball = $('<div>').addClass('ball ball-modifier').html(number)
				$('.numbers').append(ball);

			});
		})
}
function addBalls(amount) {
	for(let i=0; i<amount; i++) {
		ball[i] = $('<div>').addClass('ball').text(i+1);
		$(fragment).append(ball[i]);
	}
	$('.ball-box').append(fragment);
	$('.list').fadeOut(0);
}
function manipulateButtonState(drawState, resetState) {
	$('#draw-button').prop('disabled', drawState);
	$('#reset-button').prop('disabled', resetState);
}
function addNumbersToList() {
	const numberBox = $('<div>').addClass('numberBox');
	$('.list').append(numberBox);
	for(let i=0; i<6; i++) {
		if(responseNumbers.includes(result[i])) {
			number[numberCounter] = $('<div>').addClass('ball ball-modifier dark-ball').text(result[i]); 
		} else {
			number[numberCounter] = $('<div>').addClass('ball ball-modifier').text(result[i]); 
		}
		$(numberBox).append(number[numberCounter]);
		numberCounter++;
	}
}
function drawMoreNumbers() { 
	for(let i=0; i<6; i++) {
		drawSingleNumber();
	}
	showRandoms(); //show drawn numbers (function adds class)
}   
function showRandoms() {
	let counter = 0;
	let show = setInterval(()=>{
		ball[result[counter]-1].addClass("dark-ball");
		responseNumbers.forEach((number, index) => {
			if(result[counter] == number) {
				$('.numbers').children().eq(index).addClass("dark-ball");
			}
		});
		counter++;
		if(counter>result.length-1) {
			manipulateButtonState(true, false);
			clearInterval(show);
		}
	}, 500);
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
		$('.numbers').children().eq(i).removeClass("dark-ball");
	}
	result.length = 0;
}
function drawButton() {
	$('#draw-button').click(() => {
		manipulateButtonState(true, true);
		drawMoreNumbers();
		addNumbersToList();
	}); 
}
function resetButton() {
	$('#reset-button').click(()  => { 
		resetBoard();
		manipulateButtonState(false, false);
	}); 
}
function listButton() {
	$('#list-button, .flaticon-close').click(() => { 
		$('.list').slideToggle(1500, 'easeOutBounce')
	}); 
}

addBalls(49);

// listeners
drawButton();
resetButton();
listButton();
fetchAPI()
