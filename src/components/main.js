import React from 'react'
import Home from './home'
import Search from './search'
import List from './list'
import Error from './Error'
import { Switch, Route } from 'react-router-dom'
require('!style-loader!css-loader!../styleSheets/setWindowHeight.css');


class Main extends React.Component {
    render() {
        return(
            <div className='windowPosition'>
                <main>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route path='/search' component={Search} />
                        <Route path='/list' component={List} />
                        <Route path='*' component={Error} />
                    </Switch>
                </main>
            </div>
        )
    }
}

export default Main;