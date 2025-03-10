import React, { useState, useMemo } from "react";
import { advancedTable } from "../../../constant/table-data";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Dropdown from "@/components/ui/Dropdown";
import { Menu } from "@headlessui/react";
import Button from "@/components/ui/Button";
import Tooltip from "@/components/ui/Tooltip";

import {
    useTable,
    useRowSelect,
    useSortBy,
    useGlobalFilter,
    usePagination,
} from "react-table";
import { deleteReceiverMail, editMail, getAllReceiverMails, toggleAddMailModal, toggleAddModal, toggleConfirmModal } from "../SettingReducer/settingSlice";
import AddReceiverMail from "./AddReceiverMail";
import { useDispatch } from "react-redux";
import EditMail from "./EditReceiverMail";
import DeleteConfirm from "./DeleteConfirmModel";
// import GlobalFilter from "./GlobalFilter";





const ReceiverMailTable = ({ mails }) => {

    const dispatch = useDispatch();


    const COLUMNS = [
        {
            Header: "Mail Id",
            accessor: "receiverMail",
            Cell: (row) => {
                return <span>{row?.cell?.value}</span>;
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
            doit: (item) => dispatch(editMail(item)),
        },
        {
            doit: (item) => dispatch(toggleConfirmModal(item._id)),
        },
        // {
        //     doit: (item) => {
        //         dispatch(deleteReceiverMail(item._id));

        //         setTimeout(() => {
        //             dispatch(getAllReceiverMails("user"));
        //         }, 500);
        //     },
        // },
    ];


    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => mails, [mails]);


    const tableInstance = useTable(
        {
            columns,
            data,
        },

        useGlobalFilter,
        useSortBy,
        usePagination,
        useRowSelect,

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
                    <h6 className="card-title">Receiver Mail</h6>
                    <div>
                        <Button
                            icon="heroicons-outline:plus"
                            text="Add"
                            className="btn-sm btn-dark dark:bg-slate-800 h-min text-sm font-normal"
                            iconClass=" text-lg"
                            onClick={() => dispatch(toggleAddMailModal(true))}
                        />
                        {/* <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} /> */}
                    </div>
                </div>
                <div className="overflow-x-auto -mx-6">
                    <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden ">
                            <table
                                className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700"
                                {...getTableProps}
                            >
                                <thead className=" border-t border-slate-100 dark:border-slate-800">
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
                                            <tr {...row.getRowProps()}>
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
                                        : "bg-slate-100 dark:bg-slate-700 dark:text-slate-400 text-slate-900  font-normal  "
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
            <AddReceiverMail />
            <EditMail />
            <DeleteConfirm />
        </>
    );
};

export default ReceiverMailTable;

