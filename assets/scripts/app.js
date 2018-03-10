let btnArr = ['Blade Runner', 'Interstellar', 'Fifth Element']

$(document).ready(function () {
  $('.movie-title').val('');

  initButtons()

  $('.btn-search').on('click', (event) => {
    event.preventDefault()

    if (!createNewButton()) {
      return
    }
  })

  $(document).on('click', '.btn-gif', (event) => {
    event.preventDefault()

    var searchTerm = $(event.currentTarget).data('name')

    populateGifs(searchTerm);
  })

  $(document).on('click', '.gif-state-btn', (event) => {
    event.preventDefault()

    $(event.currentTarget).text('Play')

    var $img = $('.card-img', $(event.currentTarget).parent().parent().parent());

    if ($($img).data('state') === 'playing') {
      $($img).attr('src', $($img).data('paused-src'))
      $($img).data('state', 'paused')
      $(event.currentTarget).text('Play')
    }
    else if ($($img).data('state') === 'paused') {
      $($img).attr('src', $($img).data('playing-src'))
      $($img).data('state', 'playing')
      $(event.currentTarget).text('Pause')
    }
  })
})

function initButtons() {
  for (let i = 0; i < btnArr.length; i++) {
    var $newBtn = $('<button>').attr('class', 'btn btn-outline-info btn-gif').attr('data-name', btnArr[i]).text(btnArr[i])
    $('.btn-container').append($newBtn)
  }
}

function createNewButton () {
  var title = $('.movie-title').val()
  $('.movie-title').val('');

  if (title === '') {
    return false
  }

  var $newBtn = $('<button>').attr('class', 'btn btn-outline-info btn-gif').attr('data-name', title).text(title)
  $('.btn-container').append($newBtn)

  return true
}

function populateGifs (searchTerm) {
  for (let i = 0; i < 10; i++) {
    $('.card.gif-result-' + i).removeClass('bounceIn');
    $('.card.gif-result-' + i).addClass('bounceOut');
  }

  setTimeout(() => {
    for (let i = 0; i < 10; i++) {
      $('.card.gif-result-' + i).addClass('invisible');
    }
  }, 600)

  setTimeout(() => {
    $.get('https://api.giphy.com/v1/gifs/search?q=' + searchTerm + '&api_key=MUX29REBSPSXcbKKHoXY17xf11GYTExH&rating=pg&limit=10', (response) => {
      for (let i = 0; i < response.data.length; i++) {
        $('.card.gif-result-' + i).addClass('invisible');

        var imgSrcGif = response.data[i].images.fixed_width.url;
        var imgSrcStill = response.data[i].images.fixed_width_still.url;

        $('.card-img', '.gif-result-' + i).attr('data-paused-src', imgSrcStill);
        $('.card-img', '.gif-result-' + i).attr('data-playing-src', imgSrcGif);

        var rating = response.data[i].rating;
        $('.card-img', '.gif-result-' + i).attr('src', imgSrcGif);
        $('.rating', '.gif-result-' + i).text(rating);
        $('.card.gif-result-' + i).removeClass('invisible bounceOut');
        $('.card.gif-result-' + i).addClass('bounceIn');
      }
    })
  }, 1500)
}