import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, reset } from 'C:/Projects/ssvr/labs/src/laba4/counter_slice.js';

function CounterPage() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Счётчик: {count}</h2>
      <button onClick={() => dispatch(increment())}>Увеличить</button>
      <button onClick={() => dispatch(decrement())}>Уменьшить</button>
      <button onClick={() => dispatch(reset())}>Сбросить</button>
    </div>
  );
}

export default CounterPage;
