import React from 'react';


function JsonTextAreaTwo(props)
{
    const { handleTextArea, textAreaTwoJson, textAreaTwoError } = props;
    return(
        <div>
            <textarea 
                placeholder = "Enter JSON to compare, enter an URL to JSON" 
                tabIndex = "1" 
                name = "textAreaTwoJson"
                className = { textAreaTwoError !== '' ? 'home-text-area-error' : 'home-text-area' }
                onChange = { handleTextArea }
                value = { textAreaTwoJson }
            />
            {
                textAreaTwoError !== '' ? <div className="home-text-area-error-text">{ textAreaTwoError }</div> : null
            }
        </div>
    )
}

export default JsonTextAreaTwo