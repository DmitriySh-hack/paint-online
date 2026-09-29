import React from 'react'
import '../styles/toolbar.scss'
import toolState from '../store/toolState'

const Settingbar = () => {
    return (
        <div className='settingbar'>
            <label htmlFor='line-width'>Толщина линии:</label>
            <input
                onChange={(e) => toolState.setLineWidthTool(Number(e.target.value))}
                style={{marginLeft: '5px'}} 
                id="line-width" 
                type="number" 
                defaultValue={1} 
                min={1} 
                max={50}
            />
        </div>
    )
}

export default Settingbar