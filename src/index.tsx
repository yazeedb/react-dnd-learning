import React, { useState } from 'react';
import { render } from 'react-dom';
import { initialData } from './initial-data';
import { Column } from './Column';

const App = () => {
  const [state, setState] = useState(initialData);

  return (
    <div>
      {state.columnOrder.map((columnId) => {
        // @ts-ignore
        const column = state.columns[columnId] as Column;
        // @ts-ignore
        const tasks = column.taskIds.map((tId) => state.tasks[tId] as Task);

        return <Column column={column} tasks={tasks} key={columnId} />;
      })}
    </div>
  );
};

render(<App />, document.getElementById('root'));
