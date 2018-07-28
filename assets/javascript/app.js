var themes = ["Neon Cat","Harry Potter","Drag","Yass"];


function displayGiphy() {


var theme = $(this).attr("data-name");
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + theme + "&api_key=VDYJSR4KJo58JsvFCqC3Yj7325k3lq32&limit=10";

    console.log(queryURL);
  


	$.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
        	var results = response.data;
            console.log(results);
            $(".giphy-display").empty();
            for (var i = 0; i < results.length; i++) {
        	
                var showDiv = $("<div class='float-left'>");
    
                var rating = results[i].rating;
                var defaultAnimatedSrc = results[i].images.fixed_width.url;
                var staticSrc = results[i].images.fixed_width_still.url;
                var showImage = $("<img>");
                var p = $("<p>");
                p.addClass("mb-2");
                p.text("Rating: " + rating);
    
                showImage.attr("src", staticSrc);
                showImage.addClass("pausePlay");
                showImage.attr("data-state", "still");
                showImage.attr("data-still", staticSrc);
                showImage.attr("data-animate", defaultAnimatedSrc);
                showDiv.append(p);
                showDiv.append(showImage);
                $(".giphy-display").prepend(showDiv);
            }
     
    });

}


    function renderButtons() {

       
        $(".btn-view").empty();
        for (var i = 0; i < themes.length; i++) {

          var a = $("<button>");
          a.addClass("giphy-btn ml-1 mr-1");
          a.attr("data-name", themes[i]);
          a.text(themes[i]);
          $(".btn-view").append(a);

        }
      }


      $(".fetch").on("click", function(event) {
        event.preventDefault();
        
        var theme = $(".theme-input").val().trim();

        
        themes.push(theme);
        renderButtons();
      });

     

       
      function pausePlayGifs() {
           var state = $(this).attr("data-state");
          if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
      }
    }
    
    
    $(document).on("click", ".pausePlay", pausePlayGifs);
      $(document).on("click", ".giphy-btn", displayGiphy);

    
      renderButtons();
