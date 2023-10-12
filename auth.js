const studentModule = require('./student.js')
const teacherModule = require('./teacher.js')
const readLine = require('readline')

const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
})

function authStudent(callback){
    var studentLoging
    rl.question("Введіть логін: ", (login) =>{
        rl.question("Введіть пароль: ", (password) => {
            let success = false
            for (let student of studentModule.students){
                studentLoging = student.auth(login, password)
                if (studentLoging){
                    success = true
                rl.question('Бажаєте переглянути ващі оцінки?, 1 - Так, 2 - Ні', (askMarks) => {
                    switch(askMarks){
                        case '1':
                            if (studentModule.Student == studentModule.students){
                                console.log(studentModule.students)
                            }
                        case '2':
                            return null
                    }
    
                })
                    break
                }
            }
            if (!success){
                console.log('Користувача не знайдено')
                return null
            }
            callback(studentLoging)
        })
    })
    // return studentLoging
}

function authTeacher(callback){
    var teacherLoging
    rl.question("Введіть логін: ", (login) =>{
        rl.question("Введіть пароль: ", (password) => {
            let success = false
            for (let teacher of teacherModule.teachers){
                teacherLoging = teacher.auth(login, password)
                if (teacherLoging){
                    success = true
                    rl.question('Що ви бажаєте зробити? 1 - Переглянути список учнів, 2 - Обрати учня та поставити оцінку, 3 - Переглянути оцінки учнів', (askDecision) => {
                        switch(askDecision){
                            case '1':
                                console.log(studentModule.students)
                            case '2':
                                console.log(studentModule.Student.pushMarks)
                            case '3':
                                console.log()
                        }
                    })
                    break
                
                }
            }
            if (!success){
                console.log('Користувача не знайдено')
                return null
            }
            callback(teacherLoging)
        })
    })
    
}

module.exports = {
    authStudent : authStudent,
    authTeacher : authTeacher,
    rl: rl,
}