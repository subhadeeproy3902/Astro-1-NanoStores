import React from "react";
import { nanoid } from "nanoid";
import { user, users } from "../store/user";
import { useStore } from "@nanostores/react";

const UserForm = () => {
  const $user = useStore(user);
  const $users = useStore(users);

  const createUser = (e) => {
    e.preventDefault();
    if ($user.name && $user.email && $user.password) {
      if ($user._id !== "") {
        users.set($users.map(u => (u._id === $user._id ? $user : u)));
      } else {
        users.set([
          ...$users,
          {
            ...$user,
            _id: nanoid(8),
          },
        ]);
      }
      user.set({
        _id: "",
        name: "",
        email: "",
        password: "",
      });
    } else {
      alert("Please fill in all fields.");
    }
  };

  const setUser = (e) => {
    user.set({
      ...$user,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex justify-center p-[20px] mt-5 mb-5">
      <form onSubmit={createUser} className="w-full max-w-lg">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2" htmlFor="grid-first-name">
              Name
            </label>
            <input name="name" onChange={setUser} value={$user.name} className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane" autoComplete="off" />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2" htmlFor="grid-last-name">
              Email
            </label>
            <input name="email" onChange={setUser} value={$user.email} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="email" autoComplete="off" placeholder="Doe@gmail.com" />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-400 text-xs font-bold mb-2" htmlFor="grid-password">
              Password
            </label>
            <input name="password" onChange={setUser} value={$user.password} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" autoComplete="off" placeholder="******************" />
            <p className="text-gray-500 text-xs italic">Make it as long and as crazy as you'd like</p>
          </div>
        </div>
        <div className="flex justify-center">
          <button type="submit" className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserForm;
