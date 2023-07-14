import { makeVar } from '@apollo/client'

export const isDarkModeVar = makeVar(true)

export const toggleDarkMode = () => {
  const currentMode = isDarkModeVar()
  isDarkModeVar(!currentMode)
}
