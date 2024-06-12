// Estructura de datos: Array de objetos que representan las tareas
let tasks = [];

// Función para agregar una tarea
function addTask(task) {
    tasks.push({ text: task, completed: false });
    renderTaskList();
    animateTaskAdd();
}

// Función para eliminar una tarea
function deleteTask(index) {
    tasks.splice(index, 1);
    renderTaskList();
}

// Función para marcar una tarea como completada
function toggleCompleted(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTaskList();
}

// Función para renderizar la lista de tareas
function renderTaskList() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const taskElement = document.createElement('li');
        taskElement.innerHTML = `
            <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
            <span class="task-text">${task.text}</span>
            <button class="task-delete">Eliminar</button>
        `;

        taskElement.querySelector('.task-checkbox').addEventListener('click', () => {
            toggleCompleted(index);
        });

        taskElement.querySelector('.task-delete').addEventListener('click', () => {
            deleteTask(index);
        });

        taskList.appendChild(taskElement);
    });
}

// Función para agregar animación al agregar una tarea
function animateTaskAdd() {
    const taskList = document.getElementById('task-list');
    const lastTask = taskList.lastChild;
    lastTask.classList.add('animate-add');

    setTimeout(() => {
        lastTask.classList.remove('animate-add');
    }, 500);
}

// Función para cargar datos estáticos o consumir una API
async function loadTasks() {
    try {
        const response = await fetch('https://example.com/api/tasks');
        const data = await response.json();
        tasks = data;
        renderTaskList();
    } catch (error) {
        console.error(error);
    }
}

// Eventos
document.getElementById('add-task').addEventListener('click', () => {
    const newTask = document.getElementById('new-task').value.trim();
    if (newTask) {
        addTask(newTask);
        document.getElementById('new-task').value = '';
    }
});

loadTasks();