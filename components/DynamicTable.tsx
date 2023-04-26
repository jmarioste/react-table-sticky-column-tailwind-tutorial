import React, { useState } from "react";

import classNames from "classnames";
import { faker } from "@faker-js/faker";

type User = {
  id: number;
  email: string;
  last_visited_at: string;
  created_at: string;
  ip_address: string;
  gender: string;
};

type ColumnDef<T> = {
  header: string;
  accessorKey: keyof T;
  width: number;
  isPinned?: boolean;
};
const defaultColumns: ColumnDef<User>[] = [
  {
    header: "id",
    accessorKey: "id",
    width: 60,
  },
  {
    header: "Email",
    accessorKey: "email",
    width: 250,
  },
  {
    header: "Last Visited At",
    accessorKey: "last_visited_at",
    width: 200,
  },
  {
    header: "Created At",
    accessorKey: "created_at",
    width: 200,
  },
  {
    header: "IP Address",
    accessorKey: "ip_address",
    width: 200,
  },
  {
    header: "Gender",
    accessorKey: "gender",
    width: 200,
  },
];

// generate random data
const data = new Array(10).fill("x").map<User>((item, index) => {
  return {
    id: index,
    email: faker.internet.email(),
    gender: faker.name.gender(true),
    ip_address: faker.internet.ipv4(),
    created_at: faker.date.past().toDateString(),
    last_visited_at: faker.date.recent().toDateString(),
  };
});

const DynamicTable = () => {
  const [columns, setColumns] = useState([...defaultColumns]);

  // logic to pin a specific column
  // 1. modify the isPinned property
  // 2. sort the columns so that isPinned is first
  // 3. use setColumns to re-render the component
  const onPinColumn = (accessorKey: string, isPinned: boolean = false) => {
    const newCols = columns.map((col) => {
      if (col.accessorKey === accessorKey) {
        return {
          ...col,
          isPinned,
        };
      }
      return col;
    });

    newCols.sort((a, b) => {
      const aPinned = a.isPinned ? 1 : 0;
      const bPinned = b.isPinned ? 1 : 0;
      return bPinned - aPinned;
    });
    return setColumns([...newCols]);
  };

  // logic to get sticky position for columns
  // 1. find all the previous columns
  // 2. add the total width of all the previous columns.
  const getLeftStickyPos = (index: number) => {
    if (!index) return 0;

    const prevColumnsTotalWidth = columns
      .slice(0, index)
      .reduce((curr, column) => {
        return curr + column.width;
      }, 0);
    return prevColumnsTotalWidth;
  };
  return (
    <div className="overflow-auto max-h-[400px]">
      <table className="table-fixed w-full">
        <thead>
          <tr>
            {columns.map((col, i) => {
              return (
                <th
                  className={classNames({
                    "p-2 text-left whitespace-nowrap": true,
                    "bg-indigo-500": !col.isPinned,
                    "sticky bg-indigo-900 text-indigo-50": col.isPinned,
                  })}
                  style={{
                    left: getLeftStickyPos(i),
                    width: col.width,
                  }}
                  key={col.header}
                >
                  {col.header}
                  <button
                    onClick={() => onPinColumn(col.accessorKey, !col.isPinned)}
                    className="mx-2 text-xs text-white"
                  >
                    {col.isPinned ? "x" : "pin"}
                  </button>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={index} className="text-left">
                {columns.map((col, i) => {
                  const accessorKey = col.accessorKey;
                  const value = item[accessorKey];
                  return (
                    <td
                      className={classNames({
                        "p-2": true,
                        "sticky bg-indigo-200": col.isPinned,
                      })}
                      style={{
                        left: getLeftStickyPos(i),

                        width: col.width,
                      }}
                      key={col.header}
                    >
                      {value}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTable;
