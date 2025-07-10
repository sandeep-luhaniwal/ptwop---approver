import {
    APPROVER_ASSIGNMENTS_LINK,
    ASSIGNED_MERCHANTS_LINK,
    AUTO_DEPOSIT_REQUEST_LINK,
    DASHBOARD_LINK,
    DEPOSIT_OVERVIEW_LINK,
    PAYMENT_REPORTS_LINK,
    REPORTS_LINK,
    SETTINGS_LINK,
    UPLOAD_LOGS_LINK
} from "./constant";

export const SIDEBAR_DATA_LIST = [
    {
        title: "Dashboard",
        icon: "dashboard",
        path: DASHBOARD_LINK,
    },
    {
        title: "Multi Login User",
        icon: "people",
        path: DASHBOARD_LINK,
    },
    {
        title: "Deposit",
        icon: "deposit",
        path: APPROVER_ASSIGNMENTS_LINK,
    },
    {
        title: "Withdraw",
        icon: "withdraw",
        path: UPLOAD_LOGS_LINK,
    },
    {
        title: "Auto Deposit Request",
        icon: "deposit",
        path: AUTO_DEPOSIT_REQUEST_LINK,
    },
    {
        title: "Manual Deposit Request",
        icon: "deposit",
        path: DEPOSIT_OVERVIEW_LINK,
    },
    {
        title: "Manual Withdraw Request",
        icon: "deposit",
        path: DEPOSIT_OVERVIEW_LINK,
    },
    {
        title: "Reports",
        icon: "depositsoverview",
        path: REPORTS_LINK,
    },

    {
        title: "Assigned Merchant",
        icon: "assigne",
        path: ASSIGNED_MERCHANTS_LINK,
    },
    {
        title: "Payment Reports",
        icon: "paymentreports",
        path: PAYMENT_REPORTS_LINK,
    },
    {
        title: "Settings",
        icon: "settings",
        path: SETTINGS_LINK,
    },
    {
        title: "Sign Out",
        icon: "signout",
        path: "/",
    },
];




export const TOADY_SALES_DATA_LIST = [
    {
        title: "₹4.5 Lakh",
        bgColor: "bg-yellow-green",
        icon: "greenchat",
        heading: "Approved Today",
        des: "0,5% from yesterday",
    },
    {
        title: "800",
        bgColor: "bg-blue-chalk",
        icon: "pinkthreearrow",
        heading: "Total Request",
        des: "0,5% from yesterday",
    },
    {
        title: "20%",
        bgColor: "bg-white-titan",
        icon: "bluerightclick",
        heading: "Request Approved",
        des: "30 Mins Approving Accuracy",
    },
    {
        title: "5",
        bgColor: "bg-white-ice",
        icon: "greennotification",
        heading: "Active Approvers",
        des: "+8% from yesterday",
    },
    {
        title: "300",
        bgColor: "bg-yellow-wish",
        icon: "ornagehome",
        heading: "Active Merchants",
        des: "+8% from yesterday",
    },
]