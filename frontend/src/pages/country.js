import Button from "components/Button";
import Dropdown from "components/Dropdown";
import { DropdownButton } from "components/DropdownLink";
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

const Country = () => {
  const [search, setSearch] = React.useState("");
  const { data, mutate, error } = useSWR(["/api/countries", search], fetcher);
  const [message, setMessage] = React.useState("");

  const [openModal, setOpenModal] = React.useState(false);
  const [form, setForm] = React.useState({
    name: "",
    continent: "",
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

  const handleSubmitForm = async () => {
    try {
      const res = await axios.post("/api/countries", form);

      if (res.status === 201) {
        setMessage("Success adding a new country!");
        setForm({
          name: "",
          continent: "",
          code: "",
        });
        setOpenModal(false);

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
          Manage Country
        </h2>
      }
    >
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200 space-y-4">
              <div className=" flex justify-between">
                <Button type="button" onClick={() => setOpenModal(true)}>
                  Add Country
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
                  id: "continent",
                  name: "Continent",
                  selector: (row) => row.continent,
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
                    <Dropdown
                      align="right"
                      width="48"
                      trigger={
                        <button className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 focus:outline-none transition duration-150 ease-in-out">
                          <div>Action</div>
                          <div className="ml-1">
                            <svg
                              className="fill-current h-4 w-4"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        </button>
                      }
                    >
                      <DropdownButton onClick={() => {}}>Edit</DropdownButton>
                      <DropdownButton className="text-red-400" onClick={() => {}}>Delete</DropdownButton>
                    </Dropdown>
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
          title="Add New Country"
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
              <Label htmlFor="continent">Continent</Label>
              <Input
                id="continent"
                type="text"
                value={form.continent}
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
    </AppLayout>
  );
};

export default Country;
