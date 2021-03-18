import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../components/actions';

class GoogleAuth extends Component {
	// state = {
	// 	isSignedIn: null,
	// };

	componentDidMount() {
		window.gapi.load('client:auth2', () => {
			window.gapi.client
				.init({
					clientId:
						'71863373625-78gdbsnbrf5l2pjtrc3g6cdg06d7pinp.apps.googleusercontent.com',
					scope: 'email',
				})
				.then(() => {
					this.GoogleAuth = window.gapi.auth2.getAuthInstance();
					console.log(this.GoogleAuth);
					// this.setState({
					// 	isSignedIn: this.GoogleAuth.isSignedIn.get(),
					// });
					this.onAuthChange(this.GoogleAuth.isSignedIn.get());
					this.GoogleAuth.isSignedIn.listen(this.onAuthChange);
				});
		});
	}

	onAuthChange = (isSignedIn) => {
		if (isSignedIn) {
			this.props.signIn(this.GoogleAuth.currentUser.get().getId());
		} else {
			this.props.signOut();
		}
	};

	onSignInClick = () => {
		this.GoogleAuth.signIn();
	};

	onSignOutClick = () => {
		this.GoogleAuth.signOut();
	};

	renderAuthButton() {
		if (this.props.isSignedIn) {
			return (
				<button
					className="ui red google button"
					onClick={this.onSignOutClick}
				>
					<i className="google icon" />
					Sign Out
				</button>
			);
		}
		return (
			<button
				className="ui green google button"
				onClick={this.onSignInClick}
			>
				<i className="google icon" />
				Sign In
			</button>
		);
	}

	render() {
		return <div className="item">{this.renderAuthButton()}</div>;
	}
}

const mapStateToProps = (state) => {
	return {
		isSignedIn: state.isSignedIn.isSignedIn,
	};
};

const mapDispatchToProps = {
	signIn,
	signOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(GoogleAuth);
