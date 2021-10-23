

export default function drawText(ctx: CanvasRenderingContext2D) {
    // change font and font-size for better visibilty   
    ctx.font = "40px Verdana";    
    
    // draw "Test text" at X = 10 and Y = 30   
    ctx.fillText( "Test text", 10, 30 );
}

function rotate(ctx: CanvasRenderingContext2D) {
    var x = new Array("Day1","Day2","Day3","Day4","Day5");
    for(var i = 0; i < x.length; i++){
        var size = ctx.measureText(x[i]);
        ctx.save();
        var tx = (i*50+20) + (size.width/2);
        var ty = (50);
        ctx.translate(tx,ty);
        ctx.rotate(Math.PI / 10);
        ctx.translate(-tx,-ty);
        ctx.fillText(x[i],i*50+20,50);
        ctx.restore();
    }
}