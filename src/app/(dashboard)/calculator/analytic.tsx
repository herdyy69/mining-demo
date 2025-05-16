'use client'

import React from 'react'
import dynamic from 'next/dynamic'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

function getRandomCurveData(length: number) {
  return Array.from({ length }, () => Math.floor(Math.random() * 1000))
}

export const PumpFlowRateChart = ({ value }: { value: any }) => {
  const series = [
    {
      name: 'Line A',
      data: getRandomCurveData(10),
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
      text: 'Max Pore Throat [D90] (μm)',
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
      categories: getRandomCurveData(10),
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
