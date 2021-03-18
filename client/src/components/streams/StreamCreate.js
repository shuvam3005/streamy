import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStream } from '../actions';
import StreamForm from './StreamForm';

class StreamCreate extends Component {
	state = {
		hasError: false,
		error: null,
		errorInfo: null,
	};
	onSubmit = (formValues) => {
		this.props.createStream(formValues);
	};

	static getDerivedStateFromError(error) {
		return { hasError: true };
	}

	componentDidCatch(error, errorInfo) {
		this.setState({ error: error, errorInfo: errorInfo });
	}

	render() {
		console.log(this.state.error);
		if (this.state.hasError) {
			return (
				<div className="ui container">
					<h3 className="header">
						There is an error somewhere down below
					</h3>
				</div>
			);
		} else {
			return (
				<div className="ui container">
					<h3 className="header">Create Stream</h3>
					<StreamForm onSubmit={this.onSubmit} />
				</div>
			);
		}
	}
}

const mapDispatchToProps = {
	createStream,
};

export default connect(null, mapDispatchToProps)(StreamCreate);
