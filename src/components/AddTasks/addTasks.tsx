import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import s from './AddTasks.module.scss';

type Props = {
  addTask: (title: string) => void;
};
export const AddTasks = ({ addTask }: Props) => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState<string | null>(null);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value);

  const addTaskHandler = () => {
    if (title.trim() !== '') {
      addTask(title.trim());
      setTitle('');
    } else {
      setError('Title is required');
    }
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    e.key === 'Enter' && addTaskHandler();
  };

  return (
    <div className={s.inputForAddTask}>
      <input
        value={title}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
        className={error ? s.error : s.input}
        placeholder={'create task'}
      />
      <button onClick={addTaskHandler} className={s.addTaskButton} disabled={title === ''}>
        +
      </button>
      {error && <div className={s.errorMessage}>{error}</div>}
    </div>
  );
};
