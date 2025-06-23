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

const inputSurveyData = [
  { depth: '0', inclination: '0', azimuth: '0', horDispl: '0,00', tvd: '0' },
  { depth: '200', inclination: '0', azimuth: '0', horDispl: '0,00', tvd: '200,00' },
  { depth: '240', inclination: '1,2', azimuth: '113,1', horDispl: '0,84', tvd: '239,99' },
  { depth: '300', inclination: '3', azimuth: '113,1', horDispl: '3,98', tvd: '299,91' },
  { depth: '360', inclination: '4,8', azimuth: '113,1', horDispl: '9,00', tvd: '359,70' },
  { depth: '420', inclination: '6,6', azimuth: '113,1', horDispl: '15,89', tvd: '419,30' },
  { depth: '480', inclination: '8,4', azimuth: '113,1', horDispl: '24,66', tvd: '478,66' },
  { depth: '540', inclination: '10,2', azimuth: '113,1', horDispl: '35,28', tvd: '537,71' },
  { depth: '600', inclination: '12', azimuth: '113,1', horDispl: '47,76', tvd: '596,40' },
  { depth: '660', inclination: '13,8', azimuth: '113,1', horDispl: '62,07', tvd: '654,67' },
  { depth: '720', inclination: '15,6', azimuth: '113,1', horDispl: '78,21', tvd: '712,46' },
  { depth: '780', inclination: '17,4', azimuth: '113,1', horDispl: '96,15', tvd: '769,71' },
  { depth: '840', inclination: '18', azimuth: '113,1', horDispl: '114,69', tvd: '826,77' },
  { depth: '900', inclination: '18', azimuth: '113,1', horDispl: '133,23', tvd: '883,84' },
  { depth: '1500', inclination: '29', azimuth: '106', horDispl: '424,12', tvd: '1408,61' },
  { depth: '1600', inclination: '33', azimuth: '106', horDispl: '478,58', tvd: '1492,48' },
  { depth: '1700', inclination: '33', azimuth: '106', horDispl: '533,04', tvd: '1576,34' },
  { depth: '1800', inclination: '33', azimuth: '106', horDispl: '587,51', tvd: '1660,21' },
  { depth: '1900', inclination: '33', azimuth: '106', horDispl: '641,97', tvd: '1744,08' },
  { depth: '2000', inclination: '33', azimuth: '106', horDispl: '696,44', tvd: '1827,94' },
  { depth: '2100', inclination: '33', azimuth: '106', horDispl: '750,90', tvd: '1911,81' },
  { depth: '2200', inclination: '33', azimuth: '106', horDispl: '805,36', tvd: '1995,68' },
  { depth: '2300', inclination: '33', azimuth: '106', horDispl: '859,83', tvd: '2079,55' },
  { depth: '2400', inclination: '33', azimuth: '106', horDispl: '914,29', tvd: '2163,41' },
  { depth: '2500', inclination: '33', azimuth: '106', horDispl: '968,76', tvd: '2247,28' },
  { depth: '2600', inclination: '33', azimuth: '106', horDispl: '1023,22', tvd: '2331,15' },
  { depth: '3000', inclination: '33', azimuth: '106', horDispl: '1023,22', tvd: '2666,61' },
]

