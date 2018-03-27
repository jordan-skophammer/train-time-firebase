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

  	var trainCounter = 1;

  	$("#submit-train").on("click", function() {

  		var inputTrain = $("#Train-Name").val().trim();
  		var inputDestination = $("#Destination").val().trim();
  		var inputFirstTrainTime = $("#First-Train-Time").val().trim();
  		var inputFreqency = $("#Freqency").val().trim();

  		console.log(inputTrain)

  		database.ref().push({
				fbTrainTime: inputTrain,
  			fbDestination: inputDestination,
  			fbFistTrainTime: inputFirstTrainTime,
  			fbFreqency: inputFreqency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
  		})

  		trainCounter++;
  	})




})

//save user input to object
//save input object to firebase
//display firebase object on html table