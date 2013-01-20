// ***** Shared client server code ***** //

// one shared database of messages for all text boxes
var Messages = new Meteor.Collection("messages");

var Players = new Meteor.Collection("players");
// {name: "taylor", game_id: 13}

var GameControl = new Meteor.Collection("gamecontrol");
/* {label: "one",
    status: bool,
    active_player: 2,
    players: ["henry", "taylor"]}
*/

