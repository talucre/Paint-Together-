import { makeAutoObservable } from 'mobx'
import type Tool from '@/tools/Tool.ts'

class ToolState {
    tool: Tool | null = null

    constructor() {
        makeAutoObservable(this)
    }

    setTool(tool: Tool | null) {
        this.tool = tool
    }
}

export default new ToolState()
