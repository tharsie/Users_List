import React, { useState, useEffect } from "react";
import axios from "axios";

const UserList = () => {
  const [users, setUsers] = useState([]); // To store user data
  const [searchTerm, setSearchTerm] = useState(""); // To store search input

  // Fetch user data from API
  useEffect(() => {
    axios
      .get("https://reqres.in/api/users?page=1")
      .then((response) => {
        setUsers(response.data.data); // Update state with user data
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Filter users based on search input
  const filteredUsers = users.filter((user) =>
    user.first_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>User List</h1>
      <input
        type="text"
        placeholder="Search by first name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: "10px",
          marginBottom: "20px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />
      <ul style={{ listStyle: "none", padding: 0 }}>
        {filteredUsers.map((user) => (
          <li
            key={user.id}
            style={{
              marginBottom: "10px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <img
              src={user.avatar}
              alt={`${user.first_name} ${user.last_name}`}
              style={{
                borderRadius: "50%",
                width: "50px",
                marginRight: "10px",
              }}
            />
            {user.first_name} {user.last_name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
