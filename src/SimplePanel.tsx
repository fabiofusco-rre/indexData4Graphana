import React from 'react';
import { PanelProps } from '@grafana/data';
import { SimpleOptions } from 'types';
import { useTheme } from '@grafana/ui';
import * as d3 from 'd3';

interface Props extends PanelProps<SimpleOptions> {}

export const SimplePanel: React.FC<Props> = ({ options, data, width, height }) => {
  const theme = useTheme();

  const values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
  const scale = d3
    .scaleLinear()
    .domain([0, d3.max(values) || 0.0])
    .range([0, width]);

  const axis = d3.axisBottom(scale);

  const padding = 20;
  const chartHeight = height - padding;
  const barHeight = chartHeight / values.length;

  return (
    <svg width={width} height={height}>
      <g>
        {values.map((value, i) => (
          <rect key={`chart`} x={0} y={i * barHeight} width={scale(value)} height={barHeight - 1} fill={theme.palette.greenBase} />
        ))}
      </g>
      <g
        transform={`translate(0, ${chartHeight})`}
        ref={node => {
          d3.select(node).call(axis as any);
        }}
      />
    </svg>
  );
};