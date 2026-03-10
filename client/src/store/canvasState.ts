import { makeAutoObservable } from 'mobx'

class CanvasState {
    canvas: HTMLCanvasElement | null = null

    constructor() {
        makeAutoObservable(this)
    }

    // @ts-ignore
    setCanvas(canvas: HTMLCanvasElement | null) {
        this.canvas = canvas
    }
}

export default new CanvasState()
