var todos = [
  // todos
  {id: 1, name: "Get the thing working", detail: "Nibh invenire convenire et cum", tag: "stuff"},
  {id: 2, name: "Get out", detail: "Nibh invenire convenire et cum", tag: "stuff"},
  {id: 3, name: "Drink and eat", detail: "Nibh invenire convenire et cum", tag: "otherstuff"}
];
var start = (function(can, $, out, todos) {
  var Todo = can.Model.extend({
    // todo model
    // fetches things and so on
    findAll: function() {
      // get all todos
      return $.Deferred().resolve(todos);
    },
    findOne: function(params) {
      // get one todo
      return $.Deferred().resolve(todos[(+params.id) - 1]);
    },
    create: function(attributes) {
      // creates new todo
      var last = todos[todos.length - 1];
      $.extend(attributes, {id: last.id + 1, detail: "", tag: ""});
      todos.push(attributes);
      return $.Deferred().resolve(attributes);
    },
    update: function(id, attributes) {
      // update one todo
      $.extend(todos[id - 1], attributes);
      return $.Deferred().resolve();
    },
    destroy: function() {
      // destroy todo
      return $.Deferred().resolve();
    }
  }, {});
  var TodoList = Todo.List.extend({
    filter: function(check) {
      // filter todos
      var list = [];
      this.each(function(todo) {
        if(check(todo)) list.push(todo);
      });
      return list;
    },
    find: function(check) {
      // find a todo
      var item = null;
      this.each(function(todo) {
        if(check(todo)) item = todo;
      });
      return item;
    }
  });
  var todoList = new TodoList({});
  var Router = can.Map.extend({
    // app state, page n stuff
    page: "todosList",
    id: "",
    isTodosList: function() {
      // are we seeing todos list
      return (this.attr("page") === "todosList" || typeof this.attr("page") === "undefined");
    },
    isTodoDetails: function() {
      // are we seeing todo details
      return this.attr("page") === "todoDetails";
    }
  });
  var router = new Router();
  can.Component.extend({
    // router component
    // handles page routing
    tag: "router",
    template: can.view("javascript_view/router"),
    scope: function() {
      return router;
    }
  });
  TodosListViewModel = can.Map.extend({
    todoCreated: function(context, element) {
      // new todo is created
      var Todo = this.Todo;
      new Todo({
        name: can.trim(element.val())
      }).save();
      element.val("");      
    },
    tagFiltered: function(context, element) {
      // filter todos according to tag
      var that = this;
      if(!this.attr("filterTerm")) return this.todos;
      return this.todos.filter(function(todo) {
        return todo.tag === that.attr("filterTerm");
      });
    },
    todoDetails: function(todo, element) {
      // todo details
      can.route.attr({"id": todo.id, "page": element.attr("page")});
    }
  });
  can.Component.extend({
    // todos-list component
    // lists todos
    tag: "todos-list",
    template: can.view("javascript_view/todos-list"),
    scope: function() {
      // make the scope for this component
      return new TodosListViewModel({
        todos: todoList,
        Todo: Todo
      });
    },
    events: {
      "{scope.Todo} created": function(Todo, event, newTodo) {
        // todo created
        this.scope.attr("todos").push(newTodo);
      }
    }
  });
  TodoDetailsViewModel = can.Map.extend({
    todos: todoList,
    find: function() {
      // find a todo
      if(typeof this.attr("todo") === "undefined") this.attr("todo", this.attr("todos").find(function(todo) {
        return (todo.id === this.attr("todoId")) ? true : false;
      }));
    }
  });
  can.Component.extend({
    // todo details component
    // show details of todo
    tag: "todo-details",
    template: can.view("javascript_view/todo-details"),
    scope: function() {
      return new TodoDetailsViewModel();
    }
  });
  can.route(":page");
  can.route.map(router);
  can.route.ready();

  $(out).html(can.view("app", router));

  console.log("fucking shit");
})(can, $, "#out", todos);