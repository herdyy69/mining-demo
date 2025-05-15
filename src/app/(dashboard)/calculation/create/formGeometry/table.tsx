import Form from '@/components/ui/form'
import { Icons } from '@/components/ui/icons'
import React from 'react'
import { useFieldArray } from 'react-hook-form'

export const TableGeometry = ({ tableIndex, control, form }: { tableIndex: number; control: any; form: any }) => {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `geometry[${tableIndex}].table`,
  })

  return (
    <table className='overflow-hidden rounded-t-2xl'>
      <thead className='bg-greyscale-10'>
        <tr>
          <th className='plabs-title-medium-12 text-greyscale-0 px-2 py-4'>Description</th>
          <th className='plabs-title-medium-12 text-greyscale-0 px-2 py-4'>Top (ft)</th>
          <th className='plabs-title-medium-12 text-greyscale-0 px-2 py-4'>Bottom (ft)</th>
          <th className='plabs-title-medium-12 text-greyscale-0 px-2 py-4'>Hole ID (in)</th>
          <th className='plabs-title-medium-12 text-greyscale-0 px-2 py-4'>OD (in)</th>
          <th className='plabs-title-medium-12 text-greyscale-0 px-2 py-4'>ID (in)</th>
          <th className='plabs-title-medium-12 text-greyscale-0 px-2 py-4'></th>
        </tr>
      </thead>
      <tbody>
        {fields.map((field, index) => (
          <tr key={field.id} className={index % 2 === 0 ? 'bg-greyscale-7' : 'bg-greyscale-8'}>
            <td className='plabs-caption-regular-12 text-greyscale-7 px-3 py-4 text-sm'>
              <Form.Input
                name={`geometry.${tableIndex}.table.${index}.description`}
                placeholder='Type'
                className='w-full'
              />
            </td>
            <td className='plabs-caption-regular-12 text-greyscale-7 px-3 py-4 text-sm'>
              <Form.Input
                name={`geometry.${tableIndex}.table.${index}.top`}
                placeholder='Top'
                className='w-full'
                onChange={(e) => {
                  let formattedValue = e.target.value.replace(/[^0-9.]/g, '')

                  if ((formattedValue.match(/\./g) || []).length > 1) {
                    formattedValue = formattedValue.slice(0, -1)
                  }

                  form.setValue(`geometry.${tableIndex}.table.${index}.top`, formattedValue, {
                    shouldValidate: true,
                  })
                }}
              />
            </td>
            <td className='plabs-caption-regular-12 text-greyscale-7 px-3 py-4 text-sm'>
              <Form.Input
                name={`geometry.${tableIndex}.table.${index}.bottom`}
                placeholder='Bottom'
                className='w-full'
                onChange={(e) => {
                  let formattedValue = e.target.value.replace(/[^0-9.]/g, '')

                  if ((formattedValue.match(/\./g) || []).length > 1) {
                    formattedValue = formattedValue.slice(0, -1)
                  }

                  form.setValue(`geometry.${tableIndex}.table.${index}.bottom`, formattedValue, {
                    shouldValidate: true,
                  })
                }}
              />
            </td>
            <td className='plabs-caption-regular-12 text-greyscale-7 px-3 py-4 text-sm'>
              <Form.Input
                name={`geometry.${tableIndex}.table.${index}.hole`}
                placeholder='Hole ID'
                className='w-full'
                onChange={(e) => {
                  let formattedValue = e.target.value.replace(/[^0-9.]/g, '')

                  if ((formattedValue.match(/\./g) || []).length > 1) {
                    formattedValue = formattedValue.slice(0, -1)
                  }

                  form.setValue(`geometry.${tableIndex}.table.${index}.hole`, formattedValue, {
                    shouldValidate: true,
                  })
                }}
              />
            </td>
            <td className='plabs-caption-regular-12 text-greyscale-7 px-3 py-4 text-sm'>
              <Form.Input
                name={`geometry.${tableIndex}.table.${index}.od`}
                placeholder='OD'
                className='w-full'
                onChange={(e) => {
                  let formattedValue = e.target.value.replace(/[^0-9.]/g, '')

                  if ((formattedValue.match(/\./g) || []).length > 1) {
                    formattedValue = formattedValue.slice(0, -1)
                  }

                  form.setValue(`geometry.${tableIndex}.table.${index}.od`, formattedValue, {
                    shouldValidate: true,
                  })
                }}
              />
            </td>
            <td className='plabs-caption-regular-12 text-greyscale-7 px-3 py-4 text-sm'>
              <Form.Input
                name={`geometry.${tableIndex}.table.${index}.id`}
                placeholder='ID'
                className='w-full'
                onChange={(e) => {
                  let formattedValue = e.target.value.replace(/[^0-9.]/g, '')

                  if ((formattedValue.match(/\./g) || []).length > 1) {
                    formattedValue = formattedValue.slice(0, -1)
                  }

                  form.setValue(`geometry.${tableIndex}.table.${index}.id`, formattedValue, {
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
                  description: '',
                  top: '',
                  bottom: '',
                  hole: '',
                  od: '',
                  id: '',
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
  )
}
