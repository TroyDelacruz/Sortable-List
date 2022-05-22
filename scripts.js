// Select global variables for list
const draggable_list = document.getElementById('draggable-list');
const check = document.getElementById('check');


// Array for the sortable list
const bestJrpgs = [
    'Tales of Symphonia',
    'Elden Ring',
    'Legend of Heroes: Trails of Cold Steel',
    'Kirby and the Forgotten Land',
    'Legend of Zelda: Breath of the Wild',
    'Dark Souls II',
    'Tales of Arise',
    'Fire Emblem: Radiant Dawn',
    'Fire Emblem: Awakening',
    'Final Fantasy XIV',
];

// Store the list items

const listItems = [];

let dragStartIndex;

createList();

// Insert list items into DOM
function createList() {
    [...bestJrpgs]
      .map (a => ({ value: a, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(a => a.value)
      .forEach((person, index) => {
          const listItem = document.createElement('li');

          listItem.setAttribute('data-index', index);

          listItem.innerHTML = `
          <span class="number">${index + 1} </span>
          <div class="draggable" draggable="true">
            <p class="person-name">${person}</p>
            <i class="fas fa-grip-lines">
          </div>
          `;

          listItems.push(listItem);

          draggable_list.appendChild(listItem);
      });

      addEventListeners();
}

function dragStart() {
    dragStartIndex = +this.closest('li').getAttribute('data-index');
}

function dragEnter() {
    this.lassList.add('over');
}

function dragLeave() {
    this.classList.remove('over');
}

function dragOver(e) {
    e.preventDefault();
}


function dragDrop() {
    const dragEndIndex = +this.getAttribute('data-index');
    swapItems(dragStartIndex, dragEndIndex);

    this.classList.remove('over');
}

function swapItems(fromIndex, toIndex) {
    const itemOne = listItems[fromIndex].querySelector('.draggable');
    const itemTwo = listItems[toIndex].querySelector('.draggable');

    listItems[fromIndex].appendChild(itemTwo);
    listItems[toIndex].appendChild(itemOne);
}


function addEventListeners() {
    const draggables = document.querySelectorAll('.draggable');
    const dragListItems = document.querySelectorAll('.draggable-list li');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart);

    })


    dragListItems.forEach(item => {
        item.addEventListener('dragover', dragOver)
        item.addEventListener('drop', dragDrop)
        item.addEventListener('dragenter', dragEnter)
        item.addEventListener('dragleave', dragLeave)
    })
}