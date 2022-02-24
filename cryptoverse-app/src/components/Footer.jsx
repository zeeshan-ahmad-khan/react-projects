import classes from '../components/Footer.module.css';

function Footer() {
    return (
        <div className={classes.footer}>
            <h3>Copyright&copy; {new Date().getFullYear()}</h3>
            <h5>Made by Zeeshan with Coolness 🧊</h5>
            <div className={classes.attrib}>
                <h3>Powered by</h3>
                <img src="https://rapidapi.com/static-assets/default/logo-85082ac1-9f07-481f-97c7-538f38e56420.svg" alt="Rapid Api" />
            </div>
        </div>
    )
}

export default Footer