import React, { FC } from 'react';
import styled from 'styled-components';
import * as d from './initial-data';

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
`;

interface TaskProps {
  task: d.Task;
}

export const Task: FC<TaskProps> = ({ task }) => {
  return <Container>{task.content}</Container>;
};
