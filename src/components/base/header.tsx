import React, { FC } from 'react'
import Icon from './Icon'

const header: FC = () => {
  return (
    <>
      <header className='bg-primary flex h-11 text-white w-full px-11 top-0 right-0 left-0 z-99 fixed items-center -md:px-3'>
        <button className='mr-1 button'>
          <Icon name='menu' className='h-6 fill-white w-6 button' />
        </button>
        <button className='button'>
          <Icon name='home-outline' className='h-6 fill-white w-6' />
        </button>
        <button className='ml-auto mr-3 button'>
          <Icon name='plus' className='h-6 w-6' />
        </button>
      </header>
    </>
  )
}

export default header
