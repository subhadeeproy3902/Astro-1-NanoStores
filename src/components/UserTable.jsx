import React from "react";
import { user, users } from "../store/user";
import { useStore } from "@nanostores/react";

const UserList = () => {
  const $users = useStore(users);
  const setUser = (u) => {
    user.set(u);
  }
  const deleteUser = (id) => {
    users.set(
      $users.filter(u => u._id !== id)
    );
  }

  return (
    <div>
      {
        $users.map(u => (
          <div key={u._id} className="m-8 text-center">
            <div className="p-3">
              <label className="text-white text-xl">Name: </label>
              <span>{u.name}</span>
            </div>
            <div className="p-3">
              <label className="text-white text-xl">Email: </label>
              <span>{u.email}</span>
            </div>
            <div className="p-3">
              <label className="text-white text-xl">Password: </label>
              <span>{u.password}</span>
            </div>
            <div className="flex gap-5 p-4 justify-center">
              <button onClick={() => setUser(u)} className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded">
                Edit
              </button>
              <button onClick={() => deleteUser(u._id)} className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded">
                Delete
              </button>
            </div>
          </div>
        ))
      }
    </div>
  );
}

export default UserList;
