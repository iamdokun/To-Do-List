const addFormBtn = document.querySelector('.btn-outline-success');
const newTaskInput = document.querySelector('.input');
const taskList = document.querySelector('.list-group');
const clearTask = document.querySelector('.btn-outline-danger');


loadEvent();

function loadEvent () {
    document.addEventListener('DOMContentLoaded', getTasks)

    addFormBtn.addEventListener('click', addTask);

    taskList.addEventListener('click', removeFunc);

    clearTask.addEventListener('click', clearFunc);
}

function getTasks () {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        let li = document.createElement('li');
    // add class to li
    li.className = 'list-group-item';
    // add li content
    li.appendChild(document.createTextNode(task));

    // create delete button
    let delBtn = document.createElement('button');
    let checkBtn = document.createElement('button');
    let editBtn = document.createElement('button');

    //add class to delBtn
    delBtn.className = 'btn float-right delete'
    checkBtn.className = 'btn float-right check'
    editBtn.className = 'btn float-right edit'

    // add icon to delBtn
    delBtn.innerHTML = '<i class="far fa-window-close"></i>';
    checkBtn.innerHTML = '<i class="far fa-check-square"></i>';
    editBtn.innerHTML = '<i class="far fa-edit"></i>';

    // add delBtn to li
    li.appendChild(delBtn);
    li.appendChild(checkBtn);
    li.appendChild(editBtn)

    // add li to order list
    taskList.appendChild(li);
    });
}

// Add Task Function
function addTask () {

    if (newTaskInput.value === '') {
        alert('Add New Task')
    } else {

        // create li
    let li = document.createElement('li');
    // add class to li
    li.className = 'list-group-item';
    // add li content
    li.appendChild(document.createTextNode(newTaskInput.value));

    // create delete button
    let delBtn = document.createElement('button');
    let checkBtn = document.createElement('button');
    let editBtn = document.createElement('button');

    //add class to delBtn
    delBtn.className = 'btn float-right delete'
    checkBtn.className = 'btn float-right check'
    editBtn.className = 'btn float-right edit'

    // add icon to delBtn
    delBtn.innerHTML = '<i class="far fa-window-close"></i>';
    checkBtn.innerHTML = '<i class="far fa-check-square"></i>';
    editBtn.innerHTML = '<i class="far fa-edit"></i>';

    // add delBtn to li
    li.appendChild(delBtn);
    li.appendChild(checkBtn);
    li.appendChild(editBtn)

    // add li to order list
    taskList.appendChild(li);

    // Store Task in local storage
    storeTask(newTaskInput.value)

    // clear input field
    newTaskInput.value = ''
    }

}

// Local Storage Function
function storeTask (task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
        tasks.push(task);

        localStorage.setItem('tasks', JSON.stringify(tasks))
}

// Remove Task Function
function removeFunc (e) {

    if (e.target.parentElement.classList.contains('delete')) {
        // Remove from the DOM
        e.target.parentElement.parentElement.remove();

        // Remove from LS
        removeFromLS(e.target.parentElement.parentElement)

    } else if (e.target.parentElement.classList.contains('check')) {
       
        e.target.parentElement.parentElement.classList.toggle('line-through');

    } else if (e.target.parentElement.classList.contains('edit')) {
        // Remove from DOM and display at the Input Field
        newTaskInput.value = e.target.parentElement.parentElement.textContent;
        e.target.parentElement.parentElement.remove();

        // Remove From Storage
        removeFromLS(e.target.parentElement.parentElement)

    }
   
}

// Remove from LS
function removeFromLS(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    })

    localStorage.setItem('tasks', JSON.stringify(tasks))
}

// Clear Task Function
function clearFunc () {
    // taskList.innerHTML = '';

    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild)
    }
}
