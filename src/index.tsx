import React, { useState } from 'react';
import { render } from 'react-dom';
import { DragDropContext } from 'react-beautiful-dnd';
import { initialData } from './initial-data';
import { Column } from './Column';

const App = () => {
  const [state, setState] = useState(initialData);

  return (
    <DragDropContext onDragEnd={(result) => {}}>
      {state.columnOrder.map((columnId) => {
        // @ts-ignore
        const column = state.columns[columnId] as Column;
        // @ts-ignore
        const tasks = column.taskIds.map((tId) => state.tasks[tId] as Task);

        return <Column column={column} tasks={tasks} key={columnId} />;
      })}
    </DragDropContext>
  );
};

render(<App />, document.getElementById('root'));
