import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  accessToken: string
}

const initialState: AuthState = {
  accessToken: '',
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    storeAT: (state, action: PayloadAction<any>) => {
      state.accessToken = action.payload.access_token
    },
  },
})

export const { storeAT } = authSlice.actions

export default authSlice.reducer