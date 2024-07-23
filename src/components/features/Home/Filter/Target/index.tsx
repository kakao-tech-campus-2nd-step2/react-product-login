import React from 'react';
import { Container } from '@components/common';
import { FILTER_TARGETS, TargetType } from '../constants';
import TargetItem from './TargetItem';

export interface TargetProps {
  selectedTarget: TargetType;
  selectTarget: (target: TargetType) => void;
}

export default function Target({ selectedTarget, selectTarget }: TargetProps) {
  return (
    <Container justifyContent="space-around">
      {FILTER_TARGETS.map(({ id, icon, name, targetType }) => (
        <TargetItem
          key={id}
          icon={icon}
          target={name}
          selected={selectedTarget === targetType}
          onSelect={() => selectTarget(targetType)}
        />
      ))}
    </Container>
  );
}
