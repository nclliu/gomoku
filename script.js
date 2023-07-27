const player1 = document.querySelector('#player1');
const player2 = document.querySelector('#player2');
const cells = document.querySelectorAll('.cell');
const white = document.querySelector('#white');
const black = document.querySelector('#black');

white.addEventListener('dragstart', dragStart);
black.addEventListener('dragstart', dragStart);

cells.forEach(cell => {
  cell.addEventListener('drop', dragDrop);
  cell.addEventListener('dragover', dragOver);
  cell.addEventListener('dragenter', dragEnter); // Changed 'dragHover' to 'dragEnter'
  cell.addEventListener('dragleave', dragLeave); // Changed 'leaveDrag' to 'dragLeave'
});

let dragelement;

function dragStart(e) {
  dragelement = e.target;
}

function dragDrop(e) {
  e.preventDefault();
  e.target.classList.remove('highlight')
  e.target.appendChild(dragelement.cloneNode(true))
  console.log(e.target)
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) { // Changed the function name to 'dragEnter'
  e.target.classList.add('highlight');
}

function dragLeave(e) { // Changed the function name to 'dragLeave'
  e.target.classList.remove('highlight');
}
