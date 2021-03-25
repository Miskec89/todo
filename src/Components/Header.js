import PropTypes from 'prop-types'
import {useLocation} from "react-router-dom"
import Button from "./Button"


const Header = ({title, onAdd, showAddStatus}) => {
    const location = useLocation()
    console.log(location)
    return (
        <header className="header">
            <h1>{title}</h1>
            { location.pathname === '/' && 
                <Button  
                    color={showAddStatus? "red":"green"} 
                    text={showAddStatus ? "Close" : "Add"} 
                    onClick={onAdd}/
            >}
        </header>
    )
}

Header.defaultProps = {
    title: "Task App"
}

Header.propTypes = {
    title: PropTypes.string.isRequired
}


export default Header

  