const fs = require("fs");
const DB_FILENAME = "quizzes.json";



//modelo de datos

let quizzes = [
    {
    question: "capital de italia",
    answer: "roma"
    },
    {
    question: "capital de francia",
    answer: "paris"
    },
    {
    question: "capital de españa",
    answer: "madrid"
    },
    {
    question: "capital de portugal",
    answer: "lisboa"
    }
];

const load = () => {
    fs.readFile(DB_FILENAME,(err, data) => {
        if(err){
            if(err.code ==="ENOENT"){
                save();
                return;
            }
            throw err;
        }
        let json = JSON.parse(data);
        if(json){
            quizzes = json;
        }
    });
};

const save = () => {
    fs.writeFile(DB_FILENAME,
    JSON.stringify(quizzes),
    err => {
        if(err) throw err;
    });
};

//Devuelve el numero total de preguntas existentes

exports.count = () => quizzes.length;

//Añade un nuevo quiz

exports.add = (question,answer) =>{
    quizzes.push({
        question: ( question || "").trim(),
        answer: (answer || "").trim()
    });
    save();
};

//Actualiza el quiz situacio en la posicion i

exports.update = (id,question,answer) => {
    const quiz = quizzes[id];
    if(typeof quiz === "undefined"){
        throw new Error (`El parametro id no es valido.`);
    }
    quizzes.splice(id,1,{
        question: ( question || "").trim(),
        answer: (answer || "").trim()
    });
    save();
};

//Devuelve todos los quizzes

exports.getAll = () => JSON.parse(JSON.stringify(quizzes));

//Devuelve el clon del quiz almacenado en la posicion dada

exports.getByIndex = id =>{
    const quiz = quizzes[id];
    if(typeof quiz === "undefined"){
        throw new Error (`El parametro id no es valido.`);
    }
    return JSON.parse(JSON.stringify(quiz));
};

//Eliminar un quiz en la posicion dada

exports.deleteByIndex = id =>{
    const quiz = quizzes[id];
    if(typeof quiz === "undefined"){
        throw new Error (`El parametro id no es valido.`);
    }
    quizzes.splice(id,1);
    save();
}

load();