Todos.ListController = Ember.ObjectController.extend({
  actions: {
    createTodo: function() {
      var title = this.get('newTitle');

      if (!title.trim()) return;

      var todo = this.get('todos').createRecord({
        title: title,
        isCompleted: false
      });

      this.set('newTitle', '');

      todo.save();
    },

    clearCompleted: function() {
      var completed = this.get('todos').filterBy('isCompleted', true);

      completed.invoke('deleteRecord');
      completed.invoke('save');
    }
  },

  hasCompleted: function() {
    return this.get('completed') > 0;
  }.property('completed'),

  completed: function() {
    return this.get('todos').filterBy('isCompleted', true).get('length');
  }.property('todos.@each.isCompleted'),

  remaining: function() {
    return this.get('todos').filterBy('isCompleted', false).get('length');
  }.property('todos.@each.isCompleted'),

  inflection: function() {
    var remaining = this.get('remaining');

    return remaining === 1 ? 'item' : 'items';
  }.property('remaining'),

  allAreDone: function(key, value) {
    if (value === undefined) {
      return !!this.get('todos.length') && this.get('todos').everyBy('isCompleted', true);
    } else {
      this.setEach('todos.isCompleted', value);
      this.get('todos').invoke('save');

      return value;
    }
  }.property('todos.@each.isCompleted')
});
