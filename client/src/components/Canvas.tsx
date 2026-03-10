import '@/styles/canvas.scss'

const Canvas = () => {
    return (
        <div className="canvas">
            {/* Need to specify size directly for correct displaying */}
            <canvas width={600} height={400} />
        </div>
    )
}

export default Canvas
