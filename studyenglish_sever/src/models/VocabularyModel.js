const db = require('../configs/connect')
const getEnglish = function (Id,newIndex,result) {
    db.query("SELECT Id,English FROM volaculary WHERE IdTopics = ? LIMIT 8 OFFSET ?",[Id,newIndex], function(err, account) {
        if(err) {
            result (null)
        }
        else {
            result (account)
        }
    })
}
const getVietnamese = function (Id,newIndex,result) {
    db.query("SELECT Id,Vietnamese FROM volaculary WHERE IdTopics = ? LIMIT 8 OFFSET ?",[Id,newIndex], function(err, account) {
        if(err) {
            result (null)
        }
        else {
            result (account)
        }``
    })
}
const getAllvocabularyVn = function (newIndex,result) {
    db.query("SELECT Id,Vietnamese FROM volaculary LIMIT 8 OFFSET ?",[newIndex], function(err, account) {
        if(err) {
            result (null)
        }
        else {
            result (account)
        }
    })
}
const getAllvocabularyEng = function (newIndex,result) {
    db.query("SELECT Id,English FROM volaculary LIMIT 8 OFFSET ?",[newIndex], function(err, account) {
        if(err) {
            result (null)
        }
        else {
            result (account)
        }``
    })
}
const getTopics = function (result) {
    db.query("SELECT * FROM topics", function(err, account) {
        if(err) {
            result (null)
        }
        else {
            result (account)
        }
    })
}
module.exports = {
    getEnglish,
    getVietnamese,
    getTopics,
    getAllvocabularyVn,
    getAllvocabularyEng
}