var todos = [
  // todos
  {id: 1, name: "Get the thing working", detail: "Nibh invenire convenire et cum", tag: "stuff"},
  {id: 2, name: "Get out", detail: "Nibh invenire convenire et cum", tag: "stuff"},
  {id: 3, name: "Drink and eat", detail: "Nibh invenire convenire et cum", tag: "otherstuff"}
];
var milestones = [
  // milestones
  {id: 1, name: "Find info", todo_id: 1},
  {id: 2, name: "Write things", todo_id: 1},
  {id: 3, name: "Get dressed", todo_id: 2}
];
var start = (function(can, $, out, todos, milestones) {
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
  var Milestone = can.Model.extend({
    // milestone model
    // fetches things and so on
    findAll: function() {
      // get all milestones
      return $.Deferred().resolve(milestones);
    },
    findOne: function(params) {
      // get one milestone
      return $.Deferred().resolve(milestones[(+params.id) - 1]);
    },
    create: function(attributes) {
      // creates new milestone
      var last = milestones[milestones.length - 1];
      $.extend(attributes, {id: last.id + 1});
      milestones.push(attributes);
      return $.Deferred().resolve(attributes);
    },
    update: function(id, attributes) {
      // update one milestone
      $.extend(milestones[id - 1], attributes);
      return $.Deferred().resolve();
    },
    destroy: function() {
      // destroy milestone
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
  var MilestoneList = Milestone.List.extend({
    filter: function(check) {
      // filter milestones
      // todo make this common, same as above
      var list = [];
      this.each(function(milestone) {
        if(check(milestone)) list.push(milestone);
      });
      return list;
    }
  });
  var todoList = new TodoList({});
  var milestoneList = new MilestoneList({});
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
    todos: todoList,
    Todo: Todo,
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
      return new TodosListViewModel({});
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
    oneTodo: function() {
      // find a todo
      var id = can.route.attr("id");
      return todo = this.todos.filter(function(todo) {
        return todo.id == id;
      });
    },
    updateName: function(todo, element) {
      // update name
      if(element.val() != "") {
        todo.attr({
          name: element.val()
        });
      }
    },
    updateDescription: function(todo, element) {
      // update description
      if(element.val() != "") {
        todo.attr({
          description: element.val()
        });
      }
    },
    updateTag: function(todo, element) {
      // update tag
      if(element.val() != "") {
        todo.attr({
          tag: element.val()
        });
      }
    }
  });
  can.Component.extend({
    // todo details component
    // show details of todo
    tag: "todo-details",
    template: can.view("javascript_view/todo-details"),
    scope: function() {
      return new TodoDetailsViewModel({});
    }
  });
  MilestonesViewModel = can.Map.extend({
    milestones: milestoneList,
    getMilestones: function() {
      var id = can.route.attr("id");
      return this.milestones.filter(function(milestone) {
        return (milestone.todo_id == id);
      });
    }
  });
  can.Component.extend({
    // milestones list component
    // list milestones
    tag: "milestones-list",
    template: can.view("javascript_view/milestones-list"),
    scope: function() {
      return new MilestonesViewModel({});
    }
  });
  can.route(":page/:id");
  can.route.map(router);
  can.route.ready();

  $(out).html(can.view("app", router));

  console.log("fucking shit");
})(can, $, "#out", todos, milestones);