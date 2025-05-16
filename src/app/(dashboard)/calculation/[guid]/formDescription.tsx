'use client'

import Form from '@/components/ui/form'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

export const FormDescription = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const form = useForm<any>({
    defaultValues: {
      company: 'ABC Oil',
      field: 'Nusa Tenggara',
      well: 'Sumur Tenggeru',
      created_at: '22 Februari 2024',
      project_type: 'Type 1',
      project_number: ['Sample - 001', 'Sample - AFE - 001'],
      location: 'Nusa Tenggara',
      country: 'Indonesia',
      comment: 'This is a sample file created in Standard Oilfield Units',
    },
  })

  return (
    <Form
      form={form}
      onSave={() => {
        router.push('/calculation/xx-xxx?tab=rig')
      }}
      onError={(error) => {}}
      className='card space-y-2'
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
              <h3 className='plabs-title-medium-16 text-greyscale-0'>Company</h3>
            </div>
            <Form.Input name={`company`} placeholder='Company Name' disabled />
          </div>
          <div className='grid grid-cols-2 items-center'>
            <div className='flex flex-col justify-center'>
              <h3 className='plabs-title-medium-16 text-greyscale-0'>Field</h3>
            </div>
            <Form.Input name={`field`} placeholder='Field Name' disabled />
          </div>
          <div className='grid grid-cols-2 items-center'>
            <div className='flex flex-col justify-center'>
              <h3 className='plabs-title-medium-16 text-greyscale-0'>Well Name</h3>
            </div>
            <Form.Input name={`well`} placeholder='Well Name' disabled />
          </div>
          <div className='grid grid-cols-2 items-center'>
            <div className='flex flex-col justify-center'>
              <h3 className='plabs-title-medium-16 text-greyscale-0'>Created At</h3>
            </div>
            <Form.Calendar name={`created_at`} placeholder='Created At' disabled />
          </div>
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
              disabled
            />
          </div>
          <div className='grid grid-cols-2 items-center'>
            <div className='flex flex-col justify-center'>
              <h3 className='plabs-title-medium-16 text-greyscale-0'>Project Number</h3>
            </div>
            <div className='grid grid-cols-2 gap-2'>
              <Form.Input name={`project_number.0`} placeholder='Project Number 1' disabled />
              <Form.Input name={`project_number.1`} placeholder='Project Number 2' disabled />
            </div>
          </div>
          <div className='grid grid-cols-2 items-center'>
            <div className='flex flex-col justify-center'>
              <h3 className='plabs-title-medium-16 text-greyscale-0'>Location</h3>
            </div>
            <Form.Input name={`location`} placeholder='Location' disabled />
          </div>
          <div className='grid grid-cols-2 items-center'>
            <div className='flex flex-col justify-center'>
              <h3 className='plabs-title-medium-16 text-greyscale-0'>Country</h3>
            </div>
            <Form.Input name={`country`} placeholder='Country' disabled />
          </div>
          <div className='grid grid-cols-2 items-center'>
            <div className='flex flex-col justify-center'>
              <h3 className='plabs-title-medium-16 text-greyscale-0'>Comment</h3>
            </div>
            <Form.Textarea name={`comment`} placeholder='Comment' disabled />
          </div>
        </div>
      </div>
    </Form>
  )
}
