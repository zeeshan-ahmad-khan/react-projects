import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar'
import classes from '../UI/Layout.module.css'

function Layout({ children }) {
    return (
        <>
            <div className={classes.layout}>
                <Sidebar />
                {children}
                <Footer />
            </div>
        </>
    )
}

export default Layout