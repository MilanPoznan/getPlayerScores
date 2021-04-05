import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  selectCount,
} from './counterSlice';
import styles from './Counter.module.css';
import { useAppSelector, useAppDispatch } from '../../app/hooks';

export function Counter() {


  const [customAmount, setCustomAmount] = useState(0)
  const x = useAppSelector(state => state)
  console.log('xxx', x)
  const count = useAppSelector(state => state.reducer.counterReducer.value)
  const dispatch = useAppDispatch()

  return (
    <div>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
        <span className={styles.value}>{count}</span>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
      </div>
      <div className={styles.row}>
        <input
          value={customAmount}
          className={styles.textbox}
          aria-label="Set increment amount"
          onChange={(e) => setCustomAmount(parseInt(e.target.value))}
        />
        <button
          className={styles.button}
          onClick={() => dispatch(incrementByAmount(Number(customAmount)))}
        >
          Add Amount
        </button>
        <button
          className={styles.asyncButton}
        // onClick={() => dispatch(incrementAsync(Number(customAmount)))}
        >
          Add Async
        </button>
      </div>
    </div>
  );
}
