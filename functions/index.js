//for the Fuse
const Fuse = require("fuse.js")
//Cloud functions for Firebase SDK to create Cloud functions and setup triggers
const functions = require('firebase-functions');

//Firebase Admin SDK to access the FBase database
const admin = require('firebase-admin')
admin.initializeApp()

SearchEngine = {
    textSearch: (
        data,
        search_text,
        _keys=[],
        should_sort=false,
        _threshold=0.2,
        _location=0,
        _distance=100,
        max_pattern_length=32,
        min_match_charlength=1
    )   => {
        let newData = data;
        if(search_text !== undefined && search_text !== ""){
            let options = {
                shouldSort: should_sort,
                threshold: _threshold,
                location: _location,
                distance: _distance,
                maxPatternLength: max_pattern_length,
                midMatchCharLength: min_match_charlength,
                keys: _keys
            }
            let fuse = new Fuse(newData, options)
            newData = fuse.search(search_text)
        }

        return newData
    }
}

exports.search_engine = functions.https.onRequest(async(req,res) => {
    let events = await admin.database().ref(`events/`).once('value').then(snapshot => snapshot.val())
    let eventsData = Object.values(events)

    let text_search = req.query.text_search;

    if(text_search !== "" && text_search !== "null" && 
    text_search !== "undefined" && text_search !== null &&
    text_search !== undefined
    ) {
        if(eventsData.length !== 0){
            eventsData = SearchEngine.textSearch(eventsData,text_search, ["word", "wordType", "meaning", "pronounce", "creator", "creatorName"])
        }
    }

    res.set('Access-Control-Allow-Origin', '*').status(200).send(eventsData)
    //include ('Access-Control-Allow-Origin') to ensure no problems with CORS
})