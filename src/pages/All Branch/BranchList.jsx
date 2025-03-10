import React, { useState, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Tooltip from "@/components/ui/Tooltip";

import { useNavigate } from "react-router-dom";
import {
    useTable,
    useRowSelect,
    useSortBy,
    useGlobalFilter,
    usePagination,
} from "react-table";
import { deleteBranch, editBranch, getAllBranch, toggleConfirmModal, toggleDetailModal } from "./BranchReducer/branchSlice";

const BranchList = ({ branches }) => {
    const dispatch = useDispatch();


    const COLUMNS = [
        {
            Header: "Branch Name",
            accessor: "branchName",
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
            Header: "Branch ID",
            accessor: "branchId",
            Cell: (row) => {
                return <span>{row?.cell?.value}</span>;
            },
        },
        {
            Header: "Branch Address",
            accessor: "branchAddress",
            Cell: (row) => {
                return <div>{row?.cell?.value}</div>;
            },
        },
        {
            Header: "Branch Manager Name",
            accessor: "branchManagerName",
            Cell: (row) => {
                return <div>{row?.cell?.value}</div>;
            },
        },

        {
            Header: "action",
            accessor: "action",
            Cell: ({ row }) => (
                <div className="flex space-x-3 rtl:space-x-reverse">
                    <Tooltip
                        content="Edit"
                        placement="top"
                        arrow
                        animation="shift-away"
                    >
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
            name: "edit",
            icon: "heroicons:pencil-square",
            doit: (item) => dispatch(editBranch(item)),
        },
        {
            name: "delete",
            icon: "heroicons-outline:trash",
            doit: (item) => dispatch(toggleConfirmModal(item._id)),

            // doit: (item) => {
            //     dispatch(deleteBranch(item._id));

            //     setTimeout(() => {
            //         dispatch(getAllBranch("branches"));
            //     }, 500);
            // },
        },
    ];

    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => branches, [branches]);

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
                    <h4 className="card-title">Branch List</h4>
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
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <select
                            className="form-control py-2 w-max"
                            value={pageSize}
                            onChange={(e) => setPageSize(Number(e.target.value))}
                        >
                            {[10, 25, 50, 75, 100].map((pageSize) => (
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
            </Card>
        </>
    );
};

export default BranchList;
