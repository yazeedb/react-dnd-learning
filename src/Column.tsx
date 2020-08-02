import React, { FC } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import * as d from './initial-data';
import { Task } from './Task';

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 220px;

  display: flex;
  flex-direction: column;
`;

const Title = styled.h3`
  padding: 8px;
`;

const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${(props) =>
    // @ts-ignore
    props.isDraggingOver ? 'skyblue' : 'white'};

  flex-grow: 1;
  min-height: 100px;
`;

interface ColumnProps {
  column: d.Column;
  tasks: d.Task[];
  index: number;
}

export const Column: FC<ColumnProps> = ({ column, tasks, index }) => {
  return (
    <Draggable draggableId={column.id} index={index}>
      {(dragProvided, dragSnapshot) => (
        <Container ref={dragProvided.innerRef} {...dragProvided.draggableProps}>
          <Title {...dragProvided.dragHandleProps}>{column.title}</Title>

          <Droppable droppableId={column.id}>
            {(dropProvided, dropSnapshot) => (
              <TaskList
                ref={dropProvided.innerRef}
                {...dropProvided.droppableProps}
                // @ts-ignore
                isDraggingOver={dropSnapshot.isDraggingOver}
              >
                {tasks.map((t, index) => (
                  <Task task={t} index={index} key={t.id} />
                ))}
                {dropProvided.placeholder}
              </TaskList>
            )}
          </Droppable>
        </Container>
      )}
    </Draggable>
  );
};
