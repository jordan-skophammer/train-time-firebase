$(document).ready(function() {

	var config = {
	    apiKey: "AIzaSyAozjWY5VG4mrX1xUGE9kMb88rtBgO6nCI",
	    authDomain: "train-schedule-8c9c6.firebaseapp.com",
	    databaseURL: "https://train-schedule-8c9c6.firebaseio.com",
	    projectId: "train-schedule-8c9c6",
	    storageBucket: "train-schedule-8c9c6.appspot.com",
	    messagingSenderId: "414203751368"
  	};

  	firebase.initializeApp(config);

  	var database = firebase.database();

  	$("#submit-train").on("click", function(event) {

      event.preventDefault();

  		var inputTrain = $("#Train-Name").val().trim();
  		var inputDestination = $("#Destination").val().trim();
  		var inputFirstTrainTime = $("#First-Train-Time").val().trim();
  		var inputFreqency = $("#Freqency").val().trim();

  		database.ref().push({
				fbTrainName: inputTrain,
  			fbDestination: inputDestination,
  			fbFirstTrainTime: inputFirstTrainTime,
  			fbFreqency: inputFreqency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
  		});

      var inputTrain = $("#Train-Name").val('');
      var inputDestination = $("#Destination").val('');
      var inputFirstTrainTime = $("#First-Train-Time").val('');
      var inputFreqency = $("#Freqency").val('');
  	});

    database.ref().on("child_added", function(childSanpshot, preChildKey) {

      var tableTrainName = childSanpshot.val().fbTrainName;
      var tableDestination = childSanpshot.val().fbDestination;
      var tableFirstTrainTime = childSanpshot.val().fbFirstTrainTime;
      var tableFreqency = childSanpshot.val().fbFreqency;

      var firstTrainFormatted = moment(tableFirstTrainTime, "HH:mm").subtract(1, "years");
      var currentTime = moment();
      var currentTimeFormatted = moment(currentTime).format("hh:mm");
      var timeDiff = moment().diff(moment(firstTrainFormatted), "minutes");
      var remaindingTime = timeDiff % tableFreqency;

      var tableMinutesAway = tableFreqency - remaindingTime;
      var tableNextArrival = moment().add(tableMinutesAway, "minutes");
      var tableNextArrivalFormatted = moment(tableNextArrival).format("hh:mm");

      $("#train-table").append("<tr><td>" + tableTrainName + "</td><td>" + tableDestination + "</td><td>" +
      tableFreqency + "</td><td>" + tableNextArrivalFormatted + "</td><td>" + tableMinutesAway + "</td></tr>");

    })

    




})

//save user input to object
//save input object to firebase
//display firebase object on html table