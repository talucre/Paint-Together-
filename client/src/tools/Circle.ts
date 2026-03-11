import Tool from '@/tools/Tool.ts'

export default class Circle extends Tool {
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

            let dx = currentX - this.startX
            let dy = currentY - this.startY
            let d = Math.sqrt(dx * dx + dy * dy)

            let centerX = this.startX + dx / 2
            let centerY = this.startY + dy / 2

            let r = d / 2

            this.draw(centerX, centerY, r)
        }
    }

    private draw(x: number, y: number, radius: number) {
        const img = new Image()
        img.src = this.saved
        img.onload = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            this.ctx.beginPath()
            this.ctx.arc(x, y, radius, 0, Math.PI * 2)
            this.ctx.fill()
            this.ctx.stroke()
        }
    }
}
