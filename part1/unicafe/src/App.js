import { useState } from 'react'

const Header = ({text}) => <h1>{text}</h1>

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button> 

const Counter = ({text, count}) => <p>{text} {count}</p>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const clickGood = () => setGood(good + 1)
  const clickNeutral = () => setNeutral(neutral + 1)
  const clickBad = () => setBad(bad + 1)
  const allCount = () => bad + good + neutral;
  const averageCount = () => (good - bad) / allCount()  || 0
  const positivePercent = () => good / allCount() * 100  || 0

  return (
    <div>
      <Header text='give feedback' />
      <Button handleClick={clickGood} text="good" />
      <Button handleClick={clickNeutral} text="neutral" />
      <Button handleClick={clickBad} text="bad" />
      <Header text='statistics' />
      <Counter text='good' count={good} />
      <Counter text='neutral' count={neutral} />
      <Counter text='bad' count={bad} />
      <Counter text='all' count={allCount()} />
      <Counter text='average' count={averageCount()} />
      <Counter text='positive' count={`${positivePercent()} %`} />
    </div>
  )
}

export default App