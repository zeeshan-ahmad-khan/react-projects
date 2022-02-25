import { FaGithub } from 'react-icons/fa'

import classes from '../components/Footer.module.css';

function Footer() {
    return (
        <div className={classes.footer}>
            <a href="https://github.com/zeeshan-ahmad-khan/react-projects/tree/main/cryptoverse-app">If you like it. Give it a STAR <FaGithub /></a>
            <h5>Made by Zeeshan with Coolness 🧊</h5>
            <h3>Copyright&copy; {new Date().getFullYear()} 😂</h3>
            <div className={classes.attrib}>
                <h3>Powered by</h3>
                <img src="https://rapidapi.com/static-assets/default/logo-85082ac1-9f07-481f-97c7-538f38e56420.svg" alt="Rapid Api" />
            </div>
        </div>
    )
}

export default Footer