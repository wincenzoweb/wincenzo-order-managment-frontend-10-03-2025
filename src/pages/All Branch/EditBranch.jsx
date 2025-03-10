import React, { useEffect } from "react";
import Modal from "@/components/ui/Modal";
import { useSelector, useDispatch } from "react-redux";
import Textinput from "@/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { getAllBranch, toggleEditModal, updateBranch } from "./BranchReducer/branchSlice";

const EditBranch = () => {
    const { editModal, editItem } = useSelector((state) => state.branches);
    const dispatch = useDispatch();

    const FormValidationSchema = yup.object({
        branchName: yup.string().required("Branch name is required"),
        branchId: yup.string().required("Branch ID is required"),
        branchAddress: yup.string().required("Branch address is required"),
        branchManagerName: yup.string().required("Branch manager name is required"),
    }).required();

    const {
        register,
        reset,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: yupResolver(FormValidationSchema),
        mode: "all",
    });

    useEffect(() => {
        reset(editItem);
    }, [editItem]);

    const onSubmit = (data) => {
        const Branch = {
            id: editItem?._id,
            data
        };

        dispatch(updateBranch(Branch));

        setTimeout(() => {
            dispatch(toggleEditModal(false));
            dispatch(getAllBranch("branches"));
            reset();
        }, 500);
    };

    return (
        <div>
            <Modal
                title="Edit Branch"
                labelclassName="btn-outline-dark"
                activeModal={editModal}
                onClose={() => dispatch(toggleEditModal(false))}
            >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <Textinput
                        name="branchName"
                        label="Branch Name"
                        type="text"
                        placeholder="Enter branch name"
                        register={register}
                        defaultValue={editItem.branchName}
                        error={errors.branchName}
                        className="h-[48px]"
                    />
                    <Textinput
                        name="branchId"
                        label="Branch ID"
                        type="text"
                        placeholder="Enter branch ID"
                        register={register}
                        defaultValue={editItem.branchId}
                        error={errors.branchId}
                        className="h-[48px]"
                    />
                    <Textinput
                        name="branchAddress"
                        label="Branch Address"
                        type="text"
                        placeholder="Enter branch address"
                        register={register}
                        defaultValue={editItem.branchAddress}
                        error={errors.branchAddress}
                        className="h-[48px]"
                    />
                    <Textinput
                        name="branchManagerName"
                        label="Branch Manager Name"
                        type="text"
                        placeholder="Enter branch manager name"
                        register={register}
                        defaultValue={editItem.branchManagerName}
                        error={errors.branchManagerName}
                        className="h-[48px]"
                    />

                    <button className="btn btn-dark block w-full text-center">
                        Update Branch
                    </button>
                </form>
            </Modal>
        </div>
    );
};

export default EditBranch;
