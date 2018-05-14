var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
const startPoint = 200;
var Clock = {
    position: startPoint,
    radius: 200,
    background: 'black',
};
var CenterPoint = {
    position: startPoint,
    radius: 10,
    background: 'white',
};

drawCircle(ctx,Clock.position,Clock.radius,Clock.background);
drawCircle(ctx,CenterPoint.position,CenterPoint.radius,CenterPoint.background);
drawNumber(ctx, 200 * 0.90 );
function drawCircle(ctx,position,radius,color) {
    ctx.beginPath();
    ctx.arc(position, position, radius, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
}
function drawNumber(ctx, radius ){
    var ang;
    var num;
    ctx.font = radius*0.2 + "px Raleway";
    ctx.textBaseline="middle";
    ctx.textAlign="center";
    for(num = 1; num < 13; num++){
      ang = num * Math.PI / 6;
    //   ctx.rotate(ang);
      ctx.translate(0, -radius*0.85);
    //   ctx.rotate(-ang);
      ctx.fillText(num.toString(), 200,200);
    //   ctx.rotate(ang);
    //   ctx.translate(0, radius*0.85);
    //   ctx.rotate(-ang);
    }
    
}

