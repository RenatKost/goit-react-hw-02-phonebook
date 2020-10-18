import React, { Component } from "react";
import shortid from "shortid";
//---------------------------------------
import Section from "./Section";
import Contacts from "./Contact/Contacts";
import AddContactForm from "./ContactForm/AddContactForm";
import ContactFilter from "./ContactFilter";
import data from "./Data/fakeData.json";

const filterContacts = (contacts, filter) => {
	return contacts.filter((contact) =>
		contact.name.toLowerCase().includes(filter.toLowerCase())
	);
};

export default class App extends Component {
	state = {
		contacts: [...data],
		filter: "",
	};

	changeFilter = (e) => {
		this.setState({ filter: e.target.value });
	};

	addContact = (contact) => {
		const { name } = contact;

		if (this.state.contacts.find((i) => i.name === name)) {
			alert(`${name} is already in contacts`);
		} else {
			const contactToAdd = {
				...contact,
				id: shortid.generate(),
				newItem: true,
			};

			this.setState((state) => ({
				contacts: [contactToAdd, ...state.contacts],
			}));
		}
	};

	removeContact = (id) => {
		this.setState((state) => ({
			contacts: state.contacts.filter((contact) => contact.id !== id),
		}));
	};

	render() {
		const { contacts, filter } = this.state;

		const filteredContacts = filterContacts(contacts, filter);

		console.log(filter);

		return (
			<>
				<Section title="Phonebook">
					<AddContactForm addContact={this.addContact} />
				</Section>

				<Section title="Contacts">
					{(contacts.length > 2 || filter) && (
						<ContactFilter
							value={filter}
							onChangeFilter={this.changeFilter}
						/>
					)}
					<Contacts
						contacts={filteredContacts}
						onRemoveContact={this.removeContact}
					/>
				</Section>
			</>
		);
	}
}
