
// latest code 
// import React, { useState } from "react";
// import Modal from "@/components/ui/Modal";
// import { useSelector, useDispatch } from "react-redux";
// import { useForm, Controller } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import * as XLSX from 'xlsx';
// import { addNewFile, getPaginatedBookingData, toggleAddModal } from "./BookingReducer/BookingSlice";
// import Loader from "../../components/Loader";


// const AddBookingFile = () => {
//     const { addModel, currentPage, pageLimit } = useSelector((state) => state.bookingdata);
//     const dispatch = useDispatch();
//     const [fileData, setFileData] = useState(null);
//     const [isLoading, setIsLoading] = useState(false); // State to manage loading

//     const FormValidationSchema = yup.object({
//         file: yup.mixed().required("File is required"),
//     }).required();

//     const {
//         control,
//         handleSubmit,
//         formState: { errors },
//         reset
//     } = useForm({
//         resolver: yupResolver(FormValidationSchema),
//         mode: "all",
//     });

//     const handleFileUpload = (file) => {
//         const reader = new FileReader();

//         reader.onload = (event) => {
//             const content = event.target.result;
//             const workbook = XLSX.read(content, { type: 'binary' });
//             const sheetName = workbook.SheetNames[0]; // Assuming the first sheet
//             const sheet = workbook.Sheets[sheetName];
//             const xldata = XLSX.utils.sheet_to_json(sheet, { header: 1 }); // Parse XLSX to JSON

//             // Filter out empty rows
//             const filteredData = xldata.filter(row => row.some(cell => cell !== null && cell !== ""));

//             // Extract headers from the first row and convert to camelCase
//             const headers = filteredData[0].map(header => header.toLowerCase().replace(/\s+/g, '_'));

//             // Remove the first row (headers) from the filtered data
//             const dataWithoutHeaders = filteredData.slice(1);

//             // Map each row to a key-value object where headers are keys (in camelCase) and row values are values
//             const keyValueData = dataWithoutHeaders.map((row) => {
//                 const rowData = {};
//                 headers.forEach((header, index) => {
//                     let cellValue = row[index];
//                     if (header === 'date') {
//                         if (typeof cellValue === 'number') {
//                             // Convert Excel serial date to JavaScript Date
//                             const date = new Date((cellValue - 25569) * 86400 * 1000);
//                             cellValue = date.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
//                         } else if (typeof cellValue === 'string' && /^\d{1,2}-\d{1,2}-\d{2}$/.test(cellValue)) {
//                             // Handle date in format DD-MM-YY
//                             const [day, month, year] = cellValue.split('-').map(Number);
//                             const fullYear = year < 50 ? 2000 + year : 1900 + year; // Adjust for year 2000 threshold
//                             const date = new Date(fullYear, month - 1, day);
//                             cellValue = date.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
//                         }
//                     }
//                     rowData[header] = cellValue !== undefined ? cellValue : "";
//                 });
//                 return rowData;
//             });
//             setFileData(keyValueData);
//         };
//         reader.readAsArrayBuffer(file);
//     };

//     const onSubmit = (data) => {
//         setIsLoading(true); // Start loading
//         dispatch(addNewFile(fileData)).then(() => {
//             setIsLoading(false); // Stop loading
//             dispatch(toggleAddModal(false));
//             dispatch(
//                 getPaginatedBookingData({
//                     page: currentPage,
//                     limit: pageLimit,
//                 })
//             );
//             reset();
//         }).catch(() => {
//             setIsLoading(false); // Stop loading even if there is an error
//         });
//     };

//     return (
//         <div>
//             <Modal
//                 title="Add New File"
//                 labelclassName="btn-outline-dark"
//                 activeModal={addModel}
//                 onClose={() => dispatch(toggleAddModal(false))}
//             >
//                 <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
//                     {isLoading && <Loader />} {/* Display loader when loading */}
//                     <div className="form-group">
//                         <label htmlFor="file" className="block text-sm font-medium text-gray-700">File</label>
//                         <Controller
//                             name="file"
//                             control={control}
//                             render={({ field }) => (
//                                 <input
//                                     id="file"
//                                     type="file"
//                                     onChange={(e) => {
//                                         field.onChange(e.target.files[0]);
//                                         handleFileUpload(e.target.files[0]);
//                                     }}
//                                     className={`form-input mt-1 block w-full ${errors.file ? 'border-red-500' : ''}`}
//                                 />
//                             )}
//                         />
//                         {errors.file && <span className="text-red-500 text-sm">{errors.file.message}</span>}
//                     </div>

