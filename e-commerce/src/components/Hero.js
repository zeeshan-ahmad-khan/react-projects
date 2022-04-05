import { Link } from 'react-router-dom'

function Hero() {

    const data = [
        {
            name: "superheroes",
            img: "./images/heroes.jpg",
        },
        {
            name: "supervillains",
            img: "./images/villains.jpg",
        }]

    return (
        <section className='hero'>
            <h1><em>Login to choose your side !!!</em></h1>
            {data.map((d, i) => {
                return (
                    <Link to={`${d.name}`} key={i}>
                        <div className="heroCard">
                            <img src={d.img} alt={d.name} />
                            <div className="name">
                                <h3>{d.name}</h3>
                            </div>
                        </div>
                    </Link>
                )
            })}
        </section>
    )
}

export default Hero