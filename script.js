document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const todoInput = document.getElementById('todo-input');
  const todoList = document.getElementById('todo-list');
  const itemsLeft = document.getElementById('items-left');
  const filters = document.querySelectorAll('.filter');
  const clearCompleted = document.getElementById('clear-completed');
  
  // State
  let todos = JSON.parse(localStorage.getItem('todos')) || [];
  let currentFilter = 'all';
  
  // Check if dark theme was previously set
  if (localStorage.getItem('darkTheme') === 'true') {
    document.body.classList.add('dark-theme');
    themeIcon.src = './images/icon-sun.svg';
  }
  
  // Theme toggle
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const isDarkTheme = document.body.classList.contains('dark-theme');
    themeIcon.src = isDarkTheme ? './images/icon-sun.svg' : './images/icon-moon.svg';
    localStorage.setItem('darkTheme', isDarkTheme);
  });
  
  // Add new todo
  todoInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && todoInput.value.trim()) {
      const newTodo = {
        id: Date.now(),
        text: todoInput.value.trim(),
        completed: false
      };
      
      todos.push(newTodo);
      saveTodos();
      renderTodos();
      todoInput.value = '';
    }
  });
  
  // Filter todos
  filters.forEach(filter => {
    filter.addEventListener('click', () => {
      filters.forEach(f => f.classList.remove('active'));
      filter.classList.add('active');
      currentFilter = filter.dataset.filter;
      renderTodos();
    });
  });
  
  // Clear completed todos
  clearCompleted.addEventListener('click', () => {
    todos = todos.filter(todo => !todo.completed);
    saveTodos();
    renderTodos();
  });
  
  // Toggle todo completion
  function toggleTodo(id) {
    todos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    saveTodos();
    renderTodos();
  }
  
  // Delete todo
  function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveTodos();
    renderTodos();
  }
  
  // Save todos to localStorage
  function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
  }
  
  // Render todos based on current filter
  function renderTodos() {
    todoList.innerHTML = '';
    
    let filteredTodos = todos;
    if (currentFilter === 'active') {
      filteredTodos = todos.filter(todo => !todo.completed);
    } else if (currentFilter === 'completed') {
      filteredTodos = todos.filter(todo => todo.completed);
    }
    
    filteredTodos.forEach(todo => {
      const todoItem = document.createElement('li');
      todoItem.classList.add('todo-item');
      if (todo.completed) {
        todoItem.classList.add('completed');
      }
      
      todoItem.innerHTML = `
        <div class="checkbox ${todo.completed ? 'checked' : ''}" data-id="${todo.id}"></div>
        <span class="todo-text">${todo.text}</span>
        <button class="delete-btn" data-id="${todo.id}">
          <img src="./images/icon-cross.svg" alt="Delete">
        </button>
      `;
      
      todoList.appendChild(todoItem);
    });
    
    // Update items left count
    const activeCount = todos.filter(todo => !todo.completed).length;
    itemsLeft.textContent = `${activeCount} item${activeCount !== 1 ? 's' : ''} left`;
    
    // Add event listeners to checkboxes and delete buttons
    document.querySelectorAll('.checkbox').forEach(checkbox => {
      checkbox.addEventListener('click', () => {
        toggleTodo(parseInt(checkbox.dataset.id));
      });
    });
    
    document.querySelectorAll('.delete-btn').forEach(button => {
      button.addEventListener('click', () => {
        deleteTodo(parseInt(button.dataset.id));
      });
    });
    
    // Initialize drag and drop
    initDragAndDrop();
  }
  
  // Drag and drop functionality
  function initDragAndDrop() {
    const todoItems = document.querySelectorAll('.todo-item');
    
    todoItems.forEach(item => {
      item.setAttribute('draggable', true);
      
      item.addEventListener('dragstart', () => {
        item.classList.add('dragging');
      });
      
      item.addEventListener('dragend', () => {
        item.classList.remove('dragging');
        
        // Update todos array based on new order
        const newOrder = Array.from(todoList.querySelectorAll('.todo-item')).map(item => {
          const id = parseInt(item.querySelector('.checkbox').dataset.id);
          return todos.find(todo => todo.id === id);
        });
        
        todos = newOrder;
        saveTodos();
      });
    });
    
    todoList.addEventListener('dragover', e => {
      e.preventDefault();
      const draggingItem = document.querySelector('.dragging');
      const siblings = Array.from(todoList.querySelectorAll('.todo-item:not(.dragging)'));
      
      const nextSibling = siblings.find(sibling => {
        const box = sibling.getBoundingClientRect();
        return e.clientY <= box.top + box.height / 2;
      });
      
      todoList.insertBefore(draggingItem, nextSibling);
    });
  }
  
  // Initial render
  renderTodos();
});