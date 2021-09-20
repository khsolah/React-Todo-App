import React, { FC, useEffect, useRef, useState } from 'react'
import Icon from '~/components/base/Icon'
import style from '~/assets/css/TodoList.module.css'
import CreateTodoForm from './CreateTodoForm'

interface TodoList {
  id: string
  title: string
  description: string
  order: number
}

const TodoList: FC = () => {
  const [todolist, setTodolist] = useState<Array<TodoList>>([])
  const [action, setAction] = useState<null | 'adding-task'>(null)

  const submit = ({
    title,
    description
  }: {
    title: string
    description: string
  }) => {
    if (title === '') return false

    setTodolist(state => [
      ...state,
      { id: `${+new Date()}`, title, description, order: state.length }
    ])

    return true
  }

  const handleDrag = ({
    clientX: x,
    clientY: y,
    currentTarget
  }: React.DragEvent<HTMLLIElement>) => {
    const list = currentTarget.parentNode!
    let swapItem = document.elementFromPoint(x, y) || currentTarget

    currentTarget.classList.add(style['todolist__item--dragging'])

    if (swapItem.getAttribute('order') !== currentTarget.getAttribute('order'))
      swapTodos(
        +currentTarget.getAttribute('order')!,
        +swapItem.getAttribute('order')!
      )

    if (list === swapItem.parentNode) {
      swapItem =
        swapItem !== currentTarget.nextElementSibling
          ? swapItem
          : swapItem.nextElementSibling!
      list.insertBefore(currentTarget, swapItem)
    }
  }

  const handleDrop = ({ currentTarget }: React.DragEvent<HTMLLIElement>) =>
    currentTarget.classList.remove(style['todolist__item--dragging'])

  const swapTodos = (i: number, j: number) => {
    if (Number.isNaN(i) || Number.isNaN(j) || i === j) return

    setTodolist(state => {
      const copy = JSON.parse(JSON.stringify(state)) as TodoList[]
      ;[copy[i].order, copy[j].order] = [copy[j].order, copy[i].order]

      return copy
    })
  }

  return (
    <div className='w-full overflow-hidden'>
      <ul className='list-none w-full p-0'>
        {todolist
          .sort((a, b) => a.order - b.order)
          .map(({ description, id, order, title }, index) => (
            <li
              key={id}
              className='w-full py-2 inline-flex select-none items-center overflow-hidden relative'
              border='b solid gray-200'
              order={order}
              draggable
              onDragEnter={e => {
                e.preventDefault()
                e.stopPropagation()
              }}
              onDragOver={e => {
                e.preventDefault()
                e.stopPropagation()
              }}
              onDrag={handleDrag}
              onDrop={handleDrop}
            >
              <button
                className='bg-transparent rounded-full flex outline-none flex-shrink-0 h-18px mt-1 mr-2 w-18px items-center justify-center self-start hover:bg-gray-200'
                border='~ rounded-full solid gray-500'
                focus='outline-none'
                onClick={() =>
                  setTodolist(state => [
                    ...state.slice(0, index),
                    ...state.slice(index + 1)
                  ])
                }
              >
                <Icon
                  name='check'
                  className='h-3 opacity-0 text-green-800 w-3 hover:opacity-100'
                />
              </button>
              <div className='flex-1 overflow-hidden'>
                <div className='text-sm mb-1 break-all'>
                  {title}; [order]: {order}
                </div>
                <div className='text-xs w-full text-gray-600 whitespace-nowrap overflow-ellipsis overflow-hidden line-clamp-1 '>
                  {description}
                </div>
              </div>
            </li>
          ))}
        <li className={!action ? '' : 'hidden'}>
          <button
            className={`${style['todolist__button--create']} flex w-full text-gray-400 button items-center md:h-9 hover:text-primary`}
            onClick={() => setAction(() => 'adding-task')}
          >
            <Icon
              name='plus'
              className='bg-white rounded-full text-primary mr-3 md:h-6 md:w-6 -md:h-5 -md:mr-2 -md:w-5 '
            />
            <span>添加任務</span>
          </button>
        </li>
        <li className={`${!action ? 'hidden' : ''} py-1`}>
          <CreateTodoForm
            cancel={() => setAction(null)}
            submit={submit}
            action={action}
          />
        </li>
      </ul>
    </div>
  )
}

export default TodoList
