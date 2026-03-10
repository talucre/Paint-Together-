import Tool from '@/tools/Tool.ts'

export default class Brush extends Tool {
    mouseDown: boolean = false

    constructor(canvas: HTMLCanvasElement) {
        super(canvas)
        this.listen()
    }

    listen() {
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
    }

    mouseUpHandler(_e: MouseEvent) {
        this.mouseDown = false
    }

    mouseDownHandler(e: MouseEvent) {
        this.mouseDown = true
        this.ctx.beginPath()
        // @ts-ignore
        this.ctx.moveTo(
            e.pageX - e.target!.offsetLeft,
            e.pageY - e.target!.offsetTop,
        )
    }

    mouseMoveHandler(e: MouseEvent) {
        if (this.mouseDown) {
            this.draw(
                e.pageX - e.target!.offsetLeft,
                e.pageY - e.target!.offsetTop,
            )
        }
    }

    draw(x: number, y: number) {
        this.ctx.lineTo(x, y)
        this.ctx.stroke()
        console.log('draw brush')
    }
}
