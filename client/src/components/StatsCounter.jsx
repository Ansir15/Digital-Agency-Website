import { useCountUp } from '../hooks/useScrollReveal'

const StatItem = ({ endValue, suffix, label, delay }) => {
  const { ref, count } = useCountUp(endValue, 2000)

  return (
    <div ref={ref} className="text-center">
      <div className="font-display font-bold text-4xl md:text-5xl text-gradient mb-2">
        {count}{suffix}
      </div>
      <p className="text-muted">{label}</p>
    </div>
  )
}

const StatsCounter = () => {
  const stats = [
    { value: 50, suffix: '+', label: 'Projects Delivered' },
    { value: 30, suffix: '+', label: 'Happy Clients' },
    { value: 3, suffix: '+', label: 'Years Experience' },
    { value: 100, suffix: '%', label: 'Client Satisfaction' },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
      {stats.map((stat, index) => (
        <StatItem
          key={stat.label}
          endValue={stat.value}
          suffix={stat.suffix}
          label={stat.label}
          delay={index * 0.1}
        />
      ))}
    </div>
  )
}

export default StatsCounter
