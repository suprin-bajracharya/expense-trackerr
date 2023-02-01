import * as React from 'react';
import Paper from '@mui/material/Paper';
import {
    Chart,
    ArgumentAxis,
    ValueAxis,
    BarSeries,
    Tooltip
  } from '@devexpress/dx-react-chart-material-ui';

import { scaleBand } from '@devexpress/dx-chart-core';
import { ArgumentScale, Stack } from '@devexpress/dx-react-chart'; 
import { ValueScale, Animation, EventTracker } from '@devexpress/dx-react-chart';
import dayjs from "dayjs"
import { Container } from '@mui/material';


export default function TransactionChart({data}) { 

  const chartData = data.map((item) => {
    item.month = dayjs().month(item._id-1).format("MMM")
    return item
  })

    return (
      <Container sx={{marginTop: 10}}>
      <Paper>
        <Chart
          data={chartData}
        >
            <ArgumentScale factory={scaleBand} />
            <ArgumentAxis />
            <ValueAxis />
            <BarSeries
                valueField="totalExpenses"
                argumentField="month"
            />
            <Animation />
            <EventTracker />
            <Tooltip />
        </Chart>
      </Paper>
      </Container>
    );
}



