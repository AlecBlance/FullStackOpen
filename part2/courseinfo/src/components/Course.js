const Part = ({name, exercises}) => <p>{name} {exercises}</p> 

const Header = ({name}) => <h1>{name}</h1>

const Content = ({parts}) => parts.map(({id, name, exercises}) => <Part key={id} name={name} exercises={exercises}/>)

const Course = ({course: {name, parts}}) => {
    return (
        <>
            <Header name={name}/>
            <Content parts={parts}/>
        </>
    )
}

export default Course