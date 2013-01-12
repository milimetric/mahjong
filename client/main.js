Template.loggers.one = function () {
    return { label: 'one' };
};

Template.loggers.two = function () {
    return { label: 'two' };
};

Template.log.created = function (options) {
    // Make the game controller know about this new collection
    // Maybe put a general cursor of the local collection into the game controller
    console.log(this.label);
};

Template.log.messages = function (options) {
    // This function is called each time the template is instantiated
    // Return different collection cursors depending on what is doing the calling
    //AAAAHHHHH i cant figure this out - how do i decide which one of the logs is
    // calling it?
    return Messages.find({label: this.label});
};

Template.log.events({
    'click .append_msg': function (event, template) {
        var message = $(template.find('.input_text'));
        if (message.val() == null || message.val() == '') { return; }
        Messages.insert({
            text: message.val(),
            label: this.label
        });
        message.val('');
    },

    'click .clear_msg': function (event, template) {
        Messages.remove({label: this.label});
    }
});

Meteor.startup(function () {

    var name = "Taylor";
    // var name = prompt("Name?", "Taylor");

    var player_id = Players.insert({"name": name, idle: true});
    // alert(player_id);
    Session.set("player_id", player_id);

    // Find an empty text box to join
    // If no empty ones then dont join any

});
