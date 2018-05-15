var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var radius = canvas.height / 2;
ctx.translate(radius, radius);
radius = radius * 0.90;




function Clock() {

}
Clock.prototype.h = 5;
Clock.prototype.m = 0;
Clock.prototype.s = 0;
Clock.prototype.running = false;
Clock.prototype.idInterval = '';
Clock.prototype.init = function (hour, minute, second) {
    this.h = hour;
    this.m = minute;
    this.s = second;
}
Clock.prototype.update = function () {
    this.s++;
    if (this.s >= 60) {
        this.s = 0;
        this.m++;
    }
    if (this.m >= 60) {
        this.m = 0;
        this.h++;
    }
    if (this.h >= 12) {
        this.h = 0;
    }
}
Clock.prototype.run = function () {
    var self = this;
    self.idInterval = setInterval(function () {
        self.update();
        drawClock();
    }, 1000);
};
Clock.prototype.pause = function () {
    clearInterval(this.idInterval);
};
Clock.prototype.stop = function () {
    var self = this;
    this.pause();
    this.init(0,0,0);
    this.running = false;
};
var clock = new Clock();
function loadDefault() {
    if (clock.running == false) {

        document.getElementById("btnPause").disabled = true;
        document.getElementById("btnPlay").disabled = true;
        document.getElementById("btnStop").disabled = true;


    }
}
loadDefault();


function clockStart() {
    var hourInput = document.getElementById('hourInput').value;
    var minuteInput = document.getElementById('minuteInput').value;
    var secondInput = document.getElementById('secondInput').value;
    if (hourInput >= 0 && hourInput <= 12 && minuteInput >= 0 && minuteInput <= 60 && secondInput >= 0 && secondInput <= 60) {
        clock.init(hourInput, minuteInput, secondInput);
        clock.run();
        clock.startTriggered = true;

        setTimeout(function () {
            document.getElementById("btnPause").disabled = false;
            document.getElementById("btnStop").disabled = false;
            document.getElementById("btnStart").disabled = true;
        }, 1000);
    }
    else {
        alert("Ban da nhap sai dinh dang");
    }
}
function clockPause() {

    document.getElementById("btnPause").disabled = true;
    document.getElementById("btnPlay").disabled = false;
    clock.pause();
}
function clockPlay() {

    document.getElementById("btnPause").disabled = false;
    document.getElementById("btnPlay").disabled = true;
    clock.run();
}
function clockStop() {
    document.getElementById("btnStart").disabled = false;
    clock.stop();
}

function drawClock() {
    drawFace(ctx, radius);
    drawNumbers(ctx, radius);
    drawTime(ctx, radius);
}

function drawFace(ctx, radius) {
    var grad;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'black';
    ctx.fill();
    grad = ctx.createRadialGradient(0, 0, radius * 0.8, 0, 0, radius * 1.05);
    grad.addColorStop(0, '#5a5a5a');
    grad.addColorStop(0.5, '#5a5a5a');
    grad.addColorStop(1, '#5a5a5a');
    ctx.strokeStyle = grad;
    ctx.lineWidth = radius * 0.05;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.05, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
}

function drawNumbers(ctx, radius) {
    var ang;
    var num;
    ctx.font = radius * 0.18 + "px Bookman";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    for (num = 1; num < 13; num++) {
        ang = num * Math.PI / 6;
        ctx.rotate(ang);
        ctx.translate(0, -radius * 0.85);
        ctx.rotate(-ang);
        ctx.fillText(num.toString(), 0, 0);
        ctx.rotate(ang);
        ctx.translate(0, radius * 0.85);
        ctx.rotate(-ang);
    }
}

function drawTime(ctx, radius) {

    var now = new Date();
    var hour = clock.h;

    var minute = clock.m;

    var second = clock.s;
    // ctx.fillStyle = "white";
    //hour

    hour = hour % 12;
    hour = (hour * Math.PI / 6) +
        (minute * Math.PI / (6 * 60)) +
        (second * Math.PI / (360 * 60));
    ctx.strokeStyle = "White";
    drawHand(ctx, hour, radius * 0.45, radius * 0.04);
    //minute
    minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
    ctx.strokeStyle = "White";
    drawHand(ctx, minute, radius * 0.6, radius * 0.04);
    // second
    second = (second * Math.PI / 30);
    ctx.strokeStyle = "White";
    drawHand(ctx, second, radius * 0.75, radius * 0.02);
}

function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);

    ctx.stroke();
    ctx.rotate(-pos);
}