import { Table } from '@tanstack/react-table'
import { Icons } from '../../icons'

interface TablePaginationProps<TData> {
  table: Table<TData>
  isLoading?: boolean
  handleGoToPage: (page: number) => void
  handleSetPageRows: (limit: number) => void
  isServerSide: boolean
  pageSizeOptions?: number[]
}

export default function TablePagination<TData>({
  table,
  isLoading,
  handleGoToPage,
  handleSetPageRows,
  isServerSide,
  pageSizeOptions = [10, 20, 30, 40, 50],
}: TablePaginationProps<TData>) {
  const pageIndex = table.getState().pagination.pageIndex
  const totalData = isServerSide ? table.getRowCount() : table?.options?.data?.length

  const handleNextPage = () => {
    table.nextPage()
    handleGoToPage(table.getState().pagination.pageIndex + 1)
  }

  const handlePreviousPage = () => {
    table.previousPage()
    handleGoToPage(table.getState().pagination.pageIndex - 1)
  }

  const handleFirstPage = () => {
    table.firstPage()
    handleGoToPage(0)
  }
  const handleLastPage = () => {
    table.lastPage()
    handleGoToPage(table.getPageCount() - 1)
  }

  const handleChangePageSize = (e: any) => {
    table.setPageSize(Number(e.target.value))
    handleSetPageRows(Number(e.target.value))
  }

  if (isLoading) {
    return null
  }

  return (
    <div data-table-pagination className='flex flex-wrap items-center justify-between gap-2 px-4 py-4'>
      <div className='flex items-center gap-4'>
        <div className='flex items-center gap-1 text-sm'>
          <div className='text-greyscale-5 plabs-title-medium-10 mr-2'>Tampilkan :</div>
          <select
            className='text-greyscale-5 plabs-title-medium-10 h-auto rounded-md border border-neutral-50 bg-white px-2 py-1'
            value={table.getState().pagination.pageSize}
            onChange={handleChangePageSize}
          >
            {pageSizeOptions?.map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </div>
        <div className='flex items-center gap-1'>
          <span className='text-greyscale-5 plabs-title-medium-10'>
            Menampilkan {(pageIndex || 0) * (table.getState().pagination.pageSize || 0) + 1} sampai{' '}
            {totalData - (pageIndex + 1) * table.getState().pagination.pageSize < 0
              ? totalData
              : (pageIndex + 1) * table.getState().pagination.pageSize}{' '}
            dari {totalData || 0} hasil
          </span>
        </div>
      </div>

      <div className='flex flex-row items-center gap-1'>
        {/* Previos Button */}
        <button
          className={`disabled:border-neutral-60 hover:bg-greyscale-9 text-greyscale-0 mr-1 h-8 rounded px-1.5 duration-150 ease-in-out ${
            pageIndex < 1 && 'text-greyscale-7 cursor-not-allowed'
          }`}
          onClick={handlePreviousPage}
          disabled={!table.getCanPreviousPage() || pageIndex < 1}
        >
          <Icons.ChevronLeft className='h-5 w-5' />
        </button>

        {/* First page */}
        {table.getState().pagination.pageIndex + 1 >= 4 && (
          <div
            onClick={handleFirstPage}
            className='hover:bg-greyscale-2 flex h-[30px] w-[30px] items-center justify-center rounded-md bg-white px-1.5 duration-150 ease-in-out hover:cursor-pointer'
          >
            <span className='plabs-title-medium-10 text-greyscale-9'>1</span>
          </div>
        )}

        {/* Icon for more page */}
        {table.getState().pagination.pageIndex + 1 >= 5 && (
          <div className='flex h-[30px] w-[30px] items-center justify-center rounded-md bg-white px-1.5 hover:cursor-pointer'>
            <Icons.Ellipsis />
          </div>
        )}

        {/* 2 pages before */}
        {table.getState().pagination.pageIndex + 1 - 2 > 0 && (
          <div
            onClick={() => {
              table.setPageIndex(table.getState().pagination.pageIndex - 2)
              handleGoToPage(table.getState().pagination.pageIndex - 2)
            }}
            className='hover:bg-greyscale-2 flex h-[30px] w-[30px] items-center justify-center rounded-md bg-white px-1.5 duration-150 ease-in-out hover:cursor-pointer'
          >
            <span className='plabs-title-medium-10 text-greyscale-9'>
              {table.getState().pagination.pageIndex + 1 - 2}
            </span>
          </div>
        )}

        {/* 1 page before */}
        {table.getState().pagination.pageIndex + 1 - 1 > 0 && (
          <div
            onClick={() => {
              table.setPageIndex(table.getState().pagination.pageIndex - 1)
              handleGoToPage(table.getState().pagination.pageIndex - 1)
            }}
            className='hover:bg-greyscale-2 flex h-[30px] w-[30px] items-center justify-center rounded-md bg-white px-1.5 duration-150 ease-in-out hover:cursor-pointer'
          >
            <span className='plabs-title-medium-10 text-greyscale-9'>
              {table.getState().pagination.pageIndex + 1 - 1}
            </span>
          </div>
        )}

        {/* Current page */}
        <div className='bg-lime flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-md px-1.5'>
          <span className='plabs-title-medium-10 text-blue-base'>{table.getState().pagination.pageIndex + 1}</span>
        </div>

        {/* 1 page after */}
        {table.getState().pagination.pageIndex + 1 + 1 <= table?.getPageCount() && (
          <div
            onClick={() => {
              table.setPageIndex(table.getState().pagination.pageIndex + 1)
              handleGoToPage(table.getState().pagination.pageIndex + 1)
            }}
            className='hover:bg-greyscale-2 flex h-[30px] w-[30px] items-center justify-center rounded-md bg-white px-1.5 duration-150 ease-in-out hover:cursor-pointer'
          >
            <span className='plabs-title-medium-10 text-greyscale-9'>
              {table.getState().pagination.pageIndex + 1 + 1}
            </span>
          </div>
        )}

        {/* 2 page after */}
        {table.getState().pagination.pageIndex + 1 + 2 <= table?.getPageCount() && (
          <div
            onClick={() => {
              table.setPageIndex(table.getState().pagination.pageIndex + 2)
              handleGoToPage(table.getState().pagination.pageIndex + 2)
            }}
            className='hover:bg-greyscale-2 flex h-[30px] w-[30px] items-center justify-center rounded-md bg-white px-1.5 duration-150 ease-in-out hover:cursor-pointer'
          >
            <span className='plabs-title-medium-10 text-greyscale-9'>
              {table.getState().pagination.pageIndex + 1 + 2}
            </span>
          </div>
        )}

        {/* Icon for more page */}
        {table.getState().pagination.pageIndex + 1 + 2 < table?.getPageCount() - 1 && (
          <div className='flex h-[30px] w-[30px] items-center justify-center rounded-md bg-white px-1.5 hover:cursor-pointer'>
            <Icons.Ellipsis />
          </div>
        )}

        {/* Last page */}
        {table.getState().pagination.pageIndex + 1 + 2 < table?.getPageCount() && (
          <>
            <div
              onClick={handleLastPage}
              className='hover:bg-greyscale-2 flex h-[30px] w-[30px] items-center justify-center rounded-md bg-white px-1.5 duration-150 ease-in-out hover:cursor-pointer'
            >
              <span className='plabs-title-medium-10 text-greyscale-9'>{table?.getPageCount()}</span>
            </div>
          </>
        )}

        {/* Next Button */}
        <button
          className={`disabled:border-neutral-60 hover:bg-greyscale-9 text-greyscale-0 ml-1 h-8 rounded px-1.5 duration-150 ease-in-out ${
            !table.getCanNextPage() && 'text-greyscale-7 cursor-not-allowed'
          }`}
          onClick={handleNextPage}
          disabled={!table.getCanNextPage()}
        >
          <Icons.ChevronRight className='h-5 w-5' />
        </button>
      </div>
    </div>
  )
}
