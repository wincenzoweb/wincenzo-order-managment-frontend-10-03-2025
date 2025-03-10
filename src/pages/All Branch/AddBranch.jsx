import React from "react";
import Modal from "@/components/ui/Modal";
import { useSelector, useDispatch } from "react-redux";
import Textinput from "@/components/ui/Textinput";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { addBranch, getAllBranch, toggleAddModal } from "./BranchReducer/branchSlice";


const AddBranch = () => {
    const { addModel } = useSelector((state) => state.branches);
    const dispatch = useDispatch();



    const FormValidationSchema = yup.object({
        branchName: yup.string().required("Branch name is required"),
        branchId: yup.string().required("Branch ID is required"),
        branchAddress: yup.string().required("Branch address is required"),
        branchManagerName: yup.string().required("Branch manager name is required"),
    }).required();

    const {
        register,
        control,
        reset,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: yupResolver(FormValidationSchema),
        mode: "all",
    });

    const onSubmit = (data) => {
        const Branch = {
            branchName: data.branchName,
            branchId: data.branchId,
            branchAddress: data.branchAddress,
            branchManagerName: data.branchManagerName,
        };
        dispatch(addBranch(Branch));

        setTimeout(() => {
            dispatch(toggleAddModal(false));
            dispatch(getAllBranch("branches"));
            reset();
        }, 500);
    };

    return (
        <div>
            <Modal
                title="Add Branch"
                labelclassName="btn-outline-dark"
                activeModal={addModel}
                onClose={() => dispatch(toggleAddModal(false))}
            >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <Textinput
                        name="branchName"
                        label="Branch Name"
                        type="text"
                        placeholder="Enter branch name"
                        register={register}
                        error={errors.branchName}
                        className="h-[48px]"
                    />
                    <Textinput
                        name="branchId"
                        label="Branch ID"
                        type="text"
                        placeholder="Enter branch ID"
                        register={register}
                        error={errors.branchId}
                        className="h-[48px]"
                    />
                    <Textinput
                        name="branchAddress"
                        label="Branch Address"
                        type="text"
                        placeholder="Enter branch address"
                        register={register}
                        error={errors.branchAddress}
                        className="h-[48px]"
                    />
                    <Textinput
                        name="branchManagerName"
                        label="Branch Manager Name"
                        type="text"
                        placeholder="Enter branch manager name"
                        register={register}
                        error={errors.branchManagerName}
                        className="h-[48px]"
                    />

                    <button className="btn btn-dark block w-full text-center">
                        Create an account
                    </button>
                </form>
            </Modal>
        </div>
    );
};

export default AddBranch;
