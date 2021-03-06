//front-end
import Head from 'next/head'
import {
  MainHeader,
  HomeFeed,
  Button,
  Icon,
  DailyWord,
  DayWord,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  TestWord
} from '../components/'
import WordForm from '../lib/WordForm'
//back-end
import { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { creds, store, provider } from '../backend_services/firebase'
import sample_word from './api/words/sample_word.json'

export default function Home ({
  firstData,
  secondData,
  thirdData,
  fourthData
}) {
  const [addWord, setAddWord] = useState(false)
  const [word, setWord] = useState('')
  const [pronounciation, setPronounciation] = useState('')
  const [type, setType] = useState('')
  const [meaning, setMeaning] = useState('')
  const [user] = useAuthState(creds)
  //for word search
  const [data, setData] = useState(sample_word)

  //function to search for the word
  const searchData = pattern => {
    if (!pattern) {
      setData(sample_word)
      return
    }

    const fuse = new Fuse(data, {
      keys: ['word', 'wordType', 'meaning', 'pronounce', 'name']
    })
    const result = fuse.search(pattern)
    const matches = []
    if (!result.length) {
      setData([])
    } else {
      result.forEach(({ item }) => {
        matches.push(item)
      })
      setData(matches)
    }
  }

  const submitWord = async e => {
    e.preventDefault()
    await fetch('/api/words', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        word,
        pronounciation,
        type,
        meaning,
        email: user?.email,
        displayName: user?.displayName
      })
    })
      .then(res => res.text())
      .then(text => console.log(text))
    console.log('The response JSON from the body >>>>>>>', data)
    setWord('')
    setPronounciation('')
    setType('')
    setMeaning('')
    setAddWord(false)
  }

  return (
    <>
      <div className='bg-gray-100 h-screen overflow-hidden pb-[240px]'>
        <Head>
          <title>Blume-Net</title>
          <link
            rel='icon'
            href='https://scontent.fmnl3-2.fna.fbcdn.net/v/t39.30808-6/272327113_4737476893035391_5246286791413601509_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeECrnO_8dXVAWxCpCk_RmpH7jTvern-F6PuNO96uf4Xo7_yjIJ-5o2CMr-603hL1WNa0Jl80SHf-RzZV6SIAqj5&_nc_ohc=3ztfyHPMq2MAX9eglgo&tn=LgHqoGaPnVNjG6Fp&_nc_zt=23&_nc_ht=scontent.fmnl3-2.fna&oh=00_AT9QVTclQ2qQduyjB1X8cZV7lXR6v7K4jnKetPgNzmthcg&oe=61FEF020'
          />
        </Head>
        <MainHeader />
        <main
          className='
        h-screen 
        bg-gray-50 
        max-w-7xl
        mx-auto
        overflow-y-scroll
        scrollbar-hide
        pb-[240px]
        '
        >
          {/**homeFeed start */}
          <div
            className='
    homeFeedDiv
    '
          >
            <div
              className='
      grid 
      space-y-7 
      place-items-center'
            >
              <h2
                className='
        mx-auto 
        text-xl 
        font-google-sans 
        font-normal
        text-red-500
        '
              >
                Hello / ??????!
              </h2>
              <h2
                className='
        mx-auto 
        text-2xl 
        font-google-sans 
        font-normal
        text-red-500
        '
              >
                Welcome to HokkienHub
              </h2>
            </div>
            <div
              className='inputBox
      '
            >
              <input
                type='text'
                placeholder='Search....'
                onChange={e => {
                  searchData(e.target.value)
                }}
                className='
        focus:outline-none 
        border-0 
        bg-transparent 
        flex-grow
        w-full 
        text-gray-50
        placeholder-gray-50
        '
              />
            </div>
            <div
              className='
            h-[360px] 
            max-w-2xl
            p-12 
            bg-gray-200 
            rounded-lg 
            overflow-y-scroll 
            scrollbar-hide'
            >
              {data &&
                data.map(doc => (
                  <TestWord
                    key={doc.id}
                    id={doc.id}
                    word={doc.word}
                    pronounce={doc.pronounciation}
                    wordType={doc.wordType}
                    meaning={doc.meaning}
                    creator={doc.name}
                  />
                ))}
            </div>
          </div>
          {/**HomeFeed End */}
          <div className='grid place-items-center space-y-5 pb-24'>
            <h2 className='text-xl text-red-500 font-google-sans font-normal'>
              Or, add something to the databanks
            </h2>
            <Button
              onClick={e => setAddWord(true)}
              disabled={user?.displayName !== 'Reaper IFF'}
              color='blue'
              buttonType='filled'
              size='regular'
              rounded={false}
              iconOnly={false}
              block={false}
              ripple='dark'
            >
              <Icon name='add' />
              <h2 className='text-lg capitalize font-robot-slab font-semibold'>
                Add something
              </h2>
            </Button>
          </div>
          <div className='wordDiv'>
            {sample_word.slice(0, 4).map(doc => (
              <DayWord
                key={doc.id}
                id={doc.id}
                creator={doc.name}
                word={doc.word}
                pronounce={doc.pronounciation}
                type={doc.wordType}
                meaning={doc.meaning}
              />
            ))}
          </div>
        </main>
      </div>
      <Modal active={addWord} size='lg' toggler={() => setAddWord(false)}>
        <ModalHeader toggler={() => setAddWord(false)}>
          <h2
            className='
        font-google-sans 
        font-semibold 
        text-lg 
        text-gray-900
         animate-pulse'
          >
            Add a new word / ??????????????????
          </h2>
        </ModalHeader>
        <ModalBody>
          <form onSubmit={submitWord} className='grid space-y-5 p-20'>
            <h2 className='text-xl font-semibold text-gray-800'>Word / ???</h2>
            <Input
              type='text'
              color='blueGray'
              size='lg'
              outline={false}
              placeholder='Type something...'
              className='mx-auto'
              value={word}
              onChange={e => setWord(e.target.value)}
            />
            <h2 className='text-xl font-semibold text-gray-800'>
              Pronounciation / ??????
            </h2>
            <Input
              type='text'
              color='blueGray'
              size='lg'
              outline={false}
              placeholder='Pronounciation: '
              className='mx-auto'
              value={pronounciation}
              onChange={e => setPronounciation(e.target.value)}
            />
            <h2 className='text-xl font-semibold text-gray-800'>Type / ???</h2>
            <Input
              type='text'
              color='blueGray'
              size='lg'
              outline={false}
              placeholder='Type of word: '
              className='mx-auto'
              value={type}
              onChange={e => setType(e.target.value)}
            />
            <h2 className='text-xl font-semibold text-gray-800'>
              Meaning / ??????
            </h2>
            <textarea
              name='meaning'
              type='text'
              placeholder='Type of word: '
              className='
              mx-auto 
              rounded-lg
              max-w-[210px] 
              max-h-[205px] 
              bg-transparent 
              outline-none 
              border-2
              p-3 
              border-gray-300
              text-gray-800
              font-normal
              font-google-sans
              text-xl
              overflow-y-scroll
              scrollbar-hide
              '
              value={meaning}
              onChange={e => setMeaning(e.target.value)}
            />
            <Button type='submit' color='green' ripple='light'>
              Add
            </Button>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button
            color='red'
            buttonType='link'
            onClick={e => setAddWord(false)}
            ripple='dark'
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}
