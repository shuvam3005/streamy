import React, { Component, lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './Header';
// import StreamList from './streams/StreamList';
//import StreamCreate from './streams/StreamCreate';
//import StreamEdit from './streams/StreamEdit';
//import StreamDelete from './streams/StreamDelete';
//import StreamShow from './streams/StreamShow';

const StreamList = React.lazy(() => import('./streams/StreamList'));
const StreamCreate = React.lazy(() => import('./streams/StreamCreate'));
const StreamDelete = React.lazy(() => import('./streams/StreamDelete'));
const StreamEdit = React.lazy(() => import('./streams/StreamEdit'));
const StreamShow = React.lazy(() => import('./streams/StreamShow'));

class App extends Component {
	render() {
		return (
			<div>
				<Header />
				<div>
					<Suspense fallback={<div>Loading...</div>}>
						<Switch>
							<Route path="/" exact>
								<StreamList />
							</Route>
							<Route path="/streams/new" exact>
								<StreamCreate />
							</Route>
							<Route
								path="/streams/:id"
								exact
								component={StreamShow}
							/>
							<Route
								path="/streams/:id/edit"
								component={StreamEdit}
							/>
							<Route
								path="/streams/:id/delete"
								component={StreamDelete}
							/>
						</Switch>
					</Suspense>
				</div>
			</div>
		);
	}
}

export default App;
