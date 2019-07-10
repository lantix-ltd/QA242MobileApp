const SERVER = "https://qa.hwryk.com/"

export default {
    LOGIN_URL: SERVER + "outlet-admin-login",
    CHECKS_LIST_URL: SERVER + "get-checklists-data",
    CHECK_LIST_DETAIL_URL: SERVER + "checklists-detail",
    SUBMIT_CHECK_URL: SERVER + "submit-assignment-answer",
    USER_NOTIFICATIONS_URL: SERVER + "get-user-notification",
    SUBMIT_AS_REVIEWED_URL: SERVER + "change-status-for-review",
    ALL_USERS_CONTACTS_URL: SERVER + "get-users-list",
    UPDATE_PASSWORD_URL: SERVER + "update-user-password",
    UPDATE_PROFILE_INFO_URL: SERVER + "user-profile-update",
    UPDATE_PROFILE_PIC_URL: SERVER + "user-picture-update",
    LOGOUT_USER_URL: SERVER + "mobile-user-logout",
    CHAT_HISTORY_URL: SERVER + "user-chat-list",
    SEND_MESSAGE_URL: SERVER + "send-user-message",
    SUBMIT_AS_ACCEPTED_URL: SERVER + "change-status-for-approve",
    TRUCK_INSPECT_FORM_URL: SERVER + "submit-truck-inspection",
    SHIPPING_INSPECT_FORM_URL: SERVER + "submit-shipping-inspection",
    PALLETIZING_FORM_URL: SERVER + "submit-palletizing-inspection",
    CLEANING_INSPECT_URL: SERVER + "submit-cleaning-inspection",
    BULK_INSPECT_URL: SERVER + "submit-bulk-inspection",
    REPACK_INSPECT_URL: SERVER + "submit-recode-inspection",
}