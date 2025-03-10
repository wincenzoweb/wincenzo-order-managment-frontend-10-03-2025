import React, { useState, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Dropdown from "@/components/ui/Dropdown";

import { Menu } from "@headlessui/react";

import { useNavigate } from "react-router-dom";
import {
    useTable,
    useRowSelect,
    useSortBy,
    useGlobalFilter,
    usePagination,
} from "react-table";
import { deleteEmployee, editEmployee, getAllEmployee } from "./Reducer/EmployeesSlice";

const EmployeesList = ({ employees }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const COLUMNS = [
        {
            Header: "Employee Name",
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

        // {
        //     Header: "assignee",
        //     accessor: "assignee",
        //     Cell: (row) => {
        //         return (
        //             <div>
        //                 <div className="flex justify-end sm:justify-start lg:justify-end xl:justify-start -space-x-1 rtl:space-x-reverse">
        //                     {row?.cell?.value.map((user, userIndex) => (
        //                         <div
        //                             className="h-6 w-6 rounded-full ring-1 ring-slate-100"
        //                             key={userIndex}
        //                         >
        //                             <img
        //                                 src={user.image}
        //                                 alt={user.label}
        //                                 className="w-full h-full rounded-full"
        //                             />
        //                         </div>
        //                     ))}
        //                     <div className="bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-300 text-xs ring-2 ring-slate-100 dark:ring-slate-700 rounded-full h-6 w-6 flex flex-col justify-center items-center">
        //                         +2
        //                     </div>
        //                 </div>
        //             </div>
        //         );
        //     },
        // },
        {
            Header: "action",
            accessor: "action",
            Cell: ({ row }) => (
                <div className="flex items-center gap-y-2">
                    <span
                        className="text-md hover:bg-slate-900 hover:text-white dark:hover:bg-slate-600 dark:hover:bg-opacity-50 cursor-pointer rounded-md p-0.5 px-1"
                        onClick={() => actions[0].doit(row.original)}
                        title="View"
                    >
                        <Icon icon={actions[0].icon} />
                    </span>
                    <span
                        className="text-md hover:bg-slate-900 hover:text-white dark:hover:bg-slate-600 dark:hover:bg-opacity-50 cursor-pointer rounded-md p-0.5 px-1"
                        onClick={() => actions[1].doit(row.original)}
                        title="Edit"
                    >
                        <Icon icon={actions[1].icon} />
                    </span>
                    <span
                        className="text-md bg-danger-500 text-danger-500 dark:text-white bg-opacity-30 hover:bg-opacity-100 hover:text-white cursor-pointer rounded-md p-0.5 px-1"
                        onClick={() => actions[2].doit(row.original)}
                        title="Delete"
                    >
                        <Icon icon={actions[2].icon} />
                    </span>
                </div>
            ),
        },
    ];
    const actions = [
        {
            name: "view",
            icon: "heroicons-outline:eye",
            doit: (item) => navigate(`/projects/${item.id}`),
        },
        {
            name: "edit",
            icon: "heroicons:pencil-square",
            doit: (item) => dispatch(editEmployee(item)),
        },
        {
            name: "delete",
            icon: "heroicons-outline:trash",
            doit: (item) => {
                dispatch(deleteEmployee(item._id));

                setTimeout(() => {
                    dispatch(getAllEmployee("employees"));
                }, 500);
            },
        },
    ];

    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => employees, [employees]);

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
        footerGroups,
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
                    <h4 className="card-title">Employee List</h4>
                </div>
                <div className="overflow-x-auto -mx-6">
                    <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden ">
                            <table
                                className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700"
                                {...getTableProps}
                            >
                                <thead className=" bg-slate-100 dark:bg-slate-700">
                                    {headerGroups.map((headerGroup) => (
                                        <tr {...headerGroup.getHeaderGroupProps()}>
                                            {headerGroup.headers.map((column) => (
                                                <th
                                                    {...column.getHeaderProps(
                                                        column.getSortByToggleProps()
                                                    )}
                                                    scope="col"
                                                    className=" table-th "
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
                                    {...getTableBodyProps}
                                >
                                    {page.map((row) => {
                                        prepareRow(row);
                                        return (
                                            <tr
                                                {...row.getRowProps()}
                                                className=" even:bg-slate-100 dark:even:bg-slate-700"
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
                    <div className=" flex items-center space-x-3 rtl:space-x-reverse">
                        <span className=" flex space-x-2  rtl:space-x-reverse items-center">
                            <span className=" text-sm font-medium text-slate-600 dark:text-slate-300">
                                Go
                            </span>
                            <span>
                                <input
                                    type="number"
                                    className=" form-control py-2"
                                    defaultValue={pageIndex + 1}
                                    onChange={(e) => {
                                        const pageNumber = e.target.value
                                            ? Number(e.target.value) - 1
                                            : 0;
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
                    <ul className="flex items-center  space-x-3  rtl:space-x-reverse">
                        <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
                            <button
                                className={` ${!canPreviousPage ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                                onClick={() => previousPage()}
                                disabled={!canPreviousPage}
                            >
                                <Icon icon="heroicons-outline:chevron-left" />
                            </button>
                        </li>
                        {pageOptions.map((page, pageIdx) => (
                            <li key={pageIdx}>
                                <button
                                    href="#"
                                    aria-current="page"
                                    className={` ${pageIdx === pageIndex
                                        ? "bg-slate-900 dark:bg-slate-600  dark:text-slate-200 text-white font-medium "
                                        : "bg-slate-100  dark:text-slate-400 text-slate-900  font-normal "
                                        }    text-sm rounded leading-[16px] flex h-6 w-6 items-center justify-center transition-all duration-150`}
                                    onClick={() => gotoPage(pageIdx)}
                                >
                                    {page + 1}
                                </button>
                            </li>
                        ))}
                        <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
                            <button
                                className={` ${!canNextPage ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                                onClick={() => nextPage()}
                                disabled={!canNextPage}
                            >
                                <Icon icon="heroicons-outline:chevron-right" />
                            </button>
                        </li>
                    </ul>
                </div>
            </Card>
        </>
    );
};

export default EmployeesList;
