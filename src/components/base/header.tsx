import React, { FC } from 'react'
import Icon from './Icon'
import '~/assets/css/base.css'

const header: FC = () => {
  return (
    <>
      <header className='bg-primary flex text-white w-full top-0 right-0 left-0 fixed items-center lg:h-11 lg:px-11'>
        <button className='lg:mr-1'>
          <Icon name='menu' className='fill-white button lg:h-6 lg:w-6' />
        </button>
        <button className='button'>
          <Icon name='home-outline' className='fill-white lg:h-6 lg:w-6' />
        </button>
        <button className='ml-auto button lg:mr-3'>
          <Icon name='plus' className='lg:h-6 lg:w-6' />
        </button>
      </header>
    </>
  )
}

export default header
