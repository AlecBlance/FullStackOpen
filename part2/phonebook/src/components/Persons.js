const Persons = ({persons, filter}) => persons.filter(({name}) => name.toLowerCase().includes(filter.toLowerCase())).map(({name, number}) => <p key={name}>{name} {number}</p>)

export default Persons 