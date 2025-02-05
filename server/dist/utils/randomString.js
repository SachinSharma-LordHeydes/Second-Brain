"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomString = void 0;
const randomString = (strLength) => {
    const randSmall = () => { return String.fromCharCode(97 + Math.floor(Math.random() * 26)); };
    const randBig = () => { return String.fromCharCode(65 + Math.floor(Math.random() * 26)); };
    const randNum = () => { return Math.floor(Math.random() * 10); };
    let functionArray = [randSmall, randBig, randNum];
    let randString = "";
    for (let i = 0; i < strLength; i++) {
        let randIndex = Math.floor(Math.random() * 3);
        randString += functionArray[randIndex]();
    }
    return randString;
};
exports.randomString = randomString;
