import React from 'react';


function SampleJson({ textAreaTwoJson, jsonDiffError }) {

    // useEffect(() => {
    //     getJsonData();
    // })

    const JsonCodeDisplay = (key, value) => {
        var result = '';
        if (typeof value === 'string') {
            result = <span>"{key}" :"{value}"</span>
        }
        if (typeof value === 'object'){
            if (Array.isArray(value)) {
                result = (
                    <span>"{key}" : &#91; <br/>
                        {value.map((key) =>(
                            Object.entries(key).map(([key,value], index) => (
                                <span key={index}>
                                    <span>&#123;<br /></span>
                                        {JsonCodeDisplay(key, value)}
                                    <span>&#125;<br/></span>
                                </span>
                            ))
                        ))}
                        <span>&#93;<br/></span>
                    </span>
                )
            }
            else if(typeof value === 'object'){
                result = (
                    <span>"{key}" : &#123; <br/>
                        {
                            Object.entries(value).map(([key, value], index) => (
                                <span key={index}>
                                    {JsonCodeDisplay(key, value)}
                                </span>  
                            ))
                        }
                        <span>&#124;<br/></span>
                    </span>
                )
            }
        }
        // result = <span className="sample-json-span">"{key}" :"{value}"</span>
        // console.log(result)
        return result
    }

    return (
        <div className="home-text-area">
            <span>&#123;<br /></span>
            {
                Object.entries(textAreaTwoJson).map(([key, value], index) => (
                    <div key={index}>
                        {JsonCodeDisplay(key, value, Object.keys(textAreaTwoJson).length)}
                    </div>
                ))
            }
            <span>&#125;</span>
        </div>
    )

}

export default SampleJson