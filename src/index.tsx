import React, { useState } from 'react';
import { render } from 'react-dom';
import { DragDropContext } from 'react-beautiful-dnd';
import { initialData, Task } from './initial-data';
import { Column } from './Column';

const App = () => {
  const [state, setState] = useState(initialData);

  return (
    <DragDropContext
      onDragEnd={(result) => {
        const { destination, source, draggableId } = result;

        if (!destination) {
          return;
        }

        if (
          destination.droppableId === source.droppableId &&
          destination.index === source.index
        ) {
          return;
        }

        const column = state.columns.get(source.droppableId);

        if (!column) {
          return;
        }

        const newTaskIds = [...column.taskIds];

        newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, draggableId);

        setState({
          ...state,
          columns: state.columns.set(column.id, {
            ...column,
            taskIds: newTaskIds,
          }),
        });
      }}
    >
      {state.columnOrder.map((columnId) => {
        const column = state.columns.get(columnId);

        if (!column) {
          return <div />;
        }

        const tasks = column.taskIds.map((tId) =>
          state.tasks.get(tId)
        ) as Task[];

        return <Column column={column} tasks={tasks} key={columnId} />;
      })}
    </DragDropContext>
  );
};

render(<App />, document.getElementById('root'));
