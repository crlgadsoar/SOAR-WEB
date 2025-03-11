import React from 'react';
import Widget from './Widget';
import { Timeline } from 'antd';
/**
 * An array of change log objects.
 * Each object represents a specific version of the software and its corresponding changes.
 */
export const changeLogs = [
  {
    id: 1,
    title: 'V-1.0.0',
    children: (
      <>
        <h4>V-1.0.0</h4>
        <ul style={{ fontSize: '12px' }}>
          <li key={'date'}>Oct 5, 2023</li>
          <li> - Changelog New Menu Created.</li>
        </ul>
      </>
    ),
  },
  {
    id: 2,
    title: 'V-1.0.1',
    children: (
      <>
        <h4>V-1.0.1</h4>
        <ul style={{ fontSize: '12px' }}>
          <li key={'date'}>Oct 6, 2023</li>
          <li> - SMS contacts New Menu Created.</li>
        </ul>
      </>
    ),
  },
];

const Changelog = () => {
  return (
    <Widget title='Changelogs'>
      <Timeline items={changeLogs}></Timeline>
    </Widget>
  );
};

export default Changelog;
