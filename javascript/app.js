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
  can.Component.extend({
    // router component
    // handles page routing
    tag: "router",
    template: can.view("javascript_view/router"),
    scope: {
      isTodosList: function() {
        // are we seeing todos list
        return this.attr("page") === "todosList";
      }
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

  $(out).html(can.view("app", {state: can.route}));

  can.route(":page/:id", {page: "todosList", id: ""});
  can.route.ready();
  console.log("fucking shit");
})(can, $, "#out", todos);