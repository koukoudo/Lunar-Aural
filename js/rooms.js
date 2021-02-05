$(document).ready(() => {
    $('.room').click(function() {
        var id = '#' + $(this).attr('id');
        if ($(id).hasClass('flipped')) {
            $(id).removeClass('flipped');
            $(id).addClass('unflipped');
            setTimeout(() => {
                if (id == '#room-single') {
                    $('#overlay-single').remove();
                } else {
                    $('#overlay-double').remove();
                }
            }, 1000)
        } else {
            $(id).addClass('flipped');
            if ($(id).hasClass('unflipped')) {
                $(id).removeClass('unflipped');
            }
            setTimeout(() => {
                if (id == '#room-single') {
                    $(id).append('<div class="room-overlay" id="overlay-single"></div>');
                    $('#overlay-single').append('<p>No lover to stargaze with? Why not invite your best friend for a stay in our singly mingly domes.</p>')
                    $('#overlay-single').append('<p>starting from $1000 per person per night</p>')
                } else {
                    $(id).append('<div class="room-overlay" id="overlay-double"></div>');
                    $('#overlay-double').append('<p>For a romantic setting unlike any other, snuggle into our baby-making domes with your loved one.</p>')
                    $('#overlay-double').append('<p>starting from $1500 per couple per night</p>')
                }
            }, 1000)
        }
    })
})