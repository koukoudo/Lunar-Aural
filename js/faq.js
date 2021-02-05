$(document).ready(() => {
    $('.question').click(function() {
        var question = $(this);
        console.log(question);
        var ans = $(this).next();

        var icon = $(this).children();
        if (ans.css('display') == 'none') {
            question.css('text-decoration', 'underline');
            icon.text('expand_less');
            ans.show();
        } else {
           question.css('text-decoration', 'none');
            icon.text('expand_more');
            ans.hide();
        }
    })
})