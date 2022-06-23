// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAgwsjGs6DJe0QWl9raaBnvDZF0PvNGttk",
  authDomain: "python-firebase-ifsp.firebaseapp.com",
  databaseURL: "https://python-firebase-ifsp-default-rtdb.firebaseio.com",
  projectId: "python-firebase-ifsp",
  storageBucket: "python-firebase-ifsp.appspot.com",
  messagingSenderId: "492708358001",
  appId: "1:492708358001:web:e6d9fbdac40884aace78d0",
  measurementId: "G-6CB4RXDTHM",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var todosRef = firebase
  .database()
  .ref()
  .child("todos");

var todoList = document.getElementById("listaDeTarefas");

todosRef.on("value", function (todos) {
  var temp = "";
  
  todos.forEach(function (todo) {
    todoItem = todo.val();
    if (!todoItem.isDone) {
      temp +=
        "<p class='todo'><label class='undone'>" +
        todoItem.todo +
        "</label> <button class='feita' onclick='updateTodo(\"" +
        todo.key +
        '",true,"' +
        todoItem.todo +
        "\")'>feita</button></p><hr/>";
    } else {
      temp +=
        "<p class='todo'><label class='done'>" +
        todoItem.todo +
        "</label> <button class='desfazer' onclick='updateTodo(\"" +
        todo.key +
        '",false,"' +
        todoItem.todo +
        "\")'>desfazer</button><button class='remover' onclick='removeTodo(\"" +
        todo.key +
        "\")'>remover</button></p><hr/>";
    }
  });

  todoList.innerHTML = temp;
});

document
  .getElementById("myTodoListForm")
  .addEventListener("submit", onSubmitForm);

function onSubmitForm(e) {
  e.preventDefault();

  var todo = document
    .getElementById("txtTodo")
    .value;

  todo == "" ? alert("Insira uma tarefa") : saveTodo(todo);

  document.getElementById("myTodoListForm").reset();
}

function saveTodo(todoName) {
  var newTodo = todosRef.push();
  newTodo.set({ todo: todoName, isDone: false });
}

function updateTodo(key, status, todoName) {
  firebase
    .database()
    .ref("todos/" + key)
    .set({ isDone: status, todo: todoName });
}

function removeTodo(key) {
  firebase
    .database()
    .ref("todos/" + key)
    .remove();
}
