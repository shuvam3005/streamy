import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStream, deleteStream } from '../actions';
import Modal from '../Modal';
import history from '../../history';

class StreamDelete extends Component {
	renderActions = () => (
		<>
			<button onClick={this.onDismiss} className="ui button gray">
				Cancel
			</button>
			<button
				onClick={() => this.onDelete(this.props.match.params.id)}
				className="ui button red"
			>
				Delete
			</button>
		</>
	);

	onDelete = (id) => {
		this.props.deleteStream(id);
	};

	onDismiss = () => {
		history.push('/');
	};

	componentDidMount() {
		const {
			match: {
				params: { id },
			},
		} = this.props;
		this.props.fetchStream(id);
	}

	render() {
		const { title } = this.props?.stream ?? { title: '' };
		return (
			<Modal
				action={this.onDismiss}
				header="Delete Stream"
				content={`Are you sure you want to delete this stream with title "${title}" ?`}
				buttons={this.renderActions()}
			/>
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
	deleteStream,
};

export default connect(mapStateToProps, mapDispatchToProps)(StreamDelete);
