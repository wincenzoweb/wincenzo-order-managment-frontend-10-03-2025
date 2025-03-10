import React from "react";
import Modal from "@/components/ui/Modal";
import { useSelector, useDispatch } from "react-redux";
import Textinput from "@/components/ui/Textinput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  AddNewSettings,
  getAllsettings,
  toggleAddModal,
} from "../SettingReducer/settingSlice";

const AddSetting = () => {
  const { addModal } = useSelector((state) => state.setting); // This should provide the 'true' or 'false' state
  const dispatch = useDispatch();

  const FormValidationSchema = yup.object({
    SenderMail: yup.string().email("Invalid email").required("Email is required"),
    SenderEmailPassword: yup.string().required("Password is required"),

  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(FormValidationSchema),
    mode: "all",
  });


  const onSubmit = (data) => {
    console.log('Form Data:', data);  // Log form data
    const newset = {
        SenderMail: data.SenderMail,
        SenderEmailPassword: data.SenderEmailPassword,
    };

    dispatch(AddNewSettings(newset));
    console.log('Dispatched AddNewSettings'); // Confirm dispatch
    setTimeout(() => {
        dispatch(toggleAddModal(false)); // Close modal after form submission
        dispatch(getAllsettings("setting"));
        reset();
    }, 500);
};




  // const onSubmit = (data) => {
  //   const newset = {
  //     SenderMail: data.SenderMail,
  //     SenderEmailPassword: data.SenderEmailPassword,
     
  //   };

  //   dispatch(AddNewSettings(newset));
  //   setTimeout(() => {
  //     dispatch(toggleAddModal(false)); // Close modal after form submission
  //     dispatch(getAllsettings("setting"));
  //     reset();
  //   }, 500);
  // };

  return (
    <div>
      {/* Ensure activeModal is passed correctly */}
      <Modal
        title="Add New Setting"
        labelclassName="btn-outline-dark"
        activeModal={addModal} // This should control modal visibility
        onClose={() => dispatch(toggleAddModal(false))}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid lg:grid-cols-2 md:grid-cols-2 gap-4 grid-cols-1">
            <Textinput
              name="SenderMail"
              label="Sender Mail Id"
              type="email"
              placeholder="Sender Mail Id"
              register={register}
              error={errors.SenderMail?.message}
              className="h-[48px]"
            />
            <Textinput
              name="SenderEmailPassword"
              label="Sender Email Password"
              type="text"
              placeholder="Sender Email Password"
              register={register}
              error={errors.SenderEmailPassword?.message}
              className="h-[48px]"
            />
         
          </div>
          <button type="submit" className="btn btn-dark block w-full text-center">
            Create Setting
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default AddSetting;










// import React from "react";
// import Modal from "@/components/ui/Modal";
// import { useSelector, useDispatch } from "react-redux";
// import Textinput from "@/components/ui/Textinput";
// import { useForm, Controller } from "react-hook-form"; // Import Controller
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";


// import { AddNewSettings, getAllsettings, toggleAddModal } from "../SettingReducer/settingSlice";


// const AddSetting = () => {
//     const { addModal } = useSelector((state) => state.settings);
//     const dispatch = useDispatch();

//     const FormValidationSchema = yup.object({
//         SenderMail: yup.string().email("Invalid email").required("Email is required"),
//         SenderEmailPassword: yup.string().required("Password is required"),
//         MaxPendingDelay: yup.string().required("Day is required"),

//     }).required();

//     const {
//         control,
//         register,
//         handleSubmit,
//         formState: { errors },
//         reset
//     } = useForm({
//         resolver: yupResolver(FormValidationSchema),
//         mode: "all",
//     });

//     const onSubmit = (data) => {

//         const newset = {
//             SenderMail: data.SenderMail,
//             SenderEmailPassword: data.SenderEmailPassword,
//             MaxPendingDelay: data.MaxPendingDelay

//         };

//         dispatch(AddNewSettings(newset));
//         setTimeout(() => {
//             dispatch(toggleAddModal(false));
//             dispatch(getAllsettings("setting"));
//             reset();
//         }, 500);
//     };

//     return (
//         <div>
//             <Modal
//                 title="Add New Setting"
//                 labelclassName="btn-outline-dark"
//                 activeModal={addModal}
//                 onClose={() => dispatch(toggleAddModal(false))}
//             >
//                 <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 ">
//                     <div className="grid lg:grid-cols-2 md:grid-cols-2 gap-4 grid-cols-1">
//                         <Textinput
//                             name="SenderMail"
//                             label="Sender Mail Id"
//                             type="email"
//                             placeholder="Sender Mail Id"
//                             register={register}
//                             error={errors.SenderMail?.message}
//                             className="h-[48px]"
//                         />
//                         <Textinput
//                             name="SenderEmailPassword"
//                             label="Sender Email Password"
//                             type="text"
//                             placeholder="Sender Email Password"
//                             register={register}
//                             error={errors.SenderEmailPassword?.message}
//                             className="h-[48px]"
//                         />

//                         <Textinput
//                             name="MaxPendingDelay"
//                             label="Max Pending Day"
//                             type="number"
//                             placeholder="Max Pending Day"
//                             register={register}
//                             error={errors.MaxPendingDelay?.message}
//                             className="h-[48px]"
//                         />
//                     </div>


//                     <button type="submit" className="btn btn-dark block w-full text-center">
//                         Create Setting
//                     </button>
//                 </form>
//             </Modal>
//         </div>
//     );
// };

// export default AddSetting;