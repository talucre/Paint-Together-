import { makeAutoObservable } from 'mobx'

class CanvasState {
    canvas: HTMLCanvasElement | null = null
    undoList: string[] = []
    redoList: string[] = []

    constructor() {
        makeAutoObservable(this)
    }

    setCanvas(canvas: HTMLCanvasElement | null) {
        this.canvas = canvas
    }

    pushToUndo(data: string) {
        this.undoList.push(data)
    }

    pushToRedo(data: string) {
        this.redoList.push(data)
    }

    undo() {
        // create local ref so TypeScript is sure that
        // it won't change during asynchronous img.onload method
        const canvas = this.canvas
        const ctx = canvas?.getContext('2d')

        if (!canvas || !ctx) return

        if (this.undoList.length > 0) {
            const dataUrl = this.undoList.pop()!
            this.redoList.push(canvas.toDataURL())
            const img = new Image()
            img.src = dataUrl
            img.onload = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height)
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
            }
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
        }
    }

    redo() {
        // create local ref so TypeScript is sure that
        // it won't change during asynchronous img.onload method
        const canvas = this.canvas
        const ctx = this.canvas?.getContext('2d')

        if (!canvas || !ctx) return

        if (this.redoList.length > 0) {
            const dataUrl = this.redoList.pop()!
            this.undoList.push(canvas.toDataURL())
            const img = new Image()
            img.src = dataUrl
            img.onload = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height)
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
            }
        }
    }
}

export default new CanvasState()
