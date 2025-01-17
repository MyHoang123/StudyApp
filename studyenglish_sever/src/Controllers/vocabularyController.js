const Volaculary = require('../models/VocabularyModel')
exports.getAllvocabulary = function (req, res)  {
    const Id = req.query.Id
    const Index = req.query.Index
    const newIndex = parseInt((Index - 1) * 8)
    Volaculary.getEnglish(Id,newIndex,function(english) {
        if(english !== null) {
            Volaculary.getVietnamese(Id,newIndex,function(vietnamses){
                return res.status(200).json({
                    message: 'Thanh cong',
                    English: english,
                    Vietnamese: vietnamses
                })
            })
        }
        })
    }
exports.getTopics = function (req, res)  {
    Volaculary.getTopics(function(topics) {
        if(topics !== null) {
            return res.status(200).json({
                message: 'Thanh cong',
                topics: topics
            })
        }
        })
    }
exports.getAllVocabulary1 = function (req, res)  {
    const Index = req.query.Index
    const newIndex = parseInt((Index - 1) * 8)
    Volaculary.getAllvocabularyEng(newIndex,function(english) {
        if(english !== null) {
            Volaculary.getAllvocabularyVn(newIndex,function(vietnamses){
                return res.status(200).json({
                    message: 'Thanh cong',
                    English: english,
                    Vietnamese: vietnamses
                })
            })
        }
        })
    }
