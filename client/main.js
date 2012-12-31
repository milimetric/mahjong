Meteor.startup(function () {

  $('#button1').on('click',function () {

      console.log("Click function");
      var retval = Messages.insert({text: $('#input').val()});
      // alert(retval);
  });

});



