
import React, { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import GlobalFilter from "./GlobalFilter";
import Tooltip from "@/components/ui/Tooltip";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import {
    useTable,
    useRowSelect,
    useSortBy,
    useGlobalFilter,
    usePagination,
} from "react-table";

import { deleteUser, editUserData, getAllUsers, toggleConfirmModal } from "./UserReducer/UserSlice";

const styles = {
    option: (provided, state) => ({
        ...provided,
        fontSize: "14px",
    }),
};

const UserList = ({ users }) => {
    const dispatch = useDispatch();
    // const navigate = useNavigate();

    const [selectedRole, setSelectedRole] = useState({ value: "all", label: "Select All" });

    const COLUMNS = [
        {
            Header: "Role",
            accessor: "role",
            Cell: (row) => {
                return <div>{row?.cell?.value}</div>;
            },
        },
        {
            Header: "Name",
            accessor: "username",
            Cell: (row) => {
                return (
                    <div className="flex space-x-3 items-center text-left rtl:space-x-reverse">
                        <div className="flex-1 font-medium text-sm leading-4 whitespace-nowrap">
                            {row?.cell?.value}
                        </div>
                    </div>
                );
            },
        },
        {
            Header: "Email",
            accessor: "email",
            Cell: (row) => {
                return <span>{row?.cell?.value}</span>;
            },
        },
        {
            Header: "Mobile",
            accessor: "mobile",
            Cell: (row) => {
                return <div>{row?.cell?.value}</div>;
            },
        },
        {
            Header: "Branch",
            accessor: "branch",
            Cell: (row) => {
                return <div>{row?.cell?.value}</div>;
            },
        },
        {
            Header: "Action",
            accessor: "action",
            Cell: ({ row }) => (
                <div className="flex space-x-3 rtl:space-x-reverse">
                    <Tooltip content="Edit" placement="top" arrow animation="shift-away">
                        <button
                            className="action-btn text-success-700 bg-success-200"
                            type="button"
                            onClick={() => actions[0].doit(row.original)}
                        >
                            <Icon icon="heroicons:pencil-square" />
                        </button>
                    </Tooltip>
                    <Tooltip
                        content="Delete"
                        placement="top"
                        arrow
                        animation="shift-away"
                        theme="danger"
                    >
                        <button
                            className="action-btn text-danger-500 bg-danger-200"
                            type="button"
                            onClick={() => actions[1].doit(row.original)}
                        >
                            <Icon icon="heroicons:trash" />
                        </button>
                    </Tooltip>
                </div>
            ),
        },
    ];

    const actions = [
        {
            doit: (item) => dispatch(editUserData(item)),
        },
        {
            doit: (item) => dispatch(toggleConfirmModal(item._id)),
        },
        // {
        //     doit: (item) => {
        //         dispatch(deleteUser(item._id));

        //         setTimeout(() => {
        //             dispatch(getAllUsers("user"));
        //         }, 500);
        //     },
        // },
    ];

    const roleOptions = [
        { value: "all", label: "Select All" },
        { value: "admin", label: "Admin" },
        { value: "branchAdmin", label: "BranchAdmin" },
        { value: "employee", label: "Employee" },
    ];

    const handleRoleChange = (selectedOption) => {
        setSelectedRole(selectedOption);
    };

    const filteredUsers = useMemo(() => {
        if (!selectedRole || selectedRole.value === "all") return users;
        return users.filter(user => user.role === selectedRole.value);
    }, [selectedRole, users]);

    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => filteredUsers, [filteredUsers]);

    const tableInstance = useTable(
        {
            columns,
            data,
        },
        useGlobalFilter,
        useSortBy,
        usePagination,
        useRowSelect
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        state,
        gotoPage,
        pageCount,
        setPageSize,
        setGlobalFilter,
        prepareRow,
    } = tableInstance;

    const { globalFilter, pageIndex, pageSize } = state;

    return (
        <>
            <Card noborder>
                <div className="md:flex justify-between items-center mb-6">
                    <h4 className="card-title">User List</h4>
                    <div className="flex gap-4 items-center">
                        <Select
                            className="react-select"
                            classNamePrefix="select"
                            value={selectedRole}
                            onChange={handleRoleChange}
                            options={roleOptions}
                            styles={styles}
                        />
                        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
                    </div>
                </div>
                <div className="overflow-x-auto -mx-6">
                    <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden">
                            <table
                                className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700"
                                {...getTableProps()}
                            >
                                <thead className="bg-slate-100 dark:bg-slate-700">
                                    {headerGroups.map((headerGroup) => (
                                        <tr {...headerGroup.getHeaderGroupProps()}>
                                            {headerGroup.headers.map((column) => (
                                                <th
                                                    {...column.getHeaderProps(column.getSortByToggleProps())}
                                                    scope="col"
                                                    className="table-th"
                                                >
                                                    {column.render("Header")}
                                                    <span>
                                                        {column.isSorted
                                                            ? column.isSortedDesc
                                                                ? " 🔽"
                                                                : " 🔼"
                                                            : ""}
                                                    </span>
                                                </th>
                                            ))}
                                        </tr>
                                    ))}
                                </thead>
                                <tbody
                                    className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700"
                                    {...getTableBodyProps()}
                                >
                                    {page.map((row) => {
                                        prepareRow(row);
                                        return (
                                            <tr
                                                {...row.getRowProps()}
                                                className="even:bg-slate-100 dark:even:bg-slate-700"
                                            >
                                                {row.cells.map((cell) => {
                                                    return (
                                                        <td {...cell.getCellProps()} className="table-td">
                                                            {cell.render("Cell")}
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="md:flex md:space-y-0 space-y-5 justify-between mt-6 items-center">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <select
                            className="form-control py-2 w-max"
                            value={pageSize}
                            onChange={(e) => setPageSize(Number(e.target.value))}
                        >
                            {[10, 25, 50, 75, 100, 500].map((pageSize) => (
                                <option key={pageSize} value={pageSize}>
                                    Show {pageSize}
                                </option>
                            ))}
                        </select>
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                            Page{" "}
                            <span>
                                {pageIndex + 1} of {pageOptions.length}
                            </span>
                        </span>
                    </div>
                    <ul className="flex items-center space-x-3 rtl:space-x-reverse">
                        <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
                            <button
                                className={` ${!canPreviousPage ? "opacity-50 cursor-not-allowed" : ""}`}
                                onClick={() => gotoPage(0)}
                                disabled={!canPreviousPage}
                            >
                                <Icon icon="heroicons:chevron-double-left-solid" />
                            </button>
                        </li>
                        <li className="text-sm leading-4 text-slate-900 dark:text-white rtl:rotate-180">
                            <button
                                className={` ${!canPreviousPage ? "opacity-50 cursor-not-allowed" : ""}`}
                                onClick={() => previousPage()}
                                disabled={!canPreviousPage}
                            >
                                Prev
                            </button>
                        </li>
                        {pageOptions.map((page, pageIdx) => {
                            if (
                                pageIdx === 0 ||
                                pageIdx === pageCount - 1 ||
                                (pageIdx >= pageIndex - 1 && pageIdx <= pageIndex + 1)
                            ) {
                                return (
                                    <li key={pageIdx}>
                                        <button
                                            href="#"
                                            aria-current="page"
                                            className={` ${pageIdx === pageIndex
                                                ? "bg-slate-900 dark:bg-slate-600  dark:text-slate-200 text-white font-medium "
                                                : "bg-slate-100 dark:bg-slate-700 dark:text-slate-400 text-slate-900  font-medium  "
                                                }    text-sm rounded leading-[16px] flex h-6 w-6 items-center justify-center transition-all duration-150`}
                                            onClick={() => gotoPage(pageIdx)}
                                        >
                                            {page + 1}
                                        </button>
                                    </li>
                                );
                            } else if (
                                (pageIdx === pageIndex - 2 && pageIndex > 2) ||
                                (pageIdx === pageIndex + 2 && pageIndex < pageCount - 3)
                            ) {
                                return <li key={pageIdx}>...</li>;
                            }
                            return null;
                        })}
                        <li className="text-sm leading-4 text-slate-900 dark:text-white rtl:rotate-180">
                            <button
                                className={` ${!canNextPage ? "opacity-50 cursor-not-allowed" : ""}`}
                                onClick={() => nextPage()}
                                disabled={!canNextPage}
                            >
                                Next
                            </button>
                        </li>
                        <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
                            <button
                                onClick={() => gotoPage(pageCount - 1)}
                                disabled={!canNextPage}
                                className={` ${!canNextPage ? "opacity-50 cursor-not-allowed" : ""}`}
                            >
                                <Icon icon="heroicons:chevron-double-right-solid" />
                            </button>
                        </li>
                    </ul>
                </div>
                {/* <div className="md:flex md:space-y-0 space-y-5 justify-between mt-6 items-center">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <span className="flex space-x-2 rtl:space-x-reverse items-center">
                            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                                Go
                            </span>
                            <span>
                                <input
                                    type="number"
                                    className="form-control py-2"
                                    defaultValue={pageIndex + 1}
                                    onChange={(e) => {
                                        const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
                                        gotoPage(pageNumber);
                                    }}
                                    style={{ width: "50px" }}
                                />
                            </span>
                        </span>
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                            Page{" "}
                            <span>
                                {pageIndex + 1} of {pageOptions.length}
                            </span>
                        </span>
                    </div>
                    <ul className="flex items-center space-x-3 rtl:space-x-reverse">
                        <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
                            <button
                                className={`${!canPreviousPage ? "opacity-50 cursor-not-allowed" : ""}`}
                                onClick={() => previousPage()}
                                disabled={!canPreviousPage}
                            >
                                <Icon icon="heroicons-outline:chevron-left" />
                            </button>
                        </li>
                        {pageOptions.map((page, pageIdx) => {
                            if (
                                pageIdx === 0 ||
                                pageIdx === pageCount - 1 ||
                                (pageIdx >= pageIndex - 1 && pageIdx <= pageIndex + 1)
                            ) {
                                return (
                                    <li key={pageIdx}>
                                        <button
                                            href="#"
                                            aria-current="page"
                                            className={` ${pageIdx === pageIndex
                                                ? "bg-slate-900 dark:bg-slate-600  dark:text-slate-200 text-white font-medium "
                                                : "bg-slate-100 dark:bg-slate-700 dark:text-slate-400 text-slate-900  font-medium  "
                                                }    text-sm rounded leading-[16px] flex h-6 w-6 items-center justify-center transition-all duration-150`}
                                            onClick={() => gotoPage(pageIdx)}
                                        >
                                            {page + 1}
                                        </button>
                                    </li>
                                );
                            } else if (
                                (pageIdx === pageIndex - 2 && pageIndex > 2) ||
                                (pageIdx === pageIndex + 2 && pageIndex < pageCount - 3)
                            ) {
                                return <li key={pageIdx}>...</li>;
                            }
                            return null;
                        })}
                        <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
                            <button
                                className={`${!canNextPage ? "opacity-50 cursor-not-allowed" : ""}`}
                                onClick={() => nextPage()}
                                disabled={!canNextPage}
                            >
                                <Icon icon="heroicons-outline:chevron-right" />
                            </button>
                        </li>
                    </ul>
                </div> */}
            </Card>
        </>
    );
};

export default UserList;

//#########################################################
// import React, { useState, useMemo, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import Card from "@/components/ui/Card";
// import Icon from "@/components/ui/Icon";
// import GlobalFilter from "./GlobalFilter";
// import Tooltip from "@/components/ui/Tooltip";
// import { useNavigate } from "react-router-dom";
// import Select from "react-select";
// import {
//     useTable,
//     useRowSelect,
//     useSortBy,
//     useGlobalFilter,
//     usePagination,
// } from "react-table";

// import { deleteUser, editUserData, getAllUsers } from "./UserReducer/UserSlice";

// const UserList = ({ users }) => {
//     const dispatch = useDispatch();
//     // const navigate = useNavigate();

//     const [selectedRole, setSelectedRole] = useState(null);

//     const COLUMNS = [
//         {
//             Header: "Role",
//             accessor: "role",
//             Cell: (row) => {
//                 return <div>{row?.cell?.value}</div>;
//             },
//         },
//         {
//             Header: "Name",
//             accessor: "username",
//             Cell: (row) => {
//                 return (
//                     <div className="flex space-x-3 items-center text-left rtl:space-x-reverse">
//                         <div className="flex-1 font-medium text-sm leading-4 whitespace-nowrap">
//                             {row?.cell?.value}
//                         </div>
//                     </div>
//                 );
//             },
//         },
//         {
//             Header: "Email",
//             accessor: "email",
//             Cell: (row) => {
//                 return <span>{row?.cell?.value}</span>;
//             },
//         },
//         {
//             Header: "Mobile",
//             accessor: "mobile",
//             Cell: (row) => {
//                 return <div>{row?.cell?.value}</div>;
//             },
//         },
//         {
//             Header: "Branch",
//             accessor: "branch",
//             Cell: (row) => {
//                 return <div>{row?.cell?.value}</div>;
//             },
//         },


//         {
//             Header: "action",
//             accessor: "action",
//             Cell: ({ row }) => (
//                 <div className="flex space-x-3 rtl:space-x-reverse">
//                     {/* <Tooltip content="View" placement="top" arrow animation="shift-away">
//                         <button
//                             className="action-btn text-primary-500 bg-primary-200"
//                             type="button"
//                             onClick={() => actions[0].doit(row.original)}
//                         >
//                             <Icon icon="heroicons:eye" />
//                         </button>
//                     </Tooltip> */}
//                     <Tooltip content="Edit" placement="top" arrow animation="shift-away">
//                         <button
//                             className="action-btn text-success-700 bg-success-200"
//                             type="button"
//                             onClick={() => actions[1].doit(row.original)}
//                         >
//                             <Icon icon="heroicons:pencil-square" />
//                         </button>
//                     </Tooltip>
//                     <Tooltip
//                         content="Delete"
//                         placement="top"
//                         arrow
//                         animation="shift-away"
//                         theme="danger"
//                     >
//                         <button
//                             className="action-btn text-danger-500 bg-danger-200"
//                             type="button"
//                             onClick={() => actions[2].doit(row.original)}
//                         >
//                             <Icon icon="heroicons:trash" />
//                         </button>
//                     </Tooltip>
//                 </div>
//             ),

//         },
//     ];
//     const actions = [
//         // {
//         //     // name: "view",
//         //     // icon: "heroicons-outline:eye",
//         //     doit: (item) => navigate(`/profile/${item._id}`),
//         // },
//         {
//             // name: "edit",
//             // icon: "heroicons:pencil-square",
//             doit: (item) => dispatch(editUserData(item)),
//         },
//         {
//             // name: "delete",
//             // icon: "heroicons-outline:trash",
//             doit: (item) => {
//                 dispatch(deleteUser(item._id));

//                 setTimeout(() => {
//                     dispatch(getAllUsers("user"));
//                 }, 500);
//             },
//         },
//     ];

//     const roleOptions = [
//         { value: "admin", label: "Admin" },
//         { value: "branchAdmin", label: "BranchAdmin" },
//         { value: "employee", label: "Employee" },
//     ];

//     const handleRoleChange = (selectedOption) => {
//         setSelectedRole(selectedOption); // Update selected role state
//     };

//     const filteredUsers = useMemo(() => {
//         if (!selectedRole) return users; // If no role selected, return all users

//         return users.filter(user => user.role === selectedRole.value); // Filter users based on selected role
//     }, [selectedRole, users]);

//     const columns = useMemo(() => COLUMNS, []);
//     const data = useMemo(() => users, [users]);

//     const tableInstance = useTable(
//         {
//             columns,
//             data: filteredUsers,
//         },

//         useGlobalFilter,
//         useSortBy,
//         usePagination,
//         useRowSelect
//     );
//     const {
//         getTableProps,
//         getTableBodyProps,
//         headerGroups,
//         footerGroups,
//         page,
//         nextPage,
//         previousPage,
//         canNextPage,
//         canPreviousPage,
//         pageOptions,
//         state,
//         gotoPage,
//         pageCount,
//         setPageSize,
//         setGlobalFilter,
//         prepareRow,
//     } = tableInstance;

//     const { globalFilter, pageIndex, pageSize } = state;
//     return (
//         <>
//             <Card noborder>
//                 <div className="md:flex justify-between items-center mb-6">
//                     <h4 className="card-title">User List</h4>
//                     <Select
//                         className="react-select"
//                         classNamePrefix="select"
//                         value={selectedRole}
//                         onChange={handleRoleChange}
//                         options={roleOptions}
//                     />
//                     <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
//                 </div>
//                 <div className="overflow-x-auto -mx-6">
//                     <div className="inline-block min-w-full align-middle">
//                         <div className="overflow-hidden ">
//                             <table
//                                 className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700"
//                                 {...getTableProps}
//                             >
//                                 <thead className=" bg-slate-100 dark:bg-slate-700">
//                                     {headerGroups.map((headerGroup) => (
//                                         <tr {...headerGroup.getHeaderGroupProps()}>
//                                             {headerGroup.headers.map((column) => (
//                                                 <th
//                                                     {...column.getHeaderProps(
//                                                         column.getSortByToggleProps()
//                                                     )}
//                                                     scope="col"
//                                                     className=" table-th "
//                                                 >
//                                                     {column.render("Header")}
//                                                     <span>
//                                                         {column.isSorted
//                                                             ? column.isSortedDesc
//                                                                 ? " 🔽"
//                                                                 : " 🔼"
//                                                             : ""}
//                                                     </span>
//                                                 </th>
//                                             ))}
//                                         </tr>
//                                     ))}
//                                 </thead>
//                                 <tbody
//                                     className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700"
//                                     {...getTableBodyProps}
//                                 >
//                                     {page.map((row) => {
//                                         prepareRow(row);
//                                         return (
//                                             <tr
//                                                 {...row.getRowProps()}
//                                                 className=" even:bg-slate-100 dark:even:bg-slate-700"
//                                             >
//                                                 {row.cells.map((cell) => {
//                                                     return (
//                                                         <td {...cell.getCellProps()} className="table-td">
//                                                             {cell.render("Cell")}
//                                                         </td>
//                                                     );
//                                                 })}
//                                             </tr>
//                                         );
//                                     })}
//                                 </tbody>
//                             </table>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="md:flex md:space-y-0 space-y-5 justify-between mt-6 items-center">
//                     <div className=" flex items-center space-x-3 rtl:space-x-reverse">
//                         <span className=" flex space-x-2  rtl:space-x-reverse items-center">
//                             <span className=" text-sm font-medium text-slate-600 dark:text-slate-300">
//                                 Go
//                             </span>
//                             <span>
//                                 <input
//                                     type="number"
//                                     className=" form-control py-2"
//                                     defaultValue={pageIndex + 1}
//                                     onChange={(e) => {
//                                         const pageNumber = e.target.value
//                                             ? Number(e.target.value) - 1
//                                             : 0;
//                                         gotoPage(pageNumber);
//                                     }}
//                                     style={{ width: "50px" }}
//                                 />
//                             </span>
//                         </span>
//                         <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
//                             Page{" "}
//                             <span>
//                                 {pageIndex + 1} of {pageOptions.length}
//                             </span>
//                         </span>
//                     </div>
//                     <ul className="flex items-center  space-x-3  rtl:space-x-reverse">
//                         <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
//                             <button
//                                 className={` ${!canPreviousPage ? "opacity-50 cursor-not-allowed" : ""
//                                     }`}
//                                 onClick={() => previousPage()}
//                                 disabled={!canPreviousPage}
//                             >
//                                 <Icon icon="heroicons-outline:chevron-left" />
//                             </button>
//                         </li>
//                         {pageOptions.map((page, pageIdx) => (
//                             <li key={pageIdx}>
//                                 <button
//                                     href="#"
//                                     aria-current="page"
//                                     className={` ${pageIdx === pageIndex
//                                         ? "bg-slate-900 dark:bg-slate-600  dark:text-slate-200 text-white font-medium "
//                                         : "bg-slate-100  dark:text-slate-400 text-slate-900  font-normal "
//                                         }    text-sm rounded leading-[16px] flex h-6 w-6 items-center justify-center transition-all duration-150`}
//                                     onClick={() => gotoPage(pageIdx)}
//                                 >
//                                     {page + 1}
//                                 </button>
//                             </li>
//                         ))}
//                         <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
//                             <button
//                                 className={` ${!canNextPage ? "opacity-50 cursor-not-allowed" : ""
//                                     }`}
//                                 onClick={() => nextPage()}
//                                 disabled={!canNextPage}
//                             >
//                                 <Icon icon="heroicons-outline:chevron-right" />
//                             </button>
//                         </li>
//                     </ul>
//                 </div>
//             </Card>
//         </>
//     );
// };

// export default UserList;