import React, { ChangeEvent, useState } from 'react';
import { StatusType, TaskType } from '../../App';
import { EditableSpan } from '../EditableSpan/EditableSpan';
import img from '../../assets/images/changeStatus.png';
import s from './Tasks.module.scss';

type Props = {
  tasks: Array<TaskType>;
  removeTask: (taskId: string) => void;
  changeTaskStatus: (taskId: string, status: StatusType) => void;
  changeTaskTitle: (taskId: string, newTitle: string) => void;
  searchTaskName: string;
};

export const Tasks = ({ changeTaskStatus, changeTaskTitle, removeTask, tasks, searchTaskName }: Props) => {
  const [editMode, setEditMode] = useState<null | string>(null);
  const statuses = [{ status: 'completed' }, { status: 'expects' }, { status: 'current' }];

  const getVisibleTasks = (task: TaskType) => {
    const taskName = task.title.toLocaleLowerCase();
    return taskName.includes(searchTaskName);
  };
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>, id: string) => {
    changeTaskStatus(id, e.currentTarget.value as StatusType);
    setEditMode(null);
  };

  return (
    <ul>
      {tasks.map((task) => {
        const color =
          task.status === 'completed'
            ? 'green'
            : task.status === 'current'
            ? 'blue'
            : task.status === 'expects'
            ? 'white'
            : '';
        return (
          getVisibleTasks(task) && (
            <li key={task.id} style={{ color }}>
              <div className={s.listTasks}>
                <EditableSpan value={task.title} onChange={(newValue: string) => changeTaskTitle(task.id, newValue)} />

                <button onClick={() => removeTask(task.id)} className={s.buttonForDeleteTask}>
                  x
                </button>

                {editMode == task.id ? (
                  <div>
                    {statuses.map(({ status }) => (
                      <div key={status} className={s.listChangeStatusTask}>
                        <input
                          type="radio"
                          value={status}
                          onChange={(e) => onChangeHandler(e, task.id)}
                          checked={task.status === status}
                        />
                        <label htmlFor={status}>{status}</label>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p data-tooltip={'change status'} className={s.nameOfProfile}>
                    <img
                      src={img}
                      alt="change status task"
                      className={s.buttonForEdit}
                      onClick={() => setEditMode(task.id)}
                    />
                  </p>
                )}
              </div>
            </li>
          )
        );
      })}
    </ul>
  );
};
