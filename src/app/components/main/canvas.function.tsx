import { useRef, useEffect } from "react";

const Canvas = (props) => {
  const { draw, className, ...rest } = props;
  const canvasRef = useRef(null);

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
