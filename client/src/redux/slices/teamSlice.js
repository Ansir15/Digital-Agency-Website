import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../utils/axiosInstance'

const initialState = {
  members: [],
  currentMember: null,
  isLoading: false,
  error: null,
}

// Async thunks
export const fetchAllMembers = createAsyncThunk(
  'team/fetchAllMembers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/team')
      return response.data.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch team members')
    }
  }
)

export const createMember = createAsyncThunk(
  'team/createMember',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/team', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create member')
    }
  }
)

export const updateMember = createAsyncThunk(
  'team/updateMember',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/team/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update member')
    }
  }
)

export const deleteMember = createAsyncThunk(
  'team/deleteMember',
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/team/${id}`)
      return id
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete member')
    }
  }
)

export const reorderMembers = createAsyncThunk(
  'team/reorderMembers',
  async (orders, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put('/team/reorder', { orders })
      return response.data.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to reorder members')
    }
  }
)

const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {
    clearTeamError: (state) => {
      state.error = null
    },
    clearCurrentMember: (state) => {
      state.currentMember = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all members
      .addCase(fetchAllMembers.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchAllMembers.fulfilled, (state, action) => {
        state.isLoading = false
        state.members = action.payload
      })
      .addCase(fetchAllMembers.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Create member
      .addCase(createMember.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(createMember.fulfilled, (state, action) => {
        state.isLoading = false
        state.members.push(action.payload.data)
      })
      .addCase(createMember.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Update member
      .addCase(updateMember.fulfilled, (state, action) => {
        const index = state.members.findIndex(m => m._id === action.payload.data._id)
        if (index !== -1) {
          state.members[index] = action.payload.data
        }
      })
      // Delete member
      .addCase(deleteMember.fulfilled, (state, action) => {
        state.members = state.members.filter(m => m._id !== action.payload)
      })
      // Reorder members
      .addCase(reorderMembers.fulfilled, (state, action) => {
        state.members = action.payload
      })
  },
})

export const { clearTeamError, clearCurrentMember } = teamSlice.actions
export default teamSlice.reducer
