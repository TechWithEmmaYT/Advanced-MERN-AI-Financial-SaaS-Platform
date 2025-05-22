import { DataTable } from '@/components/data-table'
import { REPORT_DATA } from './data'
import { reportColumns } from './column'
import { useState } from 'react'

const ReportTable = () => {
  const [filter, setFilter] = useState({
    pageNumber: 1,
    pageSize: 10,
  })

  const pagination = {
    totalItems:  0,
    totalPages:  0,
    pageNumber: filter.pageNumber,
    pageSize: filter.pageSize,
  }

  const handlePageChange = (pageNumber: number) => {
    setFilter((prev) => ({ ...prev, pageNumber }))
  }

  const handlePageSizeChange = (pageSize: number) => {
    setFilter((prev) => ({ ...prev, pageSize }))
  }


  return (
    <DataTable
        data={REPORT_DATA}
        columns={reportColumns}
        isLoading={false}
        showSearch={false}
        className="[&_td]:!w-[5%]"
        pagination={pagination}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />
  )
}

export default ReportTable