'use client'

import Form from '@/components/ui/form'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'

function generateDummyData1() {
  const temperature = Math.floor(Math.random() * 10000)
  const pressure = Math.floor(Math.random() * 10000)
  const r = Math.floor(Math.random() * 10000)
  const maxDiff = Math.floor(Math.random() * 10000)

  return {
    temperature: temperature,
    pressure: pressure,
    r: r,
    maxDiff: maxDiff,
  }
}

export const FormFluid = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [dummyData, setDummyData] = useState<any[]>([])

  useEffect(() => {
    const data = Array.from({ length: 10 }, () => generateDummyData1())
    setDummyData(data)
  }, [])

  const data = {
    data: dummyData,
    paginate: {
      total_data: dummyData.length,
      current_page: 1,
      per_page: 10,
      total_page: 1,
    },
  }

  const form = useForm<any>({
    defaultValues: {
      type: '' as 'NAF' | 'WBF',
      mud_weight: {
        unit: '' as 'OWR' | 'SG',
        ppg: '',
        fahrenheit: '',
      },
      volume: '',
      solid: '',
      salinity: '',
      hpht_model: '' as 'HPHT' | 'N/A',
      rheology_model: {
        model: '' as 'Herschel-Bulkley' | 'Bingham Plastic',
        fahrenheit: '',
      },
      base: '' as 'ID 1618' | 'ID 1619',
      brine: '' as 'CaCl2 - Calcium Chloride' | 'NaCl - Sodium Chloride',
    },
  })

  const control = form.control
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'trajectory_input',
    rules: {
      required: 'This field is required for list',
      minLength: {
        value: 1,
        message: 'Minimum 1 list is required',
      },
    },
  })

  return (
    <div className='grid grid-cols-2 gap-4'>
      <Form form={form} onSave={() => {}} onError={(error) => {}} className='card h-max space-y-2'>
        <h1 className='plabs-headline-regular-24 mb-4'>
          {searchParams.get('tab')
            ? searchParams.get('tab')!.charAt(0).toUpperCase() + searchParams.get('tab')!.slice(1).replace(/-/g, ' ')
            : 'Default'}
        </h1>
        <div className='flex flex-col'>
          <div className='space-y-8'>
            <div className='grid grid-cols-2 items-center'>
              <div className='flex flex-col justify-center'>
                <h3 className='plabs-title-medium-16 text-greyscale-0'>Type</h3>
              </div>
              <Form.Select
                name={`type`}
                placeholder='Select Type'
                options={[
                  { label: 'NAF', value: 'NAF' },
                  { label: 'WBF', value: 'WBF' },
                ]}
              />
            </div>
            <div className='grid grid-cols-2 items-center'>
              <div className='flex flex-col justify-center'>
                <h3 className='plabs-title-medium-16 text-greyscale-0'>Mud Weight</h3>
              </div>
              <div className='flex items-center gap-3'>
                <Form.Select
                  name={`mud_weight.unit`}
                  placeholder='Select Unit'
                  options={[
                    { label: 'OWR', value: 'OWR' },
                    { label: 'SG', value: 'SG' },
                  ]}
                />
                <div className='flex items-center gap-2'>
                  <Form.Input
                    name={`mud_weight.ppg`}
                    placeholder='Mud Weight'
                    onChange={(e) => {
                      let formattedValue = e.target.value.replace(/[^0-9.]/g, '')

                      if ((formattedValue.match(/\./g) || []).length > 1) {
                        formattedValue = formattedValue.slice(0, -1)
                      }

                      form.setValue(`mud_weight.ppg`, formattedValue, {
                        shouldValidate: true,
                      })
                    }}
                  />
                  <span className='plabs-title-medium-12 text-greyscale-5 min-w-max'>ppg</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Form.Input
                    name={`mud_weight.fahrenheit`}
                    placeholder='Mud Weight'
                    onChange={(e) => {
                      let formattedValue = e.target.value.replace(/[^0-9.]/g, '')

                      if ((formattedValue.match(/\./g) || []).length > 1) {
                        formattedValue = formattedValue.slice(0, -1)
                      }

                      form.setValue(`mud_weight.fahrenheit`, formattedValue, {
                        shouldValidate: true,
                      })
                    }}
                  />
                  <span className='plabs-title-medium-12 text-greyscale-5 min-w-max'>°F</span>
                </div>
              </div>
            </div>
            <div className='grid grid-cols-2 items-center'>
              <div className='flex flex-col justify-center'>
                <h3 className='plabs-title-medium-16 text-greyscale-0'>Volume</h3>
              </div>
              <div className='flex items-center gap-2'>
                <Form.Input
                  name={`volume`}
                  placeholder='Volume'
                  onChange={(e) => {
                    let formattedValue = e.target.value.replace(/[^0-9.]/g, '')

                    if ((formattedValue.match(/\./g) || []).length > 1) {
                      formattedValue = formattedValue.slice(0, -1)
                    }

                    form.setValue(`volume`, formattedValue, {
                      shouldValidate: true,
                    })
                  }}
                />
                <span className='plabs-title-medium-16 text-greyscale-5 min-w-max'>% vol</span>
              </div>
            </div>
            <div className='grid grid-cols-2 items-center'>
              <div className='flex flex-col justify-center'>
                <h3 className='plabs-title-medium-16 text-greyscale-0'>Solid</h3>
              </div>
              <div className='flex items-center gap-2'>
                <Form.Input
                  name={`solid`}
                  placeholder='Solid'
                  onChange={(e) => {
                    let formattedValue = e.target.value.replace(/[^0-9.]/g, '')

                    if ((formattedValue.match(/\./g) || []).length > 1) {
                      formattedValue = formattedValue.slice(0, -1)
                    }

                    form.setValue(`solid`, formattedValue, {
                      shouldValidate: true,
                    })
                  }}
                />
                <span className='plabs-title-medium-16 text-greyscale-5 min-w-max'>% vol</span>
              </div>
            </div>
            <div className='grid grid-cols-2 items-center'>
              <div className='flex flex-col justify-center'>
                <h3 className='plabs-title-medium-16 text-greyscale-0'>Salinity</h3>
              </div>
              <div className='flex items-center gap-2'>
                <Form.Input
                  name={`salinity`}
                  placeholder='Salinity'
                  onChange={(e) => {
                    let formattedValue = e.target.value.replace(/[^0-9.]/g, '')

                    if ((formattedValue.match(/\./g) || []).length > 1) {
                      formattedValue = formattedValue.slice(0, -1)
                    }

                    form.setValue(`salinity`, formattedValue, {
                      shouldValidate: true,
                    })
                  }}
                />
                <span className='plabs-title-medium-16 text-greyscale-5 min-w-max'>% vol</span>
              </div>
            </div>
            <div className='grid grid-cols-2 items-center'>
              <div className='flex flex-col justify-center'>
                <h3 className='plabs-title-medium-16 text-greyscale-0'>HPHT Model</h3>
              </div>
              <Form.Select
                name={`hpht_model`}
                placeholder='Select HPHT Model'
                options={[
                  { label: 'HPHT', value: 'HPHT' },
                  { label: 'N/A', value: 'N/A' },
                ]}
              />
            </div>
            <div className='grid grid-cols-2 items-center'>
              <div className='flex flex-col justify-center'>
                <h3 className='plabs-title-medium-16 text-greyscale-0'>Rheology Model</h3>
              </div>
              <div className='flex items-center gap-3'>
                <Form.Select
                  name={`rheology_model.model`}
                  placeholder='Select Rheology Model'
                  options={[
                    { label: 'Herschel-Bulkley', value: 'Herschel-Bulkley' },
                    { label: 'Bingham Plastic', value: 'Bingham Plastic' },
                  ]}
                />
                <div className='flex items-center gap-2'>
                  <Form.Input
                    name={`rheology_model.fahrenheit`}
                    placeholder='Rheology Model'
                    onChange={(e) => {
                      let formattedValue = e.target.value.replace(/[^0-9.]/g, '')

                      if ((formattedValue.match(/\./g) || []).length > 1) {
                        formattedValue = formattedValue.slice(0, -1)
                      }

                      form.setValue(`rheology_model.fahrenheit`, formattedValue, {
                        shouldValidate: true,
                      })
                    }}
                  />
                  <span className='plabs-title-medium-16 text-greyscale-5 min-w-max'>°F</span>
                </div>
              </div>
            </div>
            <div className='grid grid-cols-2 items-center'>
              <div className='flex flex-col justify-center'>
                <h3 className='plabs-title-medium-16 text-greyscale-0'>Base</h3>
              </div>
              <Form.Select
                name={`base`}
                placeholder='Select Base'
                options={[
                  { label: 'ID 1618', value: 'ID 1618' },
                  { label: 'ID 1619', value: 'ID 1619' },
                ]}
              />
            </div>
            <div className='grid grid-cols-2 items-center'>
              <div className='flex flex-col justify-center'>
                <h3 className='plabs-title-medium-16 text-greyscale-0'>Brine</h3>
              </div>
              <Form.Select
                name={`brine`}
                placeholder='Select Brine'
                options={[
                  { label: 'CaCl2 - Calcium Chloride', value: 'CaCl2 - Calcium Chloride' },
                  { label: 'NaCl - Sodium Chloride', value: 'NaCl - Sodium Chloride' },
                ]}
              />
            </div>
          </div>
        </div>
        <div className='flex w-full justify-end gap-2'>
          <div className='flex gap-2'>
            <Form.Button onClick={() => router.back()} type='button' className='btn-outline-greyscale text-greyscale-0'>
              Previous
            </Form.Button>
            <Form.Button
              type='submit'
              className='btn-lime'
              onClick={() => {
                router.push('/calculation/create?tab=temperature')
              }}
            >
              Next
            </Form.Button>
          </div>
        </div>
      </Form>
      <div className='space-y-4'>
        <div className='card h-max'>
          <div className='overflow-hidden rounded-b-2xl'>
            <table className='w-full overflow-hidden rounded-t-2xl'>
              <thead className='bg-greyscale-10'>
                <tr>
                  <th className='plabs-title-medium-12 text-greyscale-0 px-2 py-4'>
                    <p className='line-clamp-1'>Temperature (°F)</p>
                  </th>
                  <th className='plabs-title-medium-12 text-greyscale-0 px-2 py-4'>
                    <p className='line-clamp-1'>Pressure (psi)</p>
                  </th>
                  <th className='plabs-title-medium-12 text-greyscale-0 px-2 py-4'>
                    <p className='line-clamp-1'>R2</p>
                  </th>
                  <th className='plabs-title-medium-12 text-greyscale-0 px-2 py-4'>
                    <p className='line-clamp-1'>Max Diff</p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.data.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-greyscale-7' : 'bg-greyscale-8'}>
                    <td className='plabs-caption-regular-12 text-greyscale-0 px-3 py-4 text-sm'>{item.temperature}</td>
                    <td className='plabs-caption-regular-12 text-greyscale-0 px-3 py-4 text-sm'>{item.pressure}</td>
                    <td className='plabs-caption-regular-12 text-greyscale-0 px-3 py-4 text-sm'>{item.r}</td>
                    <td className='plabs-caption-regular-12 text-greyscale-0 px-3 py-4 text-sm'>{item.maxDiff}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className='card h-max space-y-3'>
          <h3 className='plabs-headline-regular-28 text-greyscale-0'>HPHT Rheology</h3>
          <div className='overflow-scroll rounded-b-2xl'>
            <table className='w-full overflow-hidden rounded-t-2xl'>
              <thead className='bg-greyscale-10'>
                <tr>
                  <th className='plabs-title-medium-12 text-greyscale-0 px-2 py-4'>
                    <p className='line-clamp-1'>Temperature (°F)</p>
                  </th>
                  <th className='plabs-title-medium-12 text-greyscale-0 px-2 py-4'>
                    <p className='line-clamp-1'>Pressure (psi)</p>
                  </th>
                  <th className='plabs-title-medium-12 text-greyscale-0 px-2 py-4'>
                    <p className='line-clamp-1'>R2</p>
                  </th>
                  <th className='plabs-title-medium-12 text-greyscale-0 px-2 py-4'>
                    <p className='line-clamp-1'>Max Diff</p>
                  </th>
                  <th className='plabs-title-medium-12 text-greyscale-0 px-2 py-4'>
                    <p className='line-clamp-1'>600</p>
                  </th>
                  <th className='plabs-title-medium-12 text-greyscale-0 px-2 py-4'>
                    <p className='line-clamp-1'>300</p>
                  </th>
                  <th className='plabs-title-medium-12 text-greyscale-0 px-2 py-4'>
                    <p className='line-clamp-1'>200</p>
                  </th>
                  <th className='plabs-title-medium-12 text-greyscale-0 px-2 py-4'>
                    <p className='line-clamp-1'>100</p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.data.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-greyscale-7' : 'bg-greyscale-8'}>
                    <td className='plabs-caption-regular-12 text-greyscale-0 px-3 py-4 text-sm'>{item.temperature}</td>
                    <td className='plabs-caption-regular-12 text-greyscale-0 px-3 py-4 text-sm'>{item.pressure}</td>
                    <td className='plabs-caption-regular-12 text-greyscale-0 px-3 py-4 text-sm'>{item.r}</td>
                    <td className='plabs-caption-regular-12 text-greyscale-0 px-3 py-4 text-sm'>{item.maxDiff}</td>
                    <td className='plabs-caption-regular-12 text-greyscale-0 px-3 py-4 text-sm'>{item.temperature}</td>
                    <td className='plabs-caption-regular-12 text-greyscale-0 px-3 py-4 text-sm'>{item.pressure}</td>
                    <td className='plabs-caption-regular-12 text-greyscale-0 px-3 py-4 text-sm'>{item.r}</td>
                    <td className='plabs-caption-regular-12 text-greyscale-0 px-3 py-4 text-sm'>{item.maxDiff}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
