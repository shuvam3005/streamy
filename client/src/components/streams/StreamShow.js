import { map } from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStream } from '../actions';

class StreamShow extends Component {
	componentDidMount() {
		const {
			match: {
				params: { id },
			},
			fetchStream,
		} = this.props;
		fetchStream(id);
	}

	render() {
		const { title, description } = this.props.stream;
		return (
			<div className="ui container">
				<div className="ui segment">
					<div className="ui item">
						<div className="content">
							<h3 className="header">{title}</h3>
							<div className="description">{description}</div>
						</div>
					</div>
				</div>
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
};

export default connect(mapStateToProps, mapDispatchToProps)(StreamShow);
