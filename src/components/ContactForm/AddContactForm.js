import React, { Component } from "react";
import { validateAll, validations } from "indicative/validator";
//----------------------------
import style from "./AddContactForm.module.css";
import ErrorNotification from "./../ErrorNotification";

const rules = {
	//regex -регулярка на наличие букв a-z, A-Z, а-я, А-Я
	name: [validations.required(), validations.regex(["^[a-zA-Zа-яА-Я]+"])],
	number: "required|number",
};

const messages = {
	"name.required": "Please choose a unique username for your account",
	"number.required": "Enter a valid phone number.",
	"name.regex":
		"Username contains invalid characters, please use only Latin or Cyrillic letters",
};

export default class AddContactForm extends Component {
	state = {
		name: "",
		number: "",
		errors: null,
	};

	handleSubmit = (evt) => {
		evt.preventDefault();
		const { name, number } = this.state;

		validateAll({ name, number }, rules, messages)
			.then((data) => {
				//console.log(data);
				this.props.addContact({ name, number });
				this.reset();
			})
			.catch((errors) => {
				const formattedErrors = {};
				errors.forEach((error) => {
					formattedErrors[error.field] = error.message;
				});

				this.setState({
					errors: formattedErrors,
				});
			});
	};

	handleChange = ({ target }) => {
		const { name, value } = target;
		this.setState({ [name]: value });
	};

	reset = () => {
		this.setState({ name: "", number: "", errors: null });
	};

	render() {
		const { name, number, errors } = this.state;

		return (
			<form onSubmit={this.handleSubmit} className={style.form}>
				<label className={style.title}>
					Name
					<input
						className={style.formInput}
						value={name}
						type="text"
						placeholder="Enter login"
						onChange={this.handleChange}
						name="name"
					/>
					{errors && <ErrorNotification errorType={errors.name} />}
				</label>

				<label className={style.title}>
					Number
					<input
						className={style.formInput}
						value={number}
						type="text"
						placeholder="Enter number"
						onChange={this.handleChange}
						name="number"
					/>
					{errors && <ErrorNotification errorType={errors.number} />}
				</label>

				<button type="submit" className={style.submitBtn}>
					Add contact
				</button>
			</form>
		);
	}
}
