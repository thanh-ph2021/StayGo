import { UserModel } from "@Models"

export interface ResponseAPI<T> {
    isSuccess: boolean,
    value?: T,
    error?: string
}
export interface GenerateOtpRequest {
    email: string
}

export interface VerifyOtpRequest {
    email: string
    otpCode: string
}

export interface AuthResponse {
    token: string,
    Expiration: Date,
    userProfile: UserModel
}

export interface GoogleLoginRequest {
    idToken: string
}

export interface FacebookLoginRequest {
    accessToken: string
}