import { ROUTES } from "./routes"

export type RootStackParamList = {
  [ROUTES.SIGN_IN]: undefined
  [ROUTES.EMAIL_INPUT]: undefined
  [ROUTES.OTP]: { email: string }
  [ROUTES.TABS]: undefined
  [ROUTES.HOME]: undefined
  [ROUTES.MAIN]: undefined
}

export type BottomTabParamList = {
  [ROUTES.HOME]: undefined
}