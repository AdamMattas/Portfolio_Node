	//Initialize global variables
	var doh = $('#doh')[0];
	var woohoo = $('#woohoo')[0];
	var vid0 = document.getElementById("video0");
	var vid1 = document.getElementById("video1");
	var vid2 = document.getElementById("video2");
	var vid3 = document.getElementById("video3");
	var vid4 = document.getElementById("video4");
	var vid5 = document.getElementById("video5");
	var vid6 = document.getElementById("video6");
	var vid7 = document.getElementById("video7");
	var vid8 = document.getElementById("video8");
	var vid9 = document.getElementById("video9");
	var vid10 = document.getElementById("video10");
	//organize questions and possible answers and answer videos in object
	var pos = 0, trivia, triviaStatus, question, choice, choices, ch1, ch2, ch3, counter;
	var correct = 0;
	var incorrect = 0;
	var questions = [
		["What was the name of Homer's motorcycle gang?", "The Christ Punchers", "The Hell's Satans", "The Fat Boys", "2", vid1],
		["What is Principal Skinner's real name?", "Armin Tamzarian", "Skip Rhodes", "Hans Moleman", "1", vid2],
		["What was Lisa's nickname at school when she pretended to be a boy in order to attend the boys only classes?", "Skid Mark", "Toilet", "Brain Boy", "2", vid3],
		['In the Treehouse of Horror episode "The Devil and Homer Simpson", Homer states that he would sell his soul for a doughnut. Which character appears as The Devil to seal the deal?', "Mr. Burns", "Sideshow Bob", "Ned Flanders", "3", vid4],
		["When Bart was prescribed the drug Focusyn for his A.D.D., what kind of fruit did he put in his pants and say that his testicles wouldn't fit in his underwear?", "Oranges", "Apples", "Peaches", "1", vid5],
		["When the Simpson family went to Florida during spring break, how many boobs did Homer tell Marge that he saw?", "15", "20", "12", "1", vid6],
		["When Homer and Mel Gibson were on the run from film studio executives, what plan did Homer and Mel use to end the pursuit?", "Hold Mel Gibson hostage", "Hide in the doughnut shop", "Moon them until they could take no more", "3", vid7],
		["When Lisa was babysitting Rod & Todd Flanders, what was the bedtime story she told them about?", "Anointing the feet of Jesus", "Imagination Christmas", "Two robots named Rod & Todd", "3", vid8],
		["Where did Ralph Wiggum find a moon rock?", "On the moon", "In his nose", "In the backyard", "2", vid9],
		["When Homer received counterfeit tickets to the Super Bowl, what did they turn out to be printed on?", "Toilet Paper", "Crackers", "Parking tickets", "2", vid10]
	];

