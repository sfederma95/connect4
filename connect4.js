/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

function myPlay(sound) {
	var audio = new Audio(sound);
	audio.play();
}
/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
	// TODO: set "board" to empty HEIGHT x WIDTH matrix array
	return (board = [
		[ null, null, null, null, null, null, null ],
		[ null, null, null, null, null, null, null ],
		[ null, null, null, null, null, null, null ],
		[ null, null, null, null, null, null, null ],
		[ null, null, null, null, null, null, null ],
		[ null, null, null, null, null, null, null ]
	]);
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
	// TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
	const htmlBoard = document.querySelector('#board');

	// TODO: create cells in rows and add event listener to each cell
	const top = document.createElement('tr');
	top.setAttribute('id', 'column-top');
	top.addEventListener('click', handleClick);

	for (let x = 0; x < WIDTH; x++) {
		const headCell = document.createElement('td');
		headCell.setAttribute('id', x);
		top.append(headCell);
	}
	htmlBoard.append(top);

	// TODO: create rows of cells up to width and height as end parameter
	for (let y = 0; y < HEIGHT; y++) {
		const row = document.createElement('tr');
		for (let x = 0; x < WIDTH; x++) {
			const cell = document.createElement('td');
			cell.setAttribute('id', `${y}-${x}`);
			row.append(cell);
		}
		htmlBoard.append(row);
	}
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
	// TODO: write the real version of this, rather than always returning 0
	for (let y = HEIGHT - 1; y >= 0; y--) {
		if (board[y][x] === null) {
			return y;
		}
	}
	return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
	// TODO: make a div and insert into correct table cell
	const piece = document.createElement('div');
	piece.classList.add('piece');
	if (currPlayer === 1) {
		piece.classList.add('p1');
	} else piece.classList.add('p2');
	const spot = document.getElementById(`${y}-${x}`);
	spot.append(piece);
}

/** endGame: announce game end */

function endGame(msg) {
	setTimeout(function() {
		alert(msg) ? '' : location.reload();
	}, 3000);
	myPlay('victory.mp3');
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
	// get x from ID of clicked cell
	let x = +evt.target.id;

	// get next spot in column (if none, ignore click)
	const y = findSpotForCol(x);
	if (y === null) {
		return;
	}

	// place piece in board and add to HTML table
	// TODO: add line to update in-memory board
	placeInTable(y, x);
	board[y][x] = currPlayer;

	// check for win
	if (checkForWin()) {
		return endGame(`Player ${currPlayer} won!`);
	}

	// check for tie
	// TODO: check if all cells in board are filled; if so call, call endGame
	if (board.every((subarr) => subarr.every((el) => el !== null))) {
		endGame(`This is a tie!`);
	}

	// switch players
	// TODO: switch currPlayer 1 <-> 2
	if (currPlayer === 1) {
		currPlayer++;
	} else currPlayer--;

	myPlay('drip.wav');
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
	function _win(cells) {
		// Check four cells to see if they're all color of current player
		//  - cells: list of four (y, x) cells
		//  - returns true if all are legal coordinates & all match currPlayer

		return cells.every(([ y, x ]) => y >= 0 && y < HEIGHT && x >= 0 && x < WIDTH && board[y][x] === currPlayer);
	}

	// TODO: read and understand this code. Add comments to help you.

	for (let y = 0; y < HEIGHT; y++) {
		for (let x = 0; x < WIDTH; x++) {
			const horiz = [ [ y, x ], [ y, x + 1 ], [ y, x + 2 ], [ y, x + 3 ] ];
			const vert = [ [ y, x ], [ y + 1, x ], [ y + 2, x ], [ y + 3, x ] ];
			const diagDR = [ [ y, x ], [ y + 1, x + 1 ], [ y + 2, x + 2 ], [ y + 3, x + 3 ] ];
			const diagDL = [ [ y, x ], [ y + 1, x - 1 ], [ y + 2, x - 2 ], [ y + 3, x - 3 ] ];

			if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
				return true;
			}
		}
	}
}

makeBoard();
makeHtmlBoard();
