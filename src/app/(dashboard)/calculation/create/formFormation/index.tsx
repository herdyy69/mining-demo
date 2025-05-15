'use client'

import Form from '@/components/ui/form'
import { Icons } from '@/components/ui/icons'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { PumpFlowRateChart } from './analytic'

export const FormFormation = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const form = useForm<any>({
    defaultValues: {
      formation_tops: 'MD' as 'MD' | 'TVD' | 'TVDSS',
      table: [
        {
          md: '',
          temperature: '',
          ppg: '',
          fpg: '',
          shmin: '',
        },
      ],
      name: 'Shale' as 'Shale' | 'Sandstone' | 'Limestone' | 'Dolomite',
      density: '',
      specific_heat_capacity: '',
      thermal_conductivity: '',
    },
  })

  const control = form.control
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'table',
    rules: {
      required: 'This field is required for list',
      minLength: {
        value: 1,
        message: 'Minimum 1 list is required',
      },
    },
  })

  return (
    <div className='grid grid-cols-3 gap-4'>
      <Form
        form={form}
        onSave={() => {
          router.push('/calculation/create?tab=survey')
        }}
        onError={(error) => {}}
        className='card col-span-2 space-y-2'
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
                <h3 className='plabs-title-medium-16 text-greyscale-0'>Formation Tops</h3>
              </div>
              <Form.Select
                name={`formation_tops`}
                options={[
                  { label: 'MD', value: 'MD' },
                  { label: 'TVD', value: 'TVD' },
                  { label: 'TVDSS', value: 'TVDSS' },
                ]}
                placeholder='Select Formation Tops'
                className='w-full'
              />
            </div>
            <table className='overflow-hidden rounded-t-2xl'>
              <thead className='bg-greyscale-10'>
                <tr>
                  <th className='plabs-title-medium-12 text-greyscale-0 px-2 py-4'>MD (ft)</th>
                  <th className='plabs-title-medium-12 text-greyscale-0 px-2 py-4'>Temperature (°F)</th>
                  <th className='plabs-title-medium-12 text-greyscale-0 px-2 py-4'>PPG (ppg)</th>
                  <th className='plabs-title-medium-12 text-greyscale-0 px-2 py-4'>FPG (ppg)</th>
                  <th className='plabs-title-medium-12 text-greyscale-0 px-2 py-4'>ShMin (ppg)</th>
                  <th className='plabs-title-medium-12 text-greyscale-0 px-2 py-4'></th>
                </tr>
              </thead>
              <tbody>
                {fields.map((field, index) => (
                  <tr key={field.id} className={index % 2 === 0 ? 'bg-greyscale-7' : 'bg-greyscale-8'}>
                    <td className='plabs-caption-regular-12 text-greyscale-7 px-3 py-4 text-sm'>
                      <Form.Input
                        name={`table.${index}.md`}
                        placeholder='MD'
                        className='w-full'
                        onChange={(e) => {
                          let formattedValue = e.target.value.replace(/\D/g, '')

                          form.setValue(`table.${index}.md`, formattedValue, {
                            shouldValidate: true,
                          })
                        }}
                      />
                    </td>
                    <td className='plabs-caption-regular-12 text-greyscale-7 px-3 py-4 text-sm'>
                      <Form.Input
                        name={`table.${index}.temperature`}
                        placeholder='Temperature'
                        className='w-full'
                        onChange={(e) => {
                          let formattedValue = e.target.value.replace(/\D/g, '')

                          form.setValue(`table.${index}.temperature`, formattedValue, {
                            shouldValidate: true,
                          })
                        }}
                      />
                    </td>
                    <td className='plabs-caption-regular-12 text-greyscale-7 px-3 py-4 text-sm'>
                      <Form.Input
                        name={`table.${index}.ppg`}
                        placeholder='PPG'
                        className='w-full'
                        onChange={(e) => {
                          let formattedValue = e.target.value.replace(/\D/g, '')

                          form.setValue(`table.${index}.ppg`, formattedValue, {
                            shouldValidate: true,
                          })
                        }}
                      />
                    </td>
                    <td className='plabs-caption-regular-12 text-greyscale-7 px-3 py-4 text-sm'>
                      <Form.Input
                        name={`table.${index}.fpg`}
                        placeholder='FPG'
                        className='w-full'
                        onChange={(e) => {
                          let formattedValue = e.target.value.replace(/\D/g, '')

                          form.setValue(`table.${index}.fpg`, formattedValue, {
                            shouldValidate: true,
                          })
                        }}
                      />
                    </td>
                    <td className='plabs-caption-regular-12 text-greyscale-7 px-3 py-4 text-sm'>
                      <Form.Input
                        name={`table.${index}.shmin`}
                        placeholder='ShMin'
                        className='w-full'
                        onChange={(e) => {
                          let formattedValue = e.target.value.replace(/\D/g, '')

                          form.setValue(`table.${index}.shmin`, formattedValue, {
                            shouldValidate: true,
                          })
                        }}
                      />
                    </td>
                    <td className='plabs-caption-regular-12 text-greyscale-7 px-3 py-4 text-sm'>
                      {fields.length > 1 && (
                        <button type='button' onClick={() => remove(index)} className='cursor-pointer pr-2'>
                          <Icons.Trash className='text-red-base size-4' />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
                <tr>
                  <td className='plabs-caption-regular-12 text-greyscale-7 px-3 py-2 text-sm'>
                    <button
                      onClick={() =>
                        append({
                          md: '',
                          temperature: '',
                          ppg: '',
                          fpg: '',
                          shmin: '',
                        })
                      }
                      type='button'
                      className='plabs-title-medium-12 text-greyscale-0 flex w-max cursor-pointer items-center space-x-1'
                    >
                      <span>Add More Row</span>
                      <Icons.Plus className='text-greyscale-0 h-3 w-3' />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className='grid grid-cols-2 items-center'>
              <div className='flex flex-col justify-center'>
                <h3 className='plabs-title-medium-16 text-greyscale-0'>Formation Properties</h3>
              </div>
              <Form.Select
                name={`name`}
                options={[
                  { label: 'Shale', value: 'Shale' },
                  { label: 'Sandstone', value: 'Sandstone' },
                  { label: 'Limestone', value: 'Limestone' },
                  { label: 'Dolomite', value: 'Dolomite' },
                ]}
                placeholder='Select Formation Properties'
                className='w-full'
              />
            </div>
            <div className='grid grid-cols-2 items-center'>
              <div className='flex flex-col justify-center'>
                <h3 className='plabs-title-medium-16 text-greyscale-0'>Density</h3>
              </div>
              <div className='flex items-center gap-2'>
                <Form.Input
                  name={`density`}
                  placeholder='Density'
                  className='w-full'
                  onChange={(e) => {
                    let formattedValue = e.target.value.replace(/[^0-9.]/g, '')

                    if ((formattedValue.match(/\./g) || []).length > 1) {
                      formattedValue = formattedValue.slice(0, -1)
                    }

                    form.setValue(`density`, formattedValue, {
                      shouldValidate: true,
                    })
                  }}
                />
                <span className='plabs-title-medium-16 text-greyscale-5 min-w-max'>g/cc</span>
              </div>
            </div>
            <div className='grid grid-cols-2 items-center'>
              <div className='flex flex-col justify-center'>
                <h3 className='plabs-title-medium-16 text-greyscale-0'>Specific Heat Capacity</h3>
              </div>
              <div className='flex items-center gap-2'>
                <Form.Input
                  name={`specific_heat_capacity`}
                  placeholder='Specific Heat Capacity'
                  className='w-full'
                  onChange={(e) => {
                    let formattedValue = e.target.value.replace(/[^0-9.]/g, '')

                    if ((formattedValue.match(/\./g) || []).length > 1) {
                      formattedValue = formattedValue.slice(0, -1)
                    }

                    form.setValue(`specific_heat_capacity`, formattedValue, {
                      shouldValidate: true,
                    })
                  }}
                />
                <span className='plabs-title-medium-16 text-greyscale-5 min-w-max'>BTU/lb/°F</span>
              </div>
            </div>
            <div className='grid grid-cols-2 items-center'>
              <div className='flex flex-col justify-center'>
                <h3 className='plabs-title-medium-16 text-greyscale-0'>Thermal Conductivity</h3>
              </div>
              <div className='flex items-center gap-2'>
                <Form.Input
                  name={`thermal_conductivity`}
                  placeholder='Thermal Conductivity'
                  className='w-full'
                  onChange={(e) => {
                    let formattedValue = e.target.value.replace(/[^0-9.]/g, '')

                    if ((formattedValue.match(/\./g) || []).length > 1) {
                      formattedValue = formattedValue.slice(0, -1)
                    }

                    form.setValue(`thermal_conductivity`, formattedValue, {
                      shouldValidate: true,
                    })
                  }}
                />
                <span className='plabs-title-medium-16 text-greyscale-5 min-w-max'>BTU/hr/ft/°F</span>
              </div>
            </div>
          </div>
        </div>
        <div className='flex w-full justify-end gap-2'>
          <div className='flex gap-2'>
            <Form.Button onClick={() => router.back()} type='button' className='btn-outline-greyscale text-greyscale-0'>
              Previous
            </Form.Button>
            <Form.Button type='submit' className='btn-lime'>
              Next
            </Form.Button>
          </div>
        </div>
      </Form>
      <div className='card h-max pb-1 pl-2'>
        <PumpFlowRateChart />
      </div>
    </div>
  )
}
