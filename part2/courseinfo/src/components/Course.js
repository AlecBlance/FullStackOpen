const Part = ({name, exercises}) => <p>{name} {exercises}</p> 

const Header = ({name}) => <h1>{name}</h1>

const Content = ({parts}) => parts.map(({id, name, exercises}) => <Part key={id} name={name} exercises={exercises}/>)

const Total = ({parts}) => <b><p>total of {parts.reduce((accu, {exercises}) => accu += exercises, 0)} exercises</p></b>; 

const Course = ({courses}) => courses.map(({id, name, parts}) => <div key={id}><Header name={name} /><Content parts={parts} /><Total parts={parts} /></div>)

export default Course