import React, { useState } from 'react';
import { render } from 'react-dom';
import styled from 'styled-components';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
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
        const { destination, source, draggableId, type } = result;

        if (!destination) {
          return;
        }

        if (
          destination.droppableId === source.droppableId &&
          destination.index === source.index
        ) {
          return;
        }

        if (type === 'column') {
          state.columnOrder.splice(source.index, 1);
          state.columnOrder.splice(destination.index, 0, draggableId);
        } else {
          const startColumn = state.columns.get(source.droppableId);
          const finishColumn = state.columns.get(destination.droppableId);

          if (!startColumn || !finishColumn) {
            return;
          }

          if (startColumn.id === finishColumn.id) {
            startColumn.taskIds.splice(source.index, 1);
            finishColumn.taskIds.splice(destination.index, 0, draggableId);
          } else {
            startColumn.taskIds.splice(source.index, 1);
            finishColumn.taskIds.splice(destination.index, 0, draggableId);
          }

          setState({ ...state });
        }
      }}
    >
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {(dropProvided) => (
          <Container
            ref={dropProvided.innerRef}
            {...dropProvided.droppableProps}
          >
            {state.columnOrder.map((columnId, index) => {
              const column = state.columns.get(columnId);

              if (!column) {
                return <div />;
              }

              const tasks = column.taskIds.map((tId) =>
                state.tasks.get(tId)
              ) as Task[];

              return (
                <Column
                  column={column}
                  tasks={tasks}
                  key={columnId}
                  index={index}
                />
              );
            })}
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  );
};

render(<App />, document.getElementById('root'));
