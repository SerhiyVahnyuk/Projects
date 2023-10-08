const draw = require('./draw')
const readline = require("readline")
const gameModule = require("./game")

const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
})

function getRandomInt(min, max) {
  // Округляем min вверх и max вниз
  min = Math.ceil(1);
  max = Math.floor(9);
  // Умножаем Math.random() на разность между max и min, прибавляем min и округляем вниз
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function win(mathMap){
    if ((mathMap[0][0] == mathMap[0][1] && (mathMap[0][0] == mathMap[0][2]) && mathMap[0][0] == 1 )|| 
        (mathMap[1][0] == mathMap[1][1] && (mathMap[1][0] == mathMap[1][2]) && mathMap[1][0] == 1 )||
        (mathMap[2][0] == mathMap[2][1] && (mathMap[2][0] == mathMap[2][2]) && mathMap[2][0] == 1 )||

        (mathMap[0][0] == mathMap[1][0] && (mathMap[0][0] == mathMap[2][0]) && mathMap[0][0] == 1 )||
        (mathMap[0][1] == mathMap[1][1] && (mathMap[0][1] == mathMap[2][1]) && mathMap[0][1] == 1 )||
        (mathMap[0][2] == mathMap[1][2] && (mathMap[0][2] == mathMap[2][2]) && mathMap[0][2] == 1 )||

        (mathMap[0][0] == mathMap[1][1] && (mathMap[0][0] == mathMap[2][2]) && mathMap[0][0] == 1 )||
        (mathMap[0][2] == mathMap[1][1] && (mathMap[0][2] == mathMap[2][0]) && mathMap[0][2] == 1 )){
            console.log(mathMap)
            console.log('winner is X')
            return true
    } else if ((mathMap[0][0] == mathMap[0][1] && (mathMap[0][0] == mathMap[0][2]) && mathMap[0][0] == 2 )|| 
        (mathMap[1][0] == mathMap[1][1] && (mathMap[1][0] == mathMap[1][2]) && mathMap[1][0] == 2 )||
        (mathMap[2][0] == mathMap[2][1] && (mathMap[2][0] == mathMap[2][2]) && mathMap[2][0] == 2 )||

        (mathMap[0][0] == mathMap[1][0] && (mathMap[0][0] == mathMap[2][0]) && mathMap[0][0] == 2 )||
        (mathMap[0][1] == mathMap[1][1] && (mathMap[0][1] == mathMap[2][1]) && mathMap[0][1] == 2 )||
        (mathMap[0][2] == mathMap[1][2] && (mathMap[0][2] == mathMap[2][2]) && mathMap[0][2] == 2 )||

        (mathMap[0][0] == mathMap[1][1] && (mathMap[0][0] == mathMap[2][2]) && mathMap[0][0] == 2 )||
        (mathMap[0][2] == mathMap[1][1] && (mathMap[0][2] == mathMap[2][0]) && mathMap[0][2] == 2 )){
            console.log('winner is 0')
            return true
    }
}


function singlePlayer(){
    let currentPlayer
    let bot
    const mathMap = [[NaN,NaN,NaN],
                     [NaN,NaN,NaN],
                     [NaN,NaN,NaN]]
    rl.question('Оберіть сторону(1 - Хрестики, 2 - Нуліки)',async (askSide) => {
        switch(askSide){
            case "1":
                do{
                    if(win(mathMap)){
                        break
                    }
                    let botChoise
                    console.log(draw.draw(mathMap))
                    console.log(`
                    1|2|3
                    4|5|6
                    7|8|9
                    `)
                    currentPlayer = 1
                    bot = 2
                    const question = await new Promise((resolve)=>{rl.question('Введіть координати вашого хода',(askField) => { // Короч тут спрашиваем типо ввести координаты кода
                        if ((askField == '1'|| askField == '2' || askField == '3')&& !mathMap[0][Number(askField)-1]){
                            mathMap[0][Number(askField)-1]= currentPlayer  
            
                            if (currentPlayer == 1){
                                currentPlayer = 2
                            } else{
                                currentPlayer = 1
                            }
                        } else if((askField == '4'|| askField == '5' || askField == '6') && !mathMap[1][Number(askField)-4]){ // тут хз
                            mathMap[1][Number(askField)-4] = currentPlayer
            
                            if (currentPlayer == 1){
                                currentPlayer = 2
                            } else{
                                currentPlayer = 1
                            }
                        } else if((askField == '7'|| askField == '8' || askField == '9') && !mathMap[2][Number(askField)-7]){ // что это?!?
                            mathMap[2][Number(askField)-7] = currentPlayer
                            
                            if (currentPlayer == 1){
                                currentPlayer = 2
                            } else{
                                currentPlayer = 1
                            }
                        }
                        botChoise = getRandomInt(1,9)
                        while(botChoise == Number(askField)){
                            botChoise = getRandomInt(1,9)
                        }
                        resolve(askField)
                    })})
                    if ((botChoise == 1|| botChoise == 2 || botChoise == 3)&& !mathMap[0][Number(botChoise)-1]){
                        mathMap[0][Number(botChoise)-1]= bot  
        
                        if (bot == 1){
                            bot = 2
                        } else{
                            bot = 1
                        }
                    } else if((botChoise == 4|| botChoise == 5 || botChoise == 6) && !mathMap[1][Number(botChoise)-4]){
                        mathMap[1][Number(botChoise)-4] = bot
        
                        if (bot == 1){
                            bot = 2
                        } else{
                            bot = 1
                        }
                    } else if((botChoise == 7|| botChoise == 8 || botChoise == 9) && !mathMap[2][Number(botChoise)-7]){
                        mathMap[2][Number(botChoise)-7] = bot
                        
                        if (bot == 1){
                            bot = 2
                        } else{
                            bot = 1
                        }
                    }
                    
                }while(!win(mathMap));
                break

            case "2":
                do {
                    currentPlayer = 2
                    bot = 1
                    let botChoise
                    botChoise = getRandomInt(1,9)
                    if ((botChoise == 1|| botChoise == 2 || botChoise == 3)&& !mathMap[0][Number(botChoise)-1]){
                        mathMap[0][Number(botChoise)-1]= bot  
        
                        if (bot == 1){
                            bot = 2
                        } else{
                            bot = 1
                        }
                    } else if((botChoise == 4|| botChoise == 5 || botChoise == 6) && !mathMap[1][Number(botChoise)-4]){
                        mathMap[1][Number(botChoise)-4] = bot
        
                        if (bot == 1){
                            bot = 2
                        } else{
                            bot = 1
                        }
                    } else if((botChoise == 7|| botChoise == 8 || botChoise == 9) && !mathMap[2][Number(botChoise)-7]){
                        mathMap[2][Number(botChoise)-7] = bot
                        
                        if (bot == 1){
                            bot = 2
                        } else{
                            bot = 1
                        }
                    } else {
                        continue
                    }
                    
                    
                    console.log(draw.draw(mathMap))
                    console.log(`
                    1|2|3
                    4|5|6
                    7|8|9
                    `)
                    if(win(mathMap)){
                        break
                    }
                    const question = await new Promise((resolve)=>{rl.question('Введіть координати вашого хода',(askField) => { // Короч тут спрашиваем типо ввести координаты кода
                        if ((askField == '1'|| askField == '2' || askField == '3')&& !mathMap[0][Number(askField)-1]){
                            mathMap[0][Number(askField)-1]= currentPlayer  
            
                            if (currentPlayer == 1){
                                currentPlayer = 2
                            } else{
                                currentPlayer = 1
                            }
                        } else if((askField == '4'|| askField == '5' || askField == '6') && !mathMap[1][Number(askField)-4]){ // тут хз
                            mathMap[1][Number(askField)-4] = currentPlayer
            
                            if (currentPlayer == 1){
                                currentPlayer = 2
                            } else{
                                currentPlayer = 1
                            }
                        } else if((askField == '7'|| askField == '8' || askField == '9') && !mathMap[2][Number(askField)-7]){ // что это?!?
                            mathMap[2][Number(askField)-7] = currentPlayer
                            
                            if (currentPlayer == 1){
                                currentPlayer = 2
                            } else{
                                currentPlayer = 1
                            }
                        }
                        resolve(askField)
                    })})}while(!win(mathMap));
                break
        }
    })
}
    
    

         
    


async function duel(){
    const mathMap = [[NaN,NaN,NaN],
                     [NaN,NaN,NaN],
                     [NaN,NaN,NaN]]
    
    let currentPlayer = 1
    do{
        console.log(draw.draw(mathMap))
        console.log(`
        1|2|3
        4|5|6
        7|8|9
        `)
        const question = await new Promise((resolve)=>{rl.question('Введіть координати вашого хода',(askField) => {
            if ((askField == '1'|| askField == '2' || askField == '3')&& !mathMap[0][Number(askField)-1]){
                mathMap[0][Number(askField)-1]= currentPlayer  

                if (currentPlayer == 1){
                    currentPlayer = 2
                } else{
                    currentPlayer = 1
                }
            } else if((askField == '4'|| askField == '5' || askField == '6') && !mathMap[1][Number(askField)-4]){
                mathMap[1][Number(askField)-4] = currentPlayer

                if (currentPlayer == 1){
                    currentPlayer = 2
                } else{
                    currentPlayer = 1
                }
            } else if((askField == '7'|| askField == '8' || askField == '9') && !mathMap[2][Number(askField)-7]){
                mathMap[2][Number(askField)-7] = currentPlayer
                
                if (currentPlayer == 1){
                    currentPlayer = 2
                } else{
                    currentPlayer = 1
                }
            }
            resolve(askField)
        })})

    }while(!win(mathMap));
}

    


module.exports = {
    singlePlayer:singlePlayer,
    duel:duel,
    rlM:rl
}

// function duel(){
//     const mathMap = [[NaN,NaN,NaN],
//                      [NaN,NaN,NaN],
//                      [NaN,NaN,NaN]]
    
//     let currentPlayer = 1
//     do{
//         console.log(draw.draw(mathMap))
//         console.log(`
//         1|2|3
//         4|5|6
//         7|8|9
//         `)
        
//         rl.question('Введіть координати вашого хода',(askField) => {
//             if (!mathMap[Math.floor(Number(askField)/3)-1][Number(askField)-(Math.floor(Number(askField)/3)-1)*(Math.floor(Number(askField)/3)-1)]){
//                 mathMap[Math.floor(Number(askField)/3)-1][Number(askField)-(Math.floor(Number(askField)/3)-1)*(Math.floor(Number(askField)/3)-1)] = currentPlayer  

//                 if (currentPlayer == 1){
//                     currentPlayer = 2
//                 } else{
//                     currentPlayer = 1
//                 }
//             }
//         })
        
//     }while(!win(mathMap));
// }