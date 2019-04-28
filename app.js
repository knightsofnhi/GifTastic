$(document).ready(function () {
    
    var dreams = ["death", "falling", "dog", "cat", "baby"];
   
    createButtons();

    $(document).on('click', '.dream', function () {
      $('.card-columns').empty();
 
      var dream = $(this).html();
  

      // I got my API key from giphy, but it didn't work when I plugged it in below, so I used somebody else's.
      // my API key that doesn't work: https://api.giphy.com/v1/gifs/search?api_key=lYyzeBy5uCk32mVwRsZSGJqEkkdrzkZE&q=&limit=10&offset=0&rating=G&lang=en


      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + dream + "&api_key=3GckPlejeeiNIlDUzXR2AL7t2OkN1W0a&limit=10";
  
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function (response) {
        var results = response.data;
       
        for (var i = 0; i < results.length; i++) {
          var idTag = dream +i;
          var idTagFixed = idTag.split(' ').join('');    
          var card = $('<div>', {class: 'card', id: idTagFixed});
          var viewImg = results[i].images.fixed_height.url;
          var still = results[i].images.fixed_height_still.url;
          var dreamGif = $('<img>', {class: 'card-img-top img-fluid'})
            .attr('src', still)
            .attr('data-animate', viewImg)
            .attr('data-still', still)
            .attr('data-state', 'still')
            .on('click', playGif);
                   
          var cardBody = $('<div>', {class: 'card-body'});
          
          var title = $('<h4>', {class: 'card-title'});
          title = results[i].title;
          
          var rating = results[i].rating;
          var cardRating = $('<p>').text('Rating: ' + rating);

          cardBody.append(title);
          card.append(dreamGif);
          card.append(cardBody);

          $('.card-columns').append(card);
  
        } 
      });
  
    });  
   
    function playGif() {
      var state = $(this).attr('data-state');
  
      if (state === 'still') {
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
      } else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still')
      }
    };
  

    $(document.body).on("click", ".fa-star", function () {
   
      var parentCard = $(this).attr("data-parent");
      var parentCardID = "#" + parentCard;


    });
 
  

    function createButtons() {
      
      $('#buttons-view').empty();
    
      for (var i = 0; i < dreams.length; i++) {
    
        var btn = $('<button>');
        btn.addClass('dream btn');
        btn.attr('data-dream', dreams[i]);
        btn.text(dreams[i]);
      
        $('#buttons-view').append(btn);
      }
    };
  

    $('#addEmot').on('click', function (event) {
      event.preventDefault();
   
      var dream = $('#btnInput').val().trim();
    
      dreams.push(dream);
     
      createButtons();
    });
  
  })