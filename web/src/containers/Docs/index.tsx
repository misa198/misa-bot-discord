import DataTable from "react-data-table-component";
import { DocsWrapper } from "./styled";

import { commands } from "./data";

const Docs = () => {
  const columns = [
    {
      name: "ID",
      selector: "id",
    },
    {
      name: "Name",
      selector: "name",
    },
    {
      name: "Description",
      selector: "description",
    },
    {
      name: "Usage",
      selector: "usage",
    },
  ];

  return (
    <DocsWrapper>
      <DataTable
        title="Misabot's commands"
        columns={columns}
        data={commands}
        // customStyles={customStyles}
      />
    </DocsWrapper>
  );
};

export default Docs;
