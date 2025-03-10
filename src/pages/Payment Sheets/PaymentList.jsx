import React, { useState, useMemo, useEffect } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Tooltip from "@/components/ui/Tooltip";
import {
    useTable, useRowSelect, useSortBy, usePagination,
    // useGlobalFilter,
} from "react-table";
import GlobalFilter from "./GlobalFilter";
import { editPaymentData, getDuplicateArticleNumbers, getPaginatedPaymentData, setPageLimit, toggleConfirmModal, toggleDetailModal } from "./PaymentReducer/PaymentSlice";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { CSVLink } from 'react-csv';
import DeleteConfirm from "./DeleteConfirmModel";
import Datepicker from "react-tailwindcss-datepicker";
const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, ...rest }, ref) => {
        const defaultRef = React.useRef();
        const resolvedRef = ref || defaultRef;
        React.useEffect(() => {
            resolvedRef.current.indeterminate = indeterminate;
        }, [resolvedRef, indeterminate]);
        return (
            <>
                <input
                    type="checkbox"
                    ref={resolvedRef}
                    {...rest}
                    className="table-checkbox"
                />
            </>
        );
    }
);
const PaymentList = () => {
    const dispatch = useDispatch();
    const [csvData, setCsvData] = useState([]);
    const [globalFilter, setGlobalFilter] = useState("");
    const [pageIndex, setPageIndex] = useState(0);

    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);

    const [filterByDuplicateArticalNumber, setFilterByDuplicateArticalNumber] = useState(false);

    const { paymentdata, totalData, totalPages, currentPage, duplicateArticleNumbers, totalDuplicateNumbers } = useSelector((state) => state.paymentdata);
    const role = useSelector((state) => state.user?.loggedInUser?.role);
    const handleValueChange = (newValue) => {
        setSelectedStartDate(newValue.startDate);
        setSelectedEndDate(newValue.endDate);
    };
    // Identify duplicate article_numbers
    // const duplicateArticleNumbers = paymentdata
    //     .map((item) => item.article_number)
    //     .filter((value, index, self) => self.indexOf(value) !== index);

    const getRowBackground = (row) => {
        let background = "";
        if (duplicateArticleNumbers.includes(row.original.article_number)) {
            background = "bg-danger-600";
        }
        return background;
    };
    // Function to generate a unique filename with date and time
    const generateFilename = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `Payment_${day}_${month}_${year}_${hours}_${minutes}.csv`;
    };
    const COLUMNS = [
        {
            Header: "Article Number",
            accessor: "article_number",
            Cell: (row) => {
                return <span className="text-xs">{row?.cell?.value}</span>;
            },
        },
        {
            Header: "Article Type",
            accessor: "article_type",
            Cell: (row) => {
                return <span className="text-xs">{row?.cell?.value}</span>;
            },
        },

        {
            Header: "Booking Office ID",
            accessor: "booking_office_id",
            Cell: (row) => {
                return <span className="text-xs">{row?.cell?.value}</span>;
            },
        },
        {
            Header: "Booking Office Name",
            accessor: "booking_office_name",
            Cell: (row) => {
                let cellValue = row?.cell?.value;
                const displayValue =
                    cellValue && cellValue.length > 8
                        ? cellValue.substring(0, 10) + "..."
                        : cellValue;
                return <span className="text-xs">{displayValue}</span>;
            },
        },
        {
            Header: "Booking Office PIN",
            accessor: "booking_office_pin",
            Cell: (row) => {
                return <span className="text-xs">{row?.cell?.value}</span>;
            },
        },
        {
            Header: "Booking Date",
            accessor: "booking_date",
            Cell: (row) => {
                const cellValue = row?.cell?.value;
                return <span className="text-xs">{dayjs(cellValue).format("DD-MM-YYYY")}</span>;
            },
        },
        {
            Header: "Booking Time",
            accessor: "booking_time",
            Cell: ({ cell: { value } }) => {
                const formatBookingTime = (fractionalDay) => {
                    const totalSeconds = Math.round(fractionalDay * 86400); // 86400 seconds in a day
                    const hours = Math.floor(totalSeconds / 3600);
                    const minutes = Math.floor((totalSeconds % 3600) / 60);
                    const seconds = totalSeconds % 60;
                    // Create a dayjs object with the time
                    const time = dayjs()
                        .startOf('day')
                        .add(hours, 'hour')
                        .add(minutes, 'minute')
                        .add(seconds, 'second');
                    // Format the time string
                    return time.format("h:mm:ss A");
                };
                return <span className="text-xs">{formatBookingTime(value)}</span>;
            },
        },
        {
            Header: "Delivery Office ID",
            accessor: "delivery_office_id",
            Cell: (row) => {
                return <span className="text-xs">{row?.cell?.value}</span>;
            },
        },
        {
            Header: "Delivery Office Name",
            accessor: "delivery_office_name",
            Cell: (row) => {
                return <span className="text-xs">{row?.cell?.value}</span>;
            },
        },
        {
            Header: "Delivery Office PIN",
            accessor: "delivery_office_pin",
            Cell: (row) => {
                return <span className="text-xs">{row?.cell?.value}</span>;
            },
        },
        {
            Header: "Delivery Date",
            accessor: "delivery_date",
            Cell: (row) => {
                const cellValue = row?.cell?.value;
                return <span className="text-xs">{dayjs(cellValue).format("DD-MM-YYYY")}</span>;
            },
        },
        {
            Header: "RTS",
            accessor: "rts",
            Cell: (row) => {
                return <span className="text-xs">{row?.cell?.value}</span>;
            },
        },
        {
            Header: "Gross Amount",
            accessor: "gross_amount",
            Cell: (row) => {
                return <span className="text-xs">{row?.cell?.value}</span>;
            },
        },
        {
            Header: "Commission",
            accessor: "commission",
            Cell: (row) => {
                return <span className="text-xs">{row?.cell?.value}</span>;
            },
        },
        {
            Header: "Amount LC1",
            accessor: "amount_lc_1",
            Cell: (row) => {
                return <span className="text-xs">{row?.cell?.value}</span>;
            },
        },
        {
            Header: "Amount LC2",
            accessor: "amount_lc_2",
            Cell: (row) => {
                return <span className="text-xs">{row?.cell?.value}</span>;
            },
        },
        {
            Header: "Round Off Amount",
            accessor: "round_off_amount",
            Cell: (row) => {
                return <span className="text-xs">{row?.cell?.value}</span>;
            },
        },
        {
            Header: "Net Payable",
            accessor: "net_payable",
            Cell: (row) => {
                return <span className="text-xs">{row?.cell?.value}</span>;
            },
        },

        {
            Header: "Payment Date",
            accessor: "payment_date",
            Cell: (row) => {
                const cellValue = row?.cell?.value;
                return <span className="text-xs">{dayjs(cellValue).format("DD-MM-YYYY")}</span>;
            },
        },
        {
            Header: "Payment Office ID",
            accessor: "payment_office_id",
            Cell: (row) => {
                return <span className="text-xs">{row?.cell?.value}</span>;
            },
        },
        {
            Header: "Payment Office Name",
            accessor: "payment_office_name",
            Cell: (row) => {
                return <span className="text-xs">{row?.cell?.value}</span>;
            },
        },
        {
            Header: "Payment Document No",
            accessor: "payment_document_no",
            Cell: (row) => {
                return <span className="text-xs">{row?.cell?.value}</span>;
            },
        },
        {
            Header: "Payment Cheque No",
            accessor: "payment_cheque_no",
            Cell: (row) => {
                return <span className="text-xs">{row?.cell?.value}</span>;
            },
        },
        {
            Header: "Liability Document",
            accessor: "liability_document",
            Cell: (row) => {
                return <span className="text-xs">{row?.cell?.value}</span>;
            },
        },
        {
            Header: "System Postings",
            accessor: "system_postings",
            Cell: (row) => {
                return <span className="text-xs">{row?.cell?.value}</span>;
            },
        },
        {
            Header: "Branch",
            accessor: "branch",
            Cell: (row) => {
                return <span className="text-xs">{row?.cell?.value}</span>;
            },
        },
        {
            Header: "Status",
            accessor: "status",
            Cell: (row) => {
                return <span className="text-xs">{row?.cell?.value}</span>;
            },
        },
        {
            Header: 'action',
            accessor: 'action',
            Cell: ({ row }) => (
                <div className="flex space-x-3 rtl:space-x-reverse">
                    <Tooltip content="View" placement="top" arrow animation="shift-away">
                        <button
                            className="action-btn text-primary-500 bg-primary-200"
                            type="button"
                            onClick={() => actions[0].doit(row.original)}
                        >
                            <Icon icon="heroicons:eye" />
                        </button>
                    </Tooltip>
                    {role && role === "admin" &&
                        (
                            <>
                                <Tooltip content="Edit" placement="top" arrow animation="shift-away">
                                    <button
                                        className="action-btn text-success-700 bg-success-200"
                                        type="button"
                                        onClick={() => actions[1].doit(row.original)}
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
                                        onClick={() => actions[2].doit(row.original)}
                                    >
                                        <Icon icon="heroicons:trash" />
                                    </button>
                                </Tooltip>
                            </>
                        )}
                </div>
            ),
        }
    ];
    const actions = [
        {
            doit: (item) => dispatch(toggleDetailModal(item)),
        },

        {
            doit: (item) => dispatch(editPaymentData(item)),
        },
        {
            doit: (item) => dispatch(toggleConfirmModal(item._id)),
        },
    ];
    const columns = useMemo(() => COLUMNS, [paymentdata]);
    const tableData = useMemo(() => paymentdata, [paymentdata]);
    const tableInstance = useTable(
        {
            columns,
            data: tableData,
        },
        // useGlobalFilter,
        useSortBy,
        usePagination,
        useRowSelect,
        (hooks) => {
            if (role && role === "admin") {
                hooks.visibleColumns.push((columns) => [
                    {
                        id: "selection",
                        Header: ({ getToggleAllRowsSelectedProps }) => (
                            <div>
                                <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
                            </div>
                        ),
                        Cell: ({ row }) => (
                            <div>
                                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                            </div>
                        ),
                    },
                    ...columns,
                ]);
            }
        }
    );
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        footerGroups,
        page,
        // nextPage,
        // previousPage,
        // canNextPage,
        // canPreviousPage,
        // pageOptions,
        state,
        // gotoPage,
        pageCount,
        setPageSize,
        // setGlobalFilter,
        prepareRow,
        selectedFlatRows,
    } = tableInstance;
    const { pageSize } = state;

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(
                getPaginatedPaymentData({
                    page: pageIndex + 1,
                    limit: pageSize,
                    search: globalFilter,
                    startDate: selectedStartDate ? new Date(selectedStartDate).toISOString() : undefined,
                    endDate: selectedEndDate ? new Date(selectedEndDate).toISOString() : undefined,
                    filterByDuplicateArticalNumber
                })
            );
            // After getPaginatedPaymentData completes successfully
            dispatch(getDuplicateArticleNumbers());
        };
        fetchData();
    }, [dispatch, pageIndex, pageSize, globalFilter, selectedStartDate, selectedEndDate, filterByDuplicateArticalNumber]);
    // useEffect(() => {
    //     dispatch(
    //         getPaginatedPaymentData({
    //             page: pageIndex + 1,
    //             limit: pageSize,
    //             search: globalFilter,
    //             startDate: selectedStartDate ? new Date(selectedStartDate).toISOString() : undefined,
    //             endDate: selectedEndDate ? new Date(selectedEndDate).toISOString() : undefined,
    //         })
    //     );
    //     dispatch(getDuplicateArticleNumbers())
    // }, [pageIndex, pageSize, globalFilter, selectedStartDate, selectedEndDate]);
    const handelPageSize = (e) => {
        setPageSize(Number(e.target.value))
        dispatch(setPageLimit(Number(e.target.value)))
    }
    const gotoPage = (page) => {
        setPageIndex(page);
    };
    const previousPage = () => {
        if (pageIndex > 0) {
            setPageIndex(pageIndex - 1);
        }
    };
    const nextPage = () => {
        if (pageIndex < totalPages - 1) {
            setPageIndex(pageIndex + 1);
        }
    };
    const canPreviousPage = pageIndex > 0;
    const canNextPage = pageIndex < totalPages - 1;
    const pageOptions = Array.from({ length: totalPages }, (_, index) => index);
    const handleDeleteSelectedRows = () => {
        const selectedIds = selectedFlatRows.map(row => row.original._id);
        dispatch(toggleConfirmModal(selectedIds));
    };
    const handleExport = () => {
        const filteredData = page.map(row => row.original);
        const dataToExport = filteredData.map(order => {
            return {
                'Amount LC': order.amount_lc,
                'Article Number': order.article_number,
                'Article Type': order.article_type,
                'Booking Date': order.booking_date ? dayjs(order.booking_date).format('DD/MM/YYYY') : '',
                'Booking Office ID': order.booking_office_id,
                'Booking Office Name': order.booking_office_name,
                'Booking Office Pin': order.booking_office_pin,
                'Booking Time': order.booking_time,
                'Commission': order.commission,
                'Delivery Date': order.delivery_date ? dayjs(order.delivery_date).format('DD/MM/YYYY') : '',
                'Delivery Office ID': order.delivery_office_id,
                'Delivery Office Name': order.delivery_office_name,
                'Delivery Office Pin': order.delivery_office_pin,
                'Gross Amount': order.gross_amount,
                'Liability Document': order.liability_document,
                'Net Payable': order.net_payable,
                'Payment Cheque No': order.payment_cheque_no,
                'Payment Date': order.payment_date ? dayjs(order.payment_date).format('DD/MM/YYYY') : '',
                'Payment Document No': order.payment_document_no,
                'Payment Office ID': order.payment_office_id,
                'Payment Office Name': order.payment_office_name,
                'Round Off Amount': order.round_off_amount,
                'RTS': order.rts,
                'System Postings': order.system_postings,
                'Branch': order.branch,
                'Status': order.status,
            };
        });
        setCsvData(dataToExport);
    };
    return (
        <>
            <Card>
                <div className="md:flex justify-between items-center mb-6">
                    <div className="flex items-center">
                        <ul className="lg:flex lg:space-x-1 lg:items-center">
                            <li className="flex items-center space-x-2 mb-2">
                                <span
                                    className={`flex items-center justify-center px-3 py-1 text-white text-xs rounded-full bg-gray-500 cursor-pointer ${filterByDuplicateArticalNumber === false ? 'ring-2 ring-gray-900' : ''}`}
                                    onClick={() => setFilterByDuplicateArticalNumber(false)}
                                >
                                   {totalData} All
                                </span>
                            </li>
                            <li className="flex items-center space-x-2 mb-2">
                                <span
                                    className={`flex items-center justify-center px-3 py-1 text-white text-xs rounded-full bg-danger-600 cursor-pointer ${filterByDuplicateArticalNumber === true ? 'ring-2 ring-red-900' : ''}`}
                                    onClick={() => setFilterByDuplicateArticalNumber(true)}
                                >
                                   {totalDuplicateNumbers} Same Artical Number
                                </span>
                            </li>
                        </ul>
                        {role && role === "admin" && (<Tooltip content="Download CSV" placement="top" theme="dark" animation="shift-away-subtle">
                            <div>
                                <CSVLink
                                    data={csvData}
                                    filename={generateFilename()} // Use the generateFilename function
                                    // className="btn btn-dark dark:bg-slate-700 h-min text-sm font-normal ml-2"
                                    target="_blank"
                                    onClick={handleExport}
                                >
                                    <div className="btn btn-dark p-1 dark:bg-slate-700 text-sm font-normal ml-2 mb-2">
                                        <Icon className="text-lg" icon="heroicons-outline:archive-box-arrow-down" />
                                        {/* <span className="hidden md:inline-block">CSV</span> */}
                                    </div>
                                </CSVLink>
                            </div>
                        </Tooltip>)}
                    </div>
                    {selectedFlatRows.length > 0 && (
                        <Button
                            icon="heroicons:trash"
                            text="Delete"
                            className="text-danger-500 bg-danger-200 h-min w-fit text-sm font-normal"
                            iconClass="text-lg"
                            onClick={handleDeleteSelectedRows}
                        />
                    )}
                    <div className="flex flex-col justify-end space-y-1">
                        <div className="border rounded-md">
                            <Datepicker
                                value={{ startDate: selectedStartDate, endDate: selectedEndDate }}
                                onChange={handleValueChange}
                                displayFormat={"DD/MM/YYYY"}
                            />
                        </div>
                        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
                    </div>
                </div>
                <div className="overflow-x-auto -mx-6">
                    <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden ">
                            <table
                                className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700"
                                {...getTableProps}
                            >
                                <thead className="bg-slate-200 dark:bg-slate-700">
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
                                            <tr {...row.getRowProps()}
                                                className={`${getRowBackground(row)}`}
                                            >
                                                {
                                                    row.cells.map((cell) => {
                                                        return (
                                                            <td {...cell.getCellProps()} className="table-td">
                                                                {cell.render("Cell")}
                                                            </td>
                                                        );
                                                    })
                                                }
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
                            onChange={(e) => { handelPageSize(e) }}
                        >
                            {[10, 25, 50, 100, 1000].map((size) => (
                                <option key={size} value={size}>
                                    Show {size}
                                </option>
                            ))}
                        </select>
                        <span className="text-sm font-medium text-slate-900 dark:text-white">
                            Showing {pageIndex * pageSize + 1} to {Math.min((pageIndex + 1) * pageSize, totalData)} of {totalData} results
                        </span>
                    </div>
                    <div className="text-sm font-medium text-slate-900 dark:text-white">
                        Page{" "}
                        <span>
                            <span>{pageIndex + 1} of {pageOptions.length}</span>
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
                                pageIdx === pageOptions.length - 1 ||
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
                                                } text-sm rounded leading-[16px] flex h-6 w-6 items-center justify-center transition-all duration-150`}
                                            onClick={() => gotoPage(pageIdx)}
                                        >
                                            {page + 1}
                                        </button>
                                    </li>
                                );
                            } else if (
                                (pageIdx === pageIndex - 2 && pageIndex > 2) ||
                                (pageIdx === pageIndex + 2 && pageIndex < pageOptions.length - 3)
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
                                onClick={() => gotoPage(pageOptions.length - 1)}
                                disabled={!canNextPage}
                                className={` ${!canNextPage ? "opacity-50 cursor-not-allowed" : ""}`}
                            >
                                <Icon icon="heroicons:chevron-double-right-solid" />
                            </button>
                        </li>
                    </ul>
                </div>
            </Card >
            <DeleteConfirm />
        </>
    );
};
export default PaymentList;
