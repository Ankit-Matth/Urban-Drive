import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/authSlice'
import roleReducer from './features/role/roleSlice'
import contactReducer from './features/contactCategory/contactSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      role: roleReducer,
      contact: contactReducer
    },
  })
}