'use client'

import Form from '@/components/ui/form'
import { Icons } from '@/components/ui/icons'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { PumpFlowRateChart } from './analytic'

export const FormRig = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [tab, setTab] = React.useState('pumps')

  const form = useForm<any>({
    defaultValues: {
      project_type: '',
      air_gap: '',
      stand_length: '',
      equipment_type: '' as 'Riser' | 'BOP' | 'MPD',
      pumps: [
        {
          type: '',
          linear_diameter: '',
          stroke_diameter: '',
          rod_diameter: '',
          efficiency: '',
        },
      ],
      rig_pressure_loss: [
        {
          type: '',
          linear_diameter: '',
          stroke_diameter: '',
          rod_diameter: '',
          efficiency: '',
        },
      ],
    },
  })

  const control = form.control
  const {
    fields: fields_pumps,
    append: append_pumps,
    remove: remove_pumps,
  } = useFieldArray({
    control,
    name: 'pumps',
    rules: {
      required: 'This field is required for list',
      minLength: {
        value: 1,
        message: 'Minimum 1 list is required',
      },
    },
  })

  const {
    fields: fields_rig_pressure_loss,
    append: append_rig_pressure_loss,
    remove: remove_rig_pressure_loss,
  } = useFieldArray({
    control,
    name: 'rig_pressure_loss',
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
          router.push('/calculation/create?tab=formation')
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
                <h3 className='plabs-title-medium-16 text-greyscale-0'>Project Type</h3>
              </div>
              <Form.Select
                name={`project_type`}
                placeholder='Select Project Type'
                options={[
                  { label: 'Type 1', value: 'type1' },
                  { label: 'Type 2', value: 'type2' },
                ]}
              />
            </div>
            <div className='grid grid-cols-2 items-center'>
              <div className='flex flex-col justify-center'>
                <h3 className='plabs-title-medium-16 text-greyscale-0'>Air Gap</h3>
              </div>
              <div className='flex items-center gap-2'>
                <Form.Input
                  name={`air_gap`}
                  placeholder='Air Gap'
                  onChange={(e) => {
                    let formattedValue = e.target.value.replace(/\D/g, '')

                    form.setValue(`air_gap`, formattedValue, {
                      shouldValidate: true,
                    })
                  }}
                />
                <span className='plabs-title-medium-16 text-greyscale-5'>ft</span>
              </div>
            </div>
            <div className='grid grid-cols-2 items-center'>
              <div className='flex flex-col justify-center'>
                <h3 className='plabs-title-medium-16 text-greyscale-0'>Stand Length</h3>
              </div>
              <div className='flex items-center gap-2'>
                <Form.Input
                  name={`stand_length`}
                  placeholder='Stand Length'
                  onChange={(e) => {
                    let formattedValue = e.target.value.replace(/\D/g, '')

                    form.setValue(`stand_length`, formattedValue, {
                      shouldValidate: true,
                    })
                  }}
                />
                <span className='plabs-title-medium-16 text-greyscale-5'>ft</span>
              </div>
            </div>
            <div className='grid grid-cols-2 items-center'>
              <div className='flex flex-col justify-center'>
                <h3 className='plabs-title-medium-16 text-greyscale-0'>Equipment Type</h3>
              </div>
              <Form.Checkbox
                name={`equipment_type`}
                containerClassName='flex flex-row items-center gap-4'
                options={[
                  { label: 'Riser', value: 'Riser' },
                  { label: 'BOP', value: 'BOP' },
                  { label: 'MPD', value: 'MPD' },
                ]}
              />
            </div>
            <div className='space-y-2'>
              <div className='flex items-center gap-2'>
                <button onClick={() => setTab('pumps')} type='button' className={`btn-lime`} disabled={tab === 'pumps'}>
                  Pumps
                </button>
                <button
                  onClick={() => setTab('rig_pressure_loss')}
                  type='button'
                  className={`btn-lime`}
                  disabled={tab === 'rig_pressure_loss'}
                >
                  Rig Pressure Loss
                </button>
              </div>
              {tab === 'pumps' && (
                <table className='overflow-hidden rounded-t-2xl'>
                  <thead className='bg-greyscale-10'>
                    <tr>
                      <th className='plabs-title-medium-12 text-greyscale-0 px-2 py-4'>Type</th>
                      <th className='plabs-title-medium-12 text-greyscale-0 px-2 py-4'>Linear Diameter (in)</th>
                      <th className='plabs-title-medium-12 text-greyscale-0 px-2 py-4'>Stroke Diameter (in)</th>
                      <th className='plabs-title-medium-12 text-greyscale-0 px-2 py-4'>Rod Diameter (in)</th>
                      <th className='plabs-title-medium-12 text-greyscale-0 px-2 py-4'>Efficiency</th>
                      <th className='plabs-title-medium-12 text-greyscale-0 px-2 py-4'></th>
                    </tr>
                  </thead>
                  <tbody>
                    {fields_pumps.map((field, index) => (
                      <tr key={field.id} className={index % 2 === 0 ? 'bg-greyscale-7' : 'bg-greyscale-8'}>
                        <td className='plabs-caption-regular-12 text-greyscale-7 px-3 py-4 text-sm'>
                          <Form.Input
                            name={`pumps.${index}.type`}
                            placeholder='Type'
                            className='w-full'
                            onChange={(e) => {
                              form.setValue(`pumps.${index}.type`, e.target.value, {
                                shouldValidate: true,
                              })
                            }}
                          />
                        </td>
                        <td className='plabs-caption-regular-12 text-greyscale-7 px-3 py-4 text-sm'>
                          <Form.Input
                            name={`pumps.${index}.linear_diameter`}
                            placeholder='Diameter'
                            className='w-full'
                            onChange={(e) => {
                              let formattedValue = e.target.value.replace(/\D/g, '')

                              form.setValue(`pumps.${index}.linear_diameter`, formattedValue, {
                                shouldValidate: true,
                              })
                            }}
                          />
                        </td>
                        <td className='plabs-caption-regular-12 text-greyscale-7 px-3 py-4 text-sm'>
                          <Form.Input
                            name={`pumps.${index}.stroke_diameter`}
                            placeholder='Stroke'
                            className='w-full'
                            onChange={(e) => {
                              let formattedValue = e.target.value.replace(/\D/g, '')

                              form.setValue(`pumps.${index}.stroke_diameter`, formattedValue, {
                                shouldValidate: true,
                              })
                            }}
                          />
                        </td>
                        <td className='plabs-caption-regular-12 text-greyscale-7 px-3 py-4 text-sm'>
                          <Form.Input
                            name={`pumps.${index}.rod_diameter`}
                            placeholder='Rod'
                            className='w-full'
                            onChange={(e) => {
                              let formattedValue = e.target.value.replace(/\D/g, '')

                              form.setValue(`pumps.${index}.rod_diameter`, formattedValue, {
                                shouldValidate: true,
                              })
                            }}
                          />
                        </td>
                        <td className='plabs-caption-regular-12 text-greyscale-7 px-3 py-4 text-sm'>
                          <Form.Input
                            name={`pumps.${index}.efficiency`}
                            placeholder='Efficiency'
                            className='w-full'
                            onChange={(e) => {
                              let formattedValue = e.target.value.replace(/\D/g, '')

                              form.setValue(`pumps.${index}.efficiency`, formattedValue, {
                                shouldValidate: true,
                              })
                            }}
                          />
                        </td>

                        <td className='plabs-caption-regular-12 text-greyscale-7 px-3 py-4 text-sm'>
                          {fields_pumps.length > 1 && (
                            <button type='button' onClick={() => remove_pumps(index)} className='cursor-pointer pr-2'>
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
                            append_pumps({
                              type: '',
                              linear_diameter: '',
                              stroke_diameter: '',
                              rod_diameter: '',
                              efficiency: '',
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
              )}
              {tab === 'rig_pressure_loss' && (
                <table className='overflow-hidden rounded-t-2xl'>
                  <thead className='bg-greyscale-10'>
                    <tr>
                      <th className='plabs-title-medium-12 text-greyscale-0 px-2 py-4'>Type</th>
                      <th className='plabs-title-medium-12 text-greyscale-0 px-2 py-4'>Linear Diameter (in)</th>
                      <th className='plabs-title-medium-12 text-greyscale-0 px-2 py-4'>Stroke Diameter (in)</th>
                      <th className='plabs-title-medium-12 text-greyscale-0 px-2 py-4'>Rod Diameter (in)</th>
                      <th className='plabs-title-medium-12 text-greyscale-0 px-2 py-4'>Efficiency</th>
                      <th className='plabs-title-medium-12 text-greyscale-0 px-2 py-4'></th>
                    </tr>
                  </thead>
                  <tbody>
                    {fields_rig_pressure_loss.map((field, index) => (
                      <tr key={field.id} className={index % 2 === 0 ? 'bg-greyscale-7' : 'bg-greyscale-8'}>
                        <td className='plabs-caption-regular-12 text-greyscale-7 px-3 py-4 text-sm'>
                          <Form.Input
                            name={`rig_pressure_loss.${index}.type`}
                            placeholder='Type'
                            className='w-full'
                            onChange={(e) => {
                              form.setValue(`rig_pressure_loss.${index}.type`, e.target.value, {
                                shouldValidate: true,
                              })
                            }}
                          />
                        </td>
                        <td className='plabs-caption-regular-12 text-greyscale-7 px-3 py-4 text-sm'>
                          <Form.Input
                            name={`rig_pressure_loss.${index}.linear_diameter`}
                            placeholder='Diameter'
                            className='w-full'
                            onChange={(e) => {
                              let formattedValue = e.target.value.replace(/\D/g, '')

                              form.setValue(`rig_pressure_loss.${index}.linear_diameter`, formattedValue, {
                                shouldValidate: true,
                              })
                            }}
                          />
                        </td>
                        <td className='plabs-caption-regular-12 text-greyscale-7 px-3 py-4 text-sm'>
                          <Form.Input
                            name={`rig_pressure_loss.${index}.stroke_diameter`}
                            placeholder='Stroke'
                            className='w-full'
                            onChange={(e) => {
                              let formattedValue = e.target.value.replace(/\D/g, '')

                              form.setValue(`rig_pressure_loss.${index}.stroke_diameter`, formattedValue, {
                                shouldValidate: true,
                              })
                            }}
                          />
                        </td>
                        <td className='plabs-caption-regular-12 text-greyscale-7 px-3 py-4 text-sm'>
                          <Form.Input
                            name={`rig_pressure_loss.${index}.rod_diameter`}
                            placeholder='Rod'
                            className='w-full'
                            onChange={(e) => {
                              let formattedValue = e.target.value.replace(/\D/g, '')

                              form.setValue(`rig_pressure_loss.${index}.rod_diameter`, formattedValue, {
                                shouldValidate: true,
                              })
                            }}
                          />
                        </td>
                        <td className='plabs-caption-regular-12 text-greyscale-7 px-3 py-4 text-sm'>
                          <Form.Input
                            name={`rig_pressure_loss.${index}.efficiency`}
                            placeholder='Efficiency'
                            className='w-full'
                            onChange={(e) => {
                              let formattedValue = e.target.value.replace(/\D/g, '')

                              form.setValue(`rig_pressure_loss.${index}.efficiency`, formattedValue, {
                                shouldValidate: true,
                              })
                            }}
                          />
                        </td>

                        <td className='plabs-caption-regular-12 text-greyscale-7 px-3 py-4 text-sm'>
                          {fields_rig_pressure_loss.length > 1 && (
                            <button
                              type='button'
                              onClick={() => remove_rig_pressure_loss(index)}
                              className='cursor-pointer pr-2'
                            >
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
                            append_rig_pressure_loss({
                              type: '',
                              linear_diameter: '',
                              stroke_diameter: '',
                              rod_diameter: '',
                              efficiency: '',
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
              )}
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
      <div className='space-y-4'>
        <div className='card'>
          <video width={500} height={500} className='w-full' autoPlay muted playsInline>
            <source src='/20250603-131525.mp4' type='video/mp4' />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className='card pb-1 pl-2'>
          <PumpFlowRateChart />
        </div>
      </div>
    </div>
  )
}
