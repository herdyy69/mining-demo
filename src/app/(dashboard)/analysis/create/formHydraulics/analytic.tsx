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

ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale)

const DensityChart = () => {
  const data = {
    labels: [9.0, 8.8, 8.7, 8.6, 8.5, 8.4, 8.3],
    datasets: [
      {
        label: 'Curve A',
        data: [5000, 5500, 6000, 6500, 8000, 7500, 8000],
        borderColor: 'white',
        backgroundColor: 'white',
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 0,
        xAxisID: 'x',
        yAxisID: 'y',
      },
      {
        label: 'Curve B',
        data: [4000, 3500, 3000, 2500, -200, 1500, 1000],
        borderColor: 'red',
        backgroundColor: 'red',
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 0,
        xAxisID: 'x',
        yAxisID: 'y',
      },
    ],
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
  } as any

  return (
    <div className='h-[400px] w-full'>
      <Line data={data} options={options} />
    </div>
  )
}

export default DensityChart
