Template.log.messages = function () {
  return Messages.find();
};

Template.log.events(
  {
    'click .append_msg': function (event, template) {
      Messages.insert({
          text: $(template.find('.input_text'))
            .val()
      });
    },
  
    'click .clear_msg': function (event, template) {
      Messages.remove({});
    }
  }
);

Meteor.startup(function () {

});




