const player1 = document.querySelector('#player1');
const player2 = document.querySelector('#player2');
const cells = document.querySelectorAll('.cell');
const white = document.querySelector('.starterw');
const black = document.querySelector('.starterb');
const endb = document.querySelector('#end')
const newb = document.querySelector('#newgame')
const surrender = document.querySelector('#surrender')

white.addEventListener('dragstart', dragStart);
black.addEventListener('dragstart', dragStart);
newb.addEventListener('click', restart)
surrender.addEventListener('click', giveup);
endb.addEventListener('click', next)

cells.forEach(cell => {
  cell.addEventListener('drop', dragDrop);
  cell.addEventListener('dragover', dragOver);
  cell.addEventListener('dragenter', dragEnter);
  cell.addEventListener('dragleave', dragLeave);
});

let dragelement;
let player=player1;
let endcell;

function dragStart(e) {
  dragelement = e.target.cloneNode(true);
  dragelement.classList.remove('starterw')
  dragelement.classList.remove('starterb')
}

function dragDrop(e) {
  e.preventDefault();
  e.target.classList.remove('highlight');
  e.target.appendChild(dragelement);
  console.log(e.target);
  endcell=e.target
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.target.classList.add('highlight');
}

function dragLeave(e) {
  e.target.classList.remove('highlight');
}

function restart(e) {
  cells.forEach(cell => {
    cell.innerHTML = "";
    cell.addEventListener('drop', dragDrop);
    cell.addEventListener('dragenter', dragEnter)
  });
  black.setAttribute('draggable', 'true');
  white.setAttribute('draggable', 'false');
  player1.classList.add('highlightp')
  player2.classList.remove('highlightp')
  dragelement=null
}

function giveup(e){
  if (player.id === 'player1') {
    console.log('p2won!');
  } else {
    console.log('p1won!');
  }
  cells.forEach(cell => {
    cell.innerHTML = "";
    cell.addEventListener('drop', dragDrop);
    cell.addEventListener('dragenter', dragEnter)
  });
  black.setAttribute('draggable', 'true');
  white.setAttribute('draggable', 'false');
  player1.classList.add('highlightp')
  player2.classList.remove('highlightp')
  dragelement=null
}

function next(e) {
  if (!endcell) {
    alert('cannot end turn without placing a piece down')
  }
  else {
    console.log(player.id);
    if (player.id === 'player2') {
      black.setAttribute('draggable', 'true');
      white.setAttribute('draggable', 'false');
      player1.classList.add('highlightp')
      player2.classList.remove('highlightp')
      player = player1;
    } else {
      white.setAttribute('draggable', 'true');
      black.setAttribute('draggable', 'false');
      player2.classList.add('highlightp')
      player1.classList.remove('highlightp')
      player = player2;
    }
    dragelement.setAttribute('draggable', 'false')
    endcell.removeEventListener('drop', dragDrop)
    endcell.removeEventListener('dragenter', dragEnter)
    dragelement=null
  }
}

