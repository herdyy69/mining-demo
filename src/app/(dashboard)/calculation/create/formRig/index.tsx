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
  const [tab, setTab] = React.useState('input')

  const form = useForm<any>({
    defaultValues: {
      project_type: '',
      air_gap: '',
      stand_length: '',
      equipment_type: '' as 'Riser' | 'BOP' | 'MPD',
      input: [
        {
          mw: 9.1,
          diameter_600: 78,
          diameter_300: 54,
          diameter_200: 33,
          diameter_100: 28,
          diameter_6: 10,
          diameter_3: 8,
          gel_10_inch: 8,
          gel_10_inch_2: 13,
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
    append: input,
    remove: remove_pumps,
  } = useFieldArray({
    control,
    name: 'input',
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
          router.push('/calculation/create?tab=bha')
        }}
        onError={(error) => {}}
        className='card col-span-2 space-y-2'
      >
        <h1 className='plabs-headline-regular-24 mb-4'>
          {searchParams.get('tab')
            ? searchParams.get('tab')!.charAt(0).toUpperCase() + searchParams.get('tab')!.slice(1)
            : 'Default'}
        </h1>
        <div className='space-y-2'>
          {tab === 'input' && (
            <table className='overflow-hidden rounded-t-2xl'>
              <thead className='bg-greyscale-10'>
                <tr>
                  <th className='plabs-title-medium-12 text-greyscale-0 px-2 py-4'>MW (ppg)</th>
                  <th className='plabs-title-medium-12 text-greyscale-0 px-2 py-4'>Ø 600</th>
                  <th className='plabs-title-medium-12 text-greyscale-0 px-2 py-4'>Ø 300</th>
                  <th className='plabs-title-medium-12 text-greyscale-0 px-2 py-4'>Ø 200</th>
                  <th className='plabs-title-medium-12 text-greyscale-0 px-2 py-4'>Ø 100</th>
                  <th className='plabs-title-medium-12 text-greyscale-0 px-2 py-4'>Ø 6</th>
                  <th className='plabs-title-medium-12 text-greyscale-0 px-2 py-4'>Gel 10'</th>
                  <th className='plabs-title-medium-12 text-greyscale-0 px-2 py-4'>Gel 10"</th>
                  <th className='plabs-title-medium-12 text-greyscale-0 px-2 py-4'></th>
                </tr>
              </thead>
              <tbody>
                {fields_pumps.map((field, index) => (
                  <tr key={field.id} className={index % 2 === 0 ? 'bg-greyscale-7' : 'bg-greyscale-8'}>
                    <td className='plabs-caption-regular-12 text-greyscale-7 px-3 py-4 text-sm'>
                      <Form.Input
                        name={`input.${index}.mw`}
                        placeholder='MW (ppg)'
                        className='w-full'
                        onChange={(e) => {
                          form.setValue(`input.${index}.mw`, e.target.value, {
                            shouldValidate: true,
                          })
                        }}
                      />
                    </td>
                    <td className='plabs-caption-regular-12 text-greyscale-7 px-3 py-4 text-sm'>
                      <Form.Input
                        name={`input.${index}.diameter_600`}
                        placeholder='Ø 600'
                        className='w-full'
                        onChange={(e) => {
                          let formattedValue = e.target.value.replace(/\D/g, '')

                          form.setValue(`input.${index}.diameter_600`, formattedValue, {
                            shouldValidate: true,
                          })
                        }}
                      />
                    </td>
                    <td className='plabs-caption-regular-12 text-greyscale-7 px-3 py-4 text-sm'>
                      <Form.Input
                        name={`input.${index}.diameter_300`}
                        placeholder='Ø 300'
                        className='w-full'
                        onChange={(e) => {
                          let formattedValue = e.target.value.replace(/\D/g, '')

                          form.setValue(`input.${index}.diameter_300`, formattedValue, {
                            shouldValidate: true,
                          })
                        }}
                      />
                    </td>
                    <td className='plabs-caption-regular-12 text-greyscale-7 px-3 py-4 text-sm'>
                      <Form.Input
                        name={`input.${index}.diameter_200`}
                        placeholder='Ø 200'
                        className='w-full'
                        onChange={(e) => {
                          let formattedValue = e.target.value.replace(/\D/g, '')

                          form.setValue(`input.${index}.diameter_200`, formattedValue, {
                            shouldValidate: true,
                          })
                        }}
                      />
                    </td>
                    <td className='plabs-caption-regular-12 text-greyscale-7 px-3 py-4 text-sm'>
                      <Form.Input
                        name={`input.${index}.diameter_100`}
                        placeholder='Ø 100'
                        className='w-full'
                        onChange={(e) => {
                          let formattedValue = e.target.value.replace(/\D/g, '')

                          form.setValue(`input.${index}.diameter_100`, formattedValue, {
                            shouldValidate: true,
                          })
                        }}
                      />
                    </td>
                    <td className='plabs-caption-regular-12 text-greyscale-7 px-3 py-4 text-sm'>
                      <Form.Input
                        name={`input.${index}.diameter_6`}
                        placeholder='Ø 6'
                        className='w-full'
                        onChange={(e) => {
                          let formattedValue = e.target.value.replace(/\D/g, '')
                          form.setValue(`input.${index}.diameter_6`, formattedValue, { shouldValidate: true })
                        }}
                      />
                    </td>
                    <td className='plabs-caption-regular-12 text-greyscale-7 px-3 py-4 text-sm'>
                      <Form.Input
                        name={`input.${index}.gel_10_inch`}
                        placeholder={`Gel 10'`}
                        className='w-full'
                        onChange={(e) => {
                          let formattedValue = e.target.value.replace(/\D/g, '')
                          form.setValue(`input.${index}.gel_10_inch`, formattedValue, { shouldValidate: true })
                        }}
                      />
                    </td>
                    <td className='plabs-caption-regular-12 text-greyscale-7 px-3 py-4 text-sm'>
                      <Form.Input
                        name={`input.${index}.gel_10_inch_2`}
                        placeholder={`Gel 10"`}
                        className='w-full'
                        onChange={(e) => {
                          let formattedValue = e.target.value.replace(/\D/g, '')
                          form.setValue(`input.${index}.gel_10_inch_2`, formattedValue, { shouldValidate: true })
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
                {/* <tr>
                   <td className='plabs-caption-regular-12 text-greyscale-7 px-3 py-2 text-sm'>
                     <button
                       onClick={() =>
                        input({
                          mw: "",
          diameter_600: "",
          diameter_300: "",
          diameter_200: "",
          diameter_100: "",
          diameter_6: "",
          diameter_3: "",
          gel_10_inch: "",
          gel_10_inch_2: "",
                         })
                       }
                       type='button'
                       className='plabs-title-medium-12 text-greyscale-0 flex w-max cursor-pointer items-center space-x-1'
                     >
                       <span>Add More Row</span>
                       <Icons.Plus className='text-greyscale-0 h-3 w-3' />
                     </button>
                   </td>
                 </tr> */}
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
                  {/* <td className='plabs-caption-regular-12 text-greyscale-7 px-3 py-2 text-sm'>
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
                   </td> */}
                </tr>
              </tbody>
            </table>
          )}
        </div>
        <div className='flex flex-col'>
          <div className='space-y-8'>
            <div className='grid grid-cols-2 gap-4'>
              {/* Bagian kiri */}
              <div>
                <div className='mb-2 grid grid-cols-2 items-center'>
                  <div className='flex flex-col justify-center'>
                    <h3 className='plabs-title-medium-16 text-greyscale-0'>n</h3>
                  </div>
                  <Form.Input
                    name='n'
                    placeholder='n'
                    disabled={true}
                    value={(() => {
                      const input0 = form.watch('input.0') || {}
                      const val600 = parseFloat(input0['diameter_600'] || 0)
                      const val300 = parseFloat(input0['diameter_300'] || 0)
                      if (val600 > val300) {
                        const result = 3.32 * Math.log10(val600 / val300)
                        return isNaN(result) ? '' : result.toFixed(3)
                      }
                      return ''
                    })()}
                  />
                </div>
                <div className='mb-2 grid grid-cols-2 items-center'>
                  <div className='flex flex-col justify-center'>
                    <h3 className='plabs-title-medium-16 text-greyscale-0'>K</h3>
                  </div>
                  <Form.Input
                    name='k'
                    placeholder='K'
                    disabled={true}
                    value={(() => {
                      const input0 = form.watch('input.0') || {}
                      const val600 = parseFloat(input0['diameter_600'] || 0)
                      const val300 = parseFloat(input0['diameter_300'] || 0)
                      let n = 0
                      if (val600 > val300 && val300 > 0) {
                        n = 3.32 * Math.log10(val600 / val300)
                      }
                      if (val300 > 0 && n !== 0) {
                        const k = val300 / Math.pow(511, n)
                        return isNaN(k) ? '' : k.toFixed(3)
                      }
                      return ''
                    })()}
                  />
                </div>
                <div className='mb-2 grid grid-cols-2 items-center'>
                  <div className='flex flex-col justify-center'>
                    <h3 className='plabs-title-medium-16 text-greyscale-0'>PV</h3>
                  </div>
                  <Form.Input
                    name='pv'
                    placeholder='PV'
                    disabled={true}
                    value={(() => {
                      const input0 = form.watch('input.0') || {}
                      const val600 = parseFloat(input0['diameter_600'] || 0)
                      const val300 = parseFloat(input0['diameter_300'] || 0)
                      if (!isNaN(val600) && !isNaN(val300)) {
                        return (val600 - val300).toString()
                      }
                      return ''
                    })()}
                  />
                </div>
                <div className='mb-2 grid grid-cols-2 items-center'>
                  <div className='flex flex-col justify-center'>
                    <h3 className='plabs-title-medium-16 text-greyscale-0'>YP</h3>
                  </div>
                  <Form.Input
                    name='yp'
                    placeholder='YP'
                    disabled={true}
                    value={(() => {
                      const input0 = form.watch('input.0') || {}
                      const diameter_600 = parseFloat(input0['diameter_600'] || 0)
                      const diameter_300 = parseFloat(input0['diameter_300'] || 0)
                      const pv = diameter_600 - diameter_300
                      if (!isNaN(diameter_300) && !isNaN(pv)) {
                        return (diameter_300 - pv).toString()
                      }
                      return ''
                    })()}
                  />
                </div>
                <div className='mb-2 grid grid-cols-2 items-center'>
                  <div className='flex flex-col justify-center'>
                    <h3 className='plabs-title-medium-16 text-greyscale-0'>LSR YP</h3>
                  </div>
                  <Form.Input
                    name='lsr_yp'
                    placeholder='LSR YP'
                    disabled={true}
                    value={(() => {
                      const input0 = form.watch('input.0') || {}
                      const diameter_3 = parseFloat(input0['diameter_3'] || 0)
                      const diameter_6 = parseFloat(input0['diameter_6'] || 0)
                      if (!isNaN(diameter_3) && !isNaN(diameter_6)) {
                        return (diameter_3 * 2 - diameter_6).toString()
                      }
                      return ''
                    })()}
                  />
                </div>
              </div>
              {/* Bagian kanan (Power Law Constant) */}
              <div>
                <div className='plabs-title-medium-16 text-greyscale-0 mb-2'>Power Law Constant</div>
                <div className='mb-2 grid grid-cols-2 items-center'>
                  <div className='flex flex-col justify-center'>
                    <h3 className='plabs-title-medium-16 text-greyscale-0'>n</h3>
                  </div>
                  <Form.Input
                    name='powerlaw_n'
                    placeholder='n'
                    disabled={true}
                    value={(() => {
                      const input0 = form.watch('input.0') || {}
                      const diameter_600 = parseFloat(input0['diameter_600'] || 0)
                      const diameter_300 = parseFloat(input0['diameter_300'] || 0)
                      const PV = diameter_600 - diameter_300
                      const YP = diameter_300 - PV
                      const denominator = PV + YP
                      const numerator = 2 * PV + YP
                      if (denominator > 0 && numerator > 0) {
                        const n = 3.322 * Math.log10(numerator / denominator)
                        return isNaN(n) ? '' : n.toFixed(3)
                      }
                      return ''
                    })()}
                  />
                </div>
                <div className='mb-2 grid grid-cols-2 items-center'>
                  <div className='flex flex-col justify-center'>
                    <h3 className='plabs-title-medium-16 text-greyscale-0'>K</h3>
                  </div>
                  <Form.Input
                    name='powerlaw_k'
                    placeholder='K'
                    disabled={true}
                    value={(() => {
                      const input0 = form.watch('input.0') || {}
                      const diameter_600 = parseFloat(input0['diameter_600'] || 0)
                      const diameter_300 = parseFloat(input0['diameter_300'] || 0)
                      const PV = diameter_600 - diameter_300
                      const YP = diameter_300 - PV
                      const denominator = PV + YP
                      const numerator = 2 * PV + YP
                      let powerlaw_n = ''
                      if (denominator > 0 && numerator > 0) {
                        powerlaw_n = (3.322 * Math.log10(numerator / denominator)).toFixed(3)
                      }
                      const n = parseFloat(powerlaw_n)
                      if (!isNaN(n) && denominator > 0) {
                        const k = Math.pow(511, 1 - n) * denominator
                        return isNaN(k) ? '' : k.toFixed(2)
                      }
                      return ''
                    })()}
                  />
                </div>
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
      {/* <div className='space-y-4'>
        <div className='card'>
          <video width={500} height={500} className='w-full' autoPlay muted playsInline>
            <source src='/20250603-131525.mp4' type='video/mp4' />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className='card pb-1 pl-2'>
          <PumpFlowRateChart />
        </div>
      </div> */}
    </div>
  )
}
