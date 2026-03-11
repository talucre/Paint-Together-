import Tool from '@/tools/Tool.ts'

export default class Eraser extends Tool {
    private mouseDown: boolean = false

    constructor(canvas: HTMLCanvasElement) {
        super(canvas)
        this.listen()

        this.ctx.strokeStyle = '#FFF'
    }

    private listen() {
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
    }

    private mouseUpHandler(_e: MouseEvent) {
        this.mouseDown = false
    }

    private mouseDownHandler(e: MouseEvent) {
        this.mouseDown = true
        this.ctx.beginPath()
        this.ctx.moveTo(
            e.pageX - this.canvas.offsetLeft,
            e.pageY - this.canvas.offsetTop,
        )
    }

    private mouseMoveHandler(e: MouseEvent) {
        if (this.mouseDown) {
            this.draw(
                e.pageX - this.canvas.offsetLeft,
                e.pageY - this.canvas.offsetTop,
            )
        }
    }

    private draw(x: number, y: number) {
        this.ctx.lineTo(x, y)
        this.ctx.stroke()
    }
}
