Todos.Router.map(function() {
  this.resource('lists', {path: '/'});

//  this.resource('todos', {path: '/'}, function() {
//    this.route('active');
//    this.route('completed');
//  });
});

Todos.ListsRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('list');
  }
});

Todos.TodosRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('todo');
  },
});

Todos.TodosIndexRoute = Ember.Route.extend({
  model: function() {
    return this.modelFor('todos');
  }
});

Todos.TodosActiveRoute = Ember.Route.extend({
  controllerName: 'todosIndex',

  model: function() {
    return this.store.filter('todo', function(todo) {
      return !todo.get('isCompleted');
    });
  },

  renderTemplate: function() {
    this.render('todos/index');
  }
});

Todos.TodosCompletedRoute = Ember.Route.extend({
  controllerName: 'todosIndex',

  model: function() {
    return this.store.filter('todo', function(todo) {
      return todo.get('isCompleted');
    });
  },

  renderTemplate: function() {
    this.render('todos/index');
  }
});
