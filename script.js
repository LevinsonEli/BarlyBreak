
var size = 4;	// Size of the game table (standart: 4)
var gameArr = new Array();	// Game array

var stepsCount = 0;
var nowDate;

var newGameBtn = document.querySelector(".newGameBtn");
var recordTable = document.querySelector(".recordTbody");
var gameBox = document.querySelector("#gameBox");
var gameTable = document.createElement("table");
	gameTable.className = "gameTable";

// Record Table by default
var arrRecords = [	
	{ nick:  "Solt", time: 54.6	},
	{ nick:  "Seed", time: 123.2 },
	{ nick:  "Ela", time: 24.7 },
	{ nick:  "Symon", time: 86.4 },
	{ nick:  "Nesty", time: 44.5 },
	{ nick:  "Cola", time: 75.2 },
	{ nick:  "Sendy", time: 78.0 },
	{ nick:  "Tomb", time: 35.2 },
	{ nick:  "Ferron", time: 156.1 }
];

for ( var i = 0; i < (size*size); i++) 	// Filling the array by numbers
	gameArr[i] = i + 1;

newGame = function(){
	stepsCount = 0;
	gameArr.sort( (a, b) => (Math.random() - 0.5) ); // Sorting the array randomly	

	//Creating a HTML table of numbers
	gameTable.innerHTML = "";
	for(var i = 0; i < size; i++)
	{
		var newTR = document.createElement("tr");
		for(var j = 0; j < size; j++)
		{
			var newTD = document.createElement("td");
			newTD.id = (i * size + j).toString();

			if (gameArr[i * size + j] == size * size)
				newTD.innerHTML += " ";
			else
				newTD.innerHTML += gameArr[i * size + j].toString();
			newTR.appendChild(newTD);
		}
		gameTable.appendChild(newTR);
	}
	gameBox.innerHTML = "";
	gameBox.appendChild(gameTable);
}

printRecordTable = function(){
	recordTable.innerHTML = "";
	arrRecords.forEach(function(elem){
		recordTable.insertAdjacentHTML("beforeend", '<tr><td><b>' + elem.nick + ': </b></td><td> ' + elem.time + '</td></tr>');
	});
}

recreateRocordTable = function(newRecord){
	if (newRecord != null)
	{
		arrRecords.push(newRecord);
		arrRecords.sort(function(a, b){ return a.time - b.time;});
		arrRecords.pop();
	}
}

// Function that checks if the game is ended (completed)
function gameIsCompleted(gameArr, size)
{
	for ( var i = 0; i < size * size; i++)
		if (gameArr[i] != i + 1)
			return false;
	return true;
}

// Function that ckecks if the cell can be moved and if it can - returns the vector (string)
// another way returns false (string)
function canBeMoved(gameArr, size, indexThis)
{
	if ( indexThis >= size && gameArr[indexThis - size] == size*size )	// NOT The First Line
		return "up";
	else if ( (indexThis + size) < (size * size) && gameArr[indexThis + size] == size*size )
		return "down";
	else if ( (indexThis + 1) % size != 1 && gameArr[indexThis - 1] == size*size )
		return  "left";
	else if ( (indexThis + 1) % size != 0 && gameArr[indexThis + 1] == size*size )
		return  "right";
	return "false";
}

// The function that moving a cell. It changing the array and the table.
// The function gets an array, the size of the game, index of the cell that need to move and the vector of moving
// And returns changed array.
function moveCellInTable(gameArr, size, indexThis, vector)
{
	var arrTd = document.querySelectorAll(".gameTable td");
	switch(vector)
	{
		case "up":
			gameArr = moveCellInTwoCells(gameArr, size, arrTd, indexThis, indexThis - size);
			break;
		case "down":
			gameArr = moveCellInTwoCells(gameArr, size, arrTd, indexThis, indexThis + size);
			break;
		case "left":
			gameArr = moveCellInTwoCells(gameArr, size, arrTd, indexThis, indexThis - 1);
			break;
		case "right":
			gameArr = moveCellInTwoCells(gameArr, size, arrTd, indexThis, indexThis + 1);
			break;
		default: break;
	}
	return gameArr;
}

function moveCellInTwoCells(gameArr, size, arrTd, indexThis, indexNext)
{
	arrTd[indexNext].innerHTML = arrTd[indexThis].innerHTML;
	arrTd[indexThis].innerHTML = " ";
			
	gameArr[indexNext] = gameArr[indexThis];
	gameArr[indexThis] = size*size;
	return gameArr;
}

newGame();
recreateRocordTable();
printRecordTable();

var Table = document.querySelector(".gameTable");
Table.onclick = function(event)
{
	if ( stepsCount == 0 )
		nowDate = new Date();

	var el = event.target;
	
	if (el.id != "")
	{
		gameArr = moveCellInTable(gameArr, size, +el.id, canBeMoved(gameArr, size, +el.id));
		stepsCount++;
	}
	if (gameIsCompleted(gameArr, size))
	{
		var endDate = new Date();
		var name = prompt("Your nickname? ", "NickName");

		recreateRocordTable({'nick': name, 'time': ((endDate - nowDate) / 1000).toFixed(1)});
		printRecordTable();
		newGame();
	}
}

newGameBtn.addEventListener("click", function(){
	newGame();
}, false);
