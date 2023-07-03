const Countries = ({countries, handleShow}) => 
    countries.map(country => {
        const {name: {common}, cca2} = country
        return (
            <p key={cca2}>
                {common}
                <button onClick={()=>handleShow([country])}>show</button>
            </p>
        )
    })

export default Countries