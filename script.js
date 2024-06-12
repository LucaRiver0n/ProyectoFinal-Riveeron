const taskList = document.getElementById('task-list');
const newTaskInput = document.getElementById('new-task');
const addTaskButton = document.getElementById('add-task');

let tasks = [];

// Cargar tareas desde el archivo tasks.json
fetch('tasks.json')
 .then(response => response.json())
 .then(data => {
    tasks = data;
    renderTaskList();
  });

// Agregar tarea nueva
addTaskButton.addEventListener('click', () => {
  const newTask = {
    id: tasks.length + 1,
    title: newTaskInput.value,
    completed: false
  };
  tasks.push(newTask);
  renderTaskList();
  newTaskInput.value = '';
});

// Renderizar la lista de tareas
function renderTaskList() {
  taskList.innerHTML = '';
  tasks.forEach(task => {
    const taskElement = document.createElement('li');
    taskElement.className = 'task';
    taskElement.innerHTML = `
      <input type="checkbox" class="task-checkbox" ${task.completed? 'checked' : ''}>
      <span class="task-title">${task.title}</span>
      <span class="task-delete">&times;</span>
    `;
    taskElement.dataset.id = task.id;
    if (task.completed) {
      taskElement.classList.add('completed');
    }
    taskList.appendChild(taskElement);
  });
}

// Eliminar tarea
taskList.addEventListener('click', event => {
  if (event.target.classList.contains('task-delete')) {
    const taskId = event.target.parentNode.dataset.id;
    tasks = tasks.filter(task => task.id!== parseInt(taskId));
    renderTaskList();
  }
});

// Marcar tarea como completada
taskList.addEventListener('click', event => {
  if (event.target.classList.contains('task-checkbox')) {
    const taskId = event.target.parentNode.dataset.id;
    const task = tasks.find(task => task.id === parseInt(taskId));
    task.completed =!task.completed;
    renderTaskList();
  }
});