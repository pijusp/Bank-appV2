import React, { useState } from "react";
import "./UserList.style.css";
import UserModal from "./UserModal";

const UserList = ({ list, onDelete, updateLists }) => {
    const [balanceUpdates, setBalanceUpdates] = useState({});

    const handleInputChange = (userId, amount) => {
        setBalanceUpdates({ ...balanceUpdates, [userId]: amount });
    };

    const handleBalanceUpdate = (userId, amount) => {
        let result = list.find((item) => item.id === userId);
        if (amount < 0 && Math.abs(amount) > result.balance) {
            alert("We don't give debts!");
            return;
        }
        if (amount) {
            const updatedUsers = list.map((user) =>
                user.id === userId
                    ? {
                          ...user,
                          balance: user.balance + Number(amount),
                      }
                    : user
            );
            updateLists(updatedUsers);
            window.localStorage.setItem(
                "UserList",
                JSON.stringify(updatedUsers)
            );
            setBalanceUpdates({ ...balanceUpdates, [userId]: "" });
        }
    };
    const [showModal, setShowModal] = useState(false);
    const onCloseModal = () => {
        setShowModal(false);
    };
    const [showUserData, setShowUserData] = useState(null);

    const viewUser = (user) => {
        setShowUserData(user);
        setShowModal(true);
    };
    return (
        <div>
            <article>
                <h3 className="list-header">Bank users list</h3>
            </article>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Balance</th>
                        <th>Funds Update</th>
                        <th>User Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {list
                        .sort((a, b) => a.lastName.localeCompare(b.lastName))
                        .map((user) => (
                            <tr key={user.id}>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.balance.toFixed(2)}</td>
                                <td>
                                    <input
                                        type="number"
                                        value={balanceUpdates[user.id] || ""}
                                        onChange={(e) =>
                                            handleInputChange(
                                                user.id,
                                                e.target.value
                                            )
                                        }
                                    />
                                    <button
                                        className="balance-update-btn"
                                        onClick={() =>
                                            handleBalanceUpdate(
                                                user.id,
                                                balanceUpdates[user.id]
                                            )
                                        }
                                    >
                                        Add
                                    </button>
                                    <button
                                        className="balance-update-btn"
                                        onClick={() =>
                                            handleBalanceUpdate(
                                                user.id,
                                                -balanceUpdates[user.id]
                                            )
                                        }
                                    >
                                        Remove
                                    </button>
                                </td>
                                <td>
                                    <div>
                                        <input
                                            className="actions-btn"
                                            type="button"
                                            value="View"
                                            onClick={() => viewUser(user)}
                                        />

                                        <input
                                            className="actions-btn"
                                            disabled={user.balance > 0}
                                            type="button"
                                            value="Delete"
                                            onClick={onDelete}
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
            {showModal && showUserData !== null && (
                <UserModal onClose={onCloseModal} user={showUserData} />
            )}
        </div>
    );
};

export default UserList;
