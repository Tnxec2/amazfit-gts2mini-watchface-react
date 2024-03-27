import { useRef, useEffect } from "react";

const Canvas = (props) => {
  const { draw, className, scaleFactor, ...rest } = props;
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.scale(1, 1)
    context.scale(scaleFactor, scaleFactor)
  }, [scaleFactor])

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const render = () => {
      draw(canvas, context);
    };
    render();
  }, [draw]);

  return <canvas className={className} ref={canvasRef} {...rest} />;
};

export default Canvas;
