import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
} from 'chart.js'
import { cn } from '@/lib/utils'

ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale)

type Dataset = {
  label: string
  data: number[]
  borderColor?: string
  backgroundColor?: string
  borderWidth?: number
  pointRadius?: number
  xAxisID?: string
  yAxisID?: string
}

type DensityChartProps = {
  title?: string
  labels: number[]
  datasets: Dataset[]
}

const DensityChart = ({ title = 'Angle', labels, datasets }: DensityChartProps) => {
  const data = {
    labels,
    datasets,
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    scales: {
      x: {
        position: 'top',
        ticks: {
          color: 'white',
        },
        grid: {
          color: 'rgba(255,255,255,0.2)',
        },
      },
      y: {
        reverse: true,
        ticks: {
          color: 'white',
        },
        grid: {
          color: 'rgba(255,255,255,0.2)',
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  } as const

  return (
    <div className={cn('h-[500px] w-full space-y-4 pl-4', title === '' ? 'pb-4' : 'pb-12')}>
      <h3 className='plabs-title-medium-20'>{title}</h3>
      <Line data={data} options={options} />
    </div>
  )
}

export default DensityChart
