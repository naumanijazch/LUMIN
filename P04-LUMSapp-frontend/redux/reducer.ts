import { createReducer } from "@reduxjs/toolkit";

export const authReducer = createReducer(
  {
    loading: false,
    error: null,
    user: null,
    isAuthenticated: false,
    isSignedUp: false,
  },
  {
    loginRequest: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },

    clearError: (state) => {
      state.error = null;
    },

    loadUserRequest: (state, action) => {
      state.loading = true;
    },
    loadUserSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    loadUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },

    reloadUserRequest: (state, action) => {
      // state.loading = true;
    },
    reloadUserSuccess: (state, action) => {
      // state.loading = false;
      state.user = action.payload.user;
      // state.isAuthenticated = true;
    },
    reloadUserFailure: (state, action) => {
      // state.loading = false;
      state.error = action.payload;
      // state.isAuthenticated = false;
    },

    signupRequest: (state) => {
      state.loading = true;
    },
    signupSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.isAuthenticated = false;
      state.isSignedUp = true;
    },
    signupFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
      state.isSignedUp = false;
    },

    otpRequest: (state) => {
      state.loading = true;
    },
    otpSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.isSignedUp = false;
    },
    otpFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
      state.isSignedUp = false;
    },

    logoutSuccess: (state) => {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
      state.isSignedUp = false;
    },
    logoutFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  }
);

export const postsReducer = createReducer(
  { loading: false, error: null, posts: [] },
  {
    postsRequest: (state) => {
      state.loading = true;
    },
    postsSuccess: (state, action) => {
      state.loading = false;
      state.posts = action.payload.post;
    },
    postsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  }
);

export const eventsReducer = createReducer(
  {
    loading: false,
    error: null,
    events: <any>[],
    tags: <any>[],
  },
  {
    eventsRequest: (state) => {
      state.loading = true;
    },
    eventsSuccess: (state, action) => {
      state.loading = false;
      state.events = action.payload.data.events;
      state.tags = action.payload.tags;
    },
    eventsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  }
);

export const notifReducer = createReducer(
  { loading: false, registered: false, error: null },
  {
    registerPushTokenRequest: (state) => {
      state.loading = true;
    },
    registerPushTokenSuccess: (state) => {
      state.loading = false;
      state.registered = true;
    },
    registerPushTokenFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  }
);
export const donationsReducer = createReducer(
  {
    loading: false,
    error: null,
    donations: [],
  },
  {
    donationsRequest: (state) => {
      state.loading = true;
      state.error = null; // Reset error state when making a new request
    },
    donationsSuccess: (state, action) => {
      state.loading = false;
      state.donations = action.payload.data.donation;
    },
    donationsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  }
);
