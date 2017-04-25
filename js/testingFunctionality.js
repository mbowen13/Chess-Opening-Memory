
var cfg = {
  draggable: true,
  position: 'start',
  onDrop: onDrop,
};

var board = ChessBoard('board', cfg);
var currentPosition = [];
var testing = false;
var currentTestingIndex = 0;
var currentTestingArr = [];
var selected = document.getElementById('selectPosition');
var startingBoardPosition = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR";


initializeBtns();

if ( localStorage.length > 0 ) {
  listSavedOpenings();
}


function initializeBtns() {
  $('#currentTestingLabel').hide();
  $('#saveForm').hide();
  $('#positionForm').hide();
  $('#exitTestingBtn').hide();
  $('#resetBtn').hide();
  $('#startBtn').show();
  $('#deleteOpeningBtn').show();
  $('#testOpeningBtn').show();
  $('#testBtn').hide();
  $('#deleteBtn').hide();
}

function listSavedOpenings() {
  $('select').html('');
  
  Object.keys(localStorage).forEach( function(key) {
    $('select').append('<option value="' + key + '">' + key + '</option>');
  });
}

function onDrop(source, target, piece, newPos, oldPos, orientation) {
  if (testing) {
     // console.log("You played: " + ChessBoard.objToFen(newPos));
     // console.log("The correct move is: " + currentTestingArr[currentTestingIndex]);
    if ( ChessBoard.objToFen(newPos) !== currentTestingArr[currentTestingIndex]) {
      // alert('That is incorrect.Try again');
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
  $('#currentTestingLabel').hide();
  $('#saveForm').show();
  $('#positionForm').hide();
  $('#exitTestingBtn').hide();
  $('#resetBtn').show();
  $('#startBtn').hide();
  $('#deleteOpeningBtn').show();
  $('#testOpeningBtn').show();
  $('#testBtn').hide();
  $('#deleteBtn').hide();
  
  board.position(startingBoardPosition);
  
  currentPosition = [];
  
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

function deleteOpeningBtnOnClick() {
  $('#currentTestingLabel').hide();
  $('#saveForm').hide();
  $('#positionForm').show();
  $('#exitTestingBtn').hide();
  $('#resetBtn').hide();
  $('#startBtn').show();
  $('#deleteOpeningBtn').hide();
  $('#testOpeningBtn').show();
  $('#testBtn').hide();
  $('#deleteBtn').show();
}

function deleteOpening() {
  let index = selected.selectedIndex;
  let key = selected[index].value;
  
  localStorage.removeItem(key);
  
  listSavedOpenings();
}

function testOpeningBtnOnClick() {
  $('#currentTestingLabel').hide();
  $('#saveForm').hide();
  $('#positionForm').show();
  $('#exitTestingBtn').hide();
  $('#resetBtn').hide();
  $('#startBtn').show();
  $('#deleteOpeningBtn').show();
  $('#testOpeningBtn').hide();
  $('#testBtn').show();
  $('#deleteBtn').hide();
}

function test() {
  var index = selected.selectedIndex;
  var key = selected[index].value;
  
  board.position(startingBoardPosition);
  
  $('#currentTestingLabel').hide();
  $('#saveForm').hide();
  $('#positionForm').show();
  $('#exitTestingBtn').show();
  $('#resetBtn').hide();
  $('#startBtn').hide();
  $('#deleteOpeningBtn').hide();
  $('#testOpeningBtn').hide();
  $('#testBtn').show();
  $('#deleteBtn').hide();
  
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
  initializeBtns();
  
  currentPosition = [];
  board.position(startingBoardPosition);
  
  exitTestingPosition();
}
