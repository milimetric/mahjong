// WHY are these necessary?
Template.loggers.one = function () {
    return { label: 'one' };
};

Template.loggers.two = function () {
    return { label: 'two' };
};

Template.log.created = function (options) {
    console.log(this.data.label);
    // Make the game controller know about this new collection if not already
    // This will go away when we redo the concept of textboxes as games
    if (GameControl.find({label: this.data.label}).fetch().length == 0) {
        GameControl.insert({
            label: this.data.label,
            status: true,
            active_player: -1,
            players: []
        });
    }
    else {
        GameControl.update({label: this.data.label},
            {$set: {active_player: -1, players: []}});
    }
};

Template.log.messages = function (options) {
    // This function is called each time the template is instantiated
    return Messages.find({label: this.label});
};

Template.log.events({
    'click .append_msg': function (event, template) {
        var message = $(template.find('.input_text'));
        if (message.val() == null || message.val() == '') { return; }
        var play = Players.findOne({name: name});
        var game = GameControl.findOne({label: this.label});
        if (play['game_name'] == game['label']
            && name == game['players'][game['active_player']]){
            Messages.insert({
                text: message.val(),
                label: this.label
                });

            // Set player to the next player for the game
            var nextPlayer = (game['active_player'] + 1) % game['players'].length;
            GameControl.update({label: this.label}, {active_player: nextPlayer});
        }
        message.val('');
    },

    'click .clear_msg': function (event, template) {
        Messages.remove({label: this.label});
    }
});

Meteor.startup(function () {

    name = "Taylor";
    // var name = prompt("Name?", "Taylor");

    var player_id = Players.insert({"name": name, idle: true, game_name: ""});
    // alert(player_id);
    Session.set("player_id", player_id);

    // Find an empty text box to join, nothing happens if all are full
    var a = GameControl.find();
    var stop = 0;
    a.forEach(function (game) {
        if (game["players"].length < 2 && !stop) {
            GameControl.update({label: game["label"]}, {$push: {players: name}});
            if (game["active_player"] == -1) {
                GameControl.update({label: game["label"]},
                    {$set: {active_player: 0}});
            }
            Players.update({name: name},
                {$set: {idle: false, game_name: game["label"]}});
            stop = 1; // this is god awful, using return; does not exit loop
        }
    });


});
