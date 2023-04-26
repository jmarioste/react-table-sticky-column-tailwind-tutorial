import React from "react";

const Table = () => {
  // array to populate rows
  const arr = new Array(10).fill("x");
  return (
    <div className="overflow-auto">
      <table className="table-fixed w-full">
        <thead>
          <tr className="text-left">
            <th className="w-10 p-2 sticky left-0 bg-indigo-900 text-white">
              ID
            </th>
            {/* notice how we use left-[40px] because `w-10` equals 40px */}
            <th className="w-40 p-2 sticky left-[40px] bg-indigo-900 text-white">
              Column 2
            </th>
            <th className="w-96 p-2 bg-indigo-500">Column 3</th>
            <th className="w-96 p-2 bg-indigo-500">Column 4</th>
          </tr>
        </thead>
        <tbody>
          {arr.map((item, index) => {
            return (
              <tr key={index} className="text-left">
                <td className="w-10 p-2 sticky left-0 bg-indigo-200">
                  {index}
                </td>
                {/* notice how we use left-[40px] because `w-10` equals 40px */}
                <td className="w-96 p-2 left-[40px] bg-indigo-200">Data</td>
                <td className="w-96 p-2">Data</td>
                <td className="w-96 p-2">Data</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
