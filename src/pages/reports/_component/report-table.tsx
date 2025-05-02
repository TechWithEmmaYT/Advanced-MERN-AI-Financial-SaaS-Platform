import { DataTable } from '@/components/data-table'
import { REPORT_DATA } from './data'
import { reportColumns } from './column'

const ReportTable = () => {
  return (
    <DataTable
        data={REPORT_DATA}
        columns={reportColumns}
        searchPlaceholder="Search reports..."
      />
  )
}

export default ReportTable