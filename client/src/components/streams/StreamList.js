import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStreams } from '../actions/';

class StreamList extends Component {
	componentDidMount() {
		this.props.fetchStreams();
	}

	renderStreams() {
		return this.props.streams.map((stream) => {
			return (
				<div key={stream.id} className="item">
					{stream.userId === this.props.currentUserId && (
						<div className="right floated content">
							<Link
								to={`/streams/${stream.id}/delete`}
								className="ui button negative tiny"
							>
								Delete
							</Link>
							<Link
								to={`/streams/${stream.id}/edit`}
								className="ui button primary tiny"
							>
								Edit
							</Link>
						</div>
					)}

					<div className="content">
						<Link to={`/streams/${stream.id}`} className="header">
							{stream.title}
						</Link>
						<div className="description">{stream.description}</div>
					</div>
				</div>
			);
		});
	}

	render() {
		return (
			<div className="ui container">
				<div className="ui segment">
					<div className="ui divided relaxed list">
						{this.renderStreams()}
					</div>
				</div>
				{this.props.isSignedIn && (
					<Link
						to="/streams/new"
						className="ui right floated button green"
					>
						Create New Stream
					</Link>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		streams: Object.values(state.streams),
		isSignedIn: state.isSignedIn.isSignedIn,
		currentUserId: state.isSignedIn.userId,
	};
};

const mapDispatchToProps = {
	fetchStreams,
};

export default connect(mapStateToProps, mapDispatchToProps)(StreamList);
