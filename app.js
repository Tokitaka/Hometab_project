const title = document.querySelector('#title h1');
const today = new Date();
const daysOfWeek = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const clock = document.querySelector('#clock span');
const toggle = document.querySelector('#toggle');
const todos = document.querySelector('#todos');
const todoInput = todos.querySelector('input');
const searchForm = document.querySelector('#search');
const searchInput = searchForm.querySelector('input');
const deleteAllIcon = document.querySelector('#deleteAllIcon');

let todoList = [];

function getClock() {
  const dateObj = new Date();

  clock.innerText = `${String(dateObj.getHours()).padStart(2, 0)}:${String(
    dateObj.getMinutes()
  ).padStart(2, 0)}:${String(dateObj.getSeconds()).padStart(2, 0)}`;
}

function onCheckedToggle() {
  if (toggle.checked) {
    document.body.style.backgroundImage = "url('assets/winter.jpg')";
    document.body.style.backgroundSize = 'cover';
  } else {
    document.body.style.backgroundImage = 'none';
  }
}

function printTodos(todoObj) {
  const { id, inputValue } = todoObj;
  const div = document.createElement('div');
  div.classList.add(
    'todo-list',
    'bg-yellow-50',
    'mt-2',
    'p-2',
    'w-full',
    'rounded',
    'flex',
    'justify-between'
  );
  div.innerHTML = `
    <span class='truncate'>${inputValue}</span>
    <span id="todo-btn-${id}" class="material-symbols-outlined cursor-pointer font-bold">remove</span>
  `;
  todos.append(div);

  const btn = div.querySelector(`#todo-btn-${id}`);
  btn.addEventListener('click', () => deleteTodos(id));

  checkIfReachBottom();
}

function checkIfReachBottom() {
  const div = todos.lastElementChild;
  const divRect = div.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  if (divRect.bottom >= windowHeight) {
    div.remove();
    alert('No more todos!');
  }
}

function onSubmitTodos(event) {
  event.preventDefault();
  const inputValue = todoInput.value;
  const newValue = {
    id: Math.floor(Math.random() * 10000),
    inputValue,
  };
  todoList.push(newValue);
  printTodos(newValue);
  localStorage.setItem('todos', JSON.stringify(todoList));
  todoInput.value = '';
}

function deleteTodos(id) {
  const btn = document.querySelector(`#todo-btn-${id}`);
  btn.parentElement.remove();

  todoList = todoList.filter((todo) => {
    return todo.id !== id;
  });
  localStorage.setItem('todos', JSON.stringify(todoList));
}

function handleSearch(event) {
  event.preventDefault();
  let searchValue = searchInput.value;

  window.open(
    `https://www.google.com/search?q=${encodeURIComponent(searchValue)}`
  );
  searchInput.value = '';
}

function deleteAll() {
  const todoListDivs = document.querySelectorAll('.todo-list');
  todoListDivs.forEach((todoDiv) => todoDiv.remove());
  todoList = [];
  localStorage.removeItem('todos');
}

title.innerText = `Welcome!
Today is ${daysOfWeek[today.getDay()]}, ${
  months[today.getMonth()]
} ${today.getDate()}`;

setInterval(getClock, 1000);

toggle.addEventListener('change', onCheckedToggle);

todos.addEventListener('submit', onSubmitTodos);
if (localStorage.getItem('todos') !== null) {
  todoList = JSON.parse(localStorage.getItem('todos'));
  todoList.forEach((todo) => printTodos(todo));
}

searchForm.addEventListener('submit', handleSearch);
deleteAllIcon.addEventListener('click', deleteAll);
