$(document).ready(() => {
    $('#scroll-home').click(() => {
        $([document.documentElement, document.body]).animate({
            scrollTop: $('#scene').offset().top
        }, 800);
    })
})