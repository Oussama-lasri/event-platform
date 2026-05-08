import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button, Card } from "../components/ui";
import { getApiErrorMessage } from "../services/http";
import { userService } from "../services/userService";

function ManageUsers() {
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    setUsers(await userService.getUsers());
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadUsers().catch((error) => toast.error(getApiErrorMessage(error, "Failed to load users")));
  }, []);

  const onDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    try {
      await userService.deleteUser(id);
      toast.success("User deleted");
      await loadUsers();
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Delete failed"));
    }
  };

  return (
    <Card>
      <h1 className="mb-4 text-xl font-semibold text-slate-900">User management</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-slate-500">
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Role</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b border-slate-100">
                <td className="p-2">{user.name}</td>
                <td className="p-2">{user.email}</td>
                <td className="p-2 capitalize">{user.role}</td>
                <td className="p-2">
                  <Button variant="danger" onClick={() => onDelete(user._id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

export default ManageUsers;
