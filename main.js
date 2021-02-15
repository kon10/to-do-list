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