import React, { useState } from 'react';
import './App.css';

function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [contacts, setContacts] = useState(JSON.parse(localStorage.getItem("contacts")) || []);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortClicked, setSortClicked] = useState(false);


  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleContactNumberChange = (event) => {
    setContactNumber(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    
    // Check if there is already a contact with the same name or contact number
    const existingContact = contacts.find(
      (contact) => contact.firstName === firstName && contact.lastName === lastName
    ) || contacts.find((contact) => contact.contactNumber === contactNumber);

    if (existingContact) {
      alert("A contact with the same name or contact number already exists.");
      return;
    }

    const newContact = {
      firstName: firstName,
      lastName: lastName,
      contactNumber: contactNumber,
    };

    setContacts([...contacts, newContact]);
    setFirstName("");
    setLastName("");
    setContactNumber("");
    localStorage.setItem("contacts", JSON.stringify([...contacts, newContact]));
  };





  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortByName = () => {
    setSortOrder(sortOrder === "desc" ? "asc" : "desc");
    setSortClicked(true);
  };
  

  // Filter the contacts based on the search term
  const searchResults = contacts.filter(
    (contact) =>
      contact.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort the search results by name
  const sortedResults = sortClicked
  ? searchResults.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.firstName.localeCompare(b.firstName);
      } else {
        return b.firstName.localeCompare(a.firstName);
      }
    })
  : searchResults;

  const handleDeleteClick = (contact) => {
    const newContacts = contacts.filter((c) => c !== contact);
    setContacts(newContacts);
    alert("Contact deleted.");
  
    // Update the contacts array in localStorage
    localStorage.setItem("contacts", JSON.stringify(newContacts));
  };
  

  return (
    <div className="App">
      <h1>EasyOps</h1>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={handleFirstNameChange}
          required
        />
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={handleLastNameChange}
          required
        />
        <label htmlFor="contactNumber">Contact Number</label>
        <input
          type="text"
          id="contactNumber"
          value={contactNumber}
          onChange={handleContactNumberChange}
          required
        />
        <button type="submit">Save</button>
      </form>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by Name"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>SN</th>
            <th onClick={handleSortByName}>Name</th>
            <th>Contact</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {searchResults.map((contact, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{contact.firstName + " " + contact.lastName}</td>
              <td>{contact.contactNumber}</td>
              <td>
                <button onClick={() => handleDeleteClick(contact)}>X</button>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;