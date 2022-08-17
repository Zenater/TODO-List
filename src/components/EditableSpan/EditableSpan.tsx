import React, { ChangeEvent, useState } from 'react';
import s from './EditableSpan.module.scss';

type Props = {
  value: string;
  onChange: (newValue: string) => void;
};

export const EditableSpan = ({ onChange, value }: Props) => {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(value);

  const activateEditMode = () => {
    setEditMode(true);
    setTitle(value);
  };

  const activateViewMode = () => {
    onChange(title);
    setEditMode(false);
  };

  const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value);

  return editMode ? (
    <input value={title} onChange={changeTitleHandler} autoFocus onBlur={activateViewMode} />
  ) : (
    <span onDoubleClick={activateEditMode} className={s.changeNameTask}>
      {value}
    </span>
  );
};
