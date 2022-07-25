
class Task {
  constructor(name) {
    this.name = name;
    this.id = Math.random();
    this.completed = false;
  }

  complete() {
    this.completed = true;
  }

  undo() {
    this.completed = false;
  }
}

class TodoList {
  constructor() {
    this.tasks = [];
  }

  add(name) {
    const task = new Task(name);
    this.tasks.push(task);
  }

  remove(id) {
    //این یه خط پایین معادل 3 خط بعدی هست
    //this.tasks = this.tasks.filter(t => t.id !== id);
    const index = this.tasks.findIndex(t => t.id === id);
    if (index !== -1) {
      this.tasks.splice(index, 1);
    }
  }
}
function ElementBuilder(name) {
    this.element = document.createElement(name);

    this.text = function (text) {
        this.element.textContent = text;
        return this;
    }
    this.type = function (type) {
        this.element.type = type;
        return this;
    }
    this.appendTo = function (parent) {
        if (parent instanceof ElementBuilder) {
        parent   
        .build()
        .appendChild(this.element);
            }
        else {
            parent
            .appendChild(this.element);
        }
        return this;
    }

    this.placeholder = function (text) {
        this.element.placeholder = text;
        return this;
    }

    this.hide = function () {
        this.element.style.display = 'none';
        return this;
    }

    this.show = function () {
        this.element.style.display = 'block';
        return this;
    }

    this.className = function (className) {
        this.element.className = className;
        return this;
    }

    this.onclick = function (fn){
       this.element.onclick = fn ;
       return this;
    }

    this.html = function(htmlvalue){
        this.element.innerHTML = htmlvalue;
        return this;
    }

    this.value = function(value){
        this.element.value = value;
        return this;
    }


    this.build = function () {
        return this.element;
    }

}

const builder = {
    create: function (name) {
        return new ElementBuilder(name);
    }
}


class TodoListApp{
  constructor(input,addButton, listContainer) {
    this.todoList = new TodoList();
    this.input = input;
    this.addButton = addButton;
    this.list = listContainer;
  }

  init(){
    this.addButton.addEventListener('click', () => {
     const name = this.input.value;
     this.todoList.add(name);
     this.paint();
     this.input.value = ''
    });
  }

  paint(){
    this.list.innerHTML = '';
    this.todoList.tasks.forEach(task =>{
    const li = builder
    .create('li')
    .text(task.name)
    .onclick(()=>{
        if(task.completed){
            task.undo();
        }
        else{

            task.complete();
        }
        this.paint();
    })
    .appendTo(this.list);
    if(task.completed){
        li.className('checked')
    }
    builder
    .create('span')
    .text('x')
    .className('close')
    .onclick(()=>{
        this.todoList.remove(task.id);
        this.paint();
    })
    .appendTo(li);
    });
  }
}
const App = new TodoListApp(
    document.getElementById('myInput'),
    document.getElementById('addBtn'),
    document.getElementById('myUL')
);
App.init();