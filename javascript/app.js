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
    }
  });
  var Router = can.Map.extend({
    // app state, page n stuff
    page: "todosList",
    isTodosList: function() {
      // are we seeing todos list
      return (this.attr("page") === "todosList" || typeof this.attr("page") === "undefined");
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
    details: function(todo, el) {
      can.route.attr("page", "details");
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
        todos: new TodoList({}),
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
  can.route(":page");
  can.route.map(router);
  can.route.ready();

  $(out).html(can.view("app", router));

  console.log("fucking shit");
})(can, $, "#out", todos);