import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../utils/axiosInstance'
import { staticProjects } from '../../data/staticData'

const initialState = {
  projects: staticProjects,
  featuredProjects: staticProjects.filter((project) => project.featured).slice(0, 3),
  currentProject: null,
  isLoading: false,
  error: null,
  totalPages: 1,
  currentPage: 1,
}

// Async thunks
export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async (params = {}, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams(params).toString()
      const response = await axiosInstance.get(`/projects?${queryParams}`)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch projects')
    }
  }
)

export const fetchFeaturedProjects = createAsyncThunk(
  'projects/fetchFeaturedProjects',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/projects?featured=true&limit=3')
      return response.data.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch featured projects')
    }
  }
)

export const fetchProjectById = createAsyncThunk(
  'projects/fetchProjectById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/projects/${id}`)
      return response.data.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch project')
    }
  }
)

export const createProject = createAsyncThunk(
  'projects/createProject',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/projects', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create project')
    }
  }
)

export const updateProject = createAsyncThunk(
  'projects/updateProject',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/projects/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update project')
    }
  }
)

export const deleteProject = createAsyncThunk(
  'projects/deleteProject',
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/projects/${id}`)
      return id
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete project')
    }
  }
)

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    clearProjectError: (state) => {
      state.error = null
    },
    clearCurrentProject: (state) => {
      state.currentProject = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all projects
      .addCase(fetchProjects.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.isLoading = false
        state.projects = action.payload.data
        state.totalPages = action.payload.totalPages
        state.currentPage = action.payload.currentPage
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        state.projects = staticProjects
      })
      // Fetch featured projects
      .addCase(fetchFeaturedProjects.fulfilled, (state, action) => {
        state.featuredProjects = action.payload
      })
      .addCase(fetchFeaturedProjects.rejected, (state) => {
        state.featuredProjects = staticProjects.filter((project) => project.featured).slice(0, 3)
      })
      // Fetch single project
      .addCase(fetchProjectById.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchProjectById.fulfilled, (state, action) => {
        state.isLoading = false
        state.currentProject = action.payload
      })
      .addCase(fetchProjectById.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Create project
      .addCase(createProject.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.isLoading = false
        state.projects.unshift(action.payload.data)
      })
      .addCase(createProject.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Update project
      .addCase(updateProject.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.isLoading = false
        const index = state.projects.findIndex(p => p._id === action.payload.data._id)
        if (index !== -1) {
          state.projects[index] = action.payload.data
        }
        if (state.currentProject?._id === action.payload.data._id) {
          state.currentProject = action.payload.data
        }
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Delete project
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.projects = state.projects.filter(p => p._id !== action.payload)
      })
  },
})

export const { clearProjectError, clearCurrentProject } = projectSlice.actions
export default projectSlice.reducer
