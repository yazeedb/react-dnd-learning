import React, { FC } from 'react';
import styled from 'styled-components';
import * as d from './initial-data';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
`;

interface TaskProps {
  task: d.Task;
  index: number;
}

export const Task: FC<TaskProps> = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(dragProvided) => (
        <Container
          {...dragProvided.draggableProps}
          {...dragProvided.dragHandleProps}
          ref={dragProvided.innerRef}
        >
          {task.content}
        </Container>
      )}
    </Draggable>
  );
};
