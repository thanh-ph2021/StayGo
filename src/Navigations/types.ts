import { ROUTES } from "./routes"

export type RootStackParamList = {
  [ROUTES.SIGN_IN]: undefined
  [ROUTES.SIGN_UP]: undefined
  [ROUTES.OTP]: { phoneNumber: string }
  [ROUTES.TABS]: undefined
}

export type BottomTabParamList = {
  [ROUTES.HOME]: undefined
}