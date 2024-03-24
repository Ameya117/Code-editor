import React from 'react'
import styles from '../styles/loader.module.css'
const Loading = ({message}) => {
  return (
    <div className='bg-slate-100 w-fit px-4 rounded-lg text-xs flex flex-row py-2'>
      {/* Loading... */}
      <div className={`${styles.loader}`}></div>
      <span className='mx-2'>{message}</span>
    </div>
  )
}

export default Loading

