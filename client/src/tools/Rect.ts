import Tool from '@/tools/Tool.ts'

export default class Rect extends Tool {
    private mouseDown: boolean = false
    private saved: string = ''
    private startX: number = 0
    private startY: number = 0

    constructor(canvas: HTMLCanvasElement) {
        super(canvas)
        this.listen()
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
        this.startX = e.pageX - this.canvas.offsetLeft
        this.startY = e.pageY - this.canvas.offsetTop
        this.saved = this.canvas.toDataURL()
    }

    private mouseMoveHandler(e: MouseEvent) {
        if (this.mouseDown) {
            let currentX = e.pageX - this.canvas.offsetLeft
            let currentY = e.pageY - this.canvas.offsetTop

            let width = currentX - this.startX
            let height = currentY - this.startY

            this.draw(this.startX, this.startY, width, height)
        }
    }

    private draw(x: number, y: number, w: number, h: number) {
        const img = new Image()
        img.src = this.saved
        img.onload = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            this.ctx.beginPath()
            this.ctx.rect(x, y, w, h)
            this.ctx.fill()
            this.ctx.stroke()
        }
    }
}
