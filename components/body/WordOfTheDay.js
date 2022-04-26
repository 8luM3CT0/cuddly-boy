//front-end
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Icon
} from '../index'
//back-end
import { useState } from 'react'

function WordOfTheDay ({
  id,
  word,
  type,
  meaning,
  pronounce,
  creator,
  timestamp
}) {
  const [showWord, setShowWord] = useState(false)

  return (
    <>
      <div
        onClick={e => setShowWord(true)}
        className='
    grid
    place-items-center
    max-w-xl
    h-[120px]
    max-h-[230px]
    w-[310px]
    cursor-pointer
    space-y-5
    bg-blue-400
    rounded-xl
    '
      >
        <h2
          className='
      text-xl 
      font-google-sans 
      text-gray-50 
      font-normal'
        >
          {word}
        </h2>
        <span
          className='
        right-0 
        top-0 
        absolute
        px-3 
        font-google-sans 
        font-light 
        text-sky-100'
        >
          <h1 className='text-sm'>{type}</h1>
        </span>
      </div>
      <Modal
        size='regular'
        active={showWord}
        toggler={() => setShowWord(false)}
      >
        <ModalHeader toggler={() => setShowWord(false)}>
          <div className='flex items-center justify-evenly text-blue-500'>
            <h2 className='text-base font-normal'>Added by {creator}</h2>
          </div>
        </ModalHeader>
        <ModalBody>
          <div
            className='
          grid 
          place-items-start 
          p-[60px] 
          space-y-4 
          font-mono
          max-w-[320px]
          '
          >
            <h1
              className='
            text-4xl 
            font-bold 
            text-sky-600 
            mx-auto 
            justify-self-center'
            >
              {word}
            </h1>
            <h2 className='text-base font-normal text-sky-700'>
              Pronounciation: {pronounce}
            </h2>
            <h3 className='text-base font-normal text-sky-700'>
              Type of word: {type}
            </h3>
            <p className='text-sm font-light text-sky-800'>
              Meaning: {meaning}
            </p>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color='red'
            buttonType='link'
            onClick={e => setShowWord(false)}
            ripple='dark'
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default WordOfTheDay
