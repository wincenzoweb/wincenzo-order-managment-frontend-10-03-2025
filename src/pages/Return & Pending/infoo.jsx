import React from 'react'
import Modal from "@/components/ui/Modal";
import { useSelector, useDispatch } from 'react-redux';
import Card from "@/components/ui/Card";
import { toggleInfoModal } from './ReturnAndPendingReducer/ReturnAndPendingSlice';

const InfooPage = () => {
    const { infoModel } = useSelector((state) => state.returnAndPendingdata);

    const dispatch = useDispatch();

    const data = [
        {
            barcode: 'EZ721666544IN',
        },
    ];

    // Helper function to format dates
    const formatDate = (date) => {
        return date instanceof Date ? date.toLocaleDateString() : date;
    };

    // Create fields array from the keys of the first data object
    const fields = Object.keys(data[0]).map(key => ({
        label: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim(),
        key: key
    }));

    return (
        <div>
            <Modal
                title="Info About File"
                labelclassName="btn-outline-dark"
                activeModal={infoModel}
                className="max-w-fit"
                onClose={() => dispatch(toggleInfoModal(false))}
            >
                <Card noborder>
                    <div className="overflow-x-auto -mx-6">
                        <div className="inline-block min-w-full align-middle">
                            <div className="overflow-hidden ">
                                <table className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700">
                                    <thead className="bg-slate-200 dark:bg-slate-700">
                                        <tr>
                                            {fields.map((field) => (
                                                <th
                                                    key={field.key}
                                                    scope="col"
                                                    className="table-th "
                                                >
                                                    {field.label}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700">
                                        {data.map((item, index) => (
                                            <tr
                                                key={index}
                                                className="even:bg-slate-200 dark:even:bg-slate-700"
                                            >
                                                {fields.map((field) => (
                                                    <td
                                                        key={field.key}
                                                        className="table-td"
                                                    >
                                                        {formatDate(item[field.key])}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </Card>
                <div className="mt-4 bg-red-400 text-white p-4 rounded">
                    Note: This field is required in your Excel file. Make sure it is filled out correctly.
                    Do not add extra information or leave it empty.
                    This helps us process your data quickly and accurately.
                </div>
            </Modal>
        </div>
    );
}

export default InfooPage;
