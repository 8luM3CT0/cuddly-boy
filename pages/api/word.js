import {createWord} from '../api/lib/redis'

export default async function handler(req, res){
    const id = await createWord(req.body)
    res.status(200).json({id})
}