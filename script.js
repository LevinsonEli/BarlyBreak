
var size = 4;	// Size of the game table (standart: 4)
var arr = new Array();	// Game array

var stepsCount = 0;
var nowDate;


var newGameBtn = document.querySelector(".newGameBtn");

var recordTable = document.querySelector(".recordTbody");

var gameBox = document.querySelector("#gameBox");
var newTable = document.createElement("table");
	newTable.className = "newTable";

// Record Table
var arrRecords = [	
	{
		nick:  "Solt",
		time: 54.6
	},
	{
		nick:  "Seed",
		time: 123.2
	},
	{
		nick:  "Ela",
		time: 24.7
	},
	{
		nick:  "Symon",
		time: 86.4
	},
	{
		nick:  "Nesty",
		time: 44.5
	},
	{
		nick:  "Cola",
		time: 75.2
	},
	{
		nick:  "Sendy",
		time: 78.0
	},
	{
		nick:  "Tomb",
		time: 35.2
	},
	{
		nick:  "Ferron",
		time: 156.1
	}
];

for ( var i = 0; i < (size*size); i++) 	// Fulling the array by numbers
	arr[i] = i + 1;

newGame = function(){
	arr.sort(function(a, b){ return Math.random() - 0.5; }); // Sorting the array randomly	
	
	//Creating a table of numbers
	newTable.innerHTML = "";
	for(var i = 0; i < size; i++)
	{
		var newTR = document.createElement("tr");
		for(var j = 0; j < size; j++)
		{
			var newTD = document.createElement("td");
			newTD.id = (i * size + j).toString();

			if (arr[i * size + j] == size * size)
				newTD.innerHTML += " ";
			else
				newTD.innerHTML += arr[i * size + j].toString();
			newTR.appendChild(newTD);
		}
		newTable.appendChild(newTR);
	}
	gameBox.innerHTML = "";
	gameBox.appendChild(newTable);
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
function gameIsCompleted(arr, size)
{
	for ( var i = 0; i < size * size; i++)
		if (arr[i] != i + 1)
			return false;

	return true;
}

// Function that ckecks if the cell can be moved and if it can - returns the vector (string)
// another way returns false (string)
function canBeMoved(arrThis, size, indexThis)
{
	if ( indexThis >= size && arrThis[indexThis - size] == size*size )	// NOT The First Line
		return "up";
	else if ( (indexThis + size) < (size * size) && arrThis[indexThis + size] == size*size )
		return "down";
	else if ( (indexThis + 1) % size != 1 && arrThis[indexThis - 1] == size*size )
		return  "left";
	else if ( (indexThis + 1) % size != 0 && arrThis[indexThis + 1] == size*size )
		return  "right";
	return "false";
}

// The function that moving a cell. It changing the array and the table.
// The function get array, it's sqrt.size, index of the cell that need to move and the vector of moving
// And it returns changed array.
function moveBox(arrThis, size, indexThis, vector)
{
	var arrTd = document.querySelectorAll("table.newTable td");
	switch(vector)
	{
		case "up":
			arrTd[indexThis - size].innerHTML = arrTd[indexThis].innerHTML;
			arrTd[indexThis].innerHTML = " ";
			
			arrThis[indexThis - size] = arrThis[indexThis];
			arrThis[indexThis] = size*size;
			break;
		case "down":
			arrTd[indexThis + size].innerHTML = arrTd[indexThis].innerHTML;
			arrTd[indexThis].innerHTML = " ";
			
			arrThis[indexThis + size] = arrThis[indexThis];
			arrThis[indexThis] = size*size;
			break;
		case "left":
			arrTd[indexThis - 1].innerHTML = arrTd[indexThis].innerHTML;
			arrTd[indexThis].innerHTML = " ";
			
			arrThis[indexThis - 1] = arrThis[indexThis];
			arrThis[indexThis] = size*size;
			break;
		case "right":
			arrTd[indexThis + 1].innerHTML = arrTd[indexThis].innerHTML;
			arrTd[indexThis].innerHTML = " ";
			
			arrThis[indexThis + 1] = arrThis[indexThis];
			arrThis[indexThis] = size*size;
			break;
			
		default: break;
	}
	return arrThis;
}


newGame();
recreateRocordTable();
printRecordTable();

var Table = document.querySelector(".newTable");
Table.onclick = function(event)
{
	if ( stepsCount == 0 )
		nowDate = new Date();

	var el = event.target;
	
	if (el.id != "")
	{
		arr = moveBox(arr, size, +el.id, canBeMoved(arr, size, +el.id));
		stepsCount++;
	}
	if (gameIsCompleted(arr, size))
	{
		var endDate = new Date();
		var name = prompt("Your nickname? ", "NickName");

		recreateRocordTable({'nick': name, 'time': ((endDate - nowDate) / 1000).toFixed(1)});
		printRecordTable();
		
		stepsCount = 0;
		newGame();
	}
}

newGameBtn.addEventListener("click", function(){
	stepsCount = 0;
	newGame();
}, false);
