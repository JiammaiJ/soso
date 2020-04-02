import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Login from '../login/login'
import Main from '../main/main'
// import AAA from '../../components/aaa'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        return (
            
            <BrowserRouter>
                <Switch>
                    <Route path="/login" exact component={Login} />
                    <Route path="/" component={Main} />
                    {/* <Route path="/aaa" exact component={AAA} /> */}
                </Switch>
            </BrowserRouter>
           
        )
    }
}

export default App