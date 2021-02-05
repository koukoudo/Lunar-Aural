$(document).ready(() => {
    var select, timer;
    var i = 2;

    $('#about-start').click(function() {
        $(this).hide();
        $('#about-1').css('display', 'block');
        $('#about-1').animate({
            opacity: '1'
        });
        setTimeout(() => {
            $('#about-1').css('display', 'none');
            $('#about-1').animate({
                opacity: '0'
            });    
        }, 8500);
        timer = setInterval(fadeIn, 9000);
    })

    function fadeIn() {
        select = '#about-' + i;
        $(select).css('display', 'block');
        $(select).animate({
            opacity: '1'
        })

        setTimeout(() => {
            $(select).css('display', 'none');
            $(select).animate({
                opacity: '0'
            })
        }, 8500);

        i++;
        if (i > 8) {
            clearInterval(timer);
            i = 3;
            setTimeout(() => {
                timer = setInterval(countDown, 4000);
            }, 4500)
        }
    }

    function countDown() {
        $('#about').append('<p class="countdown">' + i + '</p>');
        setTimeout(() => {
            $('.countdown').remove();
        }, 3000);
        i--;
        if (i < 0) {
            $('#about-vid').get(0).pause(); 
            $('#about-vid').css('display', 'none');
            setTimeout(() => {
                $('#about').append('<h1 class="countdown">Lunar Aural</h1>');
            }, 3000);
            clearInterval(timer);
        }
    }
})