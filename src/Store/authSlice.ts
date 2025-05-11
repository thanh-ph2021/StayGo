import { UserModel } from '@Models'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './type'

interface AuthState {
    isAuthenticated: boolean
    user: UserModel | null
}

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<UserModel>) => {
            state.isAuthenticated = true
            state.user = action.payload
        },
        logout: (state) => {
            state.isAuthenticated = false
            state.user = null
        },
    },
})

export const { loginSuccess, logout } = authSlice.actions
export default authSlice.reducer

export const userProfile = (state: RootState) => state.auth.user