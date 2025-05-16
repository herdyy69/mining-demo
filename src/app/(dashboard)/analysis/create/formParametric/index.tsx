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

export const FormParametric = () => {
  const searchParams = useSearchParams()
  const [simulation, setSimulation] = React.useState<any>(false)

  const form = useForm<any>({
    defaultValues: {
      experiment: 'Drilling',
      flowrate: ['100', '550', '5'], // gpm, gpm, Steps
      rate_of_penetration: ['20', '50', '5'], // ft/hr, ft/hr, Steps
      rate_of_penetration2: ['20', '50', '5'],
      top_drive_speed: '55', // rpm
      string_depth: '10000', // ft
      cust_report_depth: '10000', // ft
      annulus_ref_depth: '10000', // ft
      max_pump_press: '10000', // psi
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
      title: 'Density Chart',
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
      title: 'Velocity (ft/min)',
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
      title: 'Concentration (%/vol)',
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
                <h3 className='plabs-title-medium-16 text-greyscale-0'>Experiment</h3>
              </div>
              <Form.Select
                name={`experiment`}
                placeholder='Experiment'
                options={[
                  { value: 'Drilling', label: 'Drilling' },
                  { value: 'Tripping', label: 'Tripping' },
                  { value: 'Circulation', label: 'Circulation' },
                ]}
                className='w-full'
              />
            </div>
            <div className='grid grid-cols-2 items-center'>
              <div className='flex flex-col justify-center'>
                <h3 className='plabs-title-medium-16 text-greyscale-0'>Flowrate</h3>
              </div>
              <div className='flex items-center gap-2'>
                <div className='flex items-center gap-2'>
                  <Form.Input
                    name={`flowrate.0`}
                    placeholder='Flowrate'
                    className='w-full'
                    onChange={(e) => {
                      let formattedValue = e.target.value.replace(/[^0-9.]/g, '')

                      if ((formattedValue.match(/\./g) || []).length > 1) {
                        formattedValue = formattedValue.slice(0, -1)
                      }

                      form.setValue(`flowrate.0`, formattedValue, {
                        shouldValidate: true,
                      })
                    }}
                  />
                  <span className='plabs-title-medium-12 text-greyscale-5 min-w-max'>gpm</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Form.Input
                    name={`flowrate.1`}
                    placeholder='Flowrate'
                    className='w-full'
                    onChange={(e) => {
                      let formattedValue = e.target.value.replace(/[^0-9.]/g, '')

                      if ((formattedValue.match(/\./g) || []).length > 1) {
                        formattedValue = formattedValue.slice(0, -1)
                      }

                      form.setValue(`flowrate.1`, formattedValue, {
                        shouldValidate: true,
                      })
                    }}
                  />
                  <span className='plabs-title-medium-12 text-greyscale-5 min-w-max'>gpm</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Form.Input
                    name={`flowrate.2`}
                    placeholder='Flowrate'
                    className='w-full'
                    onChange={(e) => {
                      let formattedValue = e.target.value.replace(/[^0-9.]/g, '')

                      if ((formattedValue.match(/\./g) || []).length > 1) {
                        formattedValue = formattedValue.slice(0, -1)
                      }

                      form.setValue(`flowrate.2`, formattedValue, {
                        shouldValidate: true,
                      })
                    }}
                  />
                  <span className='plabs-title-medium-12 text-greyscale-5 min-w-max'>Steps</span>
                </div>
              </div>
            </div>
            <div className='grid grid-cols-2 items-center'>
              <div className='flex flex-col justify-center'>
                <h3 className='plabs-title-medium-16 text-greyscale-0'>Rate of Penetration</h3>
              </div>
              <div className='flex items-center gap-2'>
                <div className='flex items-center gap-2'>
                  <Form.Input
                    name={`rate_of_penetration.0`}
                    placeholder='Rate of Penetration'
                    className='w-full'
                    onChange={(e) => {
                      let formattedValue = e.target.value.replace(/[^0-9.]/g, '')

                      if ((formattedValue.match(/\./g) || []).length > 1) {
                        formattedValue = formattedValue.slice(0, -1)
                      }

                      form.setValue(`rate_of_penetration.0`, formattedValue, {
                        shouldValidate: true,
                      })
                    }}
                  />
                  <span className='plabs-title-medium-12 text-greyscale-5 min-w-max'>ft/hr</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Form.Input
                    name={`rate_of_penetration.1`}
                    placeholder='Rate of Penetration'
                    className='w-full'
                    onChange={(e) => {
                      let formattedValue = e.target.value.replace(/[^0-9.]/g, '')

                      if ((formattedValue.match(/\./g) || []).length > 1) {
                        formattedValue = formattedValue.slice(0, -1)
                      }

                      form.setValue(`rate_of_penetration.1`, formattedValue, {
                        shouldValidate: true,
                      })
                    }}
                  />
                  <span className='plabs-title-medium-12 text-greyscale-5 min-w-max'>ft/hr</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Form.Input
                    name={`rate_of_penetration.2`}
                    placeholder='Rate of Penetration'
                    className='w-full'
                    onChange={(e) => {
                      let formattedValue = e.target.value.replace(/[^0-9.]/g, '')

                      if ((formattedValue.match(/\./g) || []).length > 1) {
                        formattedValue = formattedValue.slice(0, -1)
                      }

                      form.setValue(`rate_of_penetration.2`, formattedValue, {
                        shouldValidate: true,
                      })
                    }}
                  />
                  <span className='plabs-title-medium-12 text-greyscale-5 min-w-max'>Steps</span>
                </div>
              </div>
            </div>
            <div className='grid grid-cols-2 items-center'>
              <div className='flex flex-col justify-center'>
                <h3 className='plabs-title-medium-16 text-greyscale-0'>Rate of Penetration</h3>
              </div>
              <div className='flex items-center gap-2'>
                <div className='flex items-center gap-2'>
                  <Form.Input
                    name={`rate_of_penetration2.0`}
                    placeholder='Rate of Penetration'
                    className='w-full'
                    onChange={(e) => {
                      let formattedValue = e.target.value.replace(/[^0-9.]/g, '')

                      if ((formattedValue.match(/\./g) || []).length > 1) {
                        formattedValue = formattedValue.slice(0, -1)
                      }

                      form.setValue(`rate_of_penetration2.0`, formattedValue, {
                        shouldValidate: true,
                      })
                    }}
                  />
                  <span className='plabs-title-medium-12 text-greyscale-5 min-w-max'>ft/hr</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Form.Input
                    name={`rate_of_penetration2.1`}
                    placeholder='Rate of Penetration'
                    className='w-full'
                    onChange={(e) => {
                      let formattedValue = e.target.value.replace(/[^0-9.]/g, '')

                      if ((formattedValue.match(/\./g) || []).length > 1) {
                        formattedValue = formattedValue.slice(0, -1)
                      }

                      form.setValue(`rate_of_penetration2.1`, formattedValue, {
                        shouldValidate: true,
                      })
                    }}
                  />
                  <span className='plabs-title-medium-12 text-greyscale-5 min-w-max'>ft/hr</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Form.Input
                    name={`rate_of_penetration2.2`}
                    placeholder='Rate of Penetration'
                    className='w-full'
                    onChange={(e) => {
                      let formattedValue = e.target.value.replace(/[^0-9.]/g, '')

                      if ((formattedValue.match(/\./g) || []).length > 1) {
                        formattedValue = formattedValue.slice(0, -1)
                      }

                      form.setValue(`rate_of_penetration2.2`, formattedValue, {
                        shouldValidate: true,
                      })
                    }}
                  />
                  <span className='plabs-title-medium-12 text-greyscale-5 min-w-max'>Steps</span>
                </div>
              </div>
            </div>
            <div className='grid grid-cols-2 items-center'>
              <div className='flex flex-col justify-center'>
                <h3 className='plabs-title-medium-16 text-greyscale-0'>Top Drive Speed</h3>
              </div>
              <div className='flex items-center gap-2'>
                <Form.Input
                  name={`top_drive_speed`}
                  placeholder='Top Drive Speed'
                  className='w-full'
                  onChange={(e) => {
                    let formattedValue = e.target.value.replace(/[^0-9.]/g, '')

                    if ((formattedValue.match(/\./g) || []).length > 1) {
                      formattedValue = formattedValue.slice(0, -1)
                    }

                    form.setValue(`top_drive_speed`, formattedValue, {
                      shouldValidate: true,
                    })
                  }}
                />
                <span className='plabs-title-medium-12 text-greyscale-5 min-w-max'>rpm</span>
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
                <span className='plabs-title-medium-12 text-greyscale-5 min-w-max'>ft</span>
              </div>
            </div>
            <div className='grid grid-cols-2 items-center'>
              <div className='flex flex-col justify-center'>
                <h3 className='plabs-title-medium-16 text-greyscale-0'>Cust Report Depth</h3>
              </div>
              <div className='flex items-center gap-2'>
                <Form.Input
                  name={`cust_report_depth`}
                  placeholder='Cust Report Depth'
                  className='w-full'
                  onChange={(e) => {
                    let formattedValue = e.target.value.replace(/[^0-9.]/g, '')

                    if ((formattedValue.match(/\./g) || []).length > 1) {
                      formattedValue = formattedValue.slice(0, -1)
                    }

                    form.setValue(`cust_report_depth`, formattedValue, {
                      shouldValidate: true,
                    })
                  }}
                />
                <span className='plabs-title-medium-12 text-greyscale-5 min-w-max'>ft</span>
              </div>
            </div>
            <div className='grid grid-cols-2 items-center'>
              <div className='flex flex-col justify-center'>
                <h3 className='plabs-title-medium-16 text-greyscale-0'>Annulus Ref Depth</h3>
              </div>
              <div className='flex items-center gap-2'>
                <Form.Input
                  name={`annulus_ref_depth`}
                  placeholder='Annulus Ref Depth'
                  className='w-full'
                  onChange={(e) => {
                    let formattedValue = e.target.value.replace(/[^0-9.]/g, '')

                    if ((formattedValue.match(/\./g) || []).length > 1) {
                      formattedValue = formattedValue.slice(0, -1)
                    }

                    form.setValue(`annulus_ref_depth`, formattedValue, {
                      shouldValidate: true,
                    })
                  }}
                />
                <span className='plabs-title-medium-12 text-greyscale-5 min-w-max'>ft</span>
              </div>
            </div>
            <div className='grid grid-cols-2 items-center'>
              <div className='flex flex-col justify-center'>
                <h3 className='plabs-title-medium-16 text-greyscale-0'>Max Pump Press</h3>
              </div>
              <div className='flex items-center gap-2'>
                <Form.Input
                  name={`max_pump_press`}
                  placeholder='Max Pump Press'
                  className='w-full'
                  onChange={(e) => {
                    let formattedValue = e.target.value.replace(/[^0-9.]/g, '')

                    if ((formattedValue.match(/\./g) || []).length > 1) {
                      formattedValue = formattedValue.slice(0, -1)
                    }

                    form.setValue(`max_pump_press`, formattedValue, {
                      shouldValidate: true,
                    })
                  }}
                />
                <span className='plabs-title-medium-12 text-greyscale-5 min-w-max'>psi</span>
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
