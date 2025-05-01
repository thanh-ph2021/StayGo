import { MMKV } from "react-native-mmkv"

export const storage = new MMKV()

// Helper functions
export const setItem = (key: string, value: string) => storage.set(key, value)
export const getItem = (key: string) => storage.getString(key)
export const deleteItem = (key: string) => storage.delete(key)

export * from './mmkvKeys'