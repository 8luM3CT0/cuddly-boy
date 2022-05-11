import {Client, Entity, Schema, Repository} from 'redis-om'

const client = new Client()

class Words extends Entity{}
let schema = new Schema(
    Words,
    {
        word: {type: 'string', textSearch: true},
        wordType: {type: 'stringn'},
        meaning: {type: 'string'},
        pronounce: {type: 'string'}
    },
    {
        dataStructure: JSON
    }
)

async function connnect(){
    if(!client.isOpen()){
        await client(process.env.redis_url)
    }
}

export async function createWord(data){
    await connnect()

    const repository = client.fetchRepository(schema)

    const word = repository.createEntity(data)

    const id = await repository.save(word)

    return id;
}
