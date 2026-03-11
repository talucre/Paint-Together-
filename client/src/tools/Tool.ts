export default class Tool {
    protected readonly canvas: HTMLCanvasElement
    protected readonly ctx: CanvasRenderingContext2D

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')!
        this.ctx.fillStyle = '#000'
        this.ctx.strokeStyle = '#000'
        this.destroyEvents()
    }

    private destroyEvents() {
        this.canvas.onmousemove = null
        this.canvas.onmousedown = null
        this.canvas.onmouseup = null
    }
}
