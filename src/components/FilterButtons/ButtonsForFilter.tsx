import React from 'react';
import s from './ButtonsForFilter.module.scss';
import { StatusType } from '../../App';

type Props = {
  changeFilter: (value: StatusType) => void;
  filtered: StatusType;
};

export const ButtonsForFilter = ({ changeFilter, filtered }: Props) => {
  return (
    <div className={s.buttonsForFilterByStatus}>
      <button
        className={filtered === 'expects' ? s.activeFilter : s.buttonFilter}
        onClick={() => changeFilter('expects')}
      >
        Expects
      </button>
      <button
        className={filtered === 'current' ? s.activeFilter : s.buttonFilter}
        onClick={() => changeFilter('current')}
      >
        Current
      </button>
      <button
        className={filtered === 'completed' ? s.activeFilter : s.buttonFilter}
        onClick={() => changeFilter('completed')}
      >
        Completed
      </button>
    </div>
  );
};
