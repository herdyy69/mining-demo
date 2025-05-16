'use client'

import Form from '@/components/ui/form'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import DensityChart from '../analytic'
import Image from 'next/image'
import { cn } from '@/lib/utils'

function getRandomCurveData(length: number) {
  return Array.from({ length }, () => Math.floor(Math.random() * 10000))
}

export const FormParamsTripping = () => {
  const searchParams = useSearchParams()
  const [simulation, setSimulation] = React.useState<any>(false)

  const form = useForm<any>({
    defaultValues: {
      fluid: '10.3', // ppg
      interval: '8.5', // OH
      acceleration_time: '0', // sec
      connection_time: '0', // min
      injection_temperature: '80', // °F
      start_end_depth: ['0', '0'], // ft
      pipe_end_condition: 'Close - Ended',
    },
  })

  const dataCharts = [
    {
      title: '',
      labels: getRandomCurveData(7),
      datasets: [
        {
          label: 'Curve A',
          data: getRandomCurveData(7),
          borderColor: 'red',
          backgroundColor: 'red',
          borderWidth: 2,
          pointRadius: 0,
          xAxisID: 'x',
          yAxisID: 'y',
        },
      ],
    },
  ] as any

  return (
    <div className='grid grid-cols-3 gap-4'>
      <Form
        form={form}
        onSave={() => {}}
        onError={(error) => {}}
        className={cn('card h-max space-y-2', simulation ? 'col-span-2' : 'col-span-3')}
      >
        <h1 className='plabs-headline-regular-24 mb-4'>
          {searchParams.get('tab')
            ? searchParams.get('tab')!.charAt(0).toUpperCase() + searchParams.get('tab')!.slice(1)
            : 'Default'}
        </h1>
        <div className='flex flex-col'>
          <div className='space-y-8'>
            <div className='grid grid-cols-2 items-center'>
              <div className='flex flex-col justify-center'>
                <h3 className='plabs-title-medium-16 text-greyscale-0'>Fluid</h3>
              </div>
              <div className='flex items-center gap-2'>
                <Form.Input
                  name={`fluid`}
                  placeholder='Fluid'
                  className='w-full'
                  onChange={(e) => {
                    let formattedValue = e.target.value.replace(/[^0-9.]/g, '')

                    if ((formattedValue.match(/\./g) || []).length > 1) {
                      formattedValue = formattedValue.slice(0, -1)
                    }

                    form.setValue(`fluid`, formattedValue, {
                      shouldValidate: true,
                    })
                  }}
                  disabled
                />
                <span className='plabs-title-medium-16 text-greyscale-5 min-w-max'>ppg</span>
              </div>
            </div>
            <div className='grid grid-cols-2 items-center'>
              <div className='flex flex-col justify-center'>
                <h3 className='plabs-title-medium-16 text-greyscale-0'>Interval</h3>
              </div>
              <div className='flex items-center gap-2'>
                <Form.Input
                  name={`interval`}
                  placeholder='Interval'
                  className='w-full'
                  onChange={(e) => {
                    let formattedValue = e.target.value.replace(/[^0-9.]/g, '')

                    if ((formattedValue.match(/\./g) || []).length > 1) {
                      formattedValue = formattedValue.slice(0, -1)
                    }

                    form.setValue(`interval`, formattedValue, {
                      shouldValidate: true,
                    })
                  }}
                  disabled
                />
                <span className='plabs-title-medium-16 text-greyscale-5 min-w-max'>” OH</span>
              </div>
            </div>
            <div className='grid grid-cols-2 items-center'>
              <div className='flex flex-col justify-center'>
                <h3 className='plabs-title-medium-16 text-greyscale-0'>Acceleration Time</h3>
              </div>
              <div className='flex items-center gap-2'>
                <Form.Input
                  name={`acceleration_time`}
                  placeholder='Acceleration Time'
                  className='w-full'
                  onChange={(e) => {
                    let value = e.target.value.replace(/[^0-9.]/g, '')
                    form.setValue(`acceleration_time`, value, { shouldValidate: true })
                  }}
                  disabled
                />
                <span className='plabs-title-medium-16 text-greyscale-5 min-w-max'>sec</span>
              </div>
            </div>
            <div className='grid grid-cols-2 items-center'>
              <div className='flex flex-col justify-center'>
                <h3 className='plabs-title-medium-16 text-greyscale-0'>Connection Time</h3>
              </div>
              <div className='flex items-center gap-2'>
                <Form.Input
                  name={`connection_time`}
                  placeholder='Connection Time'
                  className='w-full'
                  onChange={(e) => {
                    let value = e.target.value.replace(/[^0-9.]/g, '')
                    form.setValue(`connection_time`, value, { shouldValidate: true })
                  }}
                  disabled
                />
                <span className='plabs-title-medium-16 text-greyscale-5 min-w-max'>min</span>
              </div>
            </div>
            <div className='grid grid-cols-2 items-center'>
              <div className='flex flex-col justify-center'>
                <h3 className='plabs-title-medium-16 text-greyscale-0'>Injection Temperature</h3>
              </div>
              <div className='flex items-center gap-2'>
                <Form.Input
                  name={`injection_temperature`}
                  placeholder='Injection Temperature'
                  className='w-full'
                  onChange={(e) => {
                    let value = e.target.value.replace(/[^0-9.]/g, '')
                    form.setValue(`injection_temperature`, value, { shouldValidate: true })
                  }}
                  disabled
                />
                <span className='plabs-title-medium-16 text-greyscale-5 min-w-max'>°F</span>
              </div>
            </div>
            <div className='grid grid-cols-2 items-center'>
              <div className='flex flex-col justify-center'>
                <h3 className='plabs-title-medium-16 text-greyscale-0'>Start-End Depth</h3>
              </div>
              <div className='flex items-center gap-2'>
                <Form.Input
                  name={`start_end_depth.0`}
                  placeholder='Start Depth'
                  className='w-full'
                  onChange={(e) => {
                    let value = e.target.value.replace(/[^0-9.]/g, '')
                    form.setValue(`start_end_depth.0`, value, { shouldValidate: true })
                  }}
                  disabled
                />
                <Form.Input
                  name={`start_end_depth.1`}
                  placeholder='End Depth'
                  className='w-full'
                  onChange={(e) => {
                    let value = e.target.value.replace(/[^0-9.]/g, '')
                    form.setValue(`start_end_depth.1`, value, { shouldValidate: true })
                  }}
                  disabled
                />
                <span className='plabs-title-medium-16 text-greyscale-5 min-w-max'>ft</span>
              </div>
            </div>
            <div className='grid grid-cols-2 items-center'>
              <div className='flex flex-col justify-center'>
                <h3 className='plabs-title-medium-16 text-greyscale-0'>Pipe End Condition</h3>
              </div>
              <div className='flex items-center gap-2'>
                <Form.Select
                  name={`pipe_end_condition`}
                  placeholder='Pipe End Condition'
                  options={[
                    { value: 'Open - Ended', label: 'Open - Ended' },
                    { value: 'Close - Ended', label: 'Close - Ended' },
                  ]}
                  className='w-full'
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
        <div className='flex w-full justify-end gap-2'>
          <div className='flex gap-2'>
            <Form.Button
              onClick={() => {
                setSimulation(false)
              }}
              type='button'
              className='btn-outline-greyscale text-greyscale-0'
            >
              Stop Simulation
            </Form.Button>
            <Form.Button
              onClick={() => {
                setSimulation(true)
              }}
              type='button'
              className='btn-lime'
            >
              Start Simulation
            </Form.Button>
          </div>
        </div>
      </Form>
      {simulation && (
        <div className='space-y-4'>
          {dataCharts.map((chart: any, index: number) => (
            <div key={index} className='card h-max pb-1 pl-2'>
              <DensityChart title={chart.title} labels={chart.labels} datasets={chart.datasets} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
