import React, { useState } from 'react'
import { getTodo, getTodoError, getTodoSuccess } from './todosSlice'
import { useAppSelector, useAppDispatch } from '../../app/hooks';

export default function Todos() {

  const dispatch = useAppDispatch()
  const getTodos = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    dispatch(getTodo())
  }
  return (
    <div>
      <button
        onClick={(e) => getTodos(e)}
      >Get Todo</button>
    </div>
  )
}
