$(document).ready(() => {
    $('.activity').scrollClass()

    $('#icon-scroll-1').click(() => {

        $([document.documentElement, document.body]).animate({
            scrollTop: $('#activity-train').offset().top - 100
        }, 800);
    })

    $('#icon-scroll-2').click(() => {
        $([document.documentElement, document.body]).animate({
            scrollTop: $('#activity-med').offset().top - 100
        }, 1000);
    })

    $('#icon-scroll-3').click(() => {
        $([document.documentElement, document.body]).animate({
            scrollTop: $('#activity-dance').offset().top - 100
        }, 1000);
    })

    $('#scroll-top > p').hover(() => {
        $('#scroll-top i').css('font-weight', '600');
    }, () => {
        $('#scroll-top i').css('font-weight', '500');
    })

    $('#scroll-top *').click(() => {
        $([document.documentElement, document.body]).animate({
            scrollTop: 0
        }, 1000);
    })
})