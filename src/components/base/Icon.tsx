import React, { FC } from 'react'
import icon from '~/assets/icons/gen/index.svg'

const Icon: FC<{ name: string; className: string }> = ({ name, className }) => (
  <>
    <i className='block'>
      <svg className={`fill-current ${className}`}>
        <use href={`${icon}#${name}`} />
      </svg>
    </i>
  </>
)

export default Icon
