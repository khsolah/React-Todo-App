import React, { FC, useEffect, useRef, useState } from 'react'

const createTodoForm: FC<{
  action: null | 'adding-task'
  cancel: VoidFunction
  submit: ({
    title,
    description
  }: {
    title: string
    description: string
  }) => boolean
}> = ({ action, cancel, submit }) => {
  const titleEl = useRef<HTMLTextAreaElement>(null)
  const descriptionEl = useRef<HTMLTextAreaElement>(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const clear = () => {
    setTitle('')
    setDescription('')
    titleEl.current?.removeAttribute('style')
    descriptionEl.current?.removeAttribute('style')
  }

  useEffect(() => {
    if (action === 'adding-task') titleEl.current?.focus()
  }, [action])

  return (
    <form>
      <div className='border border-solid rounded-md border-gray-400 md:px-3 md:pt-3 -md:px-10px -md:pt-10px'>
        <textarea
          ref={titleEl}
          value={title}
          onChange={e => {
            setTitle(e.target.value)
            e.target.removeAttribute('style')
            e.target.setAttribute('style', `height: ${e.target.scrollHeight}px`)
          }}
          onKeyDown={e => {
            e.key === 'Enter'
              ? (() => {
                  e.preventDefault()
                  const response = submit({ title, description })
                  if (response) clear()
                })()
              : undefined
          }}
          placeholder='例如：下午三點開會'
          className='bg-transparent border-none font-medium outline-none h-5 text-black text-sm w-full leading-5 resize-none break-words'
        />
        <textarea
          ref={descriptionEl}
          value={description}
          onChange={e => {
            setDescription(e.target.value)
            e.target.removeAttribute('style')
            e.target.setAttribute('style', `height: ${e.target.scrollHeight}px`)
          }}
          name='desc'
          id='desc'
          placeholder='描述'
          className='bg-transparent border-none outline-none mt-2 text-sm w-full resize-none md:h-15 -md:h-10 -md:mt-1'
        />
      </div>
      <div className='mt-3 -md:mt-2'>
        <button
          className='rounded-md cursor-pointer text-white mr-10px py-1 px-10px focus:outline-none disabled:cursor-not-allowed disabled:opacity-40'
          bg='primary'
          border='transparent solid'
          disabled={title === ''}
          onClick={e => {
            e.preventDefault()
            submit({ title, description })
            titleEl.current?.focus()
            clear()
          }}
        >
          新增任務
        </button>
        <button
          className='border border-solid rounded-md border-gray-400 py-1 px-10px'
          onClick={e => {
            e.preventDefault()
            clear()
            cancel()
          }}
        >
          取消
        </button>
      </div>
    </form>
  )
}

export default createTodoForm
