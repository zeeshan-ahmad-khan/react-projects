import Footer from '../components/Footer'
import Header from '../components/Header'
import Hero from '../components/Hero'

function Home() {
    return (
        <>
            <Header isHomePage={true} />
            <Hero />
            <Footer />
        </>
    )
}

export default Home