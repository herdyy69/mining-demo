'use client'

import React from 'react'
import dynamic from 'next/dynamic'

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })

export const PumpFlowRateChart = ({ data }: { data: any[] }) => {
  // Convert string values to numbers and handle comma as decimal separator
  const cci = data.map((item) => parseFloat(item.cci.replace(',', '.')))
  const lummLength = data.map((item) => parseFloat(item.lummLength.replace(',', '.')))

  const series = [
    {
      name: 'CCI vs Lumm Length',
      data: lummLength,
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
    colors: ['#007bff'],
    dataLabels: { enabled: false },
    stroke: { curve: 'straight', width: 2 },
    grid: {
      borderColor: '#444',
      strokeDashArray: 6,
    },
    xaxis: {
      categories: cci,
      title: { text: 'CCI', style: { color: '#ccc' } },
      labels: {
        style: {
          colors: '#ccc',
        },
      },
      position: 'top',
    },
    yaxis: {
      min: Math.min(...lummLength, 0),
      max: Math.max(...lummLength, 0),
      tickAmount: 4,
      title: { text: 'Lumm Length', style: { color: '#ccc' } },
      labels: {
        style: {
          colors: '#ccc',
        },
      },
      reversed: true,
    },
    legend: { show: false },
  } as any

  return <Chart options={options} series={series} type='line' height={350} />
}