//                     <button type="submit" className="btn btn-dark block w-full text-center" disabled={isLoading}>
//                         Add File
//                     </button>
//                 </form>
//             </Modal>
//         </div>
//     );
// };

// export default AddBookingFile;






import React, { useState } from "react";
import Modal from "@/components/ui/Modal";
import { useSelector, useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import * as XLSX from 'xlsx';
import { addNewFile, getPaginatedBookingData, toggleAddModal } from "./BookingReducer/BookingSlice";
import Loader from "../../components/Loader";

const AddBookingFile = () => {
    const { addModel, currentPage, pageLimit } = useSelector((state) => state.bookingdata);
    const dispatch = useDispatch();
    const [fileData, setFileData] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // State to manage loading

    const FormValidationSchema = yup.object({
        file: yup.mixed().required("File is required"),
    }).required();

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: yupResolver(FormValidationSchema),
        mode: "all",
    });

    const handleFileUpload = (file) => {
        const reader = new FileReader();

        reader.onload = (event) => {
            const content = event.target.result;
            const workbook = XLSX.read(content, { type: 'binary' });
            const sheetName = workbook.SheetNames[0]; // Assuming the first sheet
            const sheet = workbook.Sheets[sheetName];
            const xldata = XLSX.utils.sheet_to_json(sheet, { header: 1 }); // Parse XLSX to JSON

            // Filter out empty rows
            const filteredData = xldata.filter(row => row.some(cell => cell !== null && cell !== ""));

            // Extract headers from the first row and convert to camelCase
            const headers = filteredData[0].map(header => header.toLowerCase().replace(/\s+/g, '_'));

            // Remove the first row (headers) from the filtered data
            const dataWithoutHeaders = filteredData.slice(1);

            // Map each row to a key-value object where headers are keys (in camelCase) and row values are values
            const keyValueData = dataWithoutHeaders.map((row) => {
                const rowData = {};
                headers.forEach((header, index) => {
                    let cellValue = row[index];
                    if (header === 'date') {
                        if (typeof cellValue === 'number') {
                            // Convert Excel serial date to JavaScript Date
                            const date = new Date((cellValue - 25569) * 86400 * 1000);
                            cellValue = date.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
                        } else if (typeof cellValue === 'string' && /^\d{1,2}-\d{1,2}-\d{2}$/.test(cellValue)) {
                            // Handle date in format DD-MM-YY
                            const [day, month, year] = cellValue.split('-').map(Number);
                            const fullYear = year < 50 ? 2000 + year : 1900 + year; // Adjust for year 2000 threshold
                            const date = new Date(fullYear, month - 1, day);
                            cellValue = date.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
                        }
                    }
                    rowData[header] = cellValue !== undefined ? cellValue : "";
                });
                return rowData;
            });
            setFileData(keyValueData);
        };
        reader.readAsArrayBuffer(file);
    };

    const onSubmit = (data) => {
        setIsLoading(true); // Start loading
        dispatch(addNewFile(fileData)).then((response) => {
            setIsLoading(false); // Stop loading

            // Show success message and close the modal
            dispatch(toggleAddModal(false));

            // Fetch the latest paginated data
            dispatch(
                getPaginatedBookingData({
                    page: currentPage,
                    limit: pageLimit,
                })
            );

            // Wait for 2 seconds and trigger CSV download for the latest data
            setTimeout(() => {
                downloadCSV(response.payload.data); // Assume `response.payload.data` contains the latest data
            }, 2000);

            reset();
        }).catch(() => {
            setIsLoading(false); // Stop loading even if there is an error
        });
    };

    // Function to download CSV file
    const downloadCSV = (data) => {
        // Convert JSON to CSV format
        const worksheet = XLSX.utils.json_to_sheet(data);
        const csvContent = XLSX.utils.sheet_to_csv(worksheet);

        // Create a blob from CSV content
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);

        // Create an anchor element to trigger download
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `latest_booking_data.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div>
            <Modal
                title="Add New File"
                labelclassName="btn-outline-dark"
                activeModal={addModel}
                onClose={() => dispatch(toggleAddModal(false))}
            >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {isLoading && <Loader />} {/* Display loader when loading */}
                    <div className="form-group">
                        <label htmlFor="file" className="block text-sm font-medium text-gray-700">File</label>
                        <Controller
                            name="file"
                            control={control}
                            render={({ field }) => (
                                <input
                                    id="file"
                                    type="file"
                                    onChange={(e) => {
                                        field.onChange(e.target.files[0]);
                                        handleFileUpload(e.target.files[0]);
                                    }}
                                    className={`form-input mt-1 block w-full ${errors.file ? 'border-red-500' : ''}`}
                                />
                            )}
                        />
                        {errors.file && <span className="text-red-500 text-sm">{errors.file.message}</span>}
                    </div>

                    <button type="submit" className="btn btn-dark block w-full text-center" disabled={isLoading}>
                        Add File
                    </button>
                </form>
            </Modal>
        </div>
    );
};

export default AddBookingFile;







// import React, { useState } from "react";
// import Modal from "@/components/ui/Modal";
// import { useSelector, useDispatch } from "react-redux";
// import { useForm, Controller } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import * as XLSX from 'xlsx';
// import { addNewFile, getAllBookingData, toggleAddModal } from "./BookingReducer/BookingSlice";

// const AddBookingFile = () => {
//     const { addModel } = useSelector((state) => state.bookingdata);
//     const dispatch = useDispatch();
//     const [fileData, setFileData] = useState(null);

//     const FormValidationSchema = yup.object({
//         file: yup.mixed().required("File is required"),
//     }).required();

//     const {
//         control,
//         handleSubmit,
//         formState: { errors },
//         reset
//     } = useForm({
//         resolver: yupResolver(FormValidationSchema),
//         mode: "all",
//     });

//     const handleFileUpload = (file) => {
//         const reader = new FileReader();

//         reader.onload = (event) => {
//             const content = event.target.result;
//             const workbook = XLSX.read(content, { type: 'binary' });
//             const sheetName = workbook.SheetNames[0]; // Assuming the first sheet
//             const sheet = workbook.Sheets[sheetName];
//             const xldata = XLSX.utils.sheet_to_json(sheet, { header: 1 }); // Parse XLSX to JSON

//             // Filter out empty rows
//             const filteredData = xldata.filter(row => row.some(cell => cell !== null && cell !== ""));

//             // Extract headers from the first row and convert to camelCase
//             const headers = filteredData[0].map(header => header.toLowerCase().replace(/\s+/g, '_'));

//             // Remove the first row (headers) from the filtered data
//             const dataWithoutHeaders = filteredData.slice(1);

//             // Map each row to a key-value object where headers are keys (in camelCase) and row values are values
//             const keyValueData = dataWithoutHeaders.map((row) => {
//                 const rowData = {};
//                 headers.forEach((header, index) => {
//                     let cellValue = row[index];
//                     if (header === 'date') {
//                         if (typeof cellValue === 'number') {
//                             // Convert Excel serial date to JavaScript Date
//                             const date = new Date((cellValue - 25569) * 86400 * 1000);
//                             cellValue = date.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
//                         } else if (typeof cellValue === 'string' && /^\d{1,2}-\d{1,2}-\d{2}$/.test(cellValue)) {
//                             // Handle date in format DD-MM-YY
//                             const [day, month, year] = cellValue.split('-').map(Number);
//                             const fullYear = year < 50 ? 2000 + year : 1900 + year; // Adjust for year 2000 threshold
//                             const date = new Date(fullYear, month - 1, day);
//                             cellValue = date.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
//                         }
//                     }
//                     rowData[header] = cellValue !== undefined ? cellValue : "";
//                 });
//                 return rowData;
//             });
//             setFileData(keyValueData);
//         };
//         reader.readAsArrayBuffer(file);
//     };

//     const onSubmit = (data) => {
//         dispatch(addNewFile(fileData));
//         setTimeout(() => {
//             dispatch(toggleAddModal(false));
//             dispatch(getAllBookingData("bookingdata"));
//             reset();
//         }, 500);
//     };

//     return (
//         <div>
//             <Modal
//                 title="Add New File"
//                 labelclassName="btn-outline-dark"
//                 activeModal={addModel}
//                 onClose={() => dispatch(toggleAddModal(false))}
//             >
//                 <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
//                     <div className="form-group">
//                         <label htmlFor="file" className="block text-sm font-medium text-gray-700">File</label>
//                         <Controller
//                             name="file"
//                             control={control}
//                             render={({ field }) => (
//                                 <input
//                                     id="file"
//                                     type="file"
//                                     onChange={(e) => {
//                                         field.onChange(e.target.files[0]);
//                                         handleFileUpload(e.target.files[0]);
//                                     }}
//                                     className={`form-input mt-1 block w-full ${errors.file ? 'border-red-500' : ''}`}
//                                 />
//                             )}
//                         />
//                         {errors.file && <span className="text-red-500 text-sm">{errors.file.message}</span>}
//                     </div>

//                     <button type="submit" className="btn btn-dark block w-full text-center">
//                         Add File
//                     </button>
//                 </form>
//             </Modal>
//         </div>
//     );
// };

// export default AddBookingFile;


