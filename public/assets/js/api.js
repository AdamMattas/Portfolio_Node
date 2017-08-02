// Object to populate Api Side Menu after click on About Page
var youtube = {
    title: "YouTube Videos",
    image: "assets/images/youtube.png",
    placeholder: "Search YouTube",
    id: "youtube-input",
    searchClass: "youtube-search",
    large: "youtube-lrg",
    largeIn: "youtube-lrg-in",
    largeOut: "youtube-lrg-out"
},
nyt = {
    title: "The New York Times",
    image: "assets/images/nytimes.jpg",
    placeholder: "Search Articles",
    id: "nyt-input",
    searchClass: "nyt-search",
    large: "nytimes-lrg",
    largeIn: "nytimes-lrg-in",
    largeOut: "nytimes-lrg-out"
},
omdb = {
    title: "OMDb Movies",
    image: "assets/images/omdb.jpg",
    placeholder: "Search Movie Title",
    id: "omdb-input",
    searchClass: "omdb-search",
    large: "omdb-lrg",
    largeIn: "omdb-lrg-in",
    largeOut: "omdb-lrg-out"
};

// Wrapping jQuery in Doc Ready function
$(document).on('ready', function(){

// =========================================
// BEGIN YouTube API CODE

    // Query YouTube and call build results function
    function getYouTube(search){

        // Query YouTube based on input
        var queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + search + "&type=video&key=AIzaSyD_s7PmE89zIcTXeTYWnClw0uOYh8446NU";

        $.ajax({url: queryURL, method: 'GET'}).done(function(response) {

            // Logs the entire object to console
            console.log('TUBE RESPONSE: ', response);

            buildTubeResults(response, search);

        });     
    } // End of getYouTube function

    // Query YouTube for the 'next or previous' 5 videos based on token
    function getYouTubeNext(token, search){

        // Query YouTube based on 'next or previous' token
        var queryURL = "https://www.googleapis.com/youtube/v3/search?pageToken=" + token + "&part=snippet&q=" + search + "&type=video&key=AIzaSyD_s7PmE89zIcTXeTYWnClw0uOYh8446NU";

        $.ajax({url: queryURL, method: 'GET'}).done(function(response) {

            // Logs the entire object to console
            console.log('TUBE RESPONSE: ', response);

            buildTubeResults(response, search);

        });     
    } // End of getYouTubeNext function

    function buildTubeResults(response, search) {

        // Remove main-api-panel if it exists to clear the area for fresh results
        $('.main-api-panel').remove();
        $('#next-tube').remove();
        $('#prev-tube').remove();


        var tubeContainer = $('<div>'); //creates a new div element
        tubeContainer.addClass('main-api-panel'); //adds a class to tubeContainer

        // Loop through the response
        for(var i = 0; i < response.items.length; i++){

            var tubeWrap = $('<div>'); //creates a new div element
            tubeWrap.addClass('tube-container'); //adds a class to tubeWrap

            var tubeLink = $('<a>'); //creates a new a element
            tubeLink.attr('href', 'https://www.youtube.com/watch?v=' + response.items[i].id.videoId); //adds attr to element
            tubeLink.attr('target', '_blank'); //opens link in new tab

            var tubeImg = $('<img>'); //creates a new img element
            tubeImg.attr('src', response.items[i].snippet.thumbnails.medium.url); //add img src from response
            tubeImg.data('id', response.items[i].id.videoId); //add data-id from results video id
            tubeImg.addClass('tube-img'); //add tube-img class to img element

            var tubeTitle = $('<h4>'); //creates a new h4 element
            tubeTitle.text(response.items[i].snippet.title); //creates text node with video title

            var tubeDesc = $('<p>'); //creates a new p element
            tubeDesc.text(response.items[i].snippet.description); //creates text node with video description

            var tubeLine = $('<div>'); //creates a new div element
            tubeLine.addClass('tube-line'); //add tube-line class to img element

            var tubeChannel = $('<p>'); //creates a new p element
            tubeChannel.text(response.items[i].snippet.channelTitle); //creates text node with the channel name

            tubeWrap.append(tubeLink); //append tubeLink to tubeWrap
            tubeLink.append(tubeImg); //append tubeImg to tubeLink
            tubeLink.append(tubeTitle); //append tubeTitle to tubeLink
            tubeLink.append(tubeDesc); //append tubeDesc to tubeLink
            tubeLine.append(tubeChannel); //append tubeChannel to tubeLine
            tubeLink.append(tubeLine); //append tubeLine to tubeLink

            tubeContainer.append(tubeWrap); //append tubeWrap to tubeContainer

        }

        // Hide about Adam content
        $("#main-hidable").hide();

        // Appends the new dynamic content to main-panel div
        $("#main-panel").append(tubeContainer);

        if (response.nextPageToken) {

            var tubeNavCont = $('<div>'); //creates a new div element
            tubeNavCont.addClass('tube-nav'); //add tube-nav class to div element

            var nextTube = $('<span>'); //creates a new span element
            nextTube.text('Next >>>'); //creates text node on span element
            nextTube.attr('id', 'next-tube'); //add id attr to span
            nextTube.addClass('pagination-btn'); //add pagination-btn class to span element
            nextTube.data('name', response.nextPageToken); //add data- to span
            nextTube.data('search', search); //add data- to span

            $(tubeNavCont).append(nextTube); //append nextTube to tubeNavCont
            $(tubeContainer).append(tubeNavCont); //append tubeNavCont to tubeContainer

        }

        if (response.prevPageToken) {

            var prevTube = $('<span>'); //creates a new span element
            prevTube.text('<<< Prev'); //creates text node on span element
            prevTube.attr('id', 'prev-tube'); //add id attr to span
            prevTube.addClass('pagination-btn'); //add pagination-btn class to span element
            prevTube.data('name', response.prevPageToken); //add data- to span
            prevTube.data('search', search); //add data- to span

            $(tubeNavCont).append(prevTube); //append prevTube to tubeNavCont

        }

    }

    // On click call function to display the next 5 videos
    $(document).on('click', '#next-tube', function() {

        // Next 5 videos token is stored in the button's data-name attr
        var nextSend = $(this).data('name');
        // Search term is stored in the button's data-search attr
        var nextSearch = $(this).data('search');

        // Call function to display the next 5 videos
        getYouTubeNext(nextSend, nextSearch)

    });

    // On click call function to display the previous 5 videos
    $(document).on('click', '#prev-tube', function() {

        // Previous 5 videos token is stored in the button's data-name attr
        var prevSend = $(this).data('name');
        // Search term is stored in the button's data-search attr
        var nextSearch = $(this).data('search');

        // Call function to display the previous 5 videos
        getYouTubeNext(prevSend, nextSearch)

    });

    // On Button Click run initial youtube query
    $(document).on('click', '#youtube-search', function(){

        // Grab the search term
        var search = $('#youtube-input').val().trim();

        // Run the getYouTube (Passing in the search term as an Argument)
        getYouTube(search);

        // Empty search area after submit
        $('#youtube-input').val('');

        // Prevents moving to the next page
        return false;
    });

// END YouTube API CODE
// =========================================
// BEGIN THE NEW YORK TIMES API CODE

    // =========================================
    var authKey = "8722c324037644f58c38b397b0c614b5";

    // Search Parameters
    var queryTerm   = "";
    var numResults  = 10;
    var startYear   = 0;
    var endYear     = 0;

    // URL Base
    var queryURLBase = "http://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKey; 

    // Variable to Track number of articles
    var articleCounter = 0;

    // FUNCTIONS
    // =========================================

    function runQuery(numArticles, queryURL){

        // AJAX Function
        $.ajax({url: queryURL, method: "GET"})
            .done(function(NYTData) {

                // Logging to Console
                console.log("------------------");
                console.log(queryURL);
                console.log("------------------");
                console.log(numArticles);
                console.log(NYTData);

                // Clear the wells from the previous run
                $('.main-api-panel').empty();

                var articleContainer = $('<div>'); //creates a new div element
                articleContainer.addClass('main-api-panel'); //adds classes to tracksContainer

                for (var i=0; i<numArticles; i++){

                    // Start Dumping to HTML Here
                    var articleWrap = $('<div>');
                    articleWrap.addClass("article-wrap");

                    var wellSection = $('<div>');
                    wellSection.addClass("article-well");
                    wellSection.attr('id', 'articleWell-' + i);

                    if(typeof NYTData.response.docs[i].multimedia[1] != "undefined") {
                        var wellBackground = $('<img>');
                        wellBackground.addClass('article-img');
                        wellBackground.attr('src', 'https://static01.nyt.com/' + NYTData.response.docs[i].multimedia[1].url);
                    }else{
                        var wellBackground = $('<img>');
                        wellBackground.addClass('article-img');
                        wellBackground.attr('src', 'assets/images/nytimes_lrg.jpg');    
                    }

                    // Check if things exist 
                    if(NYTData.response.docs[i].headline != "null") {
                        console.log(NYTData.response.docs[i].headline.main);
                        var articleTitle = $('<h3>');
                        articleTitle.addClass('relative-title');
                        articleTitle.text(NYTData.response.docs[i].headline.main);
                    }

                    // Check if the byline 
                    if(NYTData.response.docs[i].byline && NYTData.response.docs[i].byline.hasOwnProperty("original")){
                        console.log(NYTData.response.docs[i].byline.original);
                        var articleByline = $('<h5>');
                        articleByline.addClass('relative');
                        articleByline.text(NYTData.response.docs[i].byline.original);
                    }

                    // Attach the content to the appropriate well
                    var sectionName = $('<h5>');
                    sectionName.addClass('relative');
                    sectionName.text(NYTData.response.docs[i].section_name);

                    var articleDate = $('<h5>');
                    articleDate.addClass('relative');
                    articleDate.text(NYTData.response.docs[i].pub_date);

                    var articleLink = $('<a>');
                    articleLink.addClass('above');
                    articleLink.attr('href', NYTData.response.docs[i].web_url);
                    articleLink.attr('target', '_blank');
                    articleLink.text('VIEW');

                    // Hide about Adam content
                    $("#main-hidable").hide();

                    $(wellSection).append(wellBackground);
                    $(wellSection).append(articleTitle);
                    $(wellSection).append(articleByline);
                    $(wellSection).append(sectionName);
                    $(wellSection).append(articleDate);

                    $(articleWrap).append(articleLink);
                    $(articleWrap).append(wellSection);

                    $(articleContainer).append(articleWrap);

                    // Appends the new dynamic content to main-panel div
                    $("#main-panel").append(articleContainer);

                    console.log(NYTData.response.docs[i].section_name);
                    console.log(NYTData.response.docs[i].pub_date);
                    console.log(NYTData.response.docs[i].web_url);
                }


            })

    }

    // MAIN PROCESSES
    // =========================================

    $(document).on('click', '#nyt-search', function() {

        // Get Search Term
        queryTerm = $('#nyt-input').val().trim();

        // Add in the Search Term
        var newURL = queryURLBase + "&q=" + queryTerm;

        if (parseInt(startYear)) {

            // Add the necessary fields
            startYear = "20120101";

            // Add the date information to the URL
            newURL = newURL + "&begin_date=" + startYear;   
        }

        if(parseInt(endYear)){

            // Add the necessary fields
            endYear = "20160101";
            
            // Add the date information to the URL
            newURL = newURL + "&end_date=" + endYear;   
        } 

        // Send the AJAX Call the newly assembled URL 
        runQuery(numResults, newURL);

        $('#nyt-input').val('');

        return false;

    });

// END THE NEW YORK TIMES API CODE
// =========================================
// BEGIN OMDB API CODE

    $(document).on('click', '#omdb-search', function() {

        var movie = $('#omdb-input').val().trim();
        var key = "5e965acc3187b331b096f142476921ff"
        var queryURL = "https://api.themoviedb.org/3/search/movie?api_key=" + key + "&query=" + movie;

        $.ajax({url: queryURL, method: 'GET'}).done(function(response) { 
            console.log('1st Response', response);

            var movieId = response.results[0].id;

            // getDetails(movieId);
            getCrewDetails(movieId);
        });

        function getCrewDetails(id) { 

            var queryCrewDetails = "https://api.themoviedb.org/3/movie/" + id + "/credits?api_key=" + key;

            $.ajax({url: queryCrewDetails, method: 'GET'}).done(function(responseCrew) { 
                console.log('2nd Response', responseCrew);

                var cast = responseCrew.cast;
                var crew = responseCrew.crew;
                var director;
                var writer;
                var arr = [];

                for (var i=0; i<7; i++) {
                    arr.push(cast[i].name);
                }

                for (var i=0; i<crew.length; i++) {
                    
                    if (crew[i].job === 'Director') {
                        director = crew[i].name;
                    }

                    if (crew[i].job === 'Screenplay') {
                        writer = crew[i].name;
                    }

                }

                var array = arr.join(', ');

                console.log('CAST: ', array);

                getDetails(id, array, director, writer, responseCrew);
                
            });

        }

        function getDetails(id, arrCast, director, writer, crew) {

            // var queryDetails = "https://api.themoviedb.org/3/search/movie?api_key=" + key + "&query=" + movie;
            var queryDetails = "https://api.themoviedb.org/3/movie/" + id + "?api_key=" + key + "&language=en-US";
            //https://api.themoviedb.org/3/movie/1366?api_key=5e965acc3187b331b096f142476921ff&language=en-US

            $.ajax({url: queryDetails, method: 'GET'}).done(function(response) { 
                console.log('3rd Response', response);


                // Clear the wells from the previous run
                $('.main-api-panel').empty();

                var omdbContainer = $('<div>'); //creates a new div element
                omdbContainer.addClass('main-api-panel'); //adds a class to tracksContainer

                // if (response.Poster != 'N/A') {
                //     var omdbImage = $('<img>'); //creates a new img element
                //     omdbImage.attr('src', 'https://image.tmdb.org/t/p/w500/' + response.poster_path); //adds img src to img element
                //     omdbImage.addClass('omdb-img'); //adds a class to omdbImage   
                // } else {
                //     var omdbImage = $('<img>'); //creates a new img element
                //     omdbImage.attr('src', './assets/images/generic.jpg'); //adds img src to img element
                //     omdbImage.addClass('omdb-img'); //adds a class to omdbImage       
                // }

                var omdbImage = $('<img>'); //creates a new img element
                omdbImage.attr('src', 'https://image.tmdb.org/t/p/w500/' + response.poster_path); //adds img src to img element
                omdbImage.addClass('omdb-img'); //adds a class to omdbImage  
                
                var omdbTitle = $('<h2>'); //creates a new h3 element
                omdbTitle.addClass('omdb-title'); //adds a class to omdbTitle
                omdbTitle.text(response.original_title); //adds textNode to omdbTitlte

                var omdbTag = $('<h4>'); //creates a new h4 element
                omdbTag.text(response.tagline); //adds textNode to omdbYear

                var omdbYear = $('<h4>'); //creates a new h4 element
                omdbYear.text('Released: ' + response.release_date); //adds textNode to omdbYear

                var omdbGenre = $('<h4>'); //creates a new h4 element
                omdbGenre.text('Genre: ' + response.genres[0].name); //adds textNode to omdbGenre

                var omdbDirector = $('<h4>'); //creates a new h4 element
                omdbDirector.text('Directed by: ' + director); //adds textNode to omdbDirector

                var omdbWriter = $('<h4>'); //creates a new h4 element
                omdbWriter.text('Written by: ' + writer); //adds textNode to omdbWriter

                var omdbActors = $('<h4>'); //creates a new h4 element
                omdbActors.text('Starring: ' + arrCast); //adds textNode to omdbActors

                var omdbCountry = $('<h4>'); //creates a new h4 element
                omdbCountry.text('Country: ' + response.production_countries[0].name); //adds textNode to omdbCountry

                var omdbLanguage = $('<h4>'); //creates a new h4 element
                omdbLanguage.text('Language: ' + response.spoken_languages[0].name); //adds textNode to omdbLanguage

                var omdbRuntime = $('<h4>'); //creates a new h4 element
                omdbRuntime.text('Runtime: ' + response.runtime); //adds textNode to omdbRuntime

                var omdbImdbRate = $('<h4>'); //creates a new h4 element
                omdbImdbRate.text('Vote Average: ' + response.vote_average); //adds textNode to omdbImdbRate

                var omdbPlot = $('<p>'); //creates a new p element
                omdbPlot.text(response.overview); //adds textNode to omdbPlot

                $(omdbContainer).append(omdbImage);
                $(omdbContainer).append(omdbTitle);
                $(omdbContainer).append(omdbTag);
                $(omdbContainer).append(omdbYear);
                $(omdbContainer).append(omdbGenre);
                $(omdbContainer).append(omdbDirector);
                $(omdbContainer).append(omdbWriter);
                $(omdbContainer).append(omdbActors);
                $(omdbContainer).append(omdbCountry);
                $(omdbContainer).append(omdbLanguage);
                $(omdbContainer).append(omdbRuntime);
                $(omdbContainer).append(omdbImdbRate);
                $(omdbContainer).append(omdbPlot);

                // Appends the new dynamic content to main-panel div
                $("#main-panel").append(omdbContainer);

                // Hide about Adam content
                $("#main-hidable").hide();


                $('#omdb-input').val('');

            });    

        }
        
        // Creates AJAX call for the specific movie being 
        // $.ajax({url: queryURL, method: 'GET'}).done(function(response) {

        //     console.log(response);

        //     
     
        // }); 

        return false;
    });    

// END OMDB API CODE
// =========================================

    // API selection
    $('.api-button').on('click', function(){

        var name = $(this).data('name');
        var apiName = eval(name);

        var lrgImg = apiName.large;
        var lrgInImg = apiName.largeIn;
        var lrgOutImg = apiName.largeOut;

        var width = $(document).width() - $('#squares-bottom-1').width();

        $('#squares-top-1').animate({ 'right': '0' }, 1200);
        $('#squares-bottom-1').animate({ 'left': width + 'px' }, 1200, function(){
            apiFadeIn(lrgImg, lrgInImg, lrgOutImg);
            $('#squares-bottom-1').removeClass('squares-bottom').addClass('squares-bottom-animated').removeAttr("style");
        });

        var sideDiv = $('<div>');
        sideDiv.attr('id', 'api-search');

        var sideTitle = $('<h3>'); //creates a new h3 element
        sideTitle.text(apiName.title); //adds text from object
        sideTitle.addClass('api-title'); //added class to image

        var sideImage = $('<img>'); //creates a new image element
        sideImage.attr('src', apiName.image); //added src attribute from object
        sideImage.addClass('api-button'); //added class to image

        var sideForm = $('<form>'); //creates a new form element

        var sideText = $('<input>'); //creates a new input element
        sideText.attr('id', apiName.id); //adds an id to input
        sideText.attr('autofocus'); //adds an id to input
        sideText.attr('type', 'text'); //adds text type to input
        sideText.addClass('form-control api-input'); //adds classes to input element
        sideText.attr('placeholder', apiName.placeholder); //adds text from object

        var sideLink = $('<button>'); //creates a new p element
        sideLink.attr('id', apiName.searchClass); //added src attribute from object
        sideLink.text('Submit'); //adds text from object
        sideLink.addClass('btn btn-primary api-search-button'); //added class to image

        var sideClose = $('<button>'); //creates a new p element
        sideClose.text('Go Back to APIs'); //adds text from object
        sideClose.attr('data-id', apiName.large); //adds data-id from object
        sideClose.attr('data-in', apiName.largeIn); //adds data-in from object
        sideClose.attr('data-out', apiName.largeOut); //adds data-out from object
        sideClose.addClass('btn btn-danger api-restore'); //added class to image

        (sideDiv).append(sideTitle); //appends dynamic element to sideDiv
        (sideDiv).append(sideImage); //appends dynamic element to sideDiv
        (sideForm).append(sideText); //appends dynamic element to sideForm
        (sideForm).append(sideLink); //appends dynamic element to sideForm
        (sideDiv).append(sideForm); //appends dynamic element to sideDiv
        (sideDiv).append(sideClose); //appends dynamic element to sideDiv

        $('#api-hidable').hide();

        $('#api-listen').prepend(sideDiv);//prepends dynamic element to listen div
        $('#api-listen input').focus();

    }); // End of api selection

    // Restores content to the way it was before api searches and selection
    $(document).on('click', '.api-restore', function(){

        var lrgImg = $(this).attr('data-id');
        var lrgInImg = $(this).attr('data-in');
        var lrgOutImg = $(this).attr('data-out');

        var width = $(document).width() - $('#squares-bottom-1').width();

        $('#squares-top-1').animate({ 'right': width + 'px' }, 1200, function(){
            $('#squares-top-1').removeAttr("style")    
        });

        $('#squares-bottom-1').animate({ 'right': width + 'px' }, 1200, function(){
            $('#squares-bottom-1').removeClass('squares-bottom-animated').addClass('squares-bottom').removeAttr("style");
        });

        apiFadeOut(lrgImg, lrgInImg, lrgOutImg);

        $('#api-search').hide();
        $('#api-hidable').show();
        $('.main-api-panel').hide();
        $("#main-hidable").show();

    });

    function apiFadeIn(lrgImg, lrgInImg, lrgOutImg){

        $('#' + lrgImg).addClass(lrgInImg).removeClass(lrgImg).removeClass(lrgOutImg);

    }

    function apiFadeOut(lrgImg, lrgInImg, lrgOutImg){

        $('#' + lrgImg).addClass(lrgOutImg).removeClass(lrgInImg), function(){
            restoreFade(lrgImg);    
        }   

    }

    function restoreFade(lrgImg){

        $('#' + lrgImg).addClass(lrgImg).removeClass(lrgOutImg); 

    }

});