import Button from "components/Button";
import Input from "components/Input";
import Label from "components/Label";
import AppLayout from "components/Layouts/AppLayout";
import Modal from "components/Modal";
import axios from "lib/axios";
import { debounce } from "lodash";
import React from "react";
import DataTable from "react-data-table-component";
import useSWR from "swr";

const fetcher = (url, search) =>
  axios.get(`${url}?search=${search}`).then((res) => res.data.data);

const City = () => {
  const [search, setSearch] = React.useState("");
  const { data, mutate, error } = useSWR(["/api/cities", search], fetcher);
  const [message, setMessage] = React.useState("");

  const [openModal, setOpenModal] = React.useState(false);
  const [editModal, setEditModal] = React.useState(false);
  const [form, setForm] = React.useState({
    name: "",
    state_id: "",
    code: "",
  });
  const [editForm, setEditForm] = React.useState({
    id: "",
    name: "",
    state_id: "",
    code: "",
  });

  const handleSearch = (e) => setSearch(e.target.value);

  const debouncedSearch = debounce(handleSearch, 500);

  const handleChangeForm = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.id;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleChangeEditForm = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.id;

    setEditForm({
      ...editForm,
      [name]: value,
    });
  };

  const handleSubmitForm = async () => {
    try {
      const res = await axios.post("/api/cities", form);

      if (res.status === 201) {
        setMessage("Success adding a new city!");
        setForm({
          name: "",
          state_id: "",
          code: "",
        });
        setOpenModal(false);

        mutate(["/api/cities", search]);
      }
    } catch (err) {
      setMessage("Sorry, something went wrong!");
    }
  };

  const handleEdit = async (row) => {
    setEditForm({
      id: row.id,
      name: row.name,
      state_id: row.state_id,
      code: row.code,
    });

    setEditModal(true);
  };

  const handleSubmitEditForm = async () => {
    try {
      const res = await axios.put(`/api/cities/${editForm.id}`, editForm);

      if (res.status === 201) {
        setMessage("City updated!");
        setEditForm({
          name: "",
          state_id: "",
          code: "",
        });
        setEditModal(false);

        mutate(["/api/cities", search]);
      }
    } catch (err) {
      setMessage("Sorry, something went wrong!");
    }
  };

  const handleDelete = async (row) => {
    // eslint-disable-next-line no-restricted-globals
    const isConfirmed = confirm("Are you sure?");

    if (!isConfirmed) {
      return;
    }

    try {
      const res = await axios.delete(`/api/cities/${row.id}`);

      if (res.status === 204) {
        setMessage("City deleted!");

        mutate(["/api/cities", search]);
      }
    } catch (err) {
      setMessage("Sorry, something went wrong!");
    }
  };

  React.useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, []);

  return (
    <AppLayout
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Manage City
        </h2>
      }
    >
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200 space-y-4">
              <div className="flex justify-between">
                <Button type="button" onClick={() => setOpenModal(true)}>
                  Add City
                </Button>
                <div>
                  <Input
                    type="text"
                    id="search"
                    placeholder="Search..."
                    onChange={debouncedSearch}
                  />
                </div>
              </div>
              {message && <p>{message}</p>}
            </div>
            <DataTable
              columns={[
                {
                  id: "name",
                  name: "Name",
                  selector: (row) => row.name,
                  sortable: true,
                },
                {
                  id: "state_id",
                  name: "State ID",
                  selector: (row) => row.state_id,
                  sortable: true,
                },
                {
                  id: "code",
                  name: "Code",
                  selector: (row) => row.code,
                  sortable: true,
                },
                {
                  id: "created_at",
                  name: "Created At",
                  selector: (row) =>
                    new Date(row.created_at).toLocaleDateString(),
                  sortable: true,
                },
                {
                  name: "Actions",
                  button: true,
                  cell: (row) => (
                    <div className="space-x-2">
                      <button
                        className="hover:opacity-75"
                        onClick={() => handleEdit(row)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-400 hover:opacity-75"
                        onClick={() => handleDelete(row)}
                      >
                        Delete
                      </button>
                    </div>
                  ),
                },
              ]}
              data={data}
              pagination
            />
          </div>
        </div>
      </div>
      {openModal && (
        <Modal
          setShowModal={setOpenModal}
          title="Add New City"
          onCoreEvent={handleSubmitForm}
        >
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                value={form.name}
                className="block mt-1 w-full"
                onChange={handleChangeForm}
                required
                autoFocus
              />
            </div>
            <div>
              <Label htmlFor="state_id">State ID</Label>
              <Input
                id="state_id"
                type="text"
                value={form.state_id}
                className="block mt-1 w-full"
                onChange={handleChangeForm}
                required
              />
            </div>
            <div>
              <Label htmlFor="code">Code</Label>
              <Input
                id="code"
                type="text"
                value={form.code}
                className="block mt-1 w-full"
                onChange={handleChangeForm}
                required
              />
            </div>
          </div>
        </Modal>
      )}
      {editModal && (
        <Modal
          setShowModal={setEditModal}
          title="Edit A City"
          onCoreEvent={handleSubmitEditForm}
        >
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                value={editForm.name}
                className="block mt-1 w-full"
                onChange={handleChangeEditForm}
                required
                autoFocus
              />
            </div>
            <div>
              <Label htmlFor="state_id">State ID</Label>
              <Input
                id="state_id"
                type="text"
                value={editForm.state_id}
                className="block mt-1 w-full"
                onChange={handleChangeEditForm}
                required
              />
            </div>
            <div>
              <Label htmlFor="code">Code</Label>
              <Input
                id="code"
                type="text"
                value={editForm.code}
                className="block mt-1 w-full"
                onChange={handleChangeEditForm}
                required
              />
            </div>
          </div>
        </Modal>
      )}
    </AppLayout>
  );
};

export default City;
