import React, { FC } from 'react'
import Header from '~/components/base/header'
import TodoList from '~/components/todo/TodoList'
import '~/App.css'
import '~/assets/css/base.css'
import 'virtual:windi.css'
import 'virtual:windi-devtools'

const App: FC = () => (
  <div className='App'>
    <Header />
    <main className='flex mt-11 relative content__container -md:px-14 -md:pt-9'>
      <div className='bg-white flex-grow w-full md:mx-auto md:max-w-200 md:px-14'>
        <header className='md:mb-2 md:pt-9'>
          <h1 className='font-bold text-xl'>Todo List</h1>
        </header>
        <section className=''>
          <TodoList />
        </section>
      </div>
    </main>
  </div>
)

export default App
