// ***** Shared client server code ***** //

var Messages = new Meteor.Collection("messages");

var Players = new Meteor.Collection("players");
// {name: "taylor", game_id: 13}

var GameControl = new Meteor.Collection("gamecontrol");
// {game_id: 13, status: bool, active_player: player_id}


