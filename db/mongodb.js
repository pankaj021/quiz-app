var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, db) => {
    if (err) 
        throw err;
    var dbo = db.db("myQuiz");
    var quizObj = {
        question: 'Where in an HTML document is the correct place to refer to an external style she' +
                'et?',
        answers: [
            'In the <head> section', 'In the <body> section', 'At the end of the document', 'You can\'t refer to an external style sheet'
        ],
        correct: 1
    }
    dbo
        .collection("Quiz")
        .find({})
        .toArray(function (err, res) {
            if (err) 
                throw err;
            console.log("1 document inserted", res);
            db.close();
        });
});