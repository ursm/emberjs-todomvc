Todos.Todo = DS.Model.extend({
  title: DS.attr('string'),
  isCompleted: DS.attr('boolean'),
  deadline: DS.attr('string'),

  isOutdated: function() {
    var deadline = this.get('deadline');

    if (Ember.isEmpty(deadline)) return false;

    return new Date() > new Date(deadline)
  }.property('deadline')
});
