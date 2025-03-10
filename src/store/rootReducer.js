import layout from "./layout";
import todo from "../pages/app/todo/store";
import email from "../pages/app/email/store";
import chat from "../pages/app/chat/store";
import project from "../pages/app/projects/store";
import kanban from "../pages/app/kanban/store";
import calendar from "../pages/app/calender/store";
import auth from "../pages/auth/common/store";
import employees from "../pages/All Employees/Reducer/EmployeesSlice"
import user from "../pages/UserPage/UserReducer/UserSlice"
import bookingdata from "../pages/Booking Files/BookingReducer/BookingSlice"
import paymentdata from "../pages/Payment Sheets/PaymentReducer/PaymentSlice"
import returnAndPendingdata from "../pages/Return & Pending/ReturnAndPendingReducer/ReturnAndPendingSlice"
import setting from "../pages/SettingPage/SettingReducer/settingSlice"
import sendEmail from "../pages/PendingOrders/sendMailReducer/emailSlice"
import branches from "../pages/All Branch/BranchReducer/branchSlice"
import paiduserdata from "../pages/PaidUserData/paidUserReducer/paidUserSlice"
import pendingorder from "../pages/PendingOrders/PendingOrderReducer/pendingOrderSlice"
import statistics from "../pages/EmployeeWork/statisticsReducer/statisticsSlice"
import trackingData from "../pages/forms/form-wizard/trackorderReducer/trackorderSlice"
import   shiprocket from "../pages/ShiprocketSettings/ShiprocketReducers/shiprocketSlice"

const rootReducer = {
  employees,
  branches,
  user,
  bookingdata,
  paymentdata,
  paiduserdata,
  trackingData,
  statistics,
  pendingorder,
  returnAndPendingdata,
  setting,
  sendEmail,
  layout,
  shiprocket,
  todo,
  email,
  chat,
  project,
  kanban,
  calendar,
  auth,
};
export default rootReducer;
