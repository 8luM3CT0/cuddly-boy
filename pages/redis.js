import {Client, Entity, Schema, Repository} from 'redis-om'

const client = new Client()

async function connnect(){
    if(!client.isOpen()){
        await client.open(process.env.redis_url)
    }
}

class Words extends Entity {}
let schema = new Schema(
    Words,
    {
        word: {type: 'string', textSearch: true},
        wordType: {type: 'string', textSearch: true},
        pronounce: {type: 'string', textSearch: true},
        meaning: {type: 'string', textSearch: true},
    },
    {
        dataStructure: 'JSON'
    }
)




export async function createWord(data){
    await connnect()

    const repository = client.fetchRepository(schema)

    const word = repository.createEntity(data)

    const id = await repository.save(word)

    return id;
}
