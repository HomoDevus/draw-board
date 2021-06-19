import React, {useRef, useState, useEffect} from 'react';

function Canvas(props) {
    const canvasRef = useRef();
    const ctxRef = useRef();

    const [windowSize, setWindowSize] = useState({width: window.innerWidth, height: window.innerHeight});
    const [drawing, setDrawing] = useState(false);

    useEffect(() => {
        ctxRef.current = canvasRef.current.getContext('2d')
        window.addEventListener('resize', handleResize);
        return window.removeEventListener('resize', handleResize)
    }, [])

    function handleMouseMove(e) {
        // actual coordinates
        const coords = [
            e.clientX - canvasRef.current.offsetLeft,
            e.clientY - canvasRef.current.offsetTop
        ]
        if (drawing) {
            ctxRef.current.lineTo(...coords)
            ctxRef.current.stroke()
        }
        if (props.handleMouseMove) {
            props.handleMouseMove(...coords)
        }
    }
    function handleResize() {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }
    function startDrawing(e) {
        ctxRef.current.lineJoin = 'round'
        ctxRef.current.lineCap = 'round'
        ctxRef.current.lineWidth = 10
        ctxRef.current.strokeStyle = props.color
        ctxRef.current.beginPath();
        // actual coordinates
        ctxRef.current.moveTo(
            e.clientX - canvasRef.current.offsetLeft,
            e.clientY - canvasRef.current.offsetTop
        )
        setDrawing(true)
    }
    function stopDrawing() {
        ctxRef.current.closePath()
        setDrawing(false)
    }
    return (
        <React.Fragment>
            <canvas
                ref={canvasRef}
                width={props.width || windowSize.width}
                height={props.height || windowSize.height}
                onMouseDown={startDrawing}
                onMouseUp={stopDrawing}
                onMouseOut={stopDrawing}
                onMouseMove={handleMouseMove}
            />
        </React.Fragment>
    )
}

export default Canvas;