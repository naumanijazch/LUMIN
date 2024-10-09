import axios from "axios";
import { IP } from "../constants/ip";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const login =
  (email: string, password: string) => async (dispatch: any) => {
    try {
      dispatch({ type: "loginRequest" });

      const { data } = await axios.post(
        `${IP}/user/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Append email and password to async storage array if email doesn't exist
      const existingData = await AsyncStorage.getItem("userData");
      const userData = { email, password, data };
      let newData = existingData ? JSON.parse(existingData) : [];
      const existingUser = newData.find((user: any) => user.email === email);
      if (!existingUser) {
        newData.push(userData);
      }
      await AsyncStorage.setItem("userData", JSON.stringify(newData));

      dispatch({ type: "loginSuccess", payload: data });
    } catch (error: any) {
      dispatch({
        type: "loginFailure",
        payload: error.response.data.message,
      });
    }
  };

export const loadUser = () => async (dispatch: any) => {
  try {
    dispatch({ type: "loadUserRequest" });

    const { data } = await axios.get(`${IP}/user/me`);

    dispatch({ type: "loadUserSuccess", payload: data });
  } catch (error: any) {
    dispatch({
      type: "loadUserFailure",
      payload: error.response.data.message,
    });
  }
};

export const reloadUser = () => async (dispatch: any) => {
  try {
    dispatch({ type: "reloadUserRequest" });

    const { data } = await axios.get(`${IP}/user/me`);

    dispatch({ type: "reloadUserSuccess", payload: data });
  } catch (error: any) {
    dispatch({
      type: "reloadUserFailure",
      payload: error.response.data.message,
    });
  }
};

export const signup =
  (name: string, email: string, password: string) => async (dispatch: any) => {
    try {
      dispatch({ type: "signupRequest" });

      const { data } = await axios.post(
        `${IP}/user/signup`,
        {
          name,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch({ type: "signupSuccess", payload: data });
    } catch (error: any) {
      dispatch({
        type: "signupFailure",
        payload: error.response.data.message,
      });
    }
  };

export const verifyOtp = (otp: string) => async (dispatch: any) => {
  try {
    dispatch({ type: "otpRequest" });

    const { data } = await axios.post(
      `${IP}/user/verify`,
      { otp },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({ type: "otpSuccess", payload: data });
  } catch (error: any) {
    dispatch({ type: "otpFailure", payload: error.response.data.message });
  }
};

export const logout = () => async (dispatch: any) => {
  try {
    await axios.get(`${IP}/user/logout`);

    dispatch({ type: "logoutSuccess" });
  } catch (error: any) {
    dispatch({
      type: "logoutFailure",
      payload: error.response.data.message,
    });
  }
};

export const getEvents = () => async (dispatch: any) => {
  try {
    dispatch({ type: "eventsRequest" });

    const { data } = await axios.post(`${IP}/event/get`);

    data.events = data.events.map((event: any) => {
      event.startTime = event.startTime.toString();
      event.endTime = event.endTime.toString();
      event.postedBy._id = event.postedBy._id.toString();
      return event;
    });

    // console.log(data.events);

    const tags = Array.from(
      new Set(data.events.map((event: any) => event.category))
    );

    dispatch({ type: "eventsSuccess", payload: { data, tags } });
  } catch (error: any) {
    console.log(error);
    dispatch({
      type: "eventsFailure",
      payload: error.response.data.message,
    });
  }
};

export const registerPushToken = (token: string) => async (dispatch: any) => {
  try {
    dispatch({ type: "registerPushTokenRequest" });

    await axios.post(`${IP}/notification/register`, {
      token,
    });

    dispatch({ type: "registerPushTokenSuccess" });
  } catch (error: any) {
    dispatch({
      type: "registerPushTokenFailure",
      payload: error.response.data.message,
    });
  }
};
export const getDonations = () => async (dispatch: any) => {
  try {
    dispatch({ type: "donationsRequest" });

    const { data } = await axios.post(`${IP}/donations/get`);

    data.donation = data.donation.map((donation: any) => {
      donation.createdAt = donation.createdAt.toString();
      donation.updatedAt = donation.updatedAt.toString();
      return donation;
    });

    dispatch({ type: "donationsSuccess", payload: { data } });
  } catch (error: any) {
    console.log(error.response.data);
    dispatch({
      type: "donationsFailure",
      payload: error.response.data.message,
    });
  }
};
