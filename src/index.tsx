import React, { useState } from 'react';
import { render } from 'react-dom';
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';
import { initialData, Task } from './initial-data';
import { Column } from './Column';

const Container = styled.div`
  display: flex;
`;

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

        const startColumn = state.columns.get(source.droppableId);
        const finishColumn = state.columns.get(destination.droppableId);

        if (!startColumn || !finishColumn) {
          return;
        }

        if (startColumn.id === finishColumn.id) {
          startColumn.taskIds.splice(source.index, 1);
          finishColumn.taskIds.splice(destination.index, 0, draggableId);

          setState({ ...state });
        } else {
          startColumn.taskIds.splice(source.index, 1);
          finishColumn.taskIds.splice(destination.index, 0, draggableId);

          setState({ ...state });
        }
      }}
    >
      <Container>
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
      </Container>
    </DragDropContext>
  );
};

render(<App />, document.getElementById('root'));
