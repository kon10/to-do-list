let $budgetInput;     //uzytkownik wpisuje treśc
let $alertInfo;     //info o braku zadań
let $addBtn;        //przycisk dodaj
let $ulList;        //lista zadań
let $newTask;       //nowy LI
let $popup;         //pobrany popup 
let $popupInfo;
let $editedTodo;
let $popupInput;
let $addPopupBtn;
let $closeTodoBtn;
let $idNumber = 0;
let $allTasks;

const main = () => {
    prepareDOMElements();
    prepareDOMEvents();
};

const prepareDOMElements =() => {
    $budgetInput = document.querySelector('.budgetInput');
    $alertInfo = document.querySelector('.alertInfo');
    $addBtn = document.querySelector('.addBtn');
    $ulList = document.querySelector('.budgetList ul');
    $popup = document.querySelector('.popup');
    $popupInfo = document.querySelector('.popupInfo');
    $popupInput = document.querySelector('.popupInput');
    $addPopupBtn = document.querySelector('.accept');
    $closeTodoBtn = document.querySelector('.cancel');
    $allTasks = document.getElementsByTagName('li');
};

const prepareDOMEvents = () => {
    $addBtn.addEventListener('click', addNewTask);
    $ulList.addEventListener('click', checkClick);
    $closeTodoBtn.addEventListener('click', closePopup);
    $addPopupBtn.addEventListener('click', changeTodo);
};


const addNewTask = () => {
    if($budgetInput.value !== '') {
        $idNumber++;
        $newTask = document.createElement('li');
        $newTask.innerText =$budgetInput.value;
        $newTask.setAttribute('id', `todo-${$idNumber
        }`);
        $ulList.appendChild($newTask);

        $budgetInput.value = ''
        $alertInfo.innerText = ''
        createToolsArea();
    } else {
    $alertInfo.innerText = 'Wpisz dochód';
    } 
};


const createToolsArea = () => {
    const toolsPanel = document.createElement('div');
    toolsPanel.classList.add('tools')
    $newTask.appendChild(toolsPanel);

    const editBTN = document.createElement('button');
    editBTN.classList.add('edit');
    editBTN.innerText = 'EDIT';

    const deleteBTN = document.createElement('button');
    deleteBTN.classList.add('delete');
    deleteBTN.innerHTML = '<i class="fas fa-times"></i>';

    toolsPanel.appendChild(editBTN);
    toolsPanel.appendChild(deleteBTN);
    
};

//łapanie buttonów
const checkClick = (e) => {  

    if (e.target.closest('button').className === 'edit'){
        editTask(e);
    }else if (e.target.closest('button').className === 'delete'){
        deleteTask(e);
    }
};

const editTask = (e) => {
    const oldTodo = e.target.closest('li').id;
    $editedTodo = document.getElementById(oldTodo);
    $popupInput.value = $editedTodo.firstChild.textContent;
    
    $popup.style.display = 'flex';
    };
const changeTodo = () => {
    if ($popupInput.value !== ''){
        $editedTodo.firstChild.textContent =$popupInput.value;
        $popup.style.display = 'none'
        $popupInfo.innerText = '';
    } else {
        $popupInfo.innerText = "Musisz podać treść!"
    };
};
// Zamkniecie popup
 const closePopup = () => {
    $popup.style.display = 'none'
    $popupInfo.innerText = ''
};
// Usuwanie 
 const deleteTask = (e) => {
    const deleteTodo = e.target.closest('li');
    deleteTodo.remove();

    if ($allTasks.length ===0) {
        $allTasks.innerText = 'Brak dochodów na liscie.'
    };
 };

document.addEventListener('DOMContentLoaded', main);








var incomingsList = document.querySelector('#incomingsList')
var addIncoming = document.querySelector('#addIncoming')
var state = {
  nextId: 3, //NOTE: must match the length of state.incomings array
  incomings: [
    {id: 1, name: "Zlecenie", amount: 2050, isEditable: false}, //item
    {id: 2, name: "Webinar", amount: 3000, isEditable: false}, //item
  ],
  outgoings: []
}

renderApp()

function renderApp() {
  renderUI()
  renderSumUI()
}

