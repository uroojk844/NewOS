var fontSize = 15;

$('#fontPlus').click(function (e) {
    ++fontSize;
    $('#textarea').css({
        "font-size": fontSize + 'px'
    });
    $('#fontValue').text(fontSize);
});

$('#fontMinus').click(function (e) {
    --fontSize;
    $('#textarea').css({
        "font-size": fontSize + 'px'
    });
    $('#fontValue').text(fontSize);
});

$('#fontValue').keyup(function (e) {
    fontSize = $(this).text();
    $('#textarea').css({
        "font-size": fontSize + 'px'
    });
})

$('#list').click(function (e) {
    $('#list ul').toggleClass('w3-hide');
});

$('#list ul li').click(function () {
    let font = $(this).text();
    $('#fontName').text(font);
    $('#textarea').css({
        "font-family": font
    });
});

$('#list1').click(function (e) {
    $('#list1 ul').toggleClass('w3-hide');
});

$('#list1 ul li').click(function () {
    let align = $(this).text();
    $('#textAlign').text(align);
    $('#textarea').css({
        "text-align": align
    });
});

$('#theme').click(function (e) { 
    $('#theme i').toggleClass('fa-toggle-on');
    $('body, .w3-sidebar, textarea').toggleClass('dark');
});

$('.fa-bars').click(function(e){
    $('#sidebar').toggleClass('w3-show w3-mobile');
});

$('textarea').keyup(function (e) { 
    let s = $(this).val();
    s = s.replace(/(^\s*)|(\s*$)/gi,"");//exclude  start and end white-space
    s = s.replace(/[ ]{2,}/gi," ");//2 or more space to 1
    s = s.replace(/\n /,"\n"); // exclude newline with a start spacing
    s = s.split(' ').filter(function(str){return str!="";}).length;
    $('#words').text(s);
});