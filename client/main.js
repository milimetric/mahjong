global_temp = [];
Template.log.created = function () {
  var log_id = Meteor.uuid();
  // alert(log_id);
  // Create a new collection object to hold messages
  this.text_log = new Meteor.Collection(log_id);


  // Make the game controller know about this new collection
  // Maybe put a general cursor of the local collection into the game controller
}

Template.log.messages = function (options) {
// This function is called each time the template is instantiated
// Return different collection cursors depending on what is doing the calling
//AAAAHHHHH i cant figure this out - how do i decide which one of the logs is
// calling it?
  return Messages.find();
};

Template.log.events(
  {
    'click .append_msg': function (event, template) {
      template.text_log.insert({
          text: $(template.find('.input_text'))
            .val()
          });
      Messages.insert({
          text: $(template.find('.input_text'))
            .val()
      });
    },
  
    'click .clear_msg': function (event, template) {
      template.text_log.remove({});
      Message.remove({});
    }
  }
);

Meteor.startup(function () {

  var name = "Taylor";
  // var name = prompt("Name?", "Taylor");

  var player_id = Players.insert({"name": name, idle: true});
  // alert(player_id);
  Session.set("player_id", player_id);

  // Find an empty text box to join
  // If no empty ones then dont join any

});




