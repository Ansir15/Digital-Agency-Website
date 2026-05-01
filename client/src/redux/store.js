import { configureStore } from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import projectSlice from './slices/projectSlice'
import blogSlice from './slices/blogSlice'
import contactSlice from './slices/contactSlice'
import teamSlice from './slices/teamSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    projects: projectSlice,
    blog: blogSlice,
    contact: contactSlice,
    team: teamSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['auth/setCredentials'],
      },
    }),
})
