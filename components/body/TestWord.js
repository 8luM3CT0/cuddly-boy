//front-end
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Icon } from '../'
//back-end
import { useState } from 'react'

function TestWord ({ word, wordType, meaning, creator, pronounce }) {
  const [showInfo, setShowInfo] = useState(false)

  return (
    <>
      <div
        onClick={e => setShowInfo(true)}
        className='
    grid 
    py-5 
    space-y-3 
    place-items-center
    cursor-pointer
    hover:bg-blue-400
    hover:scale-100
    transform
    transition
    duration-300
    ease-in-out
    rounded-lg
    group
    '
      >
        <h1
          className='
        text-xl 
        font-robot-slab 
        font-semibold 
        text-blue-400 
        group-hover:text-gray-50
        shadow-lg
        rounded-xl
        p-4
        '
        >
          {word}
        </h1>
        <h2
          className='
      text-lg 
      font-robot-slab 
      font-normal 
      text-blue-500 
      group-hover:text-gray-100
      shadow-lg
      rounded-xl
        p-4
      '
        >
          {wordType}
        </h2>
        <h3
          className='
      text-base 
      font-robot-slab 
      font-light 
      text-blue-600 
      group-hover:text-gray-200
      shadow-lg
      rounded-xl
        p-4
      '
        >
          {meaning}
        </h3>
      </div>
      <Modal active={showInfo} size='lg' toggler={() => setShowInfo(false)}>
        <ModalHeader toggler={() => setShowInfo(false)}>
          <p className='text-base font-robot-slab font-light'>
            Added by {creator}
          </p>
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
              Type of word: {wordType}
            </h3>
            <p className='text-sm font-light text-sky-800'>
              Meaning: {meaning}
            </p>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={e => setShowInfo(false)}
            color='red'
            buttonType='link'
            iconOnly={false}
            rounded={false}
            block={false}
            ripple='light'
            className='capitalize'
          >
            <Icon nam='close' />
            <h2 className='font-robot-slab font-normal'>Close</h2>
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default TestWord
