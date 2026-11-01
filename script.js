const createItemBtn = document.getElementById('create-item-btn');
const todoListContainer = document.getElementById('todo-list-container');
const listOfTodo = document.getElementById('list-of-todo');
const formContainer = document.getElementById('form-container');
const closeFormBtn = document.getElementById('close-form-btn');
const closeFormDialog = document.getElementById('close-form-dialog');
const cancelDialog = document.getElementById('cancel-dialog');
const discardItem = document.getElementById('discard-item');
const titleInput = document.getElementById('title-input');
const dateInput = document.getElementById('date-input');
const timeInput = document.getElementById('time-input');
const textareaInput = document.getElementById('textarea-input');
const form = document.getElementById('form');

let editingIndex = null;
let currentList = {};
let itemList = [];


listOfTodo.addEventListener('click', (e) => {

    if (e.target.closest('.more')) {
        const listBtnsEl = e.target.closest('.list').querySelector('.list-btns');
        listBtnsEl.classList.toggle('hidden');
    }

    if (e.target.closest('.delete-list')) {
        const index = e.target.closest('.list').dataset.index;
        itemList.splice(index, 1);

        localStorage.setItem('list', JSON.stringify(itemList));

        e.target.closest('.list').remove();
        console.log('array length:', itemList.length);  
        console.log('array:', itemList);
    }

    if (e.target.closest('.edit-list')) {
        todoListContainer.classList.toggle('hidden');
        formContainer.classList.toggle('hidden');

        let index = e.target.closest('.list').dataset.index;
        let editedObj = itemList[index];
        titleInput.value = editedObj.title;
        dateInput.value = editedObj.date;
        timeInput.value = editedObj.time;
        textareaInput.value = editedObj.description;
        editingIndex = index;
    }

})


createItemBtn.addEventListener('click', () => {
    todoListContainer.classList.toggle('hidden');
    formContainer.classList.toggle('hidden');
})


function clearInputs() {
    titleInput.value = '';
    dateInput.value = '';
    timeInput.value = '';
    textareaInput.value = '';
}

closeFormBtn.addEventListener('click', () => {
    if (titleInput.value.trim() || dateInput.value || timeInput.value || textareaInput.value.trim()) {
        closeFormDialog.show();
    } else {
        todoListContainer.classList.toggle('hidden');
        formContainer.classList.toggle('hidden');
        closeFormDialog.close();
        clearInputs();
    }
})

cancelDialog.addEventListener('click', () => {
    closeFormDialog.close();
})

discardItem.addEventListener('click', () => {
    todoListContainer.classList.toggle('hidden');
    formContainer.classList.toggle('hidden');
    closeFormDialog.close();
    clearInputs();
})


function addItemToCurrent() {
    currentList = {
        title: titleInput.value,
        date: dateInput.value,
        time: timeInput.value,
        description: textareaInput.value
    }
}

function displayList() {
    listOfTodo.innerHTML = itemList.map((item, index) => `
        <div class="list" data-index="${index}">
            <h2>${item.title} <button type="button" class="more">. . .</button></h2>
            <div class="list-btns hidden">
                <button class="edit-list">Edit</button>
                <button class="delete-list">Delete</button>
            </div>
            <p><strong>Date: </strong>${item.date}</p>
            <p><strong>Time: </strong>${item.time}</p>
            <p><strong>Description: </strong>${item.description}</p>
        </div>
    `).join('');

    closeFormDialog.close();
    clearInputs();
}


form.addEventListener('submit', (e) => {
    e.preventDefault();

    addItemToCurrent();

    if (editingIndex !== null) {
        itemList[editingIndex] = currentList;
        editingIndex = null;
    } else {
        itemList.unshift(currentList);
    }

    localStorage.setItem('list', JSON.stringify(itemList));

    todoListContainer.classList.toggle('hidden');
    formContainer.classList.toggle('hidden');

    displayList();
})


itemList = JSON.parse(localStorage.getItem('list')) || [];

if (itemList.length > 0) {
    displayList();
}