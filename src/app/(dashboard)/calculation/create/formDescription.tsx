'use client'

import Form from '@/components/ui/form'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'

export const FormDescription = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const form = useForm<any>({
    defaultValues: {
      company: '',
      field: '',
      well: '',
      created_at: '',
      project_type: '',
      project_number: ['', ''],
      location: '',
      country: '',
      comment: '',
    },
  })
  return (
    <Form
      form={form}
      onSave={() => {
        router.push('/calculation/create?tab=rig')
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
            <Form.Input name={`company`} placeholder='Company Name' />
          </div>
          <div className='grid grid-cols-2 items-center'>
            <div className='flex flex-col justify-center'>
              <h3 className='plabs-title-medium-16 text-greyscale-0'>Field</h3>
            </div>
            <Form.Input name={`field`} placeholder='Field Name' />
          </div>
          <div className='grid grid-cols-2 items-center'>
            <div className='flex flex-col justify-center'>
              <h3 className='plabs-title-medium-16 text-greyscale-0'>Well Name</h3>
            </div>
            <Form.Input name={`well`} placeholder='Well Name' />
          </div>
          <div className='grid grid-cols-2 items-center'>
            <div className='flex flex-col justify-center'>
              <h3 className='plabs-title-medium-16 text-greyscale-0'>Created At</h3>
            </div>
            <Form.Calendar name={`created_at`} placeholder='Created At' />
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
            />
          </div>
          <div className='grid grid-cols-2 items-center'>
            <div className='flex flex-col justify-center'>
              <h3 className='plabs-title-medium-16 text-greyscale-0'>Project Number</h3>
            </div>
            <div className='grid grid-cols-2 gap-2'>
              <Form.Input name={`project_number.0`} placeholder='Project Number 1' />
              <Form.Input name={`project_number.1`} placeholder='Project Number 2' />
            </div>
          </div>
          <div className='grid grid-cols-2 items-center'>
            <div className='flex flex-col justify-center'>
              <h3 className='plabs-title-medium-16 text-greyscale-0'>Location</h3>
            </div>
            <Form.Input name={`location`} placeholder='Location' />
          </div>
          <div className='grid grid-cols-2 items-center'>
            <div className='flex flex-col justify-center'>
              <h3 className='plabs-title-medium-16 text-greyscale-0'>Country</h3>
            </div>
            <Form.Input name={`country`} placeholder='Country' />
          </div>
          <div className='grid grid-cols-2 items-center'>
            <div className='flex flex-col justify-center'>
              <h3 className='plabs-title-medium-16 text-greyscale-0'>Comment</h3>
            </div>
            <Form.Textarea name={`comment`} placeholder='Comment' />
          </div>
        </div>
      </div>
      <div className='flex w-full justify-end gap-2'>
        <div className='flex gap-2'>
          <Form.Button
            onClick={() => router.push('/calculation')}
            type='button'
            className='btn-outline-greyscale text-greyscale-0'
          >
            Cancel
          </Form.Button>
          <Form.Button type='submit' className='btn-lime'>
            Next
          </Form.Button>
        </div>
      </div>
    </Form>
  )
}
