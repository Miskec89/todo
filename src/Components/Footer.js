import {Link} from "react-router-dom"

const Footer = () => {
    return (
        <footer>
            <p>All Rights Reserved 2021</p>
            <Link style={footerStyle} to="/about">About</Link> 
        </footer>
    )
}

const footerStyle = {
    textDecoration: 'none',
    color: '#000'
}

export default Footer
