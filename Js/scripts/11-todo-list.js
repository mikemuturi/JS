// initializing empty array to store todo list
const todoList = [];

//initializing/declare variable of  item being edited. array index start from 0
let editIndex =  0;

function renderTodoList() {
  // Initialize an empty string to build the HTML content for the todo list.
  let todoListHTML = '';

  // Loop through each item in the todoList array. to get the current todo item.
  for (let i = 0; i < todoList.length; i++) {
    const todo = todoList[i];
    const { name, dueDate } = todo; 

    // Creating a string of HTML for the current todo item.
    const html = `
      <div>${name}</div>
      <div>${dueDate}</div>
      <div class="action-buttons">
        <button class="edit" onclick="
          loadTodoForEdit(${i});
        ">Edit</button>
        <button onclick="
          todoList.splice(${i}, 1); // Remove the current item from the todo list.
          renderTodoList(); // Re-render the todo list.
        " class="delete-todo-button">Delete</button>
      </div>
    `;
   
    todoListHTML += html;// adding the todo item to the list/array
  }
  // confirming todo list created on console 
  console.log(todoListHTML);

//  Moving the todo list from console to todolist
  document.querySelector('.js-todo-list').innerHTML = todoListHTML;
}

function addOrUpdateTodo() {
  // this get the user input values using class name
  const inputElement = document.querySelector('.js-name-input');
  const name = inputElement.value;

  const dateInputElement = document.querySelector('.js-due-date-input');
  const dueDate = dateInputElement.value;
// get the item to edit ,update push to the Array
//reset index of edited item
  if (editIndex >= 0) {
  
    console.log(editIndex);
    todoList[editIndex] = { 
      name: name,
      dueDate: dueDate
    };
    editIndex = -1;
  } else {
    todoList.push({
      name: name,
      dueDate: dueDate
    });
  }

 

//  Reseting input fields.
  inputElement.value = '';
  dateInputElement.value = '';

  // refresh the list to add new todo
  renderTodoList();

  // Reset the button text to 'Add'.
  
document.querySelector('.add-todo-button').innerText = 'Add';

}


// this function get the item to be edited 
function loadTodoForEdit(index) {
  const todo = todoList[index];
  const { name, dueDate } = todo;

// /Here We populate the selected to to the input field
  const inputElement = document.querySelector('.js-name-input');
  const dateInputElement = document.querySelector('.js-due-date-input');

  inputElement.value = name;
  dateInputElement.value = dueDate;

  // assigning editIndex to the todo being edited
  editIndex = index;
 
  // reusing the add button to save when a todo item is populated for editing
  document.querySelector('.add-todo-button').innerText = 'Save';
  
}

// finally I load the list
renderTodoList();
