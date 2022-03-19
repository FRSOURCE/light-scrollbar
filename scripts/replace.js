const FRSReplace = require('@frsource/frs-replace');
const fs = require('fs');
const nextClassName = require('incstr').idGenerator({
    alphabet: 'abcdefghijklmnopqrstuvwz',
});

const newFilePath = 'index_tmp.ts';
const originalFilePath = 'src/index.ts';
fs.copyFile(originalFilePath, newFilePath, (err) => {
    if (err) throw err;
    console.log('File copied');

    const originalFileContent = fs.readFileSync(originalFilePath, { encoding: 'utf8' });

    const keyNames = [];
    const getKeyNames = (key, object) => {
        for (key in object) {
            if (typeof object[key] === "object") {
                getKeyNames(key, object[key]);
            }
            keyNames.push(key);
        }
    }

    const attachReg = new RegExp(/replace-this-start([\s\S]*?)replace-this-end/, 'gm');
    const attachMethodContent = attachReg.exec(originalFileContent)[0];

    const reg = new RegExp(/data\s=\s\{([\s\S]*?)\};/, 'gm');
    const regexResult = reg.exec(attachMethodContent)[1];
    const dataObject = eval(`({${regexResult}})`);
    const tempRegexResultDataObject = regexResult.replace(/\n/g, " ").replace(/\s/g, '');

    getKeyNames('', dataObject);
    let tmpDataObject = tempRegexResultDataObject;
    let tmpMainMethod = attachMethodContent;

    const replaceAll = (replace) => {
        if (replace != 'x' && replace != 'y' && replace != 'height' && replace != 'width') {
            const replaceTo = nextClassName();
            tmpMainMethod = tmpMainMethod.replaceAll(`.${replace}`, `.${replaceTo}`);
            tmpMainMethod = tmpMainMethod.replaceAll(`'${replace}'`, `'${replaceTo}'`);
            tmpDataObject = tmpDataObject.replaceAll(`${replace}:`, `${replaceTo}:`)
        };
    }
    keyNames.forEach(keyName => replaceAll(keyName));
    FRSReplace.sync({
        input: originalFilePath,
        needle: attachMethodContent,
        replacement: tmpMainMethod,
        output: originalFilePath
    })

    FRSReplace.sync({
        input: originalFilePath,
        needle: regexResult,
        replacement: tmpDataObject,
        output: originalFilePath
    })

    console.log('All Replaced')
});
