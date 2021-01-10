import React from 'react';


function JsonDiffError(props) {

    const { jsonDiffError } = props;
    var jsonDiffErrorObject = Object.keys(jsonDiffError);

    const keyNameCreate = (keyName) => {
        if (keyName === 'keyMismatch') {
            return "Key Mismatch"
        }
        else if (keyName === 'ValueMismatch') {
            return "Value Mismatch"
        }
        else if (keyName === 'ArrayLengthMismatch') {
            return "Array Length Mismatch"
        }
    }

    const keySentence = (keyName, keyInfo) => {
        var result = '';
        if (keyName === 'keyMismatch') {
            if (keyInfo.LeftJson) {
                result = <div>Missing Property <code>{keyInfo.LeftJson}</code> from the object on the right side</div>
            }
            else if (keyInfo.RightJson) {
                result = <div>Missing Property <code>{keyInfo.RightJson}</code> from the object on the left side</div>
            }
        }
        if (keyName === 'ValueMismatch') {
            result = <div>Both side Keys must have same String <code>{keyInfo.LeftJson}, {keyInfo.RightJson}</code></div>
        }
        if (keyName === 'ArrayLengthMismatch') {
            result = Object.keys(keyInfo).map((keys) => {
                return keys === 'LeftJson' ? <div>Missing Property length <code>{keyInfo.LeftJson}</code> from the object on the right side</div> :
                    <div>Missing Property length <code>{keyInfo.RightJson}</code> from the object on the left side</div>
            })
        }

        return result
    }

    return (
        <div className="json-diff-container">
            <div className="row">
                {
                    jsonDiffErrorObject.map((objectKey, index) => (
                        jsonDiffError[objectKey].length > 0 ?
                            <div className="col-md-6" key={index}>
                                <div className="json-diff-head">{keyNameCreate(objectKey)}</div>
                                <div className={jsonDiffError[objectKey].length > 10 ? 'row json-diff-body-scroll' : 'row json-diff-body'}>
                                    {
                                        jsonDiffError[objectKey].map((keyInfo, index) => (
                                            <div key={index}>
                                                {keySentence(objectKey, keyInfo)}
                                            </div>
                                        ))
                                    }
                                </div>
                            </div> :
                            null
                    ))
                }
            </div>
        </div>
    )
}

export default JsonDiffError
