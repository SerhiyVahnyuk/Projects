const { Telegraf } = require('telegraf') // Імпортуємо телеграф

const bot = new Telegraf('6373366804:AAE5_alofKpDkRmufoFt3XjEIhcOJufKUgM'); // Підключаєм токен до бота

class Riddle{ // Створюємо класс
    constructor(question, rightAnswer){
        this.question = question;
        this.rightAnswer = rightAnswer;
    }
    sendQuestion(ctx){ // Створюємо функцію яка надсилає загадку
        ctx.reply(`Відгадай загадку:\n${this.question}`)
    }
}

const riddles = [ // Створюємо масив загадок
    new Riddle('Що в Ізраілі зимою та літом одним кольором', "гроші"),
    new Riddle('Живе - лежить, Помре - побіжить', "сніг"),
    new Riddle('Хоч має вухо але не чує', "голка")
]


const users = {} // Створюємо змінну користувачів


bot.start((ctx) => { //  Бот надсилає повідомлення коли його вмикнуть
    ctx.reply('Привіт ямногофункціональний бот, будемо знайомі') 
    users[ctx.message.chat.id] = {}  
})

bot.command('riddle', (ctx) => { // Створюємо команду, яка надсилає загадку з массиву
    if (users[ctx.message.chat.id]){ 
        let question = riddles[Math.floor(Math.random() * riddles.length)] 
        question.sendQuestion(ctx) 
        users[ctx.message.chat.id].correctAnswer = question.rightAnswer 
        users[ctx.message.chat.id].status = 'riddle' 
    }
})
 
bot.command('mathtask', (ctx)=>{ // Створюємо команду, яка буде вирішувати математичний приклад
    if (users[ctx.message.chat.id]){ 
        ctx.reply('Введіть простий прииклад у форматі 1+5') 
        users[ctx.message.chat.id].status = 'mathTask' 
    }
})

bot.on('text', (ctx) => { // Створюємо перевірку на відповідь з загадки
    if (users[ctx.message.chat.id]){ 
        if ( users[ctx.message.chat.id].status == 'riddle'){ // Якщо користувач бажає загадку, то буде загадка
            if (ctx.message.text.toLowerCase() == users[ctx.message.chat.id].correctAnswer){
                ctx.reply('молодець твоє рішення вірне!!!') 
                delete users[ctx.message.chat.id].correctAnswer 
            }
        } else if( users[ctx.message.chat.id].status == "mathTask" ){ // Якщо користувач бажає приклад, то буде приклад
            if (ctx.message.text.includes("+") ||  // Якщо у прикдаді є математични знаки
                ctx.message.text.includes("-") ||
                ctx.message.text.includes("*") ||
                ctx.message.text.includes("/") ){
                    let num1 = '' // Створюємо змінну сум
                    let num2 ='' 
                    let now_number = 1  
                    let charProblem  
                    for(let char of ctx.message.text){ // Створюємо цикл
                        if (char == '+'|| char == '-' || char == '/' || char == '*' ){ // Переверяємо наявність мат. символів у змінной
                            now_number += 1  
                            if (now_number == 2){ 
                                if (char=='+'){  
                                    charProblem = '+' 
                                } else if (char == '-'){ 
                                    charProblem = '-' 
                                } else if (char == '/'){ 
                                    charProblem = '/' 
                                } else if (char == '*'){ 
                                    charProblem = '*' 
                                }
                            }
                        } else{  
                            if(now_number == 1){
                                num1 += char
                            } else if(now_number == 2){
                                num2 += char
                            }
                        }
                    }
                    num1 = parseInt(num1) // Робимо змінні цифрами
                    num2 = parseInt(num2) 
                    let result // Створюємо змінну результата
                    switch(charProblem){ // Створюємо "перемикач" 
                        case '+': // Якщо знак дорівнює (+,-,*,/) то ставим його
                            result = `${num1} + ${num2} = ${num1 + num2}`
                            break
                        case '-':
                            result = `${num1} - ${num2} = ${num1 - num2}`
                            break
                        case '*':
                            result = `${num1} * ${num2} = ${num1 * num2}`
                            break
                        case '/':
                            result = `${num1} / ${num2} = ${num1 / num2}`
                            break
                    }
                    ctx.reply(result) // Надсилаємо результат

            }
        }
    }
})

bot.launch() // Вмикаємо бота

