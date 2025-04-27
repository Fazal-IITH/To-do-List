
const submitbtn = document.getElementById('submitTask');
const task = document.getElementById('task');
const taskName = document.getElementById('taskName');
const priority = document.getElementById('priority');
const date = document.getElementById('date');
const mainDiv = document.querySelector('.mainDiv');

// Load tasks on page load
loadTasks();

// Create and return a task object
function taskdatatoobject(taskName, task, priority, date) {
    return {
        taskName: taskName,
        task: task,
        priority: priority,
        date: date
    };
}

// Add task to page
function addTask(taskData) {
    const newDiv = document.createElement('div');
    newDiv.className = 'taskList';
    mainDiv.appendChild(newDiv);

    const subDiv1 = document.createElement('div');
    subDiv1.className = 'sub-taskList1';
    newDiv.appendChild(subDiv1);

    const subDiv2 = document.createElement('div');
    subDiv2.className = 'sub-taskList2';
    newDiv.appendChild(subDiv2);

    const list = document.createElement('ul');
    list.id = 'taskData';
    subDiv1.appendChild(list);

    const header3 = document.createElement('h3');
    header3.textContent = taskData.taskName;
    list.appendChild(header3);

    const header4 = document.createElement('h4');
    header4.textContent = taskData.task;
    list.appendChild(header4);

    const header5 = document.createElement('h5');
    header5.textContent = taskData.date;
    list.appendChild(header5);

    const header6 = document.createElement('h5');
    header6.textContent = taskData.priority;
    list.appendChild(header6);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.id = 'deleteBtn';
    subDiv2.appendChild(deleteButton);

    // Delete task from page
    deleteButton.addEventListener('click', function() {
        newDiv.remove();
        removeTask(taskData); 
    });
}

function removeTask(taskToRemove) {
    let tasks = JSON.parse(localStorage.getItem('Task')) || [];

    tasks = tasks.filter(task => {
        return !(
            task.taskName === taskToRemove.taskName &&
            task.task === taskToRemove.task &&
            task.priority === taskToRemove.priority &&
            task.date === taskToRemove.date
        );
    });

    localStorage.setItem('Task', JSON.stringify(tasks));
}

// Save task to localStorage
function saveTask(taskData) {
    let tasks = JSON.parse(localStorage.getItem('Task')) || [];
    tasks.push(taskData);
    localStorage.setItem('Task', JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('Task')) || [];
    tasks.forEach(task => {
        addTask(task);
    });
}

// When submit button clicked
submitbtn.addEventListener('click', function(event) {
    event.preventDefault(); // prevent form submit
    if (task.value && date.value) {
        const taskObj = taskdatatoobject(taskName.value, task.value, priority.value, date.value);
        addTask(taskObj);
        saveTask(taskObj);

        // Clear input fields
        task.value = '';
        taskName.value = '';
        priority.value = '';
        date.value = '';
    } else {
        alert("Please enter the details of task");
    }
});
