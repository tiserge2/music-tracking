import React from 'react'
import Header from './header-bar'
import Menu from './menu-bar'
import Home from './home'

class App extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <Home />
                <Menu />
            </div>
        )
    }
}

export default App;