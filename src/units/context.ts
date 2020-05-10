import {createContext} from 'react'

export const userInfo = JSON.parse(localStorage.getItem(`userInfo`) as string)
export const UserInfo = createContext(userInfo)

export const UserItemCtx = createContext(1)