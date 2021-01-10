import React, { useState } from 'react';
import Header from '../Components/Header';
import JsonTextAreaOne from '../Components/JsonTextAreaOne';
import JsonTextAreaTwo from '../Components/JsonTextAreaTwo';
import JsonDiffError from '../Components/JsonDiffError';
import PrettyJsonOne from '../Components/PrettyJsonOne';
import PrettyJsonTwo from '../Components/PrettyJsonTwo';
// import SampleJson from '../Components/SampleJson';

function Home() {

    const [textAreaOneJson, setTextAreaOneJson] = useState();
    const [textAreaTwoJson, setTextAreaTwoJson] = useState();
    const [textAreaOneError, setTextAreaOneError] = useState('');
    const [textAreaTwoError, setTextAreaTwoError] = useState('');
    const [jsonDiffError, setJsonDiffError] = useState({ "keyMismatch": [], "ValueMismatch": [], "ArrayLengthMismatch": [] })
    // const [jsonOneCodeConverted, setJsonOneCodeConverted] = useState([])
    // const [jsonTwoCodeConverted, setJsonTwoCodeConverted] = useState([])
    const [showPrettyJson, setShowPrettyJson] = useState(false)

    const handleTextArea = (e) => {
        setJsonDiffError(prevjsonDiffError => {
            var jsonDiffError = JSON.parse(JSON.stringify(prevjsonDiffError))
            return jsonDiffError
        })
        if (e.target.name === 'textAreaOneJson') {
            setTextAreaOneJson(e.target.value)
        }
        if (e.target.name === 'textAreaTwoJson') {
            setTextAreaTwoJson(e.target.value)
        }
    }

    const compareJsonBtn = () => {
        var jsonValidatorOne = checkValidJson(textAreaOneJson)
        var jsonValidatorTwo = checkValidJson(textAreaTwoJson)
        setTextAreaOneError(jsonValidatorOne !== true ? jsonValidatorOne : '')
        setTextAreaTwoError(jsonValidatorTwo !== true ? jsonValidatorTwo : '')
        if (jsonValidatorOne === true && jsonValidatorTwo === true) {
            compareJson(JSON.parse(textAreaOneJson), JSON.parse(textAreaTwoJson))
        }
    }

    const compareJson = (jsonOne, jsonTwo) => {
        var firstJsonObjectKeys = Object.keys(jsonOne)
        var secondJsonObjectKeys = Object.keys(jsonTwo)
        checkKeyValue(firstJsonObjectKeys.sort(), secondJsonObjectKeys.sort(), jsonOne, jsonTwo)
    }


    const checkArrayKeys = (jsonOneKey, jsonTwoKey, jsonOneObject, jsonTwoObject) => {
        if (jsonOneObject[jsonOneKey].length === jsonTwoObject[jsonTwoKey].length) {
            for (let index in jsonOneObject[jsonOneKey]) {
                checkKeyValue(Object.keys(jsonOneObject[jsonOneKey][index]), Object.keys(jsonTwoObject[jsonTwoKey][index]), jsonOneObject[jsonOneKey][index], jsonTwoObject[jsonTwoKey][index])
            }
        }
        else if (jsonOneObject[jsonOneKey].length > jsonTwoObject[jsonTwoKey].length) {
            for (let index in jsonTwoObject[jsonTwoKey]) {
                let firstJsonObjectKeys = Object.keys(jsonOneObject[jsonOneKey][index])
                let secondJsonObjectKeys = Object.keys(jsonTwoObject[jsonTwoKey][index])
                checkKeyValue(firstJsonObjectKeys.sort(), secondJsonObjectKeys.sort(), jsonOneObject[jsonOneKey][index], jsonTwoObject[jsonTwoKey][index])
            }
        }
        else if (jsonTwoObject[jsonTwoKey].length > jsonOneObject[jsonOneKey].length) {
            for (let index in jsonOneObject[jsonOneKey]) {
                let firstJsonObjectKeys = Object.keys(jsonOneObject[jsonOneKey][index]);
                let secondJsonObjectKeys = Object.keys(jsonTwoObject[jsonTwoKey][index]);
                checkKeyValue(firstJsonObjectKeys.sort(), secondJsonObjectKeys.sort(), jsonOneObject[jsonOneKey][index], jsonTwoObject[jsonTwoKey][index])
            }
        }
    }


    const checkKeyValue = (firstJsonObjectKeys, secondJsonObjectKeys, jsonOne, jsonTwo) => {
        var searchKey = [];
        if (firstJsonObjectKeys.length === secondJsonObjectKeys.length) {
            searchKey = firstJsonObjectKeys;
        }
        else if (firstJsonObjectKeys.length > secondJsonObjectKeys.length) {
            searchKey = firstJsonObjectKeys;
        }
        else if (secondJsonObjectKeys.length > firstJsonObjectKeys.length) {
            searchKey = secondJsonObjectKeys;
        }
        for (let key in searchKey) {
            if (jsonOne.hasOwnProperty(searchKey[key]) && jsonTwo.hasOwnProperty(searchKey[key])) {
                if (typeof jsonOne[searchKey[key]] === 'object' && typeof jsonTwo[searchKey[key]] === 'object') {
                    if (Array.isArray(jsonOne[searchKey[key]]) && Array.isArray(jsonTwo[searchKey[key]])) {
                        checkArrayKeys(searchKey[key], searchKey[key], jsonOne, jsonTwo)
                    }
                    else {
                        var firstObject = Object.keys(jsonOne[searchKey[key]])
                        var secondObject = Object.keys(jsonTwo[searchKey[key]])
                        checkKeyValue(firstObject.sort(), secondObject.sort(), jsonOne[searchKey[key]], jsonTwo[searchKey[key]])
                    }
                }
                else if (typeof jsonOne[searchKey[key]] === 'string' && typeof jsonTwo[searchKey[key]] === 'string') {
                    if (jsonOne[searchKey[key]] !== jsonTwo[searchKey[key]]) {
                        jsonDiffError["ValueMismatch"].push({
                            "LeftKey": searchKey[key],
                            "RightKey": searchKey[key],
                            "LeftJson": jsonOne[searchKey[key]],
                            "RightJson": jsonTwo[searchKey[key]]
                        })
                    }
                }
                else if (typeof jsonOne[searchKey[key]] === 'number' && typeof jsonTwo[searchKey[key]] === 'number') {
                    if (jsonOne[searchKey[key]] !== jsonTwo[searchKey[key]]) {
                        jsonDiffError["ValueMismatch"].push({
                            "LeftKey": searchKey[key],
                            "RightKey": searchKey[key],
                            "LeftJson": jsonOne[searchKey[key]].toString(),
                            "RightJson": jsonTwo[searchKey[key]].toString()
                        })
                    }
                }
            }
            else {
                if (firstJsonObjectKeys[key] !== undefined && secondJsonObjectKeys[key] !== undefined) {
                    jsonDiffError["keyMismatch"].push({
                        "LeftJson": firstJsonObjectKeys[key],
                    })
                    jsonDiffError["keyMismatch"].push({
                        "RightJson": secondJsonObjectKeys[key],
                    })
                }
                else if (secondJsonObjectKeys[key] !== undefined) {
                    jsonDiffError["keyMismatch"].push({
                        "RightJson": secondJsonObjectKeys[key]
                    })
                }
                else if (firstJsonObjectKeys[key] !== undefined) {
                    jsonDiffError["keyMismatch"].push({
                        "LeftJson": firstJsonObjectKeys[key]
                    })
                }

            }
        }
        setJsonDiffError(prevjsonDiffError => {
            var jsonDiffError = JSON.parse(JSON.stringify(prevjsonDiffError))
            return jsonDiffError
        })
        setShowPrettyJson(true)
    }

    const checkValidJson = (value) => {
        try {
            JSON.parse(value);
        }
        catch (e) {
            return e.message
        }
        return true
    }

    const clearJsonDiff = () => {
        setShowPrettyJson(false);
        setJsonDiffError(prevjsonDiffError => {
            var jsonDiffError = JSON.parse(JSON.stringify(prevjsonDiffError))
            jsonDiffError = { "keyMismatch": [], "ValueMismatch": [], "ArrayLengthMismatch": [] }
            return jsonDiffError
        })
    }

    return (
        <div>
            <Header />
            <div className="home-main">
                <div className="container-fluid">
                    {
                        showPrettyJson === true ?
                            <div className="row">
                                {
                                    jsonDiffError["keyMismatch"].length > 0 || jsonDiffError["ValueMismatch"].length > 0 || jsonDiffError["ArrayLengthMismatch"].length > 0 ?
                                        <div className="col-12">
                                            <div className="missing-display">
                                                <div className="missing-main">Found {jsonDiffError["keyMismatch"].length + jsonDiffError["ValueMismatch"].length + jsonDiffError["ArrayLengthMismatch"].length} differences</div>
                                                <button className="home-new-diff-button" onClick={clearJsonDiff}>New Json Diff</button>
                                            </div>
                                        </div> :
                                        <div className="col-md-12 col-sm-5 col-md-3">
                                            <div className="missing-display">
                                                <div className="missing-success">
                                                    The two files were semantically identical.
                                                </div>
                                                <button className="home-new-diff-button" onClick={clearJsonDiff}>New Json Diff</button>
                                            </div>
                                        </div>
                                }
                            </div> : null
                    }
                    {
                        showPrettyJson !== true ?
                            <div className="row">
                                <div className="col-md-5">
                                    <JsonTextAreaOne
                                        textAreaOneJson={textAreaOneJson}
                                        textAreaOneError={textAreaOneError}
                                        handleTextArea={handleTextArea}
                                    />
                                </div>
                                <div className="col-md-2">
                                    <button className="home-compare-btn" onClick={compareJsonBtn}>Compare</button>
                                </div>
                                <div className="col-md-5">
                                    <JsonTextAreaTwo
                                        textAreaTwoJson={textAreaTwoJson}
                                        textAreaTwoError={textAreaTwoError}
                                        handleTextArea={handleTextArea}
                                    />
                                </div>
                            </div> :
                            <div className="row">
                                <div className="col-md-5">
                                    <PrettyJsonOne textAreaOneJson={textAreaOneJson} jsonDiffError={jsonDiffError} />
                                </div>
                                <div className="col-md-2" />
                                <div className="col-md-5">
                                    <PrettyJsonTwo textAreaTwoJson={textAreaTwoJson} jsonDiffError={jsonDiffError} />
                                    {/* <SampleJson textAreaTwoJson={JSON.parse(textAreaTwoJson)} jsonDiffError={jsonDiffError} /> */}
                                </div>
                            </div>
                    }
                    {
                        jsonDiffError["keyMismatch"].length > 0 || jsonDiffError["ValueMismatch"].length > 0 || jsonDiffError["ArrayLengthMismatch"].length > 0 ?
                            <JsonDiffError
                                jsonDiffError={jsonDiffError}
                            /> : null
                    }
                </div>
            </div>
        </div>
    )

}

export default Home