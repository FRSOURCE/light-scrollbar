const FRSReplace = require('@frsource/frs-replace');
const fs = require('fs');
const nextClassName = require('incstr').idGenerator({
    alphabet: 'abcdefghijklmnopqrstuvwz',
});

const newFileName = 'src/index_tmp.ts';
fs.copyFile('src/index.ts', newFileName, (err) => {
    if (err) throw err;
    console.log('File copied');


    const data = fs.readFileSync(newFileName, { encoding: 'utf8' });
    const reg = new RegExp(/data\s=\s\{([\s\S]*?)\};/, 'gm');
    const regexResult = reg.exec(data)[1];
    const dataObject = eval(`({${regexResult}})`);
    const tempRegexResult = regexResult.replace(/\n/g, " ").replace(/\s/g, '');
    const keyNames = [];
    const getKeyNames = (key, object) => {
        for (key in object) {
            if (typeof object[key] === "object") {
                getKeyNames(key, object[key]);
            }
            keyNames.push(key);
        }
    }

    getKeyNames('', dataObject);
    let tmp = tempRegexResult;

    const replaceAll = (replace) => {
        if (replace != 'x' && replace != 'y') {
            const replaceTo = nextClassName();

            // tmp = FRSReplace.sync({
            //     content: tmp,
            //     needle: `${replace}:`,
            //     replacement: `${replaceTo}:`,
            //     strategy: 'flatten'
            // })
            FRSReplace.sync({
                input: newFileName,
                needle: `.${replace}`,
                replacement: `.${replaceTo}`,
                output: newFileName
            })
            FRSReplace.sync({
                input: newFileName,
                needle: `'${replace}'`,
                replacement: `'${replaceTo}'`,
                output: newFileName
            })
            tmp = tmp.replaceAll(`${replace}:`, `${replaceTo}:`)
        };
    }
    keyNames.forEach(keyName => replaceAll(keyName));

    FRSReplace.sync({
        input: newFileName,
        needle: regexResult,
        replacement: tmp,
        output: newFileName
    })
    console.log('replaced')
});
