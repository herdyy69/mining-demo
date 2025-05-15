'use client'

import Form from '@/components/ui/form'
import { Icons } from '@/components/ui/icons'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'

function generateDummyData() {
  const md = Math.floor(Math.random() * 10000)
  const inc = Math.floor(Math.random() * 90)
  const azimuth = Math.floor(Math.random() * 360)
  const tvd = Math.floor(Math.random() * 10000)
  const horizon = Math.floor(Math.random() * 10000)
  const northSouth = Math.floor(Math.random() * 10000)
  const eastWest = Math.floor(Math.random() * 10000)
  const dogleg = Math.floor(Math.random() * 10000)

  return {
    md: md,
    inc: inc,
    azimuth: azimuth,
    tvd: tvd,
    horizon: horizon,
    northSouth: northSouth,
    eastWest: eastWest,
    dogleg: dogleg,
  }
}

export const FormSurvey = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [dummyData, setDummyData] = useState<any[]>([])

  useEffect(() => {
    const data = Array.from({ length: 10 }, () => generateDummyData())
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
      trajectory_input: [
        {
          md: '',
          inc: '',
          azimuth: '',
        },
      ],
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
      <Form
        form={form}
        onSave={() => {
          router.push('/calculation/create?tab=geometry')
        }}
        onError={(error) => {}}
        className='card h-max space-y-2'
      >
        <h1 className='plabs-headline-regular-24 mb-4'>
          {searchParams.get('tab')
            ? searchParams.get('tab')!.charAt(0).toUpperCase() + searchParams.get('tab')!.slice(1)
            : 'Default'}
        </h1>
        <div className='flex flex-col'>
          <div className='space-y-8'>
            <table className='w-full overflow-hidden rounded-t-2xl'>
              <thead className='bg-greyscale-10'>
                <tr>
                  <th className='plabs-title-medium-12 text-greyscale-0 px-2 py-4'>MD (ft)</th>
                  <th className='plabs-title-medium-12 text-greyscale-0 px-2 py-4'>Inc</th>
                  <th className='plabs-title-medium-12 text-greyscale-0 px-2 py-4'>Azimuth</th>
                  <th className='plabs-title-medium-12 text-greyscale-0 px-2 py-4'></th>
                </tr>
              </thead>
              <tbody>
                {fields.map((field, index) => (
                  <tr key={field.id} className={index % 2 === 0 ? 'bg-greyscale-7' : 'bg-greyscale-8'}>
                    <td className='plabs-caption-regular-12 text-greyscale-7 px-3 py-4 text-sm'>
                      <Form.Input
                        name={`trajectory_input.${index}.md`}
                        placeholder='MD'
                        className='w-full'
                        onChange={(e) => {
                          let formattedValue = e.target.value.replace(/\D/g, '')

                          form.setValue(`trajectory_input.${index}.md`, formattedValue, {
                            shouldValidate: true,
                          })
                        }}
                      />
                    </td>
                    <td className='plabs-caption-regular-12 text-greyscale-7 px-3 py-4 text-sm'>
                      <Form.Input
                        name={`trajectory_input.${index}.inc`}
                        placeholder='Inc'
                        className='w-full'
                        onChange={(e) => {
                          let formattedValue = e.target.value.replace(/\D/g, '')

                          form.setValue(`trajectory_input.${index}.inc`, formattedValue, {
                            shouldValidate: true,
                          })
                        }}
                      />
                    </td>
                    <td className='plabs-caption-regular-12 text-greyscale-7 px-3 py-4 text-sm'>
                      <Form.Input
                        name={`trajectory_input.${index}.azimuth`}
                        placeholder='Azimuth'
                        className='w-full'
                        onChange={(e) => {
                          let formattedValue = e.target.value.replace(/\D/g, '')

                          form.setValue(`trajectory_input.${index}.azimuth`, formattedValue, {
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
                          inc: '',
                          azimuth: '',
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
              Next
            </Form.Button>
          </div>
        </div>
      </Form>
      <div className='card h-max'>
        <div className='overflow-hidden rounded-b-2xl'>
          <table className='w-full overflow-hidden rounded-t-2xl'>
            <thead className='bg-greyscale-10'>
              <tr>
                <th className='plabs-title-medium-12 text-greyscale-0 px-2 py-4'>
                  <p className='line-clamp-1'>MD (ft)</p>
                </th>
                <th className='plabs-title-medium-12 text-greyscale-0 px-2 py-4'>
                  <p className='line-clamp-1'>Inc</p>
                </th>
                <th className='plabs-title-medium-12 text-greyscale-0 px-2 py-4'>
                  <p className='line-clamp-1'>Azimuth</p>
                </th>
                <th className='plabs-title-medium-12 text-greyscale-0 px-2 py-4'>
                  <p className='line-clamp-1'>TVD (ft)</p>
                </th>
                <th className='plabs-title-medium-12 text-greyscale-0 px-2 py-4'>
                  <p className='line-clamp-1'>Horizon D. (ft)</p>
                </th>
                <th className='plabs-title-medium-12 text-greyscale-0 px-2 py-4'>
                  <p className='line-clamp-1'>North / South D.</p>
                </th>
                <th className='plabs-title-medium-12 text-greyscale-0 px-2 py-4'>
                  <p className='line-clamp-1'>East / West D.</p>
                </th>
                <th className='plabs-title-medium-12 text-greyscale-0 px-2 py-4'>
                  <p className='line-clamp-1'>Dogleg (°/100ft)</p>
                </th>
              </tr>
            </thead>
            <tbody>
              {data.data.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-greyscale-7' : 'bg-greyscale-8'}>
                  <td className='plabs-caption-regular-12 text-greyscale-0 px-3 py-4 text-sm'>{item.md}</td>
                  <td className='plabs-caption-regular-12 text-greyscale-0 px-3 py-4 text-sm'>{item.inc}</td>
                  <td className='plabs-caption-regular-12 text-greyscale-0 px-3 py-4 text-sm'>{item.azimuth}</td>
                  <td className='plabs-caption-regular-12 text-greyscale-0 px-3 py-4 text-sm'>{item.tvd}</td>
                  <td className='plabs-caption-regular-12 text-greyscale-0 px-3 py-4 text-sm'>{item.horizon}</td>
                  <td className='plabs-caption-regular-12 text-greyscale-0 px-3 py-4 text-sm'>{item.northSouth}</td>
                  <td className='plabs-caption-regular-12 text-greyscale-0 px-3 py-4 text-sm'>{item.eastWest}</td>
                  <td className='plabs-caption-regular-12 text-greyscale-0 px-3 py-4 text-sm'>{item.dogleg}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
