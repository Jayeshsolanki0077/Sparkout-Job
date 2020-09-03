import React, { Component } from "react";
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import Login from './Login';
import Registration from './Registration';
import Notes from './Notes';

class App extends Component {
	state= {isLogged:'false'};

	componentWillMount () {
		let isLogged = localStorage.getItem('isLogged');
		this.setState({ isLogged })
	}
	render() {
		const { isLogged } = this.state
		return (
				<Router>
					<div className="App">
					<Switch>
						<Route exact path="/register" component={Registration} />
						<Route exact path="/login" component={Login} />
						{isLogged ? <Route exact path="/notes" component={Notes} />
						: <Route exact path="/notes" render={() => <Redirect to="/login" />}/>}

						<Redirect from="/" to="/login" />
					</Switch>
					</div>
				</Router>
		);
	}
}
export default App;
