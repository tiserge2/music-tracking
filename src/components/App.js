import React from 'react'
import Header from './header-bar'
import Menu from './menu-bar'

class App extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <Menu />
            </div>
        )
    }
}

export default App;