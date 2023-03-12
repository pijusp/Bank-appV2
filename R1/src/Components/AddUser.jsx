import React from "react";
import { useState } from "react";
import "./UserForm.style.css";
import { v4 as uuidv4 } from "uuid";

const AddUser = ({ onBack, onAddUser }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const onFirstNameChangeHandler = (e) => {
        setFirstName(e.target.value);
    };
    const onLastNameChangeHandler = (e) => {
        setLastName(e.target.value);
    };
    const onSubmit = (e) => {
        e.preventDefault();
        const data = {
            id: uuidv4(),
            firstName: firstName,
            lastName: lastName,
            balance: 0,
        };
        onAddUser(data);
        alert("User added");
        onBack();
    };
    return (
        <div className="form-container">
            <div>
                <h3>Add User Form</h3>
            </div>
            <form onSubmit={onSubmit}>
                <div>
                    <label>First Name:</label>
                    <input
                        type="text"
                        value={firstName}
                        onChange={onFirstNameChangeHandler}
                    ></input>
                </div>
                <div>
                    <label>Last Name:</label>
                    <input
                        type="text"
                        value={lastName}
                        onChange={onLastNameChangeHandler}
                    ></input>
                </div>
                <div>
                    <input type="button" value="Back" onClick={onBack}></input>
                    <input
                        disabled={firstName.length < 2 || lastName.length < 2}
                        type="submit"
                        value="Add User"
                    ></input>
                </div>
            </form>
        </div>
    );
};

export default AddUser;
