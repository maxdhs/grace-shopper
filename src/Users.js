import { useEffect, useState } from "react";

const Users = ({ user }) => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    if (!user) {
      return;
    }
    const response = await fetch("/api/users", {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    const info = await response.json();
    if (info.error) {
      return;
    }
    setUsers(info.users);
  };

  useEffect(() => {
    fetchUsers();
  }, [user]);

  return (
    <div>
      <h3>Users:</h3>
      {users.map((user) => (
        <div key={user.id}>
          <h4>{user.email}</h4>
          <p>id: {user.id}</p>
        </div>
      ))}
    </div>
  );
};

export default Users;
