import { ROUTES } from "./routes"

export type RootStackParamList = {
  [ROUTES.SIGN_IN]: undefined
  [ROUTES.EMAIL_INPUT]: undefined
  [ROUTES.OTP]: { email: string }
  [ROUTES.TABS]: undefined
  [ROUTES.HOME]: undefined
  [ROUTES.MAIN]: undefined
  [ROUTES.NEARBY_HOTEL]: undefined
  [ROUTES.SEARCH]: undefined
  [ROUTES.HOTEL_DETAIL]: {hotelId: string}
}

export type BottomTabParamList = {
  [ROUTES.HOME]: undefined
  [ROUTES.MY_BOOKING]: undefined
  [ROUTES.MESSAGE]: undefined
  [ROUTES.PROFILE]: undefined
}