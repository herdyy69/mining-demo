import { Header, Row, Table as TableType, flexRender } from '@tanstack/react-table'
import {
  Table as TableContainer,
  TableBody,
  TableCell,
  TableEmpty,
  TableHead,
  TableHeader,
  TableRow,
  TableSkeleton,
} from '.'
import { cn } from '@/lib/utils'
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'

import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import { CSSProperties, useEffect } from 'react'
import { Icons } from '../../icons'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface TableProps<TData> {
  table: TableType<TData>
  isLoading?: boolean
  handleSort: (id: string) => void
  isServerSide?: boolean
  onRowClick?: (row: Row<TData>) => void
  dataIds: any[]
  onChangeData: any
  onChangePosition?: ({
    newIndex,
    oldIndex,
    dataIndex,
  }: {
    newIndex?: number
    oldIndex?: number
    dataIndex?: any
  }) => void
}

const DraggableRow = ({ row }: { row: Row<any> }) => {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.id,
  })

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform), //let dnd-kit do its thing
    transition: transition,
    opacity: isDragging ? 0.8 : 1,
    zIndex: isDragging ? 1 : 0,
    position: 'relative',
  }
  return (
    // connect row ref to dnd-kit, apply important styles
    <TableRow ref={setNodeRef} style={style}>
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id} style={{ width: cell.column.getSize() }}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
}

function TableDnD<TData>({
  table,
  isLoading,
  handleSort,
  isServerSide = true,
  dataIds,
  onChangeData,
  onChangePosition,
}: TableProps<TData>) {
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (active && over && active.id !== over.id) {
      onChangeData((data: any) => {
        const dataIndex = data.find((val: any) => val.id === active.id)

        const oldIndex = dataIds.indexOf(active.id)
        const newIndex = dataIds.indexOf(over.id)

        onChangePosition?.({ newIndex, oldIndex, dataIndex })

        return arrayMove(data, oldIndex, newIndex) //this is just a splice util
      })
    }
  }

  const sensors = useSensors(useSensor(MouseSensor, {}), useSensor(TouchSensor, {}), useSensor(KeyboardSensor, {}))

  const sortToggler = (header: Header<TData, unknown>, event: any) => {
    // @ts-ignore
    const id = header.column.columnDef.id ?? header.column.columnDef.accessorKey
    const sortable = header.column.columnDef.enableSorting

    const toggleSortingHandler = header.column?.getToggleSortingHandler()
    if (toggleSortingHandler) {
      toggleSortingHandler(event)
    }

    if (id && sortable && isServerSide) {
      handleSort(id)
    }
  }

  return (
    <DndContext
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis]}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      <TableContainer>
        <TableHeader>
          {table.getHeaderGroups().map((header) => (
            <TableRow key={header.id}>
              {header.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    style={{ position: 'relative', width: header.getSize() }}
                    className='bg-emerald-600 text-white plabs-caption-semibold-sm'
                  >
                    {header.isPlaceholder ? null : (
                      <div
                        onClick={(event) => sortToggler(header, event)}
                        className={`${
                          header.column.getCanSort() ? 'cursor-pointer ' : ''
                        } flex items-center gap-3 select-none`}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getCanSort() ? (
                          <div className='flex flex-col items-center justify-center '>
                            <ChevronUp
                              className={cn(
                                'w-2.5 h-2.5',
                                header.column.getIsSorted() === 'asc' ? 'text-neutral-100' : 'text-neutral-200',
                              )}
                            />
                            <ChevronDown
                              className={cn(
                                'w-2.5 h-2.5',
                                header.column.getIsSorted() === 'desc' ? 'text-neutral-100' : 'text-neutral-200',
                              )}
                            />
                          </div>
                        ) : null}
                      </div>
                    )}
                    {header.column.getCanResize() && (
                      <div
                        onMouseDown={header.getResizeHandler()}
                        onTouchStart={header.getResizeHandler()}
                        className={`resizer ${header.column.getIsResizing() ? 'isResizing' : ''}`}
                      ></div>
                    )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length === 0 && !isLoading ? (
            <TableEmpty totalColumns={table.getAllColumns().length} />
          ) : !table.getRowModel().rows.length || isLoading ? (
            <TableSkeleton
              totalRow={table.getState().pagination.pageSize}
              totalColumns={table.getAllColumns().length}
            />
          ) : (
            <SortableContext items={dataIds} strategy={verticalListSortingStrategy}>
              {table.getRowModel().rows.map((row) => (
                <DraggableRow key={row.id} row={row} />
              ))}
            </SortableContext>
          )}
        </TableBody>
      </TableContainer>
    </DndContext>
  )
}

export default TableDnD
