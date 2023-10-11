

export function drawBorderOnCtx(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number) {
    ctx.beginPath();
    ctx.strokeStyle = 'gray'
    ctx.rect(x, y, width, height);
    ctx.stroke();
}