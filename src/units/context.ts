import {createContext} from 'react'
import {mutate} from 'stook'

export const userInfo = JSON.parse(localStorage.getItem(`[userInfo]`) as string)
export const UserInfoCtx = createContext(userInfo)
mutate('[userInfo]', userInfo)

export const UserItemCtx = createContext(1)

localStorage.setItem('[oAuthGithub]', 'f4a19c548244724596db')
export const clientID = localStorage.getItem('[oAuthGithub]')