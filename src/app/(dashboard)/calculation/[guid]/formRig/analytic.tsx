'use client'

import React from 'react'
import dynamic from 'next/dynamic'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

export const PumpFlowRateChart = () => {
  const series = [
    {
      name: 'Line A',
      data: [0, 128, 256, 384, 512, 640, 768, 896, 1024],
    },
    {
      name: 'Line B',
      data: [0, 64, 128, 192, 256, 320, 384, 448, 512],
    },
  ]

  const options = {
    chart: {
      type: 'line',
      background: 'transparent',
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    theme: { mode: 'dark' },
    colors: ['#FF0000', '#0000FF'],
    dataLabels: { enabled: false },
    stroke: { curve: 'straight', width: 2 },
    title: {
      text: 'Pump Flow Rate',
      align: 'left',
      style: {
        color: '#ffffff',
        fontSize: '16px',
      },
    },
    grid: {
      borderColor: '#444',
      strokeDashArray: 6,
    },
    xaxis: {
      categories: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90],
      labels: {
        style: {
          colors: '#ccc',
        },
      },
    },
    yaxis: {
      min: 0,
      max: 1024,
      tickAmount: 4,
      labels: {
        style: {
          colors: '#ccc',
        },
      },
    },
    legend: { show: false },
  } as any

  return <Chart options={options} series={series} type='line' height={350} />
}
