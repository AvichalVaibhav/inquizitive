import React from 'react';
import { Link, hashHistory } from 'react-router';

class FolderForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = this.props.folder;
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		// if (this.props.folder) {
		// 	this.props.fetchFolder(this.props.folder.id);
		// }
	}

	componentWillReceiveProps(nextProps) {
		this.setState(nextProps.folder);
	}

	update(field) {
		return (e) => this.setState({[field]: e.currentTarget.value});
	}

	handleSubmit(e) {
		e.preventDefault();
		const folder = this.state;
		this.props.processForm(folder)
		.then(action => hashHistory.push(`/folders/${action.folder.id}`));
	}


	render() {

		const formTitle = () => {
			if (this.props.formType === 'new') {
				return (
					<h1>Create a new folder</h1>
				);
			}
			else {
				return (
					<h1>Edit folder</h1>
				);
			}
		};

		const submitLabel = () => {
			if (this.props.formType === 'new') {
				return "Create";
			}
			else {
				return "Save";
			}
		};

		return (
			<div className="folder-form">
				<form onSubmit={this.handleSubmit} className="folder-form-box">
					<header className='form-title'>
						{formTitle()}
					</header>
					<br/>

					<div className="folder-form-inputs">
						<br/>
						<div className='form-input'>
							<input type="text"
									value={this.state.name}
									placeholder="Enter a title"
									onChange={this.update("name")}
									className="folder-input" />
							<label className="input-label">
								NAME 
							</label>
						</div>
						<div className='form-input'>
							<input type="text"
									value={this.state.description}
									placeholder="Enter a description (optional)"
									onChange={this.update("description")}
									className="folder-input" />
							<label className="input-label">
								DESCRIPTION
							</label>
						</div>
						<br />
						<input type="submit" value={submitLabel()} />
					</div>
				</form>
			</div>
		);
	}
}

export default FolderForm;