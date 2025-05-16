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

export const FormPvt = () => {
  const searchParams = useSearchParams()
  const [simulation, setSimulation] = React.useState<any>(false)

  const form = useForm<any>({
    defaultValues: {
      fluid: '', // ppg
      interval: '', // OH
      string: '',
      options: '',
      packer_depth: '', // ft
      max_injection_pressure: '', // psi
      ramp_up_press_step: '', // psi
      mud_weight: ['', ''], // ppg, °F
      pv: '', // cp
      yp: '', // lbf/100ft2
      lsyp: '', // lbf/100ft2
      md: '', // ft
      tvd: '', // ft
      casing_shoe: '', // ft
      max_injection_pressure2: '', // psi
      injection_pressure_step: '', // psi
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
        {
          label: 'Curve B',
          data: getRandomCurveData(7),
          borderColor: 'blue',
          backgroundColor: 'blue',
          borderWidth: 2,
          pointRadius: 0,
          xAxisID: 'x',
          yAxisID: 'y',
        },
        {
          label: 'Curve C',
          data: getRandomCurveData(7),
          borderColor: 'green',
          backgroundColor: 'green',
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
                <h3 className='plabs-title-medium-16 text-greyscale-0'>Options</h3>
              </div>
              <div className='flex items-center gap-2'>
                <Form.Select
                  name={`options`}
                  placeholder='Options'
                  options={[
                    { value: 'FIT', label: 'FIT' },
                    { value: 'LOT', label: 'LOT' },
                  ]}
                  className='w-full'
                />
              </div>
            </div>
            <div className='grid grid-cols-2 items-center'>
              <div className='flex flex-col justify-center'>
                <h3 className='plabs-title-medium-16 text-greyscale-0'>Packer Depth</h3>
              </div>
              <div className='flex items-center gap-2'>
                <Form.Input
                  name={`packer_depth`}
                  placeholder='Packer Depth'
                  className='w-full'
                  onChange={(e) => {
                    let value = e.target.value.replace(/[^0-9.]/g, '')
                    form.setValue(`packer_depth`, value, { shouldValidate: true })
                  }}
                />
                <span className='plabs-title-medium-16 text-greyscale-5 min-w-max'>ft</span>
              </div>
            </div>
            <div className='grid grid-cols-2 items-center'>
              <div className='flex flex-col justify-center'>
                <h3 className='plabs-title-medium-16 text-greyscale-0'>Max Injection Pressure</h3>
              </div>
              <div className='flex items-center gap-2'>
                <Form.Input
                  name={`max_injection_pressure`}
                  placeholder='Max Injection Pressure'
                  className='w-full'
                  onChange={(e) => {
                    let value = e.target.value.replace(/[^0-9.]/g, '')
                    form.setValue(`max_injection_pressure`, value, { shouldValidate: true })
                  }}
                />
                <span className='plabs-title-medium-16 text-greyscale-5 min-w-max'>psi</span>
              </div>
            </div>
            <div className='grid grid-cols-2 items-center'>
              <div className='flex flex-col justify-center'>
                <h3 className='plabs-title-medium-16 text-greyscale-0'>Ramp Up Pressure Step</h3>
              </div>
              <div className='flex items-center gap-2'>
                <Form.Input
                  name={`ramp_up_press_step`}
                  placeholder='Ramp Up Pressure Step'
                  className='w-full'
                  onChange={(e) => {
                    let value = e.target.value.replace(/[^0-9.]/g, '')
                    form.setValue(`ramp_up_press_step`, value, { shouldValidate: true })
                  }}
                />
                <span className='plabs-title-medium-16 text-greyscale-5 min-w-max'>psi</span>
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
        </div>
        <div className='mt-6 space-y-3'>
          <h2 className='plabs-title-regular-20 mb-4'>Fit Parameters</h2>
          <div className='grid grid-cols-2 items-center'>
            <div className='flex flex-col justify-center'>
              <h3 className='plabs-title-medium-16 text-greyscale-0'>Measured Depth (MD)</h3>
            </div>
            <div className='flex items-center gap-2'>
              <Form.Input
                name={`md`}
                placeholder='Measured Depth'
                className='w-full'
                onChange={(e) => {
                  let value = e.target.value.replace(/[^0-9.]/g, '')
                  form.setValue(`md`, value, { shouldValidate: true })
                }}
              />
              <span className='plabs-title-medium-16 text-greyscale-5 min-w-max'>ft</span>
            </div>
          </div>
          <div className='grid grid-cols-2 items-center'>
            <div className='flex flex-col justify-center'>
              <h3 className='plabs-title-medium-16 text-greyscale-0'>True Vertical Depth (TVD)</h3>
            </div>
            <div className='flex items-center gap-2'>
              <Form.Input
                name={`tvd`}
                placeholder='True Vertical Depth'
                className='w-full'
                onChange={(e) => {
                  let value = e.target.value.replace(/[^0-9.]/g, '')
                  form.setValue(`tvd`, value, { shouldValidate: true })
                }}
              />
              <span className='plabs-title-medium-16 text-greyscale-5 min-w-max'>ft</span>
            </div>
          </div>
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
              <h3 className='plabs-title-medium-16 text-greyscale-0'>Max Injection Pressure</h3>
            </div>
            <div className='flex items-center gap-2'>
              <Form.Input
                name={`max_injection_pressure2`}
                placeholder='Max Injection Pressure'
                className='w-full'
                onChange={(e) => {
                  let value = e.target.value.replace(/[^0-9.]/g, '')
                  form.setValue(`max_injection_pressure2`, value, { shouldValidate: true })
                }}
              />
              <span className='plabs-title-medium-16 text-greyscale-5 min-w-max'>psi</span>
            </div>
          </div>
          <div className='grid grid-cols-2 items-center'>
            <div className='flex flex-col justify-center'>
              <h3 className='plabs-title-medium-16 text-greyscale-0'>Injection Pressure Step</h3>
            </div>
            <div className='flex items-center gap-2'>
              <Form.Input
                name={`injection_pressure_step`}
                placeholder='Injection Pressure Step'
                className='w-full'
                onChange={(e) => {
                  let value = e.target.value.replace(/[^0-9.]/g, '')
                  form.setValue(`injection_pressure_step`, value, { shouldValidate: true })
                }}
              />
              <span className='plabs-title-medium-16 text-greyscale-5 min-w-max'>psi</span>
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
