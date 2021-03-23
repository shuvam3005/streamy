import { map } from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import flv from 'flv.js'
import { fetchStream } from '../actions';

class StreamShow extends Component {
	constructor(props){
		super(props);
		this.ref = React.createRef();

	}
	componentDidMount() {
		const {
			match: {
				params: { id },
			},
			fetchStream,
		} = this.props;
		fetchStream(id);


		this.buildPlayer(id);
		
	}

	componentDidUpdate(){
		const {
			match: {
				params: { id },
			},
			fetchStream,
		} = this.props;
		this.buildPlayer(id)
	}

	componentWillUnmount(){
		this.flvPlayer.destroy();
	}

	buildPlayer = (id)=>{
		if(this.flvPlayer || !this.props.stream){
			return
		}
		this.flvPlayer = flv.createPlayer({
            type: 'flv',
            url: `http://localhost:8000/live/${id}.flv`
        })
		this.flvPlayer.attachMediaElement(this.ref.current);
		this.flvPlayer.load();


	}

	render() {

		return (
			<div className="ui container">
				<video ref={this.ref} style={{width:'100%'}} controls/>
				
				{this.props.stream ? (<div className="ui segment">
					<div className="ui item">
						<div className="content">
							<h3 className="header">{this.props.stream.title}</h3>
							<div className="description">{this.props.stream.description}</div>
						</div>
					</div>
				</div>):null}
				
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
