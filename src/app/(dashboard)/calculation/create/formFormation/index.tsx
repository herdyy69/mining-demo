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
      bit_tfa: 0.77,
      table: [
        { deskripsi: 'Bit', od: 6, id: 3.5, length: 1.08, cumm_length: 1.08, act_length: 1.08 },
        { deskripsi: 'Terraforce', od: 7, id: 4.952, length: 27.38, cumm_length: 28.46, act_length: 27.38 },
        { deskripsi: '7-3/4" Stab', od: 5.5, id: 2.813, length: 5, cumm_length: 33.46, act_length: 5 },
        { deskripsi: '6-1/2" Float', od: 6.5, id: 2.875, length: 2.07, cumm_length: 35.53, act_length: 2.07 },
        { deskripsi: '6-3/4" Collar', od: 6.75, id: 3.125, length: 9.2, cumm_length: 44.73, act_length: 9.2 },
        { deskripsi: '6-3/4" PWD', od: 6.75, id: 1.905, length: 4.44, cumm_length: 49.17, act_length: 4.44 },
        { deskripsi: '6-3/4" HOC', od: 6.75, id: 3, length: 9.59, cumm_length: 58.76, act_length: 9.59 },
        { deskripsi: '9x5" HWDP', od: 5, id: 3, length: 270, cumm_length: 328.76, act_length: 270 },
        { deskripsi: '6-1/2" Jar', od: 6.5, id: 2.75, length: 21.67, cumm_length: 350.43, act_length: 21.67 },
        { deskripsi: '40x5" HWDP', od: 5, id: 3, length: 1200, cumm_length: 1550.43, act_length: 1200 },
        { deskripsi: '5" DP', od: 5, id: 4.276, length: 3000, cumm_length: 3000, act_length: 1449.57 },
      ],
      mw: 9.3,
      flow_rate: 400,
      pressure: 320,
      cutting_dia: 0.25,
      sg_cutting: 2.6,
      rop_ft_hr: 90,
      new_pressure_drop: 257.81,
      pressure_drop_at_bit: 162.04,
      cutting_prod: 6.317,
      ann_mw: 0.156129,
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
                <h3 className='plabs-title-medium-16 text-greyscale-0'>Bit TFA</h3>
              </div>
              <Form.Input name={`bit_tfa`} placeholder='Bit TFA' className='w-full' />
            </div>
            <table className='overflow-hidden rounded-t-2xl'>
              <thead className='bg-greyscale-10'>
                <tr>
                  <th className='plabs-title-medium-12 text-greyscale-0 px-2 py-4'>Deskripsi</th>
                  <th className='plabs-title-medium-12 text-greyscale-0 px-2 py-4'>OD</th>
                  <th className='plabs-title-medium-12 text-greyscale-0 px-2 py-4'>ID</th>
                  <th className='plabs-title-medium-12 text-greyscale-0 px-2 py-4'>Length</th>
                  <th className='plabs-title-medium-12 text-greyscale-0 px-2 py-4'>Cumm. Length</th>
                  <th className='plabs-title-medium-12 text-greyscale-0 px-2 py-4'>Act Length</th>
                  <th className='plabs-title-medium-12 text-greyscale-0 px-2 py-4'></th>
                </tr>
              </thead>
              <tbody>
                {fields.map((field, index) => (
                  <tr key={field.id} className={index % 2 === 0 ? 'bg-greyscale-7' : 'bg-greyscale-8'}>
                    <td className='plabs-caption-regular-12 text-greyscale-7 px-3 py-4 text-sm'>
                      <Form.Input
                        name={`table.${index}.deskripsi`}
                        placeholder='Deskripsi'
                        className='w-full'
                        disabled
                      />
                    </td>
                    <td className='plabs-caption-regular-12 text-greyscale-7 px-3 py-4 text-sm'>
                      <Form.Input
                        name={`table.${index}.od`}
                        placeholder='OD'
                        className='w-full'
                        disabled
                        onChange={(e) => {
                          let formattedValue = e.target.value.replace(/[^0-9.]/g, '')
                          if ((formattedValue.match(/\./g) || []).length > 1) {
                            formattedValue = formattedValue.slice(0, -1)
                          }
                          form.setValue(`table.${index}.od`, formattedValue, {
                            shouldValidate: true,
                          })
                        }}
                      />
                    </td>
                    <td className='plabs-caption-regular-12 text-greyscale-7 px-3 py-4 text-sm'>
                      <Form.Input
                        name={`table.${index}.id`}
                        placeholder='ID'
                        className='w-full'
                        disabled
                        onChange={(e) => {
                          let formattedValue = e.target.value.replace(/[^0-9.]/g, '')
                          if ((formattedValue.match(/\./g) || []).length > 1) {
                            formattedValue = formattedValue.slice(0, -1)
                          }
                          form.setValue(`table.${index}.id`, formattedValue, {
                            shouldValidate: true,
                          })
                        }}
                      />
                    </td>
                    <td className='plabs-caption-regular-12 text-greyscale-7 px-3 py-4 text-sm'>
                      <Form.Input
                        name={`table.${index}.length`}
                        placeholder='Length'
                        className='w-full'
                        disabled
                        onChange={(e) => {
                          let formattedValue = e.target.value.replace(/[^0-9.]/g, '')
                          if ((formattedValue.match(/\./g) || []).length > 1) {
                            formattedValue = formattedValue.slice(0, -1)
                          }
                          form.setValue(`table.${index}.length`, formattedValue, {
                            shouldValidate: true,
                          })
                        }}
                      />
                    </td>
                    <td className='plabs-caption-regular-12 text-greyscale-7 px-3 py-4 text-sm'>
                      <Form.Input
                        name={`table.${index}.cumm_length`}
                        placeholder='Cumm. Length'
                        className='w-full'
                        onChange={(e) => {
                          let formattedValue = e.target.value.replace(/[^0-9.]/g, '')
                          if ((formattedValue.match(/\./g) || []).length > 1) {
                            formattedValue = formattedValue.slice(0, -1)
                          }
                          form.setValue(`table.${index}.cumm_length`, formattedValue, {
                            shouldValidate: true,
                          })
                        }}
                      />
                    </td>
                    <td className='plabs-caption-regular-12 text-greyscale-7 px-3 py-4 text-sm'>
                      <Form.Input
                        name={`table.${index}.act_length`}
                        placeholder='Act Length'
                        className='w-full'
                        onChange={(e) => {
                          let formattedValue = e.target.value.replace(/[^0-9.]/g, '')
                          if ((formattedValue.match(/\./g) || []).length > 1) {
                            formattedValue = formattedValue.slice(0, -1)
                          }
                          form.setValue(`table.${index}.act_length`, formattedValue, {
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
                          deskripsi: '',
                          od: '',
                          id: '',
                          length: '',
                          cumm_length: '',
                          act_length: '',
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
            <div className='flex flex-col justify-center'>
              <h3 className='plabs-title-medium-16 text-greyscale-0'>LWD/MWD Pressure drop data</h3>
            </div>
            <div className='grid grid-cols-2 items-center'>
              <div className='flex flex-col justify-center'>
                <h3 className='plabs-title-medium-16 text-greyscale-0'>MW</h3>
              </div>
              <div className='flex items-center gap-2'>
                <Form.Input
                  name={`mw`}
                  placeholder='MW'
                  className='w-full'
                  onChange={(e) => {
                    let formattedValue = e.target.value.replace(/[^0-9.]/g, '')
                    if ((formattedValue.match(/\./g) || []).length > 1) {
                      formattedValue = formattedValue.slice(0, -1)
                    }
                    form.setValue(`mw`, formattedValue, {
                      shouldValidate: true,
                    })
                  }}
                />
              </div>
            </div>
            <div className='grid grid-cols-2 items-center'>
              <div className='flex flex-col justify-center'>
                <h3 className='plabs-title-medium-16 text-greyscale-0'>Flow Rate</h3>
              </div>
              <div className='flex items-center gap-2'>
                <Form.Input
                  name={`flow_rate`}
                  placeholder='Flow Rate'
                  className='w-full'
                  onChange={(e) => {
                    let formattedValue = e.target.value.replace(/\D/g, '')
                    form.setValue(`flow_rate`, formattedValue, {
                      shouldValidate: true,
                    })
                  }}
                />
              </div>
            </div>
            <div className='grid grid-cols-2 items-center'>
              <div className='flex flex-col justify-center'>
                <h3 className='plabs-title-medium-16 text-greyscale-0'>Pressure</h3>
              </div>
              <div className='flex items-center gap-2'>
                <Form.Input
                  name={`pressure`}
                  placeholder='Pressure'
                  className='w-full'
                  onChange={(e) => {
                    let formattedValue = e.target.value.replace(/\D/g, '')
                    form.setValue(`pressure`, formattedValue, {
                      shouldValidate: true,
                    })
                  }}
                />
              </div>
            </div>
            <div className='grid grid-cols-2 items-center'>
              <div className='flex flex-col justify-center'>
                <h3 className='plabs-title-medium-16 text-greyscale-0'>Cutting Dia</h3>
              </div>
              <div className='flex items-center gap-2'>
                <Form.Input
                  name={`cutting_dia`}
                  placeholder='Cutting Dia'
                  className='w-full'
                  onChange={(e) => {
                    let formattedValue = e.target.value.replace(/[^0-9.]/g, '')
                    if ((formattedValue.match(/\./g) || []).length > 1) {
                      formattedValue = formattedValue.slice(0, -1)
                    }
                    form.setValue(`cutting_dia`, formattedValue, {
                      shouldValidate: true,
                    })
                  }}
                />
              </div>
            </div>
            <div className='grid grid-cols-2 items-center'>
              <div className='flex flex-col justify-center'>
                <h3 className='plabs-title-medium-16 text-greyscale-0'>SG Cutting</h3>
              </div>
              <div className='flex items-center gap-2'>
                <Form.Input
                  name={`sg_cutting`}
                  placeholder='SG Cutting'
                  className='w-full'
                  onChange={(e) => {
                    let formattedValue = e.target.value.replace(/[^0-9.]/g, '')
                    if ((formattedValue.match(/\./g) || []).length > 1) {
                      formattedValue = formattedValue.slice(0, -1)
                    }
                    form.setValue(`sg_cutting`, formattedValue, {
                      shouldValidate: true,
                    })
                  }}
                />
              </div>
            </div>
            <div className='grid grid-cols-2 items-center'>
              <div className='flex flex-col justify-center'>
                <h3 className='plabs-title-medium-16 text-greyscale-0'>ROP ft/hr</h3>
              </div>
              <div className='flex items-center gap-2'>
                <Form.Input
                  name={`rop_ft_hr`}
                  placeholder='ROP ft/hr'
                  className='w-full'
                  onChange={(e) => {
                    let formattedValue = e.target.value.replace(/\D/g, '')
                    form.setValue(`rop_ft_hr`, formattedValue, {
                      shouldValidate: true,
                    })
                  }}
                />
              </div>
            </div>
            <div className='grid grid-cols-2 items-center'>
              <div className='flex flex-col justify-center'>
                <h3 className='plabs-title-medium-16 text-greyscale-0'>New Pressure Drop</h3>
              </div>
              <div className='flex items-center gap-2'>
                <Form.Input
                  name={`new_pressure_drop`}
                  placeholder='New Pressure Drop'
                  className='w-full'
                  onChange={(e) => {
                    let formattedValue = e.target.value.replace(/[^0-9.]/g, '')
                    if ((formattedValue.match(/\./g) || []).length > 1) {
                      formattedValue = formattedValue.slice(0, -1)
                    }
                    form.setValue(`new_pressure_drop`, formattedValue, {
                      shouldValidate: true,
                    })
                  }}
                />
                <span className='plabs-title-medium-16 text-greyscale-5 min-w-max'>psi</span>
              </div>
            </div>
            <div className='grid grid-cols-2 items-center'>
              <div className='flex flex-col justify-center'>
                <h3 className='plabs-title-medium-16 text-greyscale-0'>Pressure Drop at Bit</h3>
              </div>
              <div className='flex items-center gap-2'>
                <Form.Input
                  name={`pressure_drop_at_bit`}
                  placeholder='Pressure Drop at Bit'
                  className='w-full'
                  onChange={(e) => {
                    let formattedValue = e.target.value.replace(/[^0-9.]/g, '')
                    if ((formattedValue.match(/\./g) || []).length > 1) {
                      formattedValue = formattedValue.slice(0, -1)
                    }
                    form.setValue(`pressure_drop_at_bit`, formattedValue, {
                      shouldValidate: true,
                    })
                  }}
                />
                <span className='plabs-title-medium-16 text-greyscale-5 min-w-max'>psi</span>
              </div>
            </div>
            <div className='grid grid-cols-2 items-center'>
              <div className='flex flex-col justify-center'>
                <h3 className='plabs-title-medium-16 text-greyscale-0'>cutting prod</h3>
              </div>
              <div className='flex items-center gap-2'>
                <Form.Input
                  name={`cutting_prod`}
                  placeholder='cutting prod'
                  className='w-full'
                  onChange={(e) => {
                    let formattedValue = e.target.value.replace(/[^0-9.]/g, '')
                    if ((formattedValue.match(/\./g) || []).length > 1) {
                      formattedValue = formattedValue.slice(0, -1)
                    }
                    form.setValue(`cutting_prod`, formattedValue, {
                      shouldValidate: true,
                    })
                  }}
                />
              </div>
            </div>
            <div className='grid grid-cols-2 items-center'>
              <div className='flex flex-col justify-center'>
                <h3 className='plabs-title-medium-16 text-greyscale-0'>AnnMW</h3>
              </div>
              <div className='flex items-center gap-2'>
                <Form.Input
                  name={`ann_mw`}
                  placeholder='AnnMW'
                  className='w-full'
                  onChange={(e) => {
                    let formattedValue = e.target.value.replace(/[^0-9.]/g, '')
                    if ((formattedValue.match(/\./g) || []).length > 1) {
                      formattedValue = formattedValue.slice(0, -1)
                    }
                    form.setValue(`ann_mw`, formattedValue, {
                      shouldValidate: true,
                    })
                  }}
                />
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
      {/* <div className='card h-max pb-1 pl-2'>
        <PumpFlowRateChart />
      </div> */}
    </div>
  )
}
