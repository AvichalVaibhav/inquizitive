import React from 'react';
import SessionFormContainer from '../session/session_form_container';
import Modal from 'react-modal';
import { hashHistory, Link, withRouter } from 'react-router';
import ModalStyle from '../modal/modal_style';

class Header extends React.Component {
	constructor(props) {
		super(props);
		this.state = {modalOpen: false, logIn: false, loggedIn: false};
		this.onModalClose = this.onModalClose.bind(this);
		this.redirectHome = this.redirectHome.bind(this);
		this.handleDemo = this.handleDemo.bind(this);
	}


	componentWillReceiveProps(newProps) {
		this.setState({modalOpen: false});
	}

	handleClick(bool, e) {
		e.preventDefault();
		this.setState({modalOpen: true, logIn: bool});
	}

	onModalClose() {
		this.setState({modalOpen: false});
		this.props.clearErrors();
	}

	redirectHome(e) {
		e.preventDefault();
		this.setState({modalOpen: false});
		this.props.logout();
	}

	handleDemo() {
		const demoUser = {username: 'demoUser', password: 'demopassword' };
		this.props.login(demoUser)
		.then(() => this.props.router.push('/demoUser'));
	}

	renderRightNav() {
		if (this.props.currentUser) {
			return (
				<ul className="right-nav">
					<button id="log-out-button"
							onClick={this.redirectHome}>
						Log out 
					</button>
				</ul>
			);
		} else {
			return (
				<ul className="right-nav">
					<button id="demo-login"
							onClick={this.handleDemo}>
						Demo 
					</button>
					<button id="log-in-button" 
							onClick={this.handleClick.bind(this, true)}>
						Log in
					</button>
					<button id="sign-up-button"
							onClick={this.handleClick.bind(this, false)}>
						Sign up
					</button>
				</ul>
			);
		}
	}

	render() {
		const formComponent = (this.state.logIn) ? <SessionFormContainer formType="login" /> : <SessionFormContainer formType="signup" />
		
		const createButton = () => {
			if (this.props.currentUser) {
				return (
					<Link to={`/${this.props.currentUser.username}/study-sets/new`} className="create-nav" >
						<span className="fa fa-plus-square">
						</span>
						<br/>
						<h2>Create</h2>
					</Link>
				);
			}
			else {
				return (
					<button className="create-nav"
							id="log-in-button" 
							onClick={this.handleClick.bind(this, true)}>
						<span className="fa fa-plus-square">
						</span>
						<br/>
						<h2>Create</h2>
					</button>
				);
			}
		};

		const logoNav = () => {
			if (this.props.currentUser) {
				return (
					<Link to={`/${this.props.currentUser.username}`} >
						<h1 className="main-logo">inQuizitive</h1>
					</Link>
				);
			}
			else {
				return (
					<Link to="/" >
						<h1 className="main-logo">inQuizitive</h1>
					</Link>
				);
			}
		};

		return (
			<header className="static-header">
				{logoNav()}
				<div className="middle-nav" >
					{createButton()}
				</div>
				{this.renderRightNav()}
				<Modal
					isOpen={this.state.modalOpen}
					onRequestClose={this.onModalClose}
					style={ModalStyle}
					contentLabel="session-modal">
					<button onClick={this.onModalClose} id="close-modal-button">
						<i className="fa fa-times-circle" aria-hidden="true"></i>
					</button>
					{formComponent}
				</Modal>
			</header>
		);
	}
}

export default withRouter(Header);