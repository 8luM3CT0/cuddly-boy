import sample_word from './sample_word.json'
const fs = require('fs')

export default function handler(req, res){
    if (req.method === 'POST') {
        //Defining what data will be added
        const word = req.body.word
        const pronounciation = req.body.pronounciation
        const type = req.body.type
        const meaning = req.body.meaning
        const email = req.body.email
        const displayName = req.body.displayName
        //the data that will be added to the json file
        const newWord = {
            "id": Date.now(),
            "word": word,
            "pronounciation": pronounciation,
            "type": type,
            "meaning": meaning,
            "email": email,
            "displayName": displayName
        }
        res.status(201).json(newWord)
        
        console.log('testing return of the sample word', sample_word)

        const dataSource = fs.readFileSync('sample_word.json')
        //const dataSource = fs.readFileSync('json_sample.json')
        console.log('data json be here >>>>', dataSource)

        //let jsonFileParsed = JSON.parse(dataSource)

        //console.log('parsed JSON file >>>>>>', jsonFileParsed)

        //jsonFileParsed.push(newWord)



        /*fs.appendFile('sample_word.json', JSON.stringify(json), function (err){
            if(err){
                return console.log('Ok, here is the error >>>>>>',err)
            }
        } )
        */
        /*const stringified = JSON.stringify(newWord)

        console.log('String of the word you inputted>>>>', stringified)

        const stringObject = JSON.parse(stringified)
        console.log('Parsed of the stringified object >>>>>>', stringObject)
        const dataJSON = JSON.stringify(stringObject)
        console.log('Stringified version of the parsed string >>>>>>', dataJSON)
            //code to append data from json to the json file/ array
            fs.appendFile('sample_word.json', dataJSON, 'utf8', function(err) {
                if(err){
                    return console.log(err)
                }
                sample_word.push(dataJSON)
                console.log('pushed to the json file (?)...')
                console.log('The final object that was pushed>>>>>', stringObject)
            })
            */
    }
}