// jQuery wrapped in doc ready function
$(document).ready(function(){

	//plays intro video and sets classes on for trivia screen
	$('#questionBack').addClass('hide');
	$(vid0).removeClass('hide');
	vid0.play();
	$(vid0).bind('ended', function() {
		$(vid0).addClass('hide');
		$('#questionBack').removeClass('hide');
		$('#img1').removeClass('hide');
	});
	//game timer object functions
	//set initial time and reset to initial time
	var gameTimer = {
    time:30,
    reset: function(){
        gameTimer.time = 30;
        $('#display').html('30');
    },
    //set interval at 1 second
    start: function(){
        counter = setInterval(gameTimer.count, 1000);
    },
    //clear the counter variable
    stop: function(){
        clearInterval(counter);
    },
    //decrease seconds and display them
    count: function(){
        gameTimer.time--;
        var converted = gameTimer.timeConverter(gameTimer.time);
        $('#display').html(converted);
    },
    //check if time has expired and returns the time
    timeConverter: function(t){
        var seconds = t;
        if(seconds <= 0){
        	skipQuestion();
        }
        return seconds;
    }
	};

	//checks for click to start a new game
	$(document).on('click', '.start-button', function(){
		showQuestion();
		$('#img1').addClass('hide');
		$('#start').fadeOut("slow");
		$('#answers').animate({bottom: '0px'});
	});

	function showQuestion(){
		//check if game is over and display the score and show button to restart the game
		$('#img1').addClass('hide');
		if(pos >= questions.length){
			$('#answers').animate({bottom: '-300px'});
			$('#start').fadeIn("slow");
			$('#trivia').html("<h2>You guessed "+correct+" of "+questions.length+" questions correct</h2>");
			$('#triviaStatus').html('Simpsons Trivia Completed');
			pos = 0;
			correct = 0;
			incorrect = 0;
		}else{
			//make sure timer is ready for a new question
			gameTimer.stop();
			gameTimer.reset();
			gameTimer.start();
			$('#answers').animate({bottom: '0px'});
			//select question by the pos variable and populate possible answers
			question = questions[pos][0];
			ch1 = questions[pos][1];
			ch2 = questions[pos][2];
			ch3 = questions[pos][3];
			$('#trivia').html("<h1>"+question+"</h1>");
			$('#choice1').html(ch1);
			$('#choice2').html(ch2);
			$('#choice3').html(ch3);
		}
	};

	// runs when time is up without answer selection
	// displays incorrect count & plays video before moving to next question
	// unbind added to video end event listener to prevent multiple pos increments
	function skipQuestion(){
		$('#answers').animate({bottom: '-300px'});
		incorrect++;
		$('#incorrect').html('<span class="correct-num">Incorrect &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + incorrect + '</span>');
		$('#incorrect').animate({left: '-50px'});
		$('#doh').get(0).play();
		gameTimer.stop();
		$('#questionBack').addClass('hide');
		$(questions[pos][5]).removeClass('hide');
		questions[pos][5].play();
		$(questions[pos][5]).bind('ended', function() {
			$(questions[pos][5]).unbind('ended');
			$(questions[pos][5]).addClass('hide');
			$('#questionBack').removeClass('hide');
			pos++;
			$('#incorrect').animate({left: '-225px'});
			showQuestion();
		});

	};

	//check if guess is correct and record correct and incorrect guesses
	// displays score count & plays video before moving to next question
	// unbind added to video end event listener to prevent multiple pos increments
	$('.choices').on('click', function(){
		$('#answers').animate({bottom: '-300px'});
		guess = $(this).attr('value');
		//check if guess is correct
		if(guess == questions[pos][4]){
			//update and animate score count and play success sound
			correct++;
			$('#correct').html('<span class="correct-num">Correct &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + correct + '</span>');
			$('#correct').animate({left: '-50px'});
			$('#woohoo').get(0).play();
			gameTimer.stop();
			$('#questionBack').addClass('hide');
			$(questions[pos][5]).removeClass('hide');
			//play video and listen for end of video
			//when video ends it hides and the score counter slides back
			questions[pos][5].play();
			$(questions[pos][5]).bind('ended', function() {
				$(questions[pos][5]).unbind('ended');
				$(questions[pos][5]).addClass('hide');
				$('#questionBack').removeClass('hide');
				pos++;
				$('#correct').animate({left: '-225px'});
				// move to next question
				showQuestion();
			});
		}else{
			//update and animate score count and play fail sound
			incorrect++;
			$('#incorrect').html('<span class="correct-num">Incorrect &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + incorrect + '</span>');
			$('#incorrect').animate({left: '-50px'});
			$('#doh').get(0).play();
			gameTimer.stop();
			$('#questionBack').addClass('hide');
			$(questions[pos][5]).removeClass('hide');
			//play video and listen for end of video
			//when video ends it hides and the score counter slides back
			questions[pos][5].play();
			$(questions[pos][5]).bind('ended', function() {
				$(questions[pos][5]).unbind('ended');
				$(questions[pos][5]).addClass('hide');
				$('#questionBack').removeClass('hide');
				pos++;
				$('#incorrect').animate({left: '-225px'});
				// move to next question
				showQuestion();
			});
		}	
	});

});