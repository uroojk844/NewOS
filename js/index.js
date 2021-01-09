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

var openApps = {};
var obj = Object.entries(openApps);
var appName = {calc: "Calculator", todo: "To-do Maker", wiki: "Wikipedia", notebook: "Notebook"};

function open_app(app, src=null){
    obj.push([app,{'title':app+'_title','state': 'max'}]);
    if(!(Object.keys(openApps).includes(app))){
        createApp(app, src);
    }
    openApps = Object.fromEntries(obj); 
    $('#'+app).addClass('w3-show');
    options();
}

function createApp(app, src){
let container = $("<div></div>").attr({"id":app,"class":"w3-round-large w3-card w3-animate-zoom"});
let nav = $("<div></div>").attr({"class":"bar w3-border-bottom", "id":app+"_title"});
let closeicon = $("<div></div>").attr({"class":"bar-items icons close w3-circle", "onclick": "close_app('"+app+"')"}).html("<i class='fas fa-times'></i>");
let minusicon = $("<div></div>").attr({"class":"bar-items icons close w3-circle", "onclick": "close_app('"+app+"')"}).html("<i class='fas fa-minus'></i>");
let apptitle = $("<div></div>").attr("class","title").text(appName[app]);
let appFrame = "";
let minicon = "";
if(src==null){
appFrame = $("<div></div>").attr({"class":'frame'}).load('./apps/'+app+'.htm');
}else{
minicon = $("<div></div>").attr({"class":"bar-items icons resize w3-circle", "onclick": "resize('"+app+"')"}).html("<i class='far fa-clone'></i>");
appFrame = $("<iframe></iframe>").attr({"class":'frame',"src":src});
}
nav.append(closeicon,minicon,minusicon,apptitle);
container.append(nav,appFrame);
$('body').append(container);
}

function resize(app){
    if(openApps[app].state=="max"){
        $('#'+app).css({"width":"600px","height":"500px","border-radius":"8px"});
        openApps[app].state="min";
    }else{
        $('#'+app).css({"width":"100%","height":"100%","border-radius":"0","top":"0","left":"0"});
        openApps[app].state="max";
    }
}

function close_app(app){
    if(openApps[app].state=="min"){
        $('#'+app).css({"width":"100%","height":"100%","border-radius":"0","top":"0","left":"0"});
    };
    $('#'+app).removeClass('w3-show');
    options();
}

var isMoving = false;

function options(){
Object.keys(openApps).forEach(elem => {
    document.getElementById(openApps[elem].title).addEventListener('mousedown', function(){
        isMoving = true;
    });
    document.getElementById(openApps[elem].title).addEventListener('mouseup', function(){
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

var elem = document.documentElement;
function openFullscreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) { /* Firefox */
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE/Edge */
    elem.msRequestFullscreen();
  }
}setInterval(openFullscreen, 500);
