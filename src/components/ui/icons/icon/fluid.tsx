const FluidIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
      <mask
        id='mask0_42_4518'
        style={{ maskType: 'alpha' }}
        maskUnits='userSpaceOnUse'
        x='0'
        y='0'
        width='24'
        height='24'
      >
        <path
          d='M12 21.5C13.8565 21.5 15.637 20.7625 16.9497 19.4497C18.2625 18.137 19 16.3565 19 14.5C19 12.5 18 10.6 16 9C14 7.4 12.5 5 12 2.5C11.5 5 10 7.4 8 9C6 10.6 5 12.5 5 14.5C5 16.3565 5.7375 18.137 7.05025 19.4497C8.36301 20.7625 10.1435 21.5 12 21.5Z'
          stroke='black'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </mask>
      <g mask='url(#mask0_42_4518)'>
        <rect width='24' height='24' fill='currentColor' />
      </g>
    </svg>
  )
}

export default FluidIcon
