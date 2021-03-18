import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../actions';
import _ from 'lodash';
import StreamForm from './StreamForm';

class StreamEdit extends Component {
	componentDidMount() {
		this.props.fetchStream(this.props.match.params.id);
	}

	onSubmit = (formValues) => {
		this.props.editStream(this.props.match.params.id, formValues);
	};

	render() {
		return (
			<div className="ui container">
				<h3 className="header">Edit Stream</h3>
				<StreamForm
					onSubmit={this.onSubmit}
					initialValues={_.pick(
						this.props.stream,
						'title',
						'description'
					)}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	const {
		match: {
			params: { id },
		},
	} = ownProps;
	return {
		stream: state.streams[id],
	};
};

const mapDispatchToProps = {
	fetchStream,
	editStream,
};

export default connect(mapStateToProps, mapDispatchToProps)(StreamEdit);
