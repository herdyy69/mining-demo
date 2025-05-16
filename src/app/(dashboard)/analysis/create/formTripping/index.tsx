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

export const FormTripping = () => {
  const searchParams = useSearchParams()
  const [simulation, setSimulation] = React.useState<any>(false)

  const form = useForm<any>({
    defaultValues: {
      fluid: '10.3', // ppg
      interval: '8.5', // OH
      string: 'DS',
      pipe_speed: ['100', '1'],
      acceleration_time: '0', // sec
      connection_time: '0', // min
      pump_flowrate: ['0', '0'],
      injection_temperature: '80', // °F
      start_end_depth: ['0', '0'], // ft
      safety_margin: '0.1', // ppg
      pipe_end_condition: 'Close - Ended',

      casing_shoe: '7500', // ft
      total_depth: '10000', // ft
      max_speed: '100', // ft/min
      pump: '0', // gpm
      mud_weight: ['10.2', '70'], // ppg, °F
      pv: '30', // cp
      yp: '0', // lbf/100ft2
      lsyp: '0', // lbf/100ft2
    },
  })

  const dataCharts = [
    {
      title: 'Angle Chart',
      labels: [9.0, 8.8, 8.7, 8.6, 8.5, 8.4, 8.3],
      datasets: [
        {
          label: 'Curve A',
          data: getRandomCurveData(7),
          borderColor: 'red',
          backgroundColor: 'red',
          borderWidth: 2,
          tension: 0.4,
          pointRadius: 0,
          xAxisID: 'x',
          yAxisID: 'y',
        },
      ],
    },
    {
      title: 'PV (cp) | YP.LSYP (lbf/100ft2)',
      labels: [9.0, 8.8, 8.7, 8.6, 8.5, 8.4, 8.3],
      datasets: [
        {
          label: 'Curve A',
          data: getRandomCurveData(7),
          borderColor: 'white',
          backgroundColor: 'white',
          borderWidth: 2,
          tension: 0.4,
          pointRadius: 0,
          xAxisID: 'x',
          yAxisID: 'y',
        },
        {
          label: 'Curve B',
          data: getRandomCurveData(7),
          borderColor: 'red',
          backgroundColor: 'red',
          borderWidth: 2,
          tension: 0.4,
          pointRadius: 0,
          xAxisID: 'x',
          yAxisID: 'y',
        },
        {
          label: 'Curve C',
          data: getRandomCurveData(7),
          borderColor: 'lime',
          backgroundColor: 'lime',
          borderWidth: 2,
          tension: 0.4,
          pointRadius: 0,
          xAxisID: 'x',
          yAxisID: 'y',
        },
      ],
    },
    {
      title: 'Temperature',
      labels: [9.0, 8.8, 8.7, 8.6, 8.5, 8.4, 8.3],
      datasets: [
        {
          label: 'Curve A',
          data: getRandomCurveData(7),
          borderColor: 'white',
          backgroundColor: 'white',
          borderWidth: 2,
          tension: 0.4,
          pointRadius: 0,
          xAxisID: 'x',
          yAxisID: 'y',
        },
        {
          label: 'Curve B',
          data: getRandomCurveData(7),
          borderColor: 'red',
          backgroundColor: 'red',
          borderWidth: 2,
          tension: 0.4,
          pointRadius: 0,
          xAxisID: 'x',
          yAxisID: 'y',
        },
        {
          label: 'Curve C',
          data: getRandomCurveData(7),
          borderColor: 'lime',
          backgroundColor: 'lime',
          borderWidth: 2,
          tension: 0.4,
          pointRadius: 0,
          xAxisID: 'x',
          yAxisID: 'y',
        },
      ],
    },
    {
      title: 'Pipe Speed',
      labels: [9.0, 8.8, 8.7, 8.6, 8.5, 8.4, 8.3],
      datasets: [
        {
          label: 'Curve A',
          data: getRandomCurveData(7),
          borderColor: 'red',
          backgroundColor: 'red',
          borderWidth: 2,
          tension: 0.4,
          pointRadius: 0,
          xAxisID: 'x',
          yAxisID: 'y',
        },
      ],
    },
    {
      title: 'ESD (ppg)',
      labels: [9.0, 8.8, 8.7, 8.6, 8.5, 8.4, 8.3],
      datasets: [
        {
          label: 'Curve A',
          data: getRandomCurveData(7),
          borderColor: 'red',
          backgroundColor: 'red',
          borderWidth: 2,
          tension: 0.4,
          pointRadius: 0,
          xAxisID: 'x',
          yAxisID: 'y',
        },
      ],
    },
    {
      title: 'EMW (ppg)',
      labels: [9.0, 8.8, 8.7, 8.6, 8.5, 8.4, 8.3],
      datasets: [
        {
          label: 'Curve A',
          data: getRandomCurveData(7),
          borderColor: 'red',
          backgroundColor: 'red',
          borderWidth: 2,
          tension: 0.4,
          pointRadius: 0,
          xAxisID: 'x',
          yAxisID: 'y',
        },
      ],
    },
    {
      title: 'EMW @ bit (ppg)',
      labels: [9.0, 8.8, 8.7, 8.6, 8.5, 8.4, 8.3],
      datasets: [
        {
          label: 'Curve A',
          data: getRandomCurveData(7),
          borderColor: 'red',
          backgroundColor: 'red',
          borderWidth: 2,
          tension: 0.4,
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
                />
                <span className='plabs-title-medium-16 text-greyscale-5 min-w-max'>” OH</span>
              </div>
            </div>
            <div className='grid grid-cols-2 items-center'>
              <div className='flex flex-col justify-center'>
                <h3 className='plabs-title-medium-16 text-greyscale-0'>String</h3>
              </div>
              <div className='flex items-center gap-2'>
                <Form.Select
                  name={`string`}
                  placeholder='String'
                  options={[
                    { value: 'DS', label: 'DS' },
                    { value: 'SS', label: 'SS' },
                    { value: 'CS', label: 'CS' },
                  ]}
                  className='w-full'
                />
              </div>
            </div>
            <div className='grid grid-cols-2 items-center'>
              <div className='flex flex-col justify-center'>
                <h3 className='plabs-title-medium-16 text-greyscale-0'>Pipe Speed</h3>
              </div>
              <div className='flex items-center gap-2'>
                <Form.Input
                  name={`pipe_speed.0`}
                  placeholder='Speed Value'
                  className='w-full'
                  onChange={(e) => {
                    let value = e.target.value.replace(/[^0-9.]/g, '')
                    if ((value.match(/\./g) || []).length > 1) value = value.slice(0, -1)
                    form.setValue(`pipe_speed.0`, value, { shouldValidate: true })
                  }}
                />
                <Form.Input
                  name={`pipe_speed.1`}
                  placeholder='Speed Unit'
                  className='w-full'
                  onChange={(e) => {
                    let value = e.target.value.replace(/[^0-9.]/g, '')
                    if ((value.match(/\./g) || []).length > 1) value = value.slice(0, -1)
                    form.setValue(`pipe_speed.1`, value, { shouldValidate: true })
                  }}
                />
                <span className='plabs-title-medium-16 text-greyscale-5 min-w-max'>ft/min</span>
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
                />
                <span className='plabs-title-medium-16 text-greyscale-5 min-w-max'>min</span>
              </div>
            </div>
            <div className='grid grid-cols-2 items-center'>
              <div className='flex flex-col justify-center'>
                <h3 className='plabs-title-medium-16 text-greyscale-0'>Pump Flowrate</h3>
              </div>
              <div className='flex items-center gap-2'>
                <Form.Input
                  name={`pump_flowrate.0`}
                  placeholder='Pump Flowrate'
                  className='w-full'
                  onChange={(e) => {
                    let value = e.target.value.replace(/[^0-9.]/g, '')
                    form.setValue(`pump_flowrate.0`, value, { shouldValidate: true })
                  }}
                />
                <Form.Input
                  name={`pump_flowrate.1`}
                  placeholder='Pump Flowrate'
                  className='w-full'
                  onChange={(e) => {
                    let value = e.target.value.replace(/[^0-9.]/g, '')
                    form.setValue(`pump_flowrate.1`, value, { shouldValidate: true })
                  }}
                />
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
                />
                <Form.Input
                  name={`start_end_depth.1`}
                  placeholder='End Depth'
                  className='w-full'
                  onChange={(e) => {
                    let value = e.target.value.replace(/[^0-9.]/g, '')
                    form.setValue(`start_end_depth.1`, value, { shouldValidate: true })
                  }}
                />
                <span className='plabs-title-medium-16 text-greyscale-5 min-w-max'>ft</span>
              </div>
            </div>
            <div className='grid grid-cols-2 items-center'>
              <div className='flex flex-col justify-center'>
                <h3 className='plabs-title-medium-16 text-greyscale-0'>Safety Margin</h3>
              </div>
              <div className='flex items-center gap-2'>
                <Form.Input
                  name={`safety_margin`}
                  placeholder='Safety Margin'
                  className='w-full'
                  onChange={(e) => {
                    let value = e.target.value.replace(/[^0-9.]/g, '')
                    if ((value.match(/\./g) || []).length > 1) value = value.slice(0, -1)
                    form.setValue(`safety_margin`, value, { shouldValidate: true })
                  }}
                />
                <span className='plabs-title-medium-16 text-greyscale-5 min-w-max'>ppg</span>
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
                />
              </div>
            </div>
          </div>
        </div>
        <div className='mt-6 space-y-3'>
          <h2 className='plabs-title-regular-20 mb-4'>Surge Open-Ended</h2>
          <div className='grid grid-cols-2 items-center'>
            <div className='flex flex-col justify-center'>
              <h3 className='plabs-title-medium-16 text-greyscale-0'>Casing Shoe</h3>
            </div>
            <div className='flex items-center gap-2'>
              <Form.Input
                name={`casing_shoe`}
                placeholder='Casing Shoe'
                className='w-full'
                onChange={(e) => {
                  let value = e.target.value.replace(/[^0-9.]/g, '')
                  form.setValue(`casing_shoe`, value, { shouldValidate: true })
                }}
              />
              <span className='plabs-title-medium-16 text-greyscale-5 min-w-max'>ft</span>
            </div>
          </div>
          <div className='grid grid-cols-2 items-center'>
            <div className='flex flex-col justify-center'>
              <h3 className='plabs-title-medium-16 text-greyscale-0'>Total Depth</h3>
            </div>
            <div className='flex items-center gap-2'>
              <Form.Input
                name={`total_depth`}
                placeholder='Total Depth'
                className='w-full'
                onChange={(e) => {
                  let value = e.target.value.replace(/[^0-9.]/g, '')
                  form.setValue(`total_depth`, value, { shouldValidate: true })
                }}
              />
              <span className='plabs-title-medium-16 text-greyscale-5 min-w-max'>ft</span>
            </div>
          </div>
          <div className='grid grid-cols-2 items-center'>
            <div className='flex flex-col justify-center'>
              <h3 className='plabs-title-medium-16 text-greyscale-0'>Max Speed</h3>
            </div>
            <div className='flex items-center gap-2'>
              <Form.Input
                name={`max_speed`}
                placeholder='Max Speed'
                className='w-full'
                onChange={(e) => {
                  let value = e.target.value.replace(/[^0-9.]/g, '')
                  form.setValue(`max_speed`, value, { shouldValidate: true })
                }}
              />
              <span className='plabs-title-medium-16 text-greyscale-5 min-w-max'>ft/min</span>
            </div>
          </div>
          <div className='grid grid-cols-2 items-center'>
            <div className='flex flex-col justify-center'>
              <h3 className='plabs-title-medium-16 text-greyscale-0'>Pump</h3>
            </div>
            <div className='flex items-center gap-2'>
              <Form.Input
                name={`pump`}
                placeholder='Pump'
                className='w-full'
                onChange={(e) => {
                  let value = e.target.value.replace(/[^0-9.]/g, '')
                  form.setValue(`pump`, value, { shouldValidate: true })
                }}
              />
              <span className='plabs-title-medium-16 text-greyscale-5 min-w-max'>gpm</span>
            </div>
          </div>
          <div className='mt-12 grid grid-cols-2 items-center'>
            <div className='flex flex-col justify-center'>
              <h3 className='plabs-title-medium-16 text-greyscale-0'>Mud Weight</h3>
            </div>
            <div className='flex items-center gap-2'>
              <Form.Input
                name={`mud_weight.0`}
                placeholder='Weight'
                className='w-full'
                onChange={(e) => {
                  let value = e.target.value.replace(/[^0-9.]/g, '')
                  if ((value.match(/\./g) || []).length > 1) value = value.slice(0, -1)
                  form.setValue(`mud_weight.0`, value, { shouldValidate: true })
                }}
              />
              <span className='plabs-title-medium-16 text-greyscale-5'>ppg</span>
              <Form.Input
                name={`mud_weight.1`}
                placeholder='Temperature'
                className='w-full'
                onChange={(e) => {
                  let value = e.target.value.replace(/[^0-9.]/g, '')
                  if ((value.match(/\./g) || []).length > 1) value = value.slice(0, -1)
                  form.setValue(`mud_weight.1`, value, { shouldValidate: true })
                }}
              />
              <span className='plabs-title-medium-16 text-greyscale-5'>°F</span>
            </div>
          </div>
          <div className='grid grid-cols-2 items-center'>
            <div className='flex flex-col justify-center'>
              <h3 className='plabs-title-medium-16 text-greyscale-0'>PV</h3>
            </div>
            <div className='flex items-center gap-2'>
              <Form.Input
                name={`pv`}
                placeholder='PV'
                className='w-full'
                onChange={(e) => {
                  let value = e.target.value.replace(/[^0-9.]/g, '')
                  form.setValue(`pv`, value, { shouldValidate: true })
                }}
              />
              <span className='plabs-title-medium-16 text-greyscale-5 min-w-max'>cp</span>
            </div>
          </div>
          <div className='grid grid-cols-2 items-center'>
            <div className='flex flex-col justify-center'>
              <h3 className='plabs-title-medium-16 text-greyscale-0'>YP</h3>
            </div>
            <div className='flex items-center gap-2'>
              <Form.Input
                name={`yp`}
                placeholder='YP'
                className='w-full'
                onChange={(e) => {
                  let value = e.target.value.replace(/[^0-9.]/g, '')
                  form.setValue(`yp`, value, { shouldValidate: true })
                }}
              />
              <span className='plabs-title-medium-16 text-greyscale-5 min-w-max'>lbf/100ft²</span>
            </div>
          </div>
          <div className='grid grid-cols-2 items-center'>
            <div className='flex flex-col justify-center'>
              <h3 className='plabs-title-medium-16 text-greyscale-0'>LSYP</h3>
            </div>
            <div className='flex items-center gap-2'>
              <Form.Input
                name={`lsyp`}
                placeholder='LSYP'
                className='w-full'
                onChange={(e) => {
                  let value = e.target.value.replace(/[^0-9.]/g, '')
                  form.setValue(`lsyp`, value, { shouldValidate: true })
                }}
              />
              <span className='plabs-title-medium-16 text-greyscale-5 min-w-max'>lbf/100ft²</span>
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

          <div className='card'>
            <Image src={`/image 8.png`} alt='calculation' width={500} height={800} className='w-full' />
          </div>
        </div>
      )}
    </div>
  )
}
