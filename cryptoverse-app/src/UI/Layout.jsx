import Footer from '../components/Footer'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import classes from '../UI/Layout.module.css'

function Layout({ children }) {
    return (
        <>
            <div className={classes.layout}>
                <Header />
                <Sidebar />
                {children}
                <Footer />
            </div>
        </>
    )
}

export default Layout