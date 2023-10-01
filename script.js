const player1 = document.querySelector('#player1');
const player2 = document.querySelector('#player2');
const cells = document.querySelectorAll('.cell');
const white = document.querySelector('.starterw');
const black = document.querySelector('.starterb');
const endb = document.querySelector('#end')
const newb = document.querySelector('#newgame')
const surrender = document.querySelector('#surrender')
const join = document.querySelector('#join')
const loader = document.querySelector('#loader')

let user;
let dragelement;
let player = "black";
let endcell;
let opponent;
let value;

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

const socket = io();

join.addEventListener("click", function(){
  user = document.getElementById("name").value
  if(user==null || user=='') {
    alert("please enter a name!")
  }
  else {
    loader.classList.remove('hidden')
    console.log('sent')
    socket.emit("join", {name: user})
  }
  join.removeEventListener("click", arguments.callee)
})

socket.on("join", (e) => {
  player1.classList.remove('hidden')
  player2.classList.remove('hidden')
  white.classList.remove('hidden')
  black.classList.remove('hidden')
  endb.classList.remove('hidden')
  newb.classList.remove('hidden')
  surrender.classList.remove('hidden')
  cells.forEach(cell => {
    cell.classList.remove('hidden')
  })
  loader.classList.add('hidden')
  join.classList.add('hidden')
  let players = e.players
  const foundObj = players.find(obj=> obj.player1.p1=='${user}'|| obj.player2.p2 == '${user}')
  foundObj.player1.p1 == '${user}' ? opponent = foundObj.player2.p2 : opponent = foundObj.player1.p1
  foundObj.player1.p1 == '${user}' ? value = foundObj.player2.p2color : value = foundObj.player1.p1color 
})

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
  if (player.id === 'white') {
    white.setAttribute('draggable', 'false');
  } else {
    black.setAttribute('draggable', 'false');
  }
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
  endcell=null
}

function giveup(e){
  if (player.id === 'black') {
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
  endcell=null
}

function next(e) {
  if (player === 'white') {
    black.setAttribute('draggable', 'true');
    player1.classList.add('highlightp')
    player2.classList.remove('highlightp')
    player = "black";
  } else {
    white.setAttribute('draggable', 'true');
    player2.classList.add('highlightp')
    player1.classList.remove('highlightp')
    player = "white";
  }
  if (!endcell) {
    alert('cannot end turn without placing a piece down')
  }
  else {
    socket.emit("next", {end: endcell.id, elem: dragelement.id, name:user})
    dragelement.setAttribute('draggable', 'false')
    endcell.removeEventListener('drop', dragDrop)
    endcell.removeEventListener('dragenter', dragEnter)
    dragelement=null
    endcell=null
  }
  console.log("emitted")
}

socket.on("next", ({end, elem, name}) => {
  console.log(end)
  endcell = document.getElementById(end)
  dragelement = document.getElementById(elem).cloneNode(true)
  endcell.appendChild(dragelement)
  if (player === 'white') {
    black.setAttribute('draggable', 'true');
    player1.classList.add('highlightp')
    player2.classList.remove('highlightp')
    player = "black";
  } else {
    white.setAttribute('draggable', 'true');
    player2.classList.add('highlightp')
    player1.classList.remove('highlightp')
    player = "white";
  }
  dragelement.setAttribute('draggable', 'false')
  endcell.removeEventListener('drop', dragDrop)
  endcell.removeEventListener('dragenter', dragEnter)
  dragelement=null
  endcell=null
  console.log("nextturn")
})

