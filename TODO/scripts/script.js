// TODO: Rename the file to something actually useful
/**
 * IIFE --> Immediately Invoked Function Expression
 * Function that is executed as soon at it is defined.
 * Avoid the anti pattern that is 'global scope'
 */
(function() {
    // Forcing the browser to evaluate JS in a stricter way
    // by converting code mistakes to syntax error among other things
    'use strict'

    // Create a data structure representing our tasks
    var tasks = [];

    // Query the DOM for ul elements and assign the result to a variable.
    var ul = document.querySelector('ul');

    // Get the form element
    var form_el = document.getElementById('task');

    // Get the input text box
    var input_text_box = document.getElementById('input_text')

    /**
     * Get stored tasks from the browsers local storage
     */
    function getStoredTasks(){
        var locStorage = localStorage.getItem('nerdschool-todo-tasks')
        return JSON.parse(locStorage);
    }

    /**
     * Function that runs when the page loads
     */
    window.onload = function() {
        var storedData = getStoredTasks();
        console.log(storedData);
        for(var i = 0; i < storedData.length; i++){
            tasks.push(storedData[i]);
        }
        renderTasks();
    }

    /**
     * Store all tasks from array 'tasks' to browser local storage
     */
    function storeAllTasks(){
        var arr_len = tasks.length;
        if(arr_len = 0){
            return;
        } else {
            var stringify = JSON.stringify(tasks);
            localStorage.setItem('nerdschool-todo-tasks', stringify);
        }
    }

    /**
     * Adds all tasks in array 'tasks' to the page's local 'ul' element
     */
    function renderTasks(){
        // Remove all 'li' elements from 'ul'
        while(ul.firstChild) {
            ul.removeChild(ul.firstChild);
        }
        for(var i = 0; i < tasks.length; i++){
            ul.appendChild(createTaskElement(tasks[i].name));
        }
        storeAllTasks();
    }

    /**
     * Add tasks to array 'tasks'
     * @param {*} description 
     */
    function addTasks(description){
        var newTask = {
            name: description
        };
        tasks.push(newTask);
    }

    /**
     * Create list element based on form input 
     * I.e. the text written in the input box
     * @param {*} description 
     */
    function createTaskElement(description){
        // Create a new list element
        var listItem = document.createElement('li');
        // Create a input element of type checkbox
        var checkbox = document.createElement('input');
        checkbox.type='checkbox';
        // Create a new label element (text for checkbox)
        var label = document.createElement('label');
        // The label must have a child node with text = description
        var label_description = document.createTextNode(description);
        label.appendChild(label_description);

        listItem.appendChild(checkbox);
        listItem.appendChild(label);

        return listItem;
    }

    /**
     * Handling of the submitted form
     * @param {*} event 
     */
    function submitFormHandler(event){
        // Extracting the value of the submitted text-field
        var input_text = event.target.querySelector('input').value;
        input_text.value = '';
        addTasks(input_text);
        var listItem = createTaskElement(input_text)
        ul.appendChild(listItem);
        renderTasks();
        event.preventDefault();
    }

    // Register submitFormHandler as an event listenre on the form element
    // listening for 'submit' events
    form_el.addEventListener('submit', submitFormHandler);

})();