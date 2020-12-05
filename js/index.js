setInterval(() => {
    let d = new Date();
    let h = d.getHours();
    let min = d.getMinutes();
    let t = 'AM';
    let sep = ":";
    if(h>12){
        h = h-12;
        t = "PM";
    }
    if(h.toString().length=='1'){
        h = "0"+h;
    }
    if(min.toString().length=='1'){
        min = "0"+min;
    }
    $("#hour").text(h);
    $("#sep").text(sep);
    $("#min").text(min);
    $("#mode").text(t);
}, 1000);

setInterval(() => {
    $("#sep").toggleClass("hidev");
}, 500);

setInterval(() => {
    if(navigator.onLine){
        $("#network i").addClass('fa-signal');
        $("#network i").removeClass('fa-times');
    }else{
        $("#network i").addClass('fa-times');
        $("#network i").removeClass('fa-signal');
    }
}, 3000);

var openApps = [];


function open_app(app){
    openApps.push(app);
    $('#'+app).addClass('w3-show');
    options();
}

function close_app(app){
    delete openApps[openApps.indexOf(app)];
    $('#'+app).removeClass('w3-show');
    options();
}

function insert(n){
    $("#display").append(n);
}

function back(){
    let x = $("#display").text();
    x = x.substr(0, x.length-1);
    $("#display").text(x);
}

$('#todo .addBtn').click(function (e) { 
    let a = $('#todo .w3-rest').text();
    let item = $('<div></div>').attr('class','items');
    let circle = $('<div></div>').attr('class','w3-ripple w3-left w3-padding-small circle').html('<i class="far fa-circle"></i>');
    let name = $('<div></div>').attr('class','w3-left w3-padding-small name');
    let del = $('<div></div>').attr('class','w3-ripple w3-padding-small w3-right').html('<i class="fas fa-trash"></i>');
    name.text(a);
    item.append(circle, name, del);
    $('#list_view').append(item);
    $('#list_view .fa-trash').click(function(){
        $(this).closest('.items').remove();
    })
    $('#list_view .circle i').click(function(){
        $(this).toggleClass('fa-circle');
        $(this).toggleClass('fa-check-circle');
        $(this).parent().next().toggleClass('w3-disabled');
    })
    $('#todo .w3-rest').text("");
});

var isMoving = false;

function options(){
openApps.forEach(elem => {
    document.getElementById(elem+'_title').addEventListener('mousedown', function(){
        isMoving = true;
    });
    document.getElementById(elem+'_title').addEventListener('mouseup', function(){
        isMoving = false;
    });
    document.getElementById(elem).addEventListener('mousemove', function(e){
        if(isMoving){
            document.getElementById(elem).style.top = (e.clientY-15)+'px';
            document.getElementById(elem).style.left = (e.clientX-110)+'px';
        }
    });
});
}