import React from 'react';


function JsonTextAreaOne(props)
{
    const { textAreaOneJson, handleTextArea, prettyTextAreaOne, textAreaOneError } = props;
    return(
        <div>
            <textarea 
                placeholder="Enter JSON to compare, enter an URL to JSON" 
                tabIndex = "1" 
                className={ textAreaOneError !== '' ? 'home-text-area-error' : 'home-text-area' }
                name="textAreaOneJson"
                onChange = { handleTextArea }
                value = { textAreaOneJson }
            />
            {
                textAreaOneError !== '' ? <div className="home-text-area-error-text">{ textAreaOneError }</div> : null
            }
        </div>
    )
}

export default JsonTextAreaOne