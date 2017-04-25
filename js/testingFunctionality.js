
var cfg = {
  draggable: true,
  position: 'start',
  onDrop: onDrop,
};

var board = ChessBoard('board', cfg);
var currentPosition = [];
var positionsObj = {};
var testing = false;
var currentTestingIndex = 0;
var currentTestingArr = [];
var selected = document.getElementById('selectPosition');
var startingBoardPosition = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";


$('#currentTestingLabel').hide();
$('#loadTestingPositionForm').hide();
$('#exitTestingBtn').hide();
$('#savePositionForm').hide();
$('#resetBtn').hide();

if ( localStorage.length > 0 ) {
  Object.keys(localStorage).forEach( function(key) {
    $('select').append('<option value="' + key + '">' + key + '</option>');
  });
  
  $('#loadTestingPositionForm').show();
}


function onDrop(source, target, piece, newPos, oldPos, orientation) {
  if (testing) {
     console.log("You played: " + ChessBoard.objToFen(newPos));
     console.log("The correct move is: " + currentTestingArr[currentTestingIndex]);
    if ( ChessBoard.objToFen(newPos) !== currentTestingArr[currentTestingIndex]) {
      alert('That is incorrect.Try again');
      return 'snapback';
    } 
    else if (currentTestingIndex == currentTestingArr.length - 1) {
      alert('Congratulations!');
      exitTestingPosition();
    } else {
      currentTestingIndex++;
    }
  } else {
    var newPosition = ChessBoard.objToFen(newPos);
    currentPosition.push(newPosition);
  }
}

function start() {
  $('#startBtn').hide();
  $('#savePositionForm').show();
  $('#resetBtn').show();
  
  board.position(startingBoardPosition);
}


function savePosition() {
  var positionName = document.getElementById('positionName').value;
  var key = positionName;
  
  document.getElementById('positionName').value = "";
  
  if ( key !== null && key !== "" ) {
    if ( !localStorage.hasOwnProperty(key) ) {
      localStorage.setItem(key, currentPosition);
      
      currentPosition = [];
    
      board.position(startingBoardPosition);
      
      $('#loadTestingPositionForm').show();
      
      $('select').append('<option value="' + key + '">' + key + '</option>');
    } else {
      throw alert("That name already exists.");
    }
  } else {
    throw alert("You must enter a name for your position.");
  }
}

function reset() {
  board.position(startingBoardPosition);
  currentPosition = [];
}

function test() {
  var index = selected.selectedIndex;
  var key = selected[index].value;
  
  board.position(startingBoardPosition);
  
  $('#resetBtn').hide();
  $('#savePositionForm').hide();
  $('#startBtn').hide();
  $('#exitTestingBtn').show();
  
  testing = true;
  
  currentTestingArr = localStorage.getItem(key).split(',');
  
  $('#currentTestingLabel').html('<h3>Opening: ' + key + '</h3>');
  $('#currentTestingLabel').show();
}

function exitTestingPosition() {
  $('#currentTestingLabel').hide();
  
  currentTestingArr = [];
  currentTestingIndex = 0;
  
  testing = false;
}

function exitTestingMode() {
  $('#startBtn').show();
  $('#exitTestingBtn').hide();
  
  currentPosition = [];
  board.position(startingBoardPosition);
  
  exitTestingPosition();
}
