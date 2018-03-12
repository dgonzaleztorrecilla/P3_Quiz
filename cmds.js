
const {log, biglog,errorlog,colorize} = require("./out");
const model = require("./model");

exports.helpcmd = rl =>{
    log('comandos');
    log('h, help - muestra esta ayuda');
    log('list - lista los quizzes existentes');
    log('show <id> - muestra preguntas y respuestas del quiz indicado');
    log('add - añade un nuevo quiz');
    log('delete <id> - borra el quiz indicado');
    log('edit <id> - edita el quiz indicado');
    log('test <id> - prueba el quiz indicado');
    log('p, play - juega de forma aleatoria');
    log('credits - muestra el numero de creditos');
    log('q, quit - salir del juego');
    rl.prompt();
};

exports.quitcmd = rl =>{
    rl.close();
    rl.prompt();
};

exports.addcmd = rl => {
    rl.question(colorize('introduzca una pregunta','red'), question => {
        rl.question(colorize('introduzca una respuesta','red'), answer => {
            model.add(question,answer);
            log(`${colorize('se ha añadido','magenta')}: ${question} ${colorize('=>', 'magenta')} ${answer} `);
            rl.prompt();
        });
    });
};

exports.listcmd = rl =>{
    model.getAll().forEach((quiz,id) => {
        log(` [${colorize(id,'magenta')}]: ${quiz.question} `);
    });
    rl.prompt();
};

exports.showcmd = (rl,id) => {
    if(typeof id === "undefined") {
        errorlog(`falta el parametro id`);;
    } else{
        try{
            const quiz = model.getByIndex(id);
            log(` [${colorize(id,'magenta')}]: ${quiz.question} ${colorize('=>','magenta')} ${quiz.answer}`);
        }catch(error){
            errorlog(error.message);
        }
    }
    rl.prompt();
};

exports.testcmd = (rl, id) => {
    if(typeof id === "undefined"){
        errorlog('Falta el parametro id');
        rl.prompt();
    }else{
        try{
            let quiz = model.getByIndex(id);
   
            rl.question(colorize(`${quiz.question}${colorize('?', 'red')}`, 'red'), answer =>{
                //var p1 = answer.trim().toLowerCase();
               // var p2 = quiz.answer.toLowerCase();
              //  inicio = -5;
   
                //var subCadena1 = p1.substr(inicio);
               // var subCadena2 = p2.substr(inicio);
               //if(subCadena1 === subCadena2){
   
                if(quiz.answer.toLowerCase() === answer.trim().toLowerCase()){
                    log(`Su respuesta es:`);
                   // biglog('correcta', 'green');
                    log(`correcto`);
                }else {
                    log(`Su respuesta es:`);
                    //biglog('incorrecta', 'red');
                    log(`incorrecto`);
                }
                rl.prompt();
            });
   
   
        }catch (error){
            errorlog(error.message);
            rl.prompt();
        }
    }
   };

   exports.playcmd = rl => {

    let score = 0;
    let toBeResolved = [];
    var i;
    for(i = 0; i<model.count(); i++ ){
        toBeResolved[i] = i;
    };

    const playOne = () =>{
    if(toBeResolved.length == 0){
        log('No hay más preguntas.');
        log('Fin del examen. Aciertos:');
        biglog(`${score}`);
        rl.prompt();
    }else{
        let tamaño = toBeResolved.length -1;
        let id = toBeResolved[Math.floor(Math.random()*tamaño)];
        let quiz = model.getByIndex(id);
        var i;
        for(i =0; i<toBeResolved.length; i++){
            if(toBeResolved[i] == id){
                toBeResolved.splice(i, 1);
            }
        }
        rl.question(colorize(`${quiz.question}?`, 'red'), answer => {
            if(quiz.answer.toLowerCase() === answer.trim().toLowerCase()){
                score += 1;
                log(`${colorize('La respuesta es', 'black')} ${colorize('correcta', 'green')}`);
                playOne();
            }else{
                log('Incorrecto');
                log('Fin del examen. Aciertos:');
                biglog(`Aciertos: ${score}`, 'blue');
                rl.prompt();
            };
        });
    }
}
playOne();
};

exports.deletecmd= (rl,id) => {
    if(typeof id === "undefined") {
        errorlog(`falta el parametro id`);
    } else{
        try{
            model.deleteByIndex(id);
        }catch(error){
            errorlog(error.message);
        }
    }
    rl.prompt();
};
exports.editcmd = (rl,id) => {
    if(typeof id === "undefined") {
        errorlog(`falta el parametro id`);
        rl.prompt();
    }else {
        try{
            const quiz = model.getByIndex(id);

            process.stdout.isTTY && setTimeout(() => {rl.write(quiz.question)},0);

            rl.question(colorize('introduzca una pregunta','red'), question => {
                
                process.stdout.isTTY && setTimeout(() => {rl.write(quiz.answer)},0);

                rl.question(colorize('introduzca una respuesta','red'), answer => {
                    model.update(id,question,answer);
                    log(`se ha cambiado el quiz' ${colorize(id,'magenta')} por: ${question} ${colorize('=>', 'magenta')} ${answer} `);
            rl.prompt();
        });
    });
   }   catch (error){
       errorlog(error.message);
       rl.prompt();
   }   
   }
};
exports.creditscmd = () => {
    log('Autor')
    log('Daniel Gonzalez Torrecilla','green');
    rl.prompt();
};