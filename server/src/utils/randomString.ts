
export const randomString =(strLength:number):string=>{
    
    const randSmall=():string=>{return String.fromCharCode(97+Math.floor(Math.random()*26))}
    const randBig=():string=>{return String.fromCharCode(65+Math.floor(Math.random()*26))}
    const randNum=():Number=>{return Math.floor(Math.random()*10)}

    let functionArray=[randSmall,randBig,randNum];
    let randString:string="";
    for(let i=0; i<strLength; i++){
        let randIndex=Math.floor(Math.random()*3)
        randString += functionArray[randIndex]();
    }
    return randString
}