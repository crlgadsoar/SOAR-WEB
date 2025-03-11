import React from 'react';
import { nivoTreeMapData } from '../data';
import TreeMap from './TreeMap';

const Index = () => {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <TreeMap data={nivoTreeMapData} />
    </div>
  );
};

export default Index;
