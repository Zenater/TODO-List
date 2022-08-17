import { ChangeEvent } from 'react';
import s from './Search.module.scss';

type Props = {
  searchTaskName: string;
  setSearchTaskName: (task: string) => void;
};

export const Search = ({ searchTaskName, setSearchTaskName }: Props) => {
  const handleTermSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const valueTerm = e.currentTarget.value.toLocaleLowerCase();
    setSearchTaskName(valueTerm);
  };

  return (
    <div className={s.container}>
      <input
        onChange={handleTermSearch}
        type="text"
        placeholder="Search here..."
        value={searchTaskName}
        className={s.input}
      />
    </div>
  );
};