const plottingData = [
  { depth: 0, inclination: 0, azimuth: 0, horDispl: '0', tvd: '0' },
  { depth: 200, inclination: 0, azimuth: 0, horDispl: '0', tvd: '200' },
  { depth: 240, inclination: 1.2, azimuth: 113.1, horDispl: '0,837697', tvd: '239,9912' },
  { depth: 300, inclination: 3, azimuth: 113.1, horDispl: '3,977854', tvd: '299,909' },
  { depth: 360, inclination: 4.8, azimuth: 113.1, horDispl: '9,00', tvd: '359,70' },
  { depth: 420, inclination: 6.6, azimuth: 113.1, horDispl: '15,89', tvd: '419,30' },
  { depth: 480, inclination: 8.4, azimuth: 113.1, horDispl: '24,66', tvd: '478,66' },
  { depth: 540, inclination: 10.2, azimuth: 113.1, horDispl: '35,28', tvd: '537,71' },
  { depth: 600, inclination: 12, azimuth: 47.76, horDispl: '47,76', tvd: '596,40' },
  { depth: 660, inclination: 13.8, azimuth: 113.1, horDispl: '62,07', tvd: '654,67' },
  { depth: 720, inclination: 15.6, azimuth: 113.1, horDispl: '78,21', tvd: '712,46' },
  { depth: 780, inclination: 17.4, azimuth: 113.1, horDispl: '96,15', tvd: '769,71' },
  { depth: 840, inclination: 18, azimuth: 113.1, horDispl: '114,69', tvd: '826,77' },
  { depth: 900, inclination: 18, azimuth: 113.1, horDispl: '133,23', tvd: '883,84' },
  { depth: 1500, inclination: 29, azimuth: 106, horDispl: '424,117', tvd: '1408,609' },
  { depth: 1600, inclination: 33, azimuth: 106, horDispl: '478,5809', tvd: '1492,476' },
  { depth: 1700, inclination: 33, azimuth: 106, horDispl: '533,0448', tvd: '1576,343' },
  { depth: 1800, inclination: 33, azimuth: 106, horDispl: '587,5087', tvd: '1660,21' },
  { depth: 1900, inclination: 33, azimuth: 106, horDispl: '641,9726', tvd: '1744,077' },
  { depth: 2000, inclination: 33, azimuth: 106, horDispl: '696,4365', tvd: '1827,944' },
  { depth: 2100, inclination: 33, azimuth: 106, horDispl: '750,9004', tvd: '1911,811' },
  { depth: 2200, inclination: 33, azimuth: 106, horDispl: '805,3643', tvd: '1995,678' },
  { depth: 2300, inclination: 33, azimuth: 106, horDispl: '859,8282', tvd: '2079,545' },
  { depth: 2400, inclination: 33, azimuth: 106, horDispl: '914,2921', tvd: '2163,412' },
  { depth: 2500, inclination: 33, azimuth: 106, horDispl: '968,76', tvd: '2247,279' },
  { depth: 2600, inclination: 33, azimuth: 106, horDispl: '1023,22', tvd: '2331,146' },
  { depth: 3000, inclination: 33, azimuth: 106, horDispl: '0', tvd: '2666,615' },
]

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
    <div className='grid grid-cols-1 gap-4'>
      <Form
        form={form}
        onSave={() => {
          router.push('/calculation/create?tab=pump-data')
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
                  <th className='plabs-title-medium-12 text-greyscale-0 px-2 py-4'>TVD</th>
                  {/* <th className='plabs-title-medium-12 text-greyscale-0 px-2 py-4'>Azimuth</th> */}
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
                    {/* <td className='plabs-caption-regular-12 text-greyscale-7 px-3 py-4 text-sm'>
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
                    </td> */}
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
                    {/* <button
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
                    </button> */}
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
        <div className='grid grid-cols-2 gap-4 p-4'>
          <div>
            <h2 className='plabs-headline-regular-24 mb-4'>Input Survey</h2>
            <div className='overflow-hidden rounded-2xl'>
              <table className='w-full overflow-hidden rounded-t-2xl'>
                <thead className='bg-greyscale-10'>
                  <tr>
                    <th className='plabs-title-medium-12 text-greyscale-0 px-2 py-4'>
                      <p className='line-clamp-1'>Depth</p>
                    </th>
                    <th className='plabs-title-medium-12 text-greyscale-0 px-2 py-4'>
                      <p className='line-clamp-1'>Inclination</p>
                    </th>
                    <th className='plabs-title-medium-12 text-greyscale-0 px-2 py-4'>
                      <p className='line-clamp-1'>Azimuth</p>
                    </th>
                    <th className='plabs-title-medium-12 text-greyscale-0 px-2 py-4'>
                      <p className='line-clamp-1'>Hor Displ</p>
                    </th>
                    <th className='plabs-title-medium-12 text-greyscale-0 px-2 py-4'>
                      <p className='line-clamp-1'>TVD</p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {inputSurveyData.map((item, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-greyscale-7' : 'bg-greyscale-8'}>
                      <td className='plabs-caption-regular-12 text-greyscale-0 px-3 py-4 text-sm'>{item.depth}</td>
                      <td className='plabs-caption-regular-12 text-greyscale-0 px-3 py-4 text-sm'>
                        {item.inclination}
                      </td>
                      <td className='plabs-caption-regular-12 text-greyscale-0 px-3 py-4 text-sm'>{item.azimuth}</td>
                      <td className='plabs-caption-regular-12 text-greyscale-0 px-3 py-4 text-sm'>{item.horDispl}</td>
                      <td className='plabs-caption-regular-12 text-greyscale-0 px-3 py-4 text-sm'>{item.tvd}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <h2 className='plabs-headline-regular-24 mb-4'>Data as Bit Depth for plotting</h2>
            <div className='overflow-hidden rounded-2xl'>
              <table className='w-full overflow-hidden rounded-t-2xl'>
                <thead className='bg-greyscale-10'>
                  <tr>
                    <th className='plabs-title-medium-12 text-greyscale-0 px-2 py-4'>
                      <p className='line-clamp-1'>Depth</p>
                    </th>
                    <th className='plabs-title-medium-12 text-greyscale-0 px-2 py-4'>
                      <p className='line-clamp-1'>Inclination</p>
                    </th>
                    <th className='plabs-title-medium-12 text-greyscale-0 px-2 py-4'>
                      <p className='line-clamp-1'>Azimuth</p>
                    </th>
                    <th className='plabs-title-medium-12 text-greyscale-0 px-2 py-4'>
                      <p className='line-clamp-1'>Hor Displ</p>
                    </th>
                    <th className='plabs-title-medium-12 text-greyscale-0 px-2 py-4'>
                      <p className='line-clamp-1'>TVD</p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {plottingData.map((item, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-greyscale-7' : 'bg-greyscale-8'}>
                      <td className='plabs-caption-regular-12 text-greyscale-0 px-3 py-4 text-sm'>{item.depth}</td>
                      <td className='plabs-caption-regular-12 text-greyscale-0 px-3 py-4 text-sm'>
                        {item.inclination}
                      </td>
                      <td className='plabs-caption-regular-12 text-greyscale-0 px-3 py-4 text-sm'>{item.azimuth}</td>
                      <td className='plabs-caption-regular-12 text-greyscale-0 px-3 py-4 text-sm'>{item.horDispl}</td>
                      <td className='plabs-caption-regular-12 text-greyscale-0 px-3 py-4 text-sm'>{item.tvd}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
