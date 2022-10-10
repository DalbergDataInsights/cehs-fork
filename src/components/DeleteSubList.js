import React from "react";
import { useDataMutation } from "@dhis2/app-runtime";

// query to update subscribers list to store
const updateQuery = {
  resource: `dataStore/spph_app_08082022/settings`,
  type: "update",
  data: ({ data }) => data,
};

const DeleteSubList = ({
  newSettingsData,
  onUpdate,
  setDeleteOpen,
  refetch,
}) => {
  const [mutate] = useDataMutation(updateQuery, {
    variables: {
      data: newSettingsData,
    },
    onComplete: onUpdate,
  });

  return (
    <>
      <button
        className="button"
        onClick={() => {
          mutate({ newSettingsData });
          setTimeout(() => {
            setDeleteOpen(false);
            refetch();
          }, 2000);
        }}
      >
        Delete
      </button>
    </>
  );
};

export default DeleteSubList;
