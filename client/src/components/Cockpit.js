import React from 'react'
import Header from './header-bar'
import Menu from './menu-bar'
import Main from './main'

class Cockpit extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <Main {...this.props}/>
                <Menu {...this.props}/>
                {/* <p >Hello world</p> */}
            </div>
        )
    }
}

export default Cockpit;