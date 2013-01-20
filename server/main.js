Meteor.startup(function () {

	console.log("Removing all players and games");
	Players.remove({});
    GameControl.remove({});
	
});
