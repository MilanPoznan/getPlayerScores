import { Middleware, MiddlewareAPI, Dispatch, Action } from '@reduxjs/toolkit'
// import {  } from "redux";

import { RootState } from '../../app/store'

import { useAppSelector, useAppDispatch } from '../../app/hooks';

//actions 
import { getTodo, getTodoError, getTodoSuccess } from './todosSlice'

import axios from 'axios'

/**
 * 
 * @param store mi daje  dispatch, getState metode
 * @returns 
 */
export const CustomMiddleware: Middleware<{}, RootState> = store => next => async action => {

  const { dispatch, getState } = store
  // const dispatch = useAppDi/spatch()
  // store.dispatch(getTodo())
  console.log('store', store)
  console.log('action', action)

  if (action.type === 'todos/getTodo') {
    try {
      const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts/1')
      console.log('data', data)
      // dispatch(getTodoSuccess(data))
    } catch (err) {
      // dispatch(getTodoError(err.message))
    }
  } else {
    return next(action)
  }

  // return res;
};

