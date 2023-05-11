import Button from 'components/Button';
import Input from 'components/Input';
import Label from 'components/Label';
import AppLayout from 'components/Layouts/AppLayout';
import Modal from 'components/Modal';
import axios from 'lib/axios';
import React from 'react'
import DataTable from 'react-data-table-component';
import useSWR from 'swr';

const fetcher = () => axios.get("/api/cities").then((res) => res.data.data);

const City = () => {
  const { data, error } = useSWR("/api/cities", fetcher);

  const [openModal, setOpenModal] = React.useState(false);
  const [form, setForm] = React.useState({
    name: "",
    state_id: "",
    code: "",
  });
  const [search, setSearch] = React.useState("");

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
    console.log(form);

    try {
      const res = await axios.post("/api/cities", form);

      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

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
            <div className="p-6 bg-white border-b border-gray-200 flex justify-between">
              <Button type="button" onClick={() => setOpenModal(true)}>
                Add City
              </Button>
              <div>
                <Input
                  type="text"
                  id="search"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
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
    </AppLayout>
  );
}

export default City