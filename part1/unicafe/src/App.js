import { useState } from 'react'

const Header = ({text}) => <h1>{text}</h1>

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button> 

const StatisticLine = ({text, value}) => <tr><td>{text}</td><td>{value}</td></tr>

const Statistics = ({good, neutral, bad}) => {
  const allCount = bad + good + neutral;
  const averageCount = (good - bad) / allCount
  const positivePercent = good / allCount * 100 

  return allCount ? (
    <table>
      <tbody>
        <StatisticLine text='good' value={good} />
        <StatisticLine text='neutral' value={neutral} />
        <StatisticLine text='bad' value={bad} />
        <StatisticLine text='all' value={allCount} />
        <StatisticLine text='average' value={averageCount} />
        <StatisticLine text='positive' value={`${positivePercent} %`} /> 
      </tbody>
    </table>
  ) : <p>No feedback given</p>
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const clickGood = () => setGood(good + 1)
  const clickNeutral = () => setNeutral(neutral + 1)
  const clickBad = () => setBad(bad + 1)

  return (
    <div>
      <Header text='give feedback' />
      <Button handleClick={clickGood} text="good" />
      <Button handleClick={clickNeutral} text="neutral" />
      <Button handleClick={clickBad} text="bad" />
      <Header text='statistics' />
      <Statistics good={good} neutral={neutral} bad={bad} /> 
    </div>
  )
}

export default App