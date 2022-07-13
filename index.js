// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBE7VEObeke3kGzYxIXJCYd-poieuc7-VA",
  authDomain: "web-firebase-ifsp.firebaseapp.com",
  databaseURL: "https://web-firebase-ifsp-default-rtdb.firebaseio.com",
  projectId: "web-firebase-ifsp",
  storageBucket: "web-firebase-ifsp.appspot.com",
  messagingSenderId: "42605587171",
  appId: "1:42605587171:web:22a2b04af0d5ea98f273d6",
  measurementId: "G-548K6XL5N8"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var todosRef = firebase
  .database()
  .ref()
  .child("tarefas");

var todoList = document.getElementById("listaDeTarefas");

todosRef.on("value", function (todos) {
  var temp = "";
  
  todos.forEach(function (todo) {
    todoItem = todo.val();
    if (!todoItem.feita) {
      temp +=
        "<p class='todo'><label class='undone'>" +
        todoItem.nome +
        "</label> <button class='feita' onclick='updateTodo(\"" +
        todo.key +
        '",true,"' +
        todoItem.nome +
        "\")'>feita</button></p><hr/>";
    } else {
      temp +=
        "<p class='todo'><label class='done'>" +
        todoItem.nome +
        "</label> <button class='desfazer' onclick='updateTodo(\"" +
        todo.key +
        '",false,"' +
        todoItem.nome +
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
  newTodo.set({ nome: todoName, feita: false });
}

function updateTodo(key, status, todoName) {
  firebase
    .database()
    .ref("tarefas/" + key)
    .set({ feita: status, nome: todoName });
}

function removeTodo(key) {
  firebase
    .database()
    .ref("tarefas/" + key)
    .remove();
}
