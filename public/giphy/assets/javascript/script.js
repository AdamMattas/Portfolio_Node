//initialized global variables
var news = ['Barack Obama', 'Donald Trump', 'Hillary Clinton', 'Bernie Sanders', 'Ted Cruz'];

// wrapped jquery in document ready function
$(document).on('ready', function(){

	$(document).on('click', '.news', function(){

		$("#image-area").empty();
		$("#intro-image").addClass('hide');

		//takes data-name from button and stores it in a variable
    var rate = $(this).data('name'); 

    //query string for api that includes search parameter
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + rate + "&api_key=dc6zaTOxFJmzC&limit=10";

    //ajax makes request and returns the response
    $.ajax({url: queryURL, method: 'GET'}).done(function(response) {

         var results = response.data;

         for(var i=0; i < results.length; i++){

             var gifDiv = $('<div class="item">')//creates a div

             var rating = results[i].rating;//grabs the rating from response

             var rate = $('<p>').text("Rating: " + rating);//create a <p> with a textnode of the rating

             var newsImage = $('<img>');//creates a new image element
             newsImage.attr('src', results[i].images.fixed_height_still.url);//added still src attribute
             newsImage.attr('data-animate', results[i].images.fixed_height.url);//stores animated img url in data-
             newsImage.attr('data-still', results[i].images.fixed_height_still.url);//stores still img url in data-
             newsImage.attr('data-state', 'still');//added data attribute
             newsImage.addClass('image');//added class to the image

             gifDiv.append(rate)//appends the rating to the div
             gifDiv.append(newsImage)//appends the image to the div

             $('#image-area').prepend(gifDiv);//prepends entire image div to image-area div
             $(".footer").addClass('foot-switch');

         }
        
    }); 
});

	// Generic function for displaying movie data 
	function showButtons(){ 

		// Deletes the movies prior to adding new movies (this is necessary otherwise you will have repeat buttons)
		$('#button-area').empty();

		// Loops through the array of movies
		for (var i = 0; i < news.length; i++){

			//dynamicaly generates buttons for each news theme in the array
	    var a = $('<div>') //created a new button element
	    a.addClass('news'); //added a class 
	    a.attr('data-name', news[i]); //added a data-attribute
	    a.text(news[i]); //added the button's text
	    $('#button-area').append(a); //added the button to the HTML
		}
	}

	// ========================================================

	// This function handles events where one button is clicked
	$('#add-news').on('click', function(){

		//grabs the value from the input textfield
		var newsVal = $('#new-news').val().trim();

		//check if text field is empty
		if(newsVal != ''){
			//input value is added to the array
			news.push(newsVal);
			
			//reset text field to placeholder
			$('#new-news').val('');

			//calls function to display buttons based on news array
			showButtons();	
		}

		// We have this line so that users can hit "enter" instead of clicking on the button and it won't move to the next page
		return false;
	})

	// ========================================================

	//listen for image click to stop or start gif
	$(document).on('click', '.image', function(){

		var state = $(this).attr('data-state');

		//if gif is stopped src attribute is changed to the animated gif and data-state is also changed
		if (state == 'still'){
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    //if gif is started src attribute is changed to the still gif and data-state is also changed
    }else{
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }

	});

	// ========================================================

	//calls the showButtons() function
	showButtons();

});