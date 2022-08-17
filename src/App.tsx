import React, { DragEvent, useEffect, useRef, useState } from 'react';
import s from './App.module.scss';
import { AddTasks } from './components/AddTasks/addTasks';
import { Search } from './components/SearchInput/Search';
import { Tasks } from './components/Tasks/Tasks';
import { ButtonsForFilter } from './components/FilterButtons/ButtonsForFilter';

export type StatusType = 'expects' | 'current' | 'completed';

const LOCALSTORAGE_TASKS_KEY = 'todolist-tasks';

export type TaskType = {
  id: string;
  title: string;
  status: string;
};

function App() {
  const customId = () => Math.random().toString(16).slice(2);

  const [isLoading, setIsLoading] = useState(true);
  const [filtered, setFiltered] = useState<StatusType>('expects');
  const [searchTaskName, setSearchTaskName] = useState('');
  const [initialPosition, setInitialPosition] = useState(0);
  const [initialSize, setInitialSize] = useState(0);

  let [tasks, setTasks] = useState([
    { id: customId(), title: 'Administrative tasks ', status: 'expects' },
    { id: customId(), title: 'Lead generation and customer service', status: 'expects' },
    { id: customId(), title: 'Accounting and financial duties', status: 'current' },
    { id: customId(), title: 'Marketing', status: 'completed' },
    { id: customId(), title: ' IT operations', status: 'completed' },
  ]);

  const removeTask = (id: string) => setTasks(tasks.filter((t) => t.id != id));

  const addTask = (title: string) => {
    setTasks([{ id: customId(), title, status: 'expects' }, ...tasks]);
    setSearchTaskName('');
  };

  const changeStatusTask = (taskId: string, status: StatusType) => {
    setTasks(tasks.map((t) => (t.id === taskId ? { ...t, status } : t)));
  };

  const changeTaskTitle = (taskId: string, title: string) => {
    setTasks(tasks.map((t) => (t.id === taskId ? { ...t, title } : t)));
  };

  // code block for filtering tasks by status
  let tasksForTodolist = tasks;

  if (filtered === 'expects') {
    tasksForTodolist = tasks.filter((t) => t.status == 'expects');
  }
  if (filtered === 'completed') {
    tasksForTodolist = tasks.filter((t) => t.status === 'completed');
  }
  if (filtered === 'current') {
    tasksForTodolist = tasks.filter((t) => t.status === 'current');
  }

  const changeFilter = (value: StatusType) => setFiltered(value);

  //This block of code changes the size of the border by clicking
  const targetRef = useRef<HTMLDivElement>(null);
  const resizable = targetRef.current; //alternative document.getElementById()

  const initial = (e: DragEvent<HTMLDivElement>) => {
    setInitialPosition(e.clientX);
    setInitialSize(resizable?.offsetWidth!); // returns the width of the element
  };

  const resize = (e: DragEvent<HTMLDivElement>) => {
    resizable!.style.width = `${parseInt(String(initialSize)) + parseInt(String(e.clientX - initialPosition))}px`;
  };

  //This code block is initiated every time the task array changes (add, remove, update)
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(LOCALSTORAGE_TASKS_KEY, JSON.stringify(tasks));
    }
  }, [tasks]);

  //Starts when the user page is loaded
  useEffect(() => {
    setIsLoading(false);
    const tasksLocal = localStorage.getItem(LOCALSTORAGE_TASKS_KEY);
    tasksLocal && setTasks(JSON.parse(tasksLocal));
  }, []);

  return (
    <div className={s.app}>
      <div className={s.container}>
        <h3 className={s.title}>"TODO-LIST"</h3>

        <AddTasks addTask={addTask} />

        <Search setSearchTaskName={setSearchTaskName} searchTaskName={searchTaskName} />

        <div className={s.tasksContainer}>
          <div id={s.todo} ref={targetRef}>
            <Tasks
              tasks={tasksForTodolist}
              changeTaskStatus={changeStatusTask}
              changeTaskTitle={changeTaskTitle}
              removeTask={removeTask}
              searchTaskName={searchTaskName}
            />
          </div>
          <div id={s.Draggable} onDragStart={initial} onDrag={resize} />
          <span />
        </div>
        <ButtonsForFilter changeFilter={changeFilter} filtered={filtered} />
      </div>
    </div>
  );
}

export default App;
