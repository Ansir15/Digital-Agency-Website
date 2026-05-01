import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../utils/axiosInstance'

// Get user from localStorage
const getStoredAuth = () => {
  try {
    const token = localStorage.getItem('token')
    const admin = JSON.parse(localStorage.getItem('admin') || 'null')
    if (token && admin) {
      return { token, admin, isAuthenticated: true }
    }
  } catch (error) {
    console.error('Error parsing stored auth:', error)
  }
  return { token: null, admin: null, isAuthenticated: false }
}

const initialState = {
  ...getStoredAuth(),
  isLoading: false,
  error: null,
}

// Async thunks
export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/auth/login', credentials)
      const { token, admin } = response.data
      localStorage.setItem('token', token)
      localStorage.setItem('admin', JSON.stringify(admin))
      return { token, admin }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed')
    }
  }
)

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await axiosInstance.post('/auth/logout')
      localStorage.removeItem('token')
      localStorage.removeItem('admin')
      return null
    } catch (error) {
      localStorage.removeItem('token')
      localStorage.removeItem('admin')
      return rejectWithValue(error.response?.data?.message || 'Logout failed')
    }
  }
)

export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/auth/profile')
      return response.data.admin
    } catch (error) {
      localStorage.removeItem('token')
      localStorage.removeItem('admin')
      return rejectWithValue('Session expired')
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    setCredentials: (state, action) => {
      state.token = action.payload.token
      state.admin = action.payload.admin
      state.isAuthenticated = true
    },
    logoutSync: (state) => {
      state.token = null
      state.admin = null
      state.isAuthenticated = false
      state.error = null
      localStorage.removeItem('token')
      localStorage.removeItem('admin')
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.token = action.payload.token
        state.admin = action.payload.admin
        state.isAuthenticated = true
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.token = null
        state.admin = null
        state.isAuthenticated = false
      })
      // Check Auth
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.admin = action.payload
        state.isAuthenticated = true
      })
      .addCase(checkAuth.rejected, (state) => {
        state.token = null
        state.admin = null
        state.isAuthenticated = false
      })
  },
})

export const { clearError, setCredentials, logoutSync } = authSlice.actions
export default authSlice.reducer
