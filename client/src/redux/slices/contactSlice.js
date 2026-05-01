import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../utils/axiosInstance'

const initialState = {
  messages: [],
  stats: { total: 0, unread: 0, today: 0 },
  isLoading: false,
  submitLoading: false,
  error: null,
  submitSuccess: false,
  referenceId: null,
  totalPages: 1,
  currentPage: 1,
}

// Async thunks
export const fetchMessages = createAsyncThunk(
  'contact/fetchMessages',
  async (params = {}, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams(params).toString()
      const response = await axiosInstance.get(`/contact?${queryParams}`)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch messages')
    }
  }
)

export const fetchMessageStats = createAsyncThunk(
  'contact/fetchMessageStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/contact/stats')
      return response.data.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch stats')
    }
  }
)

export const submitContact = createAsyncThunk(
  'contact/submitContact',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/contact', formData)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to send message')
    }
  }
)

export const toggleMessageRead = createAsyncThunk(
  'contact/toggleMessageRead',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch(`/contact/${id}/read`)
      return response.data.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update message')
    }
  }
)

export const deleteMessage = createAsyncThunk(
  'contact/deleteMessage',
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/contact/${id}`)
      return id
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete message')
    }
  }
)

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    clearContactError: (state) => {
      state.error = null
    },
    clearSubmitSuccess: (state) => {
      state.submitSuccess = false
      state.referenceId = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch messages
      .addCase(fetchMessages.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.isLoading = false
        state.messages = action.payload.data
        state.totalPages = action.payload.totalPages
        state.currentPage = action.payload.currentPage
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Fetch stats
      .addCase(fetchMessageStats.fulfilled, (state, action) => {
        state.stats = action.payload
      })
      // Submit contact
      .addCase(submitContact.pending, (state) => {
        state.submitLoading = true
        state.error = null
        state.submitSuccess = false
      })
      .addCase(submitContact.fulfilled, (state, action) => {
        state.submitLoading = false
        state.submitSuccess = true
        state.referenceId = action.payload.referenceId
      })
      .addCase(submitContact.rejected, (state, action) => {
        state.submitLoading = false
        state.error = action.payload
      })
      // Toggle read status
      .addCase(toggleMessageRead.fulfilled, (state, action) => {
        const index = state.messages.findIndex(m => m._id === action.payload._id)
        if (index !== -1) {
          state.messages[index] = action.payload
        }
        // Update stats
        state.stats.unread = action.payload.isRead 
          ? state.stats.unread - 1 
          : state.stats.unread + 1
      })
      // Delete message
      .addCase(deleteMessage.fulfilled, (state, action) => {
        state.messages = state.messages.filter(m => m._id !== action.payload)
        state.stats.total = state.stats.total - 1
      })
  },
})

export const { clearContactError, clearSubmitSuccess } = contactSlice.actions
export default contactSlice.reducer
