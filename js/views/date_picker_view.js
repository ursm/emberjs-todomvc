Todos.DatePickerView = Ember.TextField.extend({
  didInsertElement: function() {
    this.$().datepicker();
  },

  change: function() {
    this.sendAction('action');
  }
});

Ember.Handlebars.helper('date-picker', Todos.DatePickerView);
