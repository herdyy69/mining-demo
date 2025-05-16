'use client'

import Form from '@/components/ui/form'
import { Icons } from '@/components/ui/icons'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { PumpFlowRateChart } from './analytic'

export const FormTemperature = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const form = useForm<any>({
    defaultValues: {
      type: 'Dynamic Model Initialized from Formation' as
        | 'Dynamic Model Initialized from Formation'
        | 'Dynamic Model Initialized from Survey',
      include_effect_of_information_temperature: true,
      table: [
        {
          md: 0,
          temperature: 40,
        },
      ],
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
          router.push('/analysis')
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
                name={`type`}
                options={[
                  {
                    label: 'Dynamic Model Initialized from Formation',
                    value: 'Dynamic Model Initialized from Formation',
                  },
                  { label: 'Dynamic Model Initialized from Survey', value: 'Dynamic Model Initialized from Survey' },
                ]}
                placeholder='Select Table Name'
                className='w-full'
                disabled
              />
            </div>
            <div className='grid grid-cols-2 items-center'>
              <div className='flex flex-col justify-center'>
                <h3 className='plabs-title-medium-16 text-greyscale-0'>Include Effect of Formation Temp</h3>
              </div>
              <Form.Switch name={`include_effect_of_information_temperature`} className='w-full' disabled />
            </div>
            <table className='w-full overflow-hidden rounded-t-2xl'>
              <thead className='bg-greyscale-10'>
                <tr>
                  <th className='plabs-title-medium-12 text-greyscale-0 px-2 py-4'>MD (ft)</th>
                  <th className='plabs-title-medium-12 text-greyscale-0 px-2 py-4'>Temperature (°F)</th>
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
                        disabled
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
                        disabled
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
          </div>
        </div>
        <div className='flex w-full justify-end gap-2'>
          <div className='flex gap-2'>
            <Form.Button onClick={() => router.back()} type='button' className='btn-outline-greyscale text-greyscale-0'>
              Previous
            </Form.Button>
            <Form.Button type='submit' className='btn-lime'>
              Continue to Analyses
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
