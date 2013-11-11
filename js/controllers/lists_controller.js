Todos.ListsController = Ember.ArrayController.extend({
  actions: {
    createList: function() {
      var name = this.get('newName');

      if (!name.trim()) return;

      var list = this.store.createRecord('list', {
        name: name
      });

      this.set('newName', '');

      list.save();
    }
  }
});
