import React, { useState, useMemo, useEffect } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Tooltip from "@/components/ui/Tooltip";
import {
    useTable,
    useRowSelect,
    useSortBy,
    // useGlobalFilter,
    usePagination,
} from "react-table";
import GlobalFilter from "./GlobalFilter";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { CSVLink } from 'react-csv';
import Barcode from 'react-barcode';
import { toggleEmailModal } from "./sendMailReducer/emailSlice";
import DeleteConfirm from "./DeleteConfirmModel";
import { editPendingData, getPaginatedPendingOrders, toggleConfirmModal, toggleDetailModal, getDuplicateBarcodeNumbers } from "./PendingOrderReducer/pendingOrderSlice";
import Datepicker from "react-tailwindcss-datepicker";
import Loading from "@/components/Loading";

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

const PendingOrderList = () => {
    const dispatch = useDispatch();
    const [csvData, setCsvData] = useState([]);

    const [globalFilter, setGlobalFilter] = useState("");
    const [pageIndex, setPageIndex] = useState(0);

    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);
    const [filterByDuplicateBarcode, setFilterByDuplicateBarcode] = useState(false);

    const { pendingOrder, isLoading, totalData, totalPages, duplicateBarcodeNumbers, totalSameDuplicateNumbers } = useSelector((state) => state.pendingorder);
    const role = useSelector((state) => state.user?.loggedInUser?.role);

    const handleValueChange = (newValue) => {
        setSelectedStartDate(newValue.startDate);
        setSelectedEndDate(newValue.endDate);
    };


    const getRowBackground = (row) => {

        // const isBarcodeNotInBookingData = !bookingdata.some((item) => item.barcode === row.original.barcode);
    
        if (duplicateBarcodeNumbers.includes(row.original.barcode)) {
          return "bg-danger-600";
        }
        // else if (isBarcodeNotInBookingData) {
        //   return "bg-blue-600";
        // }
        return "";
      };


    // Function to generate a unique filename with date and time
    const generateFilename = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `PendingOrder${day}_${month}_${year}_${hours}_${minutes}.csv`;
    };


    const COLUMNS = [
        {
            Header: "SL",
            accessor: "sl",
            Cell: (row) => {
                return <span className="text-xs">{row?.cell?.value}</span>;
            },
        },
        {
            Header: "Barcode",
            accessor: "barcode",
            Cell: (row) => {
                return <span className="text-xs">{row?.cell?.value}</span>;
            },
        },

        {
            Header: "Reference",
            accessor: "ref",
            Cell: (row) => {
                return (
                    <>
                        <Barcode
                            value={row.cell.value}
                            width={1}
                            height={30}
                            margin={4}
                            fontSize={12}
                            className="barcode"

                        />
                    </>
                );
            },
        },
        {
            Header: "City",
            accessor: "city",
            Cell: (row) => {
                return <span className="text-xs">{row?.cell?.value}</span>;
            },
        },
        {
            Header: "Pincode",
            accessor: "pincode",
            Cell: (row) => {
                return <span className="text-xs">{row?.cell?.value}</span>;
            },
        },
        {
            Header: "Name",
            accessor: "name",
            Cell: (row) => {
                return <span className="text-xs">{row?.cell?.value}</span>;
            },
        },
        {
            Header: "Address 1",
            accessor: "add1",
            Cell: (row) => {
                return <span className="text-xs">{row?.cell?.value}</span>;
            },
        },
        {
            Header: "Address 2",
            accessor: "add2",
            Cell: ({ row }) => {
                let cellValue = row.original["add2"];
                const displayValue =
                  cellValue && cellValue.length > 15
                    ? cellValue.substring(0, 17) + "..."
                    : cellValue;
                return <p className="text-xs">{displayValue}</p>;
              },
        },
        {
            Header: "Address 3",
            accessor: "add3",
            Cell: (row) => {
                return <span className="text-xs">{row?.cell?.value}</span>;
            },
        },
        {
            Header: "Email",
            accessor: "addremail",
            Cell: (row) => {
                return <span className="text-xs">{row?.cell?.value}</span>;
            },
        },
        {
            Header: "Mobile",
            accessor: "addrmobile",
            Cell: (row) => {
                return <span className="text-xs">{row?.cell?.value}</span>;
            },
        },
        {
            Header: "Sender Mobile",
            accessor: "sendermobile",
            Cell: (row) => {
                return <span className="text-xs">{row?.cell?.value}</span>;
            },
        },
        {
            Header: "Weight",
            accessor: "weight",
            Cell: (row) => {
                return <span className="text-xs">{row?.cell?.value}</span>;
            },
        },
        {
            Header: "COD",
            accessor: "cod",
            Cell: (row) => {
                return <span className="text-xs">{row?.cell?.value}</span>;
            },
        },
        {
            Header: "Insurance Value",
            accessor: "insval",
            Cell: (row) => {
                return <span className="text-xs">{row?.cell?.value}</span>;
            },
        },
        {
            Header: "VPP",
            accessor: "vpp",
            Cell: (row) => {
                return <span className="text-xs">{row?.cell?.value}</span>;
            },
        },
        {
            Header: "Length",
            accessor: "l",
            Cell: (row) => {
                return <span className="text-xs">{row?.cell?.value}</span>;
            },
        },
        {
            Header: "Breadth",
            accessor: "b",
            Cell: (row) => {
                return <span className="text-xs">{row?.cell?.value}</span>;
            },
        },
        {
            Header: "Height",
            accessor: "h",
            Cell: (row) => {
                return <span className="text-xs">{row?.cell?.value}</span>;
            },
        },
        {
            Header: "Content Type",
            accessor: "contenttype",
            Cell: (row) => {
                return <span className="text-xs">{row?.cell?.value}</span>;
            },
        },
        {
            Header: "Priority",
            accessor: "priority",
            Cell: (row) => {
                return <span className="text-xs">{row?.cell?.value}</span>;
            },
        },
        {
            Header: "Product",
            accessor: "product",
            Cell: ({ row }) => {
                let cellValue = row.original["product"];
                const displayValue =
                    cellValue && cellValue.length > 25
                        ? cellValue.substring(0, 20) + "..."
                        : cellValue;
                return <p className="text-xs">{displayValue}</p>;
            },
        },
        {
            Header: "Alternate Mobile",
            accessor: "altmobile",
            Cell: (row) => {
                return <span className="text-xs">{row?.cell?.value}</span>;
            },
        },
        {
            Header: "CR",
            accessor: "cr",
            Cell: (row) => {
                return <span className="text-xs">{row?.cell?.value}</span>;
            },
        },
        {
            Header: "Date",
            accessor: "date",
            Cell: ({ row }) => {
                let cellValue = row.original["date"];
                if (cellValue) {
                    cellValue = dayjs(cellValue).format("DD-MM-YYYY");
                }
                return <p className="text-xs">{cellValue}</p>;
            },
        },
        {
            Header: "Typing",
            accessor: "typing",
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
            Header: "action",
            accessor: "action",
            Cell: ({ row }) => (
                <div className="flex space-x-3 rtl:space-x-reverse">
                    <Tooltip content="SendMail" placement="top" arrow animation="shift-away">
                        <button
                            className="action-btn text-violet-500 bg-violet-200"
                            type="button"
                            onClick={() => actions[0].doit(row.original)}
                        >
                            <Icon icon="heroicons:paper-airplane" />
                        </button>
                    </Tooltip>
                    <Tooltip content="View" placement="top" arrow animation="shift-away">
                        <button
                            className="action-btn text-primary-500 bg-primary-200"
                            type="button"
                            onClick={() => actions[1].doit(row.original)}
                        >
                            <Icon icon="heroicons:eye" />
                        </button>
                    </Tooltip>
                    {role && role === "admin" && (
                        <>
                            <Tooltip
                                content="Edit"
                                placement="top"
                                arrow
                                animation="shift-away"
                            >
                                <button
                                    className="action-btn text-success-700 bg-success-200"
                                    type="button"
                                    onClick={() => actions[2].doit(row.original)}
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
                                    onClick={() => actions[3].doit(row.original)}
                                >
                                    <Icon icon="heroicons:trash" />
                                </button>
                            </Tooltip>
                        </>
                    )}
                </div>
            ),
        },
    ];



    const actions = [
        {
            doit: (item) => dispatch(toggleEmailModal(item))
        },
        {
            doit: (item) => dispatch(toggleDetailModal(item)),
        },
        {
            doit: (item) => dispatch(editPendingData(item)),
        },
        {
            doit: (item) => dispatch(toggleConfirmModal(item._id)),
        },

    ];

    const columns = useMemo(() => COLUMNS, [pendingOrder]);
    const tableData = useMemo(() => pendingOrder, [pendingOrder]);

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
        dispatch(
            getPaginatedPendingOrders({
                page: pageIndex + 1,
                limit: pageSize,
                search: globalFilter,
                startDate: selectedStartDate ? new Date(selectedStartDate).toISOString() : undefined,
                endDate: selectedEndDate ? new Date(selectedEndDate).toISOString() : undefined,
                filterByDuplicateBarcode,
            })
             
        );
        dispatch(getDuplicateBarcodeNumbers());
    }, [ dispatch, pageIndex, pageSize, globalFilter, selectedStartDate, selectedEndDate, filterByDuplicateBarcode]);

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
                'SL': order.sl,
                'Barcode': order.barcode,
                'Ref': order.ref,
                'City': order.city,
                'Pincode': order.pincode,
                'Name': order.name,
                'Address 1': order.add1,
                'Address 2': order.add2,
                'Address 3': order.add3,
                'Email': order.addremail,
                'Mobile': order.addrmobile,
                'Sender Mobile': order.sendermobile,
                'Weight': order.weight,
                'COD': order.cod,
                'Insurance Value': order.insval,
                'VPP': order.vpp,
                'Length': order.l,
                'Breadth': order.b,
                'Height': order.h,
                'Content Type': order.contenttype,
                'Priority': order.priority,
                'Product': order.product,
                'Alt Mobile': order.altmobile,
                'CR': order.cr,
                'Date': dayjs(order.date).format('DD/MM/YYYY'),
                'Typing': order.typing,
                'Branch': order.branch,
                'Status': order.status
            };
        });

        setCsvData(dataToExport);
    };

    // Add this check for showing loader
    const shouldShowLoader = isLoading || !pendingOrder || pendingOrder.length === 0;

    return (
        <>
            <Card>
                <div className="md:flex justify-between items-center mb-6">
                    <div className="flex items-center">
                    <ul className="lg:flex lg:space-x-1 lg:items-center">
              <li className="flex items-center space-x-2 mb-2">
                <span
                  className={`flex items-center justify-center px-3 py-1 text-white text-xs rounded-full bg-gray-500 cursor-pointer ${filterByDuplicateBarcode === false ? 'ring-2 ring-gray-900' : ''}`}
                  onClick={() => {
                    setFilterByDuplicateBarcode(false);
                    
                    setDisplayedData(totalData);
                  }}
                >
                  {totalData} All
                </span>
              </li>
              <li className="flex items-center space-x-2 mb-2">
                <span
                  className={`flex items-center justify-center px-3 py-1 text-white text-xs rounded-full bg-danger-600 cursor-pointer ${filterByDuplicateBarcode === true ? 'ring-2 ring-red-900' : ''}`}
                  onClick={() => {
                    setFilterByDuplicateBarcode(true);
                
                  }}
                >
                  {totalSameDuplicateNumbers} Same Barcode Number
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
                        <div className="overflow-hidden">
                            {shouldShowLoader ? (
                                <div className="min-h-[400px]">
                                    <Loading />
                                </div>
                            ) : (
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
                                        {...getTableBodyProps}
                                    >
                                        {page.length === 0 ? (
                                            <tr>
                                                <td 
                                                    colSpan={columns.length} 
                                                    className="text-center py-6 text-slate-500"
                                                >
                                                    No data available
                                                </td>
                                            </tr>
                                        ) : (
                                            page.map((row) => {
                                                prepareRow(row);
                                                return (
                                                    <tr 
                                                        {...row.getRowProps()}
                                                        className={`${getRowBackground(row)}`}
                                                    >
                                                        {row.cells.map((cell) => {
                                                            return (
                                                                <td 
                                                                    {...cell.getCellProps()} 
                                                                    className="table-td"
                                                                >
                                                                    {cell.render("Cell")}
                                                                </td>
                                                            );
                                                        })}
                                                    </tr>
                                                );
                                            })
                                        )}
                                    </tbody>
                                </table>
                            )}
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
                {/*end*/}
            </Card >
            <DeleteConfirm />
        </>
    );
};

export default PendingOrderList;
