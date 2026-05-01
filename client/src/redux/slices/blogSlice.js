import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../utils/axiosInstance'
import { staticBlogPosts } from '../../data/staticData'

const initialState = {
  posts: staticBlogPosts,
  currentPost: null,
  relatedPosts: [],
  isLoading: false,
  error: null,
  totalPages: 1,
  currentPage: 1,
}

// Async thunks
export const fetchPosts = createAsyncThunk(
  'blog/fetchPosts',
  async (params = {}, { rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams(params).toString()
      const response = await axiosInstance.get(`/blog?${queryParams}`)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch posts')
    }
  }
)

export const fetchPostBySlug = createAsyncThunk(
  'blog/fetchPostBySlug',
  async (slug, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/blog/${slug}`)
      return response.data.data
    } catch (error) {
      const fallbackPost = staticBlogPosts.find((post) => post.slug === slug)
      if (fallbackPost) {
        const relatedPosts = staticBlogPosts
          .filter((post) => post.category === fallbackPost.category && post.slug !== slug)
          .slice(0, 3)
        return { post: fallbackPost, relatedPosts }
      }
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch post')
    }
  }
)

export const createPost = createAsyncThunk(
  'blog/createPost',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/blog', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create post')
    }
  }
)

export const updatePost = createAsyncThunk(
  'blog/updatePost',
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/blog/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update post')
    }
  }
)

export const deletePost = createAsyncThunk(
  'blog/deletePost',
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/blog/${id}`)
      return id
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete post')
    }
  }
)

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    clearBlogError: (state) => {
      state.error = null
    },
    clearCurrentPost: (state) => {
      state.currentPost = null
      state.relatedPosts = []
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all posts
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isLoading = false
        state.posts = action.payload.data
        state.totalPages = action.payload.totalPages
        state.currentPage = action.payload.currentPage
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
        state.posts = staticBlogPosts
      })
      // Fetch single post
      .addCase(fetchPostBySlug.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchPostBySlug.fulfilled, (state, action) => {
        state.isLoading = false
        state.currentPost = action.payload.post
        state.relatedPosts = action.payload.relatedPosts
      })
      .addCase(fetchPostBySlug.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Create post
      .addCase(createPost.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false
        state.posts.unshift(action.payload.data)
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Update post
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.posts.findIndex(p => p._id === action.payload.data._id)
        if (index !== -1) {
          state.posts[index] = action.payload.data
        }
        if (state.currentPost?._id === action.payload.data._id) {
          state.currentPost = action.payload.data
        }
      })
      // Delete post
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter(p => p._id !== action.payload)
      })
  },
})

export const { clearBlogError, clearCurrentPost } = blogSlice.actions
export default blogSlice.reducer
