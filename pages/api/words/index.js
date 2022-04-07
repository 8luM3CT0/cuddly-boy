import {sample_word} from '../../../backend_services/sample_word'

export default function handler(req, res){
    if(req.method === 'GET'){
    res.status(200).json(sample_word)
    } else if (req.method === 'POST') {
        const word = req.body.word
        const pronounciation = req.body.pronounciation
        const type = req.body.type
        const meaning = req.body.meaning
        const email = req.body.email
        const displayName = req.body.displayName
        const newWord = {
            id: Date.now(),
            word: word,
            pronounciation: pronounciation,
            type: type,
            meaning: meaning,
            email: email,
            displayName: displayName
        }
        sample_word.push(newWord)
        res.status(201).json(newWord)
    }
}