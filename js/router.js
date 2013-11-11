Todos.Router.map(function() {
  this.resource('lists', {path: '/'});

  this.resource('list', {path: '/list/:list_id'}, function() {
    this.route('active');
    this.route('completed');
  });
});

Todos.ListsRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('list');
  }
});

Todos.ListRoute = Ember.Route.extend({
  model: function(params) {
    return this.store.find('list', params.list_id);
  }
});

Todos.ListIndexRoute = Ember.Route.extend({
  model: function() {
    return this.modelFor('list').get('todos');
  },
});

Todos.ListActiveRoute = Ember.Route.extend({
  controllerName: 'listIndex',

  model: function() {
    return this.modelFor('list').get('todos').filterBy('isCompleted', false);
  },

  renderTemplate: function() {
    this.render('list/index');
  }
});

Todos.ListCompletedRoute = Ember.Route.extend({
  controllerName: 'listIndex',

  model: function() {
    return this.modelFor('list').get('todos').filterBy('isCompleted', true);
  },

  renderTemplate: function() {
    this.render('list/index');
  }
});
