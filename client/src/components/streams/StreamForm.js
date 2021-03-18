import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends Component {
	renderField({ input, label, meta: { touched, error } }) {
		return (
			<div className="field ">
				<label>
					{label}

					<input {...input}></input>
					{touched && error ? (
						<div className="header">{error}</div>
					) : null}
				</label>
			</div>
		);
	}

	onSubmit = (formValues) => {
		this.props.onSubmit(formValues);
	};

	render() {
		return (
			<div>
				<form
					className="ui form error  "
					onSubmit={this.props.handleSubmit(this.onSubmit)}
				>
					<Field
						name="title"
						component={this.renderField}
						label="Enter Title"
					></Field>
					<Field
						name="description"
						component={this.renderField}
						label="Enter Description"
					></Field>
					<button className="ui button primary">Submit</button>
				</form>
			</div>
		);
	}
}

const validate = (values) => {
	const errors = {};

	if (!values.title) {
		errors.title = 'Required';
	}
	if (!values.description) {
		errors.description = 'Required';
	}

	return errors;
};

export default reduxForm({
	form: 'streamForm',
	validate,
})(StreamForm);
