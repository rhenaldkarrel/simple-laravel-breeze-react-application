import Button from "components/Button";
import AppLayout from "components/Layouts/AppLayout";
import { getCountries } from "lib/api/country";
import React, { useEffect } from "react";
import DataTable from "react-data-table-component";

const Country = () => {
  const [data, setData] = React.useState([]);

  const getData = async () => {
    try {
      const data = await getCountries();

      setData(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
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
            <div className="p-6 bg-white border-b border-gray-200">
              <Button>Add Country</Button>
            </div>
            <DataTable
              columns={[
                {
                  id: "name",
                  name: "Name",
                  selector: (row) => row.name,
                  sortable: true
                },
                {
                  id: "continent",
                  name: "Continent",
                  selector: (row) => row.continent,
                  sortable: true
                },
                {
                  id: "code",
                  name: "Code",
                  selector: (row) => row.code,
                  sortable: true
                }
              ]}
              data={data}
              pagination
            />
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Country;
