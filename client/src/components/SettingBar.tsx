import '@/styles/setting-bar.scss'
import toolState from '@/store/toolState.ts'

const SettingBar = () => {
    return (
        <div className="setting-bar">
            <label htmlFor="line-width">Толщина линии</label>
            <input
                onChange={e => toolState.setLineWidth(Number(e.target.value))}
                id="line-width"
                type="number"
                defaultValue={1}
                min={1}
                max={50}
                style={{ margin: '0 10px' }}
            />
            <label htmlFor="stroke-color">Цвет обводки</label>
            <input
                onChange={e => {
                    toolState.setStrokeColor(e.target.value)
                }}
                id="stroke-color"
                type="color"
                style={{ margin: '0 10px' }}
            />
        </div>
    )
}

export default SettingBar
