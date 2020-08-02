import React, { FC } from 'react';
import styled from 'styled-components';
import * as d from './initial-data';
import { Task } from './Task';

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
`;

const Title = styled.h3`
  padding: 8px;
`;

const TaskList = styled.div`
  padding: 8px;
`;

interface ColumnProps {
  column: d.Column;
  tasks: d.Task[];
}

export const Column: FC<ColumnProps> = ({ column, tasks }) => {
  return (
    <Container>
      <Title>{column.title}</Title>

      <TaskList>
        {tasks.map((t) => (
          <Task task={t} key={t.id} />
        ))}
      </TaskList>
    </Container>
  );
};
