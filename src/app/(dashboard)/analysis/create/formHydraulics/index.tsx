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

export const FormHydraulics = () => {
  const searchParams = useSearchParams()
  const [simulation, setSimulation] = React.useState<any>(false)

  const form = useForm<any>({
    defaultValues: {
      fluid: '10.3',
      interval: '8.5',
      string: 'DS',
      circ_path: 'Conventional',
      pump_flowrate: '550',
      injection_temperature: '80',
      top_driver_speed: '55',
      string_depth: '9000',
      rate_of_penetration: '20',
      surface_back_pressure: '0',
      cuttings_shape: 'Cylindrical',
      cutting_diam: ['0.200', '0.200'],
      circ_time: '2',
    },
  })

  const dataCharts = [
    {
      title: 'Angle Chart',
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
    {
      title: 'Density Chart',
      labels: getRandomCurveData(7),
      datasets: [
        {
          label: 'Curve A',
          data: getRandomCurveData(7),
          borderColor: 'white',
          backgroundColor: 'white',
          borderWidth: 2,
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
          pointRadius: 0,
          xAxisID: 'x',
          yAxisID: 'y',
        },
      ],
    },
    {
      title: 'Temperature',
      labels: getRandomCurveData(7),
      datasets: [
        {
          label: 'Curve A',
          data: getRandomCurveData(7),
          borderColor: 'white',
          backgroundColor: 'white',
          borderWidth: 2,
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
          pointRadius: 0,
          xAxisID: 'x',
          yAxisID: 'y',
        },
      ],
    },
    {
      title: 'PV (cp) | YP.LSYP (lbf/100ft2)',
      labels: getRandomCurveData(7),
      datasets: [
        {
          label: 'Curve A',
          data: getRandomCurveData(7),
          borderColor: 'white',
          backgroundColor: 'white',
          borderWidth: 2,
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
          pointRadius: 0,
          xAxisID: 'x',
          yAxisID: 'y',
        },
      ],
    },
    {
      title: 'Velocity (ft/min)',
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
    {
      title: 'Concentration (%/vol)',
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
                <h3 className='plabs-title-medium-16 text-greyscale-0'>Circ. Path</h3>
              </div>
              <div className='flex items-center gap-2'>
                <Form.Select
                  name={`circ_path`}
                  placeholder='Circ Path'
                  options={[
                    { value: 'Conventional', label: 'Conventional' },
                    { value: 'Non-Conventional', label: 'Non-Conventional' },
                  ]}
                  className='w-full'
                />
              </div>
            </div>
            <div className='grid grid-cols-2 items-center'>
              <div className='flex flex-col justify-center'>
                <h3 className='plabs-title-medium-16 text-greyscale-0'>Pump Flowrate</h3>
              </div>
              <div className='flex items-center gap-2'>
                <Form.Input
                  name={`pump_flowrate`}
                  placeholder='Pump Flowrate'
                  className='w-full'
                  onChange={(e) => {
                    let formattedValue = e.target.value.replace(/[^0-9.]/g, '')

                    if ((formattedValue.match(/\./g) || []).length > 1) {
                      formattedValue = formattedValue.slice(0, -1)
                    }

                    form.setValue(`pump_flowrate`, formattedValue, {
                      shouldValidate: true,
                    })
                  }}
                />
                <span className='plabs-title-medium-16 text-greyscale-5 min-w-max'>gpm</span>
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
                    let formattedValue = e.target.value.replace(/[^0-9.]/g, '')

                    if ((formattedValue.match(/\./g) || []).length > 1) {
                      formattedValue = formattedValue.slice(0, -1)
                    }

                    form.setValue(`injection_temperature`, formattedValue, {
                      shouldValidate: true,
                    })
                  }}
                />
                <span className='plabs-title-medium-16 text-greyscale-5 min-w-max'>°F</span>
              </div>
            </div>
            <div className='grid grid-cols-2 items-center'>
              <div className='flex flex-col justify-center'>
                <h3 className='plabs-title-medium-16 text-greyscale-0'>Top Driver Speed</h3>
              </div>
              <div className='flex items-center gap-2'>
                <Form.Input
                  name={`top_driver_speed`}
                  placeholder='Top Driver Speed'
                  className='w-full'
                  onChange={(e) => {
                    let formattedValue = e.target.value.replace(/[^0-9.]/g, '')

                    if ((formattedValue.match(/\./g) || []).length > 1) {
                      formattedValue = formattedValue.slice(0, -1)
                    }

                    form.setValue(`top_driver_speed`, formattedValue, {
                      shouldValidate: true,
                    })
                  }}
                />
                <span className='plabs-title-medium-16 text-greyscale-5 min-w-max'>rpm</span>
              </div>
            </div>
            <div className='grid grid-cols-2 items-center'>
              <div className='flex flex-col justify-center'>
                <h3 className='plabs-title-medium-16 text-greyscale-0'>String Depth</h3>
              </div>
              <div className='flex items-center gap-2'>
                <Form.Input
                  name={`string_depth`}
                  placeholder='String Depth'
                  className='w-full'
                  onChange={(e) => {
                    let formattedValue = e.target.value.replace(/[^0-9.]/g, '')

                    if ((formattedValue.match(/\./g) || []).length > 1) {
                      formattedValue = formattedValue.slice(0, -1)
                    }

                    form.setValue(`string_depth`, formattedValue, {
                      shouldValidate: true,
                    })
                  }}
                />
                <span className='plabs-title-medium-16 text-greyscale-5 min-w-max'>ft</span>
              </div>
            </div>
            <div className='grid grid-cols-2 items-center'>
              <div className='flex flex-col justify-center'>
                <h3 className='plabs-title-medium-16 text-greyscale-0'>Rate of Penetration</h3>
              </div>
              <div className='flex items-center gap-2'>
                <Form.Input
                  name={`rate_of_penetration`}
                  placeholder='Rate of Penetration'
                  className='w-full'
                  onChange={(e) => {
                    let formattedValue = e.target.value.replace(/[^0-9.]/g, '')

                    if ((formattedValue.match(/\./g) || []).length > 1) {
                      formattedValue = formattedValue.slice(0, -1)
                    }

                    form.setValue(`rate_of_penetration`, formattedValue, {
                      shouldValidate: true,
                    })
                  }}
                />
                <span className='plabs-title-medium-16 text-greyscale-5 min-w-max'>ft/hr</span>
              </div>
            </div>
            <div className='grid grid-cols-2 items-center'>
              <div className='flex flex-col justify-center'>
                <h3 className='plabs-title-medium-16 text-greyscale-0'>Surface Back Pressure</h3>
              </div>
              <div className='flex items-center gap-2'>
                <Form.Input
                  name={`surface_back_pressure`}
                  placeholder='Surface Back Pressure'
                  className='w-full'
                  onChange={(e) => {
                    let formattedValue = e.target.value.replace(/[^0-9.]/g, '')

                    if ((formattedValue.match(/\./g) || []).length > 1) {
                      formattedValue = formattedValue.slice(0, -1)
                    }

                    form.setValue(`surface_back_pressure`, formattedValue, {
                      shouldValidate: true,
                    })
                  }}
                />
                <span className='plabs-title-medium-16 text-greyscale-5 min-w-max'>psi</span>
              </div>
            </div>
            <div className='grid grid-cols-2 items-center'>
              <div className='flex flex-col justify-center'>
                <h3 className='plabs-title-medium-16 text-greyscale-0'>Cuttings Shape</h3>
              </div>
              <div className='flex items-center gap-2'>
                <Form.Select
                  name={`cuttings_shape`}
                  placeholder='Cuttings Shape'
                  options={[
                    { value: 'Cylindrical', label: 'Cylindrical' },
                    { value: 'Spherical', label: 'Spherical' },
                  ]}
                  className='w-full'
                />
              </div>
            </div>
            <div className='grid grid-cols-2 items-center'>
              <div className='flex flex-col justify-center'>
                <h3 className='plabs-title-medium-16 text-greyscale-0'>Cuttings Diam. / Thick</h3>
              </div>
              <div className='flex items-center gap-2'>
                <Form.Input
                  name={`cutting_diam.0`}
                  placeholder='Cuttings Diam. / Thick'
                  className='w-full'
                  onChange={(e) => {
                    let formattedValue = e.target.value.replace(/[^0-9.]/g, '')

                    if ((formattedValue.match(/\./g) || []).length > 1) {
                      formattedValue = formattedValue.slice(0, -1)
                    }

                    form.setValue(`cutting_diam.0`, formattedValue, {
                      shouldValidate: true,
                    })
                  }}
                />
                <div className='flex items-center gap-2'>
                  <Form.Input
                    name={`cutting_diam.1`}
                    placeholder='Cuttings Diam. / Thick'
                    className='w-full'
                    onChange={(e) => {
                      let formattedValue = e.target.value.replace(/[^0-9.]/g, '')
                      if ((formattedValue.match(/\./g) || []).length > 1) {
                        formattedValue = formattedValue.slice(0, -1)
                      }
                      form.setValue(`cutting_diam.1`, formattedValue, {
                        shouldValidate: true,
                      })
                    }}
                  />
                  <span className='plabs-title-medium-16 text-greyscale-5 min-w-max'>in</span>
                </div>
              </div>
            </div>
            <div className='grid grid-cols-2 items-center'>
              <div className='flex flex-col justify-center'>
                <h3 className='plabs-title-medium-16 text-greyscale-0'>Circulation Time</h3>
              </div>
              <div className='flex items-center gap-2'>
                <Form.Input
                  name={`circ_time`}
                  placeholder='Circ. Time'
                  className='w-full'
                  onChange={(e) => {
                    let formattedValue = e.target.value.replace(/[^0-9.]/g, '')

                    if ((formattedValue.match(/\./g) || []).length > 1) {
                      formattedValue = formattedValue.slice(0, -1)
                    }

                    form.setValue(`circ_time`, formattedValue, {
                      shouldValidate: true,
                    })
                  }}
                />
                <span className='plabs-title-medium-16 text-greyscale-5 min-w-max'>hr</span>
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

          <div className='card'>
            <Image src={`/image 8.png`} alt='calculation' width={500} height={800} className='w-full' />
          </div>
        </div>
      )}
    </div>
  )
}