function renderUI() {
  // reset currently rendered incomings 
  incomingsList.innerHTML = ""
  
  // create new incomings
  state.incomings.forEach(item => {
    var liInnerHTML = null; 
    
    if (item.isEditable) {
      liInnerHTML = `
        <div class="item">
          <span data-id="${item.id}" contenteditable>${item.name}</span> - <span data-id="${item.id}" contenteditable>${item.amount}</span>zl   
        </div>
        <button class="confirmEditIncoming" data-id="${item.id}">Tak</button> 
        <button class="cancelEditIncoming" data-id="${item.id}">Nie</button>
      `
    } else {
      liInnerHTML = `
        ${item.name} - ${item.amount}zl 
        <button class="editIncoming" data-id="${item.id}">Edytuj</button> 
        <button class="removeIncoming" data-id="${item.id}">Usun</button>
      `
    }
    let newLi = document.createElement("li")
    newLi.dataset.name = item.name
    newLi.innerHTML = liInnerHTML
    incomingsList.append(newLi)   
  })
  
  // add event listener for each edit "Edytuj" button
  let editIncomings = document.querySelectorAll('.editIncoming')
  editIncomings.forEach(i => { 
    i.addEventListener('click', makeItemEditable)
  })
  
  // add event listener for each edit "Tak" button
  let confirmEditIncomings = document.querySelectorAll('.confirmEditIncoming')
  confirmEditIncomings.forEach(i => { 
    i.addEventListener('click', confirmEditItem)
  })
  
  // add event listener for each edit "Nie" button
  let cancelEditIncomings = document.querySelectorAll('.cancelEditIncoming')
  cancelEditIncomings.forEach(i => { 
    i.addEventListener('click', cancelEditItem)
  })
  
  // add event listener for each remove button
  let removeIncomings = document.querySelectorAll('.removeIncoming') 
  removeIncomings.forEach(i => { 
    i.addEventListener('click', removeItem)
  })
}

function renderSumUI() {
  var incomingsSum = document.querySelector('#incomingsSum')
  incomingsSum.innerHTML = `suma przychodow: ${sum(state.incomings)}zl`
  // TODO: outgoingsSum update
}

function sum(arr) {
  return arr.reduce((acc, item) => acc + item.amount, 0)
}


// ADD NEW ITEM
addIncoming.addEventListener('click', addNewItem)

function addNewItem(e) {
  e.preventDefault()
  
  var newName = document.querySelector('#newName')
  var newAmount = document.querySelector('#newAmount')
  var newItem = {
    id: state.nextId, 
    name: newName.value, 
    amount: Number(newAmount.value)
  }
  state.incomings.push(newItem) //update of data (danych)
  
  renderApp()
  resetNewForm(newName, newAmount)
  state.nextId = state.nextId + 1
}

// MAKE AN ITEM EDITABLE
function makeItemEditable(e) {
  var id = Number(e.target.dataset.id) //number
  state.incomings = state.incomings.map(i => i.id === id ? {...i, isEditable: true} : i)
  
  renderApp()
}

// EDIT AN ITEM
function confirmEditItem(e) {
  var id = Number(e.target.dataset.id)
  var spans = document.querySelectorAll(`div.item span[data-id="${id}"]`) //array of <span>
  var newName = spans[0].innerText  //string
  var newAmount = Number(spans[1].innerText)  //number
  state.incomings = state.incomings.map(i => i.id === id ? {...i, name: newName, amount: newAmount, isEditable: false} : i)  //new array (replaces old incomings array)
  
  renderApp()
}

function cancelEditItem(e) {
  var id = Number(e.target.dataset.id)
    state.incomings = state.incomings.map(i => i.id === id ? {...i, isEditable: false} : i)
  
  renderApp()
}

// REMOVE AN ITEM
function removeItem(e) {
  e.preventDefault()
  
  const idToRemove = Number(e.target.dataset.id);
  // console.log(e.target.dataset.id)
  state.incomings = state.incomings.filter(i => i.id !== idToRemove)
  
  renderApp()
}


function resetNewForm(name, amount) {
  name.value = ""
  amount.value = ""
}