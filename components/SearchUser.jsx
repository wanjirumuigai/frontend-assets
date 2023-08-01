import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Group } from "@mantine/core";
import { SpotlightProvider, spotlight } from "@mantine/spotlight";
import { openSpotlight } from "@mantine/spotlight";
import { useEffect, useState } from "react";
import Fuse from "fuse.js";
import { IconDeviceDesktop, IconSearch } from "@tabler/icons-react";

const options = {
  includeScore: true,
  keys: ["firstName", "lastName", "email"],
};

function SearchUser({ open, opened, close, getUser }) {
  const [users, setUsers] = useState([]);
  const fuse = new Fuse(users, options);
  const [closeModal, setCloseModal] = useState(opened);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("http://localhost:4000/users");
      const data = await res.json();
      setUsers(data);
    };

    fetchUsers();
  }, []);
  function handleUserSearch(e) {
    const foundUsers = fuse
      .search(e.target.value)
      .map((element) => element.item);

    if (foundUsers.length === 0) {
      setUsers(users);
    } else {
      setUsers(foundUsers);
    }
  }
  function handleChooseUser(id) {
    const returnedUser = users.filter((user) => {
      if (user.id === id) {
        return user;
      }
    });

    getUser(returnedUser);
  }
  return (
    <div className="bg-gray-900 text-white rounded">
      <Modal opened={opened} onClose={close}>
        <input
          placeholder="Search users ..."
          onKeyUp={handleUserSearch}
          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
        />
        {users.map((user) => {
          return (
            <option
              onClick={() => {
                close();
                handleChooseUser(user.id);
              }}
            >
              {user.firstname}
            </option>
          );
        })}
      </Modal>
    </div>
  );
}
export default SearchUser;
