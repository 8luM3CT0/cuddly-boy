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
        <h1
          className='
        right-0 
        top-0 
        absolute
        px-3 
        font-google-sans 
        font-light 
        text-sky-100
          text-sm
          text-right
          '
        >
          {type}
        </h1>
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
            <span
              className='
            text-base 
            font-normal 
            text-sky-700
            grid
            space-y-3
            '
            >
              Pronounciation:
              <h1
                className='
              font-semibold
              font-robot-condensed
              text-lg
              text-sky-500
              '
              >
                {pronounce}
              </h1>
            </span>
            <span
              className='
            text-base 
            font-light 
            text-sky-700
            flex
            items-center
            space-x-4
            '
            >
              Type of word:
              <h1
                className='
              font-semibold 
              font-robot-condensed 
              text-lg 
              text-sky-500 
              ml-3'
              >
                {type}
              </h1>
            </span>
            <span
              className='
            text-sm 
            font-light 
            text-sky-800 
            flex 
            items-center 
            space-x-6'
            >
              Meaning:
              <h1
                className='
              font-semibold 
              font-robot-condensed 
              text-lg 
              text-sky-500 
              ml-3'
              >
                {meaning}
              </h1>
            </span>
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
