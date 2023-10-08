const readline = require("readline")

const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
})

const cross = `  \\ / \n   X  \n  / \\ `
const zero = ` /  \\ \n |  | \n \\  / `

const splitedCross = cross.split('\n')
const splitedZero = zero.split('\n')

const mathMap = [[1,NaN,NaN],
                 [NaN,NaN,NaN],
                 [NaN,NaN,2]]

let map = ''
let index = 0
let index2 = 0
let index3 = 0

for(row of mathMap){
    let stringRow = ''
    for (let i = 0; i<3;i++){
        for(cell of row){
            if(cell){
                if (cell == 1){
                    if (index >= 2){
                        stringRow += splitedCross[index3]
                        index = 0
                    } else {
                        stringRow += splitedCross[index3]+"|"
                        
                        index ++
                    }

                } else {
                    if (index >= 2){
                        stringRow += splitedZero[index3]
                        index = 0
                    } else {
                        stringRow += splitedZero[index3]+"|"
                        
                        index ++
                    }
                }
            }else{
                if (index >= 2){
                    stringRow += '       '
                    index = 0
                } else {
                    stringRow += '      |'
                    index++
                }
                
            }
        }
        if (index3 >= 2){
            index3 = 0
        } else {
            index3 ++
        }
        stringRow +='\n'
    }
    if(index2 >= 2){
        map += stringRow+"\n"
        index2 = 0
    } else{
        map += stringRow+"--------------------\n"
        index2 ++
    }
}

console.log(map)