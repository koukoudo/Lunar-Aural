$(document).ready(() => {
    var page, curved;

    if (window.location.hash) {
        page = window.location.hash;

        $('#page-content').children().hide();

        $('#nav-options a').each(function () {
            if (page == $(this).attr('href')) {
                $(this).css({'text-shadow': '1px 1px black', 'color': 'white'});
            } else {
                $(this).css({'text-shadow': 'none', 'color': 'black'});
            }
        })

        if (page == '#rooms' || page == '#contact') {
            $(page).css('display', 'flex');
        } else {
            $(page).show();
        }

        if (page == '#activities' && curved == undefined) {
            curved = new CircleType($('.curve')[0]).radius(650).forceWidth(true);
            $(curved.element).fitText(1.1);
        }

        if (page == '#about') {
            $('#about').css('display', 'flex');
            $('#about-vid').get(0).play();
        } else {
            $('#about-vid').get(0).pause(); 
        }

        $('#scroll-top').show();
    } else {
        window.location.hash = 'home';
        $('#home').show();
        $('#nav-options a').first().css({'text-shadow': '1px 1px black', 'color': 'white'});
    }

    $(document.body).scrollTop(0);

    function navAnimation() {
         {
            if ($('#nav-options').hasClass('expand-active')) {
                $('#nav-main').removeClass('expand-active');
                $('#nav-options').toggleClass('expand-active');
            } else {
                setTimeout(() => {
                    $('#nav-options').addClass('expand-active');
                }, 180)
                $('#nav-main').addClass('expand-active');
            }
            
            if ($('nav i').text() == 'menu') {
                $('nav i').text('clear');
            } else {
                $('nav i').text('menu');
            }
        }
    }

    $('#icon-menu').click(() => {
        navAnimation();
    })

    $('.nav-link').on('click', function() {
        page = $(this).attr('href');
        
        $('#page-content').children().hide();

        if (page == '#rooms' || page == '#contact') {
            $(page).css('display', 'flex');
        } else {
            $(page).show();
        }

        if (page == '#activities' && curved == undefined) {
            curved = new CircleType($('.curve')[0]).radius(650).forceWidth(true);
            $(curved.element).fitText(1.1);
        }

        if (page == '#about') {
            $('#about').css({'display': 'flex', 'justify-content': 'center', 'align-items': 'center'});
            $('#about-vid').get(0).play();
        } else {
            $('#about-vid').get(0).pause(); 
        }

        $('#scroll-top').show();

        $('#nav-options a').each(function () {
            if (page == $(this).attr('href')) {
                $(this).css({'text-shadow': '1px 1px black', 'color': 'white'});
            } else {
                $(this).css({'text-shadow': 'none', 'color': 'black'});
            }
        })

        navAnimation();
    })
})