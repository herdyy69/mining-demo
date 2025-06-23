import React from 'react'

interface ResultCardProps {
  title: string
  value: string | number
  unit?: string
}

export const ResultCard: React.FC<ResultCardProps> = ({ title, value, unit }) => {
  return (
    <div className='flex flex-col items-center justify-center rounded-lg bg-blue-100 p-2'>
      <h3 className='plabs-title-medium-16 text-white'>{title}</h3>
      <p className='plabs-title-medium-16 text-white'>
        {value} {unit}
      </p>
    </div>
  )
}
