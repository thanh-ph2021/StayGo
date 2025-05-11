import axiosClient from './axiosClient'
import { AuthResponse, GenerateOtpRequest, GoogleLoginRequest, FacebookLoginRequest, ResponseAPI, VerifyOtpRequest } from './type'

const authApi = {
    generateOtp: (data: GenerateOtpRequest): Promise<ResponseAPI<string>> => axiosClient.post('/auth/generate-otp', data),
    verifyOtp: (data: VerifyOtpRequest): Promise<ResponseAPI<AuthResponse>> => axiosClient.post('/auth/verify-otp', data),
    loginWithGoogle: (data: GoogleLoginRequest): Promise<ResponseAPI<AuthResponse>> => axiosClient.post('/auth/login-with-google', data),
    loginWithFacebook: (data: FacebookLoginRequest): Promise<ResponseAPI<AuthResponse>> => axiosClient.post('/auth/login-with-facebook', data),
}

export default authApi