import { toast } from "react-hot-toast"
import { setLoading, setToken } from "../../slices/authSlice"
import { setUser } from "../../slices/profileSlice"
import { apiConnector } from "../apiConnector"
import { endpoints } from "../apis"

const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
    RESETPASSTOKEN_API,
    RESETPASSWORD_API,
  } = endpoints

  export function sendOtp(email, navigate) {
    return async (dispatch) => {
      dispatch(setLoading(true))
      try {
        const response = await apiConnector("POST", SENDOTP_API, {
          email,
          checkUserPresent: true,
        })
         
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
  
        toast.success("OTP Sent Successfully")
        navigate("/verify-email")
      } catch (error) {
        toast.error("Could Not Send OTP")
      }
      dispatch(setLoading(false))
    }
  }

  export function signUp(
    accountType,
    username,
    email,
    password,
    otp,
    navigate
  ) {
    return async (dispatch) => {
      dispatch(setLoading(true))
      try {
        const response = await apiConnector("POST", SIGNUP_API, {
          accountType,
          username,
          email,
          password,
          otp,
        })
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
        toast.success("Signup Successful")
        navigate("/login")
      } catch (error) {
        toast.error("Signup Failed")
        navigate("/signup")
      }
      dispatch(setLoading(false))
    }
  }
 
  export const login = async (email, password, dispatch) => {
    let success = false;
    let accountType;
    dispatch(setLoading(true));
    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      });
    
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
    
      toast.success("Login Successful");
      dispatch(setToken(response.data.token));
      const userImage = response.data?.user?.image
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.username} ${response.data.user.username}`;
      dispatch(setUser({ ...response.data.user, image: userImage }));
      localStorage.setItem(
        "user",
        JSON.stringify({ ...response.data.user, image: userImage })
      );
      localStorage.setItem("token", JSON.stringify(response.data.token));
      accountType = response.data.user.accountType;
      success = true;
    } catch (error) {
      toast.error("Login Failed");
    }
    dispatch(setLoading(false));
    return { success, accountType }; 
  };

  export function getPasswordResetToken(email, setEmailSent) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      dispatch(setLoading(true))
      try {
        const response = await apiConnector("POST", RESETPASSTOKEN_API, {
          email,
        })
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
  
        toast.success("Reset Email Sent")
        setEmailSent(true)
      } catch (error) {
        toast.error("Failed To Send Reset Email")
      }
      toast.dismiss(toastId)
      dispatch(setLoading(false))
    }
  }

  export function resetPassword(password, confirmPassword, token, navigate) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      dispatch(setLoading(true))
      try {
        const response = await apiConnector("POST", RESETPASSWORD_API, {
          password,
          confirmPassword,
          token,
        })
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
  
        toast.success("Password Reset Successfully")
        navigate("/login")
      } catch (error) {
        toast.error("Failed To Reset Password")
      }
      toast.dismiss(toastId)
      dispatch(setLoading(false))
    }
  }
  
  export function logout(navigate) {
    return (dispatch) => {
      dispatch(setToken(null))
      dispatch(setUser(null))
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      toast.success("Logged Out")
      navigate("/")
    }
  }
  