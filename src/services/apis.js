const BASE_URL = import.meta.env.VITE_BASE_URL || "https://servicehub-backend.onrender.com/api"

//Auth endpoints
export const endpoints = {
    SENDOTP_API: BASE_URL + "/auth/sendotp",
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",
    RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
    RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
  }

  //Profile endpoints
  export const profileEndpoints = {
    GET_USER_DETAILS_API: BASE_URL + "/profile/getUserDetails",
    UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
  }

  //ServiceCenter endpoints
  export const serviceCenterEndpoints = {
    GET_SERVICECENTER_DETAILS_API: BASE_URL + "/serviceCenter/getServiceCenterDetails",
    ADD_SERVICECENTER_DETAILS_API: BASE_URL + "/serviceCenter/createServiceCenter",
    EDIT_SERVICECENTER_API: BASE_URL + "/serviceCenter/editService",
    GET_ALL_SERVICES_FOR_OWNER_API: BASE_URL + "/serviceCenter/getAllServicesOfOwner",
    GET_SERVICES_CATEGORIES_API: BASE_URL + "/showAllCategories",
    GET_SERVICE_DETAILS_API: BASE_URL + "/serviceCenter/getServiceDetails",
    GET_ALL_SERVICES_API: BASE_URL + "/serviceCenter/getAllServices",
  }

  export const contactusEndpoint = {
    CONTACT_US_API: BASE_URL + "/contact",
  }