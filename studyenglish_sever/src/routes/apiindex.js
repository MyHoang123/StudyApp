const express = require('express')
const cors = require('cors');
const vocabularyController = require('../Controllers/vocabularyController')
let router = express.Router()
const apiRoute = (app) => {
    router.get('/getvocabulary',vocabularyController.getAllvocabulary),
    router.get('/getallvocabulary',vocabularyController.getAllVocabulary1),
    router.get('/gettopics',vocabularyController.getTopics)
    return ( 
        app.use(cors({
            origin: 'http://localhost:3000'
          })),
        app.use('/api/v12/',router));
    
}
module.exports = apiRoute
