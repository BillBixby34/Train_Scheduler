 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBGkDgYS77vHK8vdHiSR2QhYP_puV_tCL4",
    authDomain: "class-13.firebaseapp.com",
    databaseURL: "https://class-13.firebaseio.com",
    projectId: "class-13",
    storageBucket: "class-13.appspot.com",
    messagingSenderId: "825070250432"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

//start fixup
  function clearDiv() {
  train = $("#train-input").val("");
  locale = $("#locale-input").val("");
  firstTrainTime = $("#firstTrain-input").val("");
  frequency = $("#arrival-input").val("");
}


// Capture Button Click
$("#add-user").on("click", function(event) {
  // prevent page from refreshing when form tries to submit itself
  event.preventDefault();

  // Capture user inputs and store them into variables
  var train = $("#train-input").val().trim();
  var locale = $("#locale-input").val().trim();
  var firstTrain = $("#firstTrain-input").val().trim();
  var frequency = $("#arrival-input").val().trim();

  // Console log each of the user inputs to confirm we are receiving them
  console.log(train);
  console.log(locale);
  console.log(firstTrain);
  console.log(frequency);

  var newTrain = {
    train: train,
    locale: locale,
    firstTrain: firstTrain,
    frequency: frequency
  }
//Create Firebase event for adding to the database and html when a user adds an entry
  database.ref().push(newTrain);
  console.log(newTrain.train);
  console.log(newTrain.locale);
    //let's test  
    clearDiv();
  });
  
  // Replaces the content in the "recent-member" div
 // $("#train-display").html();
  //$("#locale-display").html();
  //$("#firstTrain-display").html();
  //$("#arrival-display").html();

  //Output all of the new information into the relevant sections
  //$("#name-display").html(name);
  //$("#email-display").html(email);
  //$("#age-display").html(age);
  //$("#comment-display").html(comment);

  // Clear localStorage
  //localStorage.clear();



//$("input[type='submit']").on("click", function(event) {
  //event.preventDefault();


    //how to add to firebase??
    //activity8 to do list
//var list = JSON.parse(localStorage.getItem("todolist"));
//if (!Array.isArray(list)) {
  //    list = [];
   // }//$("input")
    //function putOnPage() {

    //   $("#todo-list").empty(); // empties out the html

    //   var insideList = JSON.parse(localStorage.getItem("todolist"));

    //   // Checks to see if we have any todos in localStorage
    //   // If we do, set the local insideList variable to our todos
    //   // Otherwise set the local insideList variable to an empty array
    //   if (!Array.isArray(insideList)) {
    //     insideList = [];
    //   }
    //   // render our insideList todos to the page
    //   for (var i = 0; i < insideList.length; i++) {
    //     var p = $("<p>").text(insideList[i]);
    //     var b = $("<button class='delete'>").text("x").attr("data-index", i);
    //     p.prepend(b);
    //     $("#todo-list").prepend(p);
    //   }
    // }//closes putOnPage

    // putOnPage();

    // $(document).on("click", "button.delete", function() {
    //   var todolist = JSON.parse(localStorage.getItem("todolist"));
    //   var currentIndex = $(this).attr("data-index");

    //   // Deletes the item marked for deletion
    //   todolist.splice(currentIndex, 1);
    //   list = todolist;

    //   localStorage.setItem("todolist", JSON.stringify(todolist));
    //   //re-renders todos by putting putOnPage(): at end of .on("click")
    //   putOnPage();
    // });
    // //use for all submit buttons in this case
    // $("input[type='submit']").on("click", function(event) {
    //   event.preventDefault();
    //   // Setting the input value to a variable and then clearing the input
    //   var val = $("input[type='text']").val();
    //   $("input[type='text']").val("");

    //   // Adding our new todo to our local list variable and adding it to local storage
    //   list.push(val);
    //   localStorage.setItem("todolist", JSON.stringify(list));

    //   putOnPage();
    // });

    //train name, destination, frequency = static info
    //First Train Time allows you to set next train arrival
    //and minutes away based on frequency and realtime(moment.js)
    // Assumptions
    database.ref().on("child_added", function(childSnapshot) {
    
    var train = childSnapshot.val().train;
  var locale = childSnapshot.val().locale;
  var firstTrain = childSnapshot.val().firstTrain;
  var frequency = childSnapshot.val().frequency;

  var timeDifference = moment().diff(moment(firstTrain, "hh:mm A"), 'm');
  var timeRemaining = timeDifference % frequency;
  var tMinutesTill = frequency - timeRemaining;
  var nextTrain = moment().add(tMinutesTill, "minutes").format("hh:mm A");
    // Next Train
    //var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    $(".table").append("<tr><td>" + train + "</td><td>" + locale + "</td><td>" +
    frequency + "</td><td>" + nextTrain + "</td><td>" + tMinutesTill +
    "</td></tr>");
  });