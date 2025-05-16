'use client'

import Form from '@/components/ui/form'
import { Icons } from '@/components/ui/icons'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { TableGeometry } from './table'
import Image from 'next/image'

export const FormGeometry = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const data = {
    data: [
      {
        name: 'Cased-Hole',
        anulus_volume: '1329.3',
        volume_w: '1329.3',
      },
      {
        name: 'Open-Hole',
        anulus_volume: '35.2',
        volume_w: '35.2',
      },
    ],
    paginate: {
      total_data: 2,
      current_page: 1,
      per_page: 10,
      total_page: 1,
    },
  }

  const form = useForm<any>({
    defaultValues: {
      geometry: [
        {
          name: '8.5” OH' as '8.5” OH' | 'DS',
          title: 'Wellbores',
          table: [
            {
              description: '21.500” Casing',
              top: '0',
              bottom: '1500',
              hole: '23.500',
              od: '21.500',
              id: '20.710',
            },
          ],
        },
        {
          name: 'DS' as '8.5” OH' | 'DS',
          title: 'Strings',
          table: [
            {
              description: '21.500” Casing',
              top: '0',
              bottom: '1500',
              hole: '23.500',
              od: '21.500',
              id: '20.710',
            },
          ],
        },
      ],
    },
  })

  const control = form.control
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'geometry',
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
          router.push('/calculation/xx-xxx?tab=fluid-System')
        }}
        onError={(error) => {}}
        className='card col-span-2 space-y-2'
        key={form.watch('geometry')}
      >
        <h1 className='plabs-headline-regular-24 mb-4'>
          {searchParams.get('tab')
            ? searchParams.get('tab')!.charAt(0).toUpperCase() + searchParams.get('tab')!.slice(1)
            : 'Default'}
        </h1>
        <div className='space-y-8'>
          {fields.map((item, index) => (
            <div key={index} className='space-y-4'>
              <div className='grid grid-cols-2 items-center'>
                <div className='flex flex-col justify-center'>
                  <h3 className='plabs-title-medium-16 text-greyscale-0'>Table Name</h3>
                </div>
                <div className='flex items-center gap-2'>
                  <Form.Select
                    name={`geometry.${index}.name`}
                    placeholder='Select Table Name'
                    options={[
                      { label: '8.5” OH', value: '8.5” OH' },
                      { label: 'DS', value: 'DS' },
                    ]}
                    className='w-full'
                    disabled
                  />
                  {fields.length > 1 && (
                    <button type='button' onClick={() => remove(index)} className='cursor-pointer pr-2'>
                      <Icons.Trash className='text-red-base size-4' />
                    </button>
                  )}
                </div>
              </div>
              <div className='space-y-3'>
                <Form.Input name={`geometry.${index}.title`} placeholder='Table Title' className='w-[200px]' disabled />
                <TableGeometry tableIndex={index} form={form} control={control} />
              </div>
            </div>
          ))}
          <button
            onClick={() =>
              append({
                name: '8.5” OH' as '8.5” OH' | 'DS',
                title: 'Wellbores',
                table: [
                  {
                    description: '21.500” Casing',
                    top: '0',
                    bottom: '1500',
                    hole: '23.500',
                    od: '21.500',
                    id: '20.710',
                  },
                ],
              })
            }
            type='button'
            className='plabs-title-medium-16 text-greyscale-0 flex w-max cursor-pointer items-center space-x-1'
          >
            <span>Add More Row</span>
            <Icons.Plus className='text-greyscale-0 h-4 w-4' />
          </button>
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
          <Image
            src={`/e68b78a185063318d7635379573a2f9152721e3e.png`}
            alt='calculation'
            width={500}
            height={700}
            className='w-full'
          />
        </div>
        <div className='card h-max'>
          <div className='overflow-hidden rounded-b-2xl'>
            <table className='w-full overflow-hidden rounded-t-2xl'>
              <thead className='bg-greyscale-10'>
                <tr>
                  <th className='plabs-title-medium-12 text-greyscale-0 px-2 py-4'>
                    <p className='line-clamp-1'>Name</p>
                  </th>
                  <th className='plabs-title-medium-12 text-greyscale-0 px-2 py-4'>
                    <p className='line-clamp-1'>Annulus Volume (bbl)</p>
                  </th>
                  <th className='plabs-title-medium-12 text-greyscale-0 px-2 py-4'>
                    <p className='line-clamp-1'>Volume w/ oString</p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.data.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-greyscale-7' : 'bg-greyscale-8'}>
                    <td className='plabs-caption-regular-12 text-greyscale-0 px-3 py-4 text-sm'>{item.name}</td>
                    <td className='plabs-caption-regular-12 text-greyscale-0 px-3 py-4 text-sm'>
                      {item.anulus_volume}
                    </td>
                    <td className='plabs-caption-regular-12 text-greyscale-0 px-3 py-4 text-sm'>{item.volume_w}</td>
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
