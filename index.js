const game = require('./game.js')

                 
game.rlM.question("Привіт! Не хочеш зіграти зі мной в крестики нолики чи зі своїм другом? (1 - зі мною, 2 - з другом) ",(answer)=>{
    switch(answer){
        case "1":
            game.singlePlayer()
            break
        case "2":
            game.duel()
            break
    }
})

