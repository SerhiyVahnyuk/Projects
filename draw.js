
function draw(mathMap) {

    const cross = `  \\ / \n   X  \n  / \\ `
    const zero = ` /  \\ \n |  | \n \\  / `
    
    // Розбиваємо символи хрестика та нуля на масиви.
    const splitedCross = cross.split('\n')
    const splitedZero = zero.split('\n')

    let map = ''
    let index = 0
    let index2 = 0
    let index3 = 0
    
    // Відображуємо дошку гри на консоль.
    for(row of mathMap){ // Перебираем массив `mathMap`.
        let stringRow = '' // Переменная для хранения отображения текущего ряда доски игры.
        for (let i = 0; i<3;i++){ // Перебираем ячейки в текущем ряду.
            for(cell of row){ // Проверяем значение каждой ячейки в текущем ряду.
                if(cell){ // Если ячейка занята, рисуем символ соответствующего игрока.
                    if (cell == 1){ // Если ячейка занята игроком X, рисуем символ X.
                        if (index >= 2){ // Если мы достигли конца массива `splitedCross`, начинаем сначала.
                            stringRow += splitedCross[index3]
                            index = 0
                        } else {
                            stringRow += splitedCross[index3]+"|"
                            
                            index ++
                        }
                    
                    } else { // Если ячейка занята игроком O, рисуем символ O.
                        if (index >= 2){ // Если мы достигли конца массива `splitedZero`, начинаем сначала.
                            stringRow += splitedZero[index3]
                            index = 0
                        } else {
                            stringRow += splitedZero[index3]+"|"
                            
                            index ++
                        }
                    }
                }else{ // Если ячейка пуста, рисуем пустое место.
                    if (index >= 2){ // Если мы достигли конца массива `splitedCross` или `splitedZero`, начинаем сначала.
                        stringRow += '       '
                        index = 0
                    } else {
                        stringRow += '      |'
                        index++
                    }
                    
                }
            }
            if (index3 >= 2){ // Если мы достигли конца массива `splitedCross` или `splitedZero`, начинаем сначала.
                index3 = 0
            } else {
                index3 ++
            }
            stringRow +='\n' // Добавляем символ переноса строки в конец строки.
        }
        if(index2 >= 2){ // Если мы достигли конца массива `mathMap`, заканчиваем рисование доски игры.
            map += stringRow+"\n"
            index2 = 0
        } else{ // Если мы не достигли конца массива `mathMap`, рисуем разделительную линию.
            map += stringRow+"--------------------\n"
            index2 ++
        }
    }
    return map
}
module.exports = {
    draw: draw,
}