import React, { useEffect } from 'react';

function PrettyJsonOne({ textAreaTwoJson, jsonDiffError }) {

    var keyValueData = [];
    useEffect(() => {
        var prettyJsonFormat = JSON.parse(textAreaTwoJson);
        var json = JSON.stringify(prettyJsonFormat, undefined, 4);
        jsonKeyErrorListOutput(toHighlightErrorValue(json));
    }, [textAreaTwoJson, jsonDiffError])

    const checkKeyError = (key, type) => {
        var className = 'normal';
        if (type === 'key') {
            keyValueData.push(key.replace(/:/g, ""));
            if (jsonDiffError["keyMismatch"].length > 0 || jsonDiffError["ArrayLengthMismatch"].length > 0) {
                jsonDiffError["keyMismatch"].map((keyInfo) => {
                    if (keyInfo["RightJson"] === key.replace(/:/g, "")) {
                        className = "error";
                    }
                })
                jsonDiffError["ArrayLengthMismatch"].map((keyInfo) => {
                    if (keyInfo["RightJson"] === key.replace(/:/g, "")) {
                        className = "error"
                    }
                })
            }
        }
        if (type === 'value') {
            if (jsonDiffError["ValueMismatch"].length > 0) {
                jsonDiffError["ValueMismatch"].map((keyInfo) => {
                    if (key !== '') {
                        if (keyValueData.includes(keyInfo["RightKey"])) {
                            if (keyInfo["RightJson"] === key) {
                                className = "error";
                            }
                        }
                    }
                })
            }
            keyValueData = []
        }
        return className
    }

    const toHighlightErrorValue = (json) => {
        return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
            var className = ""
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    className = checkKeyError(match.replace(/"/g, ""), "key")
                } else {
                    className = checkKeyError(match.replace(/"/g, ''), "value")
                }
            }
            else {
                className = checkKeyError(match, "value")
            }
            return '<span class="' + className + '">' + match + '</span>';
        });
    }


    function jsonKeyErrorListOutput(json) {
        document.getElementById("RightJson").innerHTML = json;
    }

    return (
        <pre id="RightJson"></pre>
    )

}

export default PrettyJsonOne