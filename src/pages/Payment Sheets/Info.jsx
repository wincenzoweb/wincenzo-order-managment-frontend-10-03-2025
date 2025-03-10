import React from 'react'
import Modal from "@/components/ui/Modal";
import { useSelector, useDispatch } from 'react-redux';
import Card from "@/components/ui/Card";
import { toggleInfoModal } from './PaymentReducer/PaymentSlice';

const InfoPage = () => {
    const { infoModel } = useSelector((state) => state.paymentdata);

    const dispatch = useDispatch();

    const data = [
        {
            article_number: 'ART123456',
            article_type: 'Parcel',
            booking_date: new Date(),
            booking_office_id: 'BO123',
            booking_office_name: 'Main Branch',
            booking_office_pin: '10001',
            booking_time: 10,
            delivery_office_id: 'DO456',
            delivery_office_name: 'Secondary Branch',
            delivery_office_pin: '10002',
            delivery_date: new Date(),
            rts: 'No',
            gross_amount: 200,
            commission: 5,
            amount_lc_1: 150,
            amount_lc_2: 150,
            round_off_amount: 0.5,
            net_payable: 195,
            payment_date: new Date(),
            payment_office_id: 'PO789',
            payment_office_name: 'Tertiary Branch',
            payment_document_no: 'PD002',
            payment_cheque_no: 'CHQ001',
            liability_document: 'LD789',
            system_postings: 'Completed',
            branch: 'NYC',
            status: 'Complete',
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

export default InfoPage;
