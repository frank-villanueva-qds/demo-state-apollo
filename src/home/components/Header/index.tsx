import {
  DarkModeMutation,
  DarkModeQuery,
  type DarkModeQueryType,
} from '@/home/models/DarkMode'
import { useMutation, useQuery } from '@apollo/client'

import { Switch } from '@headlessui/react'

const Header = () => {
  const { data: currentData } = useQuery<DarkModeQueryType>(DarkModeQuery)

  const [mutation] = useMutation(DarkModeMutation, {
    update(cache) {
      cache.writeQuery({
        query: DarkModeQuery,
        data: {
          isDarkMode: !currentData?.isDarkMode,
        },
      })
    },
  })

  return (
    <header
      className={`w-full ${
        currentData?.isDarkMode ? 'bg-black' : 'bg-gray-300'
      } text-white sticky top-0 p-4`}
    >
      <h1>Header</h1>
      <Switch
        checked={currentData?.isDarkMode}
        onChange={() => {
          void mutation()
        }}
        className={`${currentData?.isDarkMode ? 'bg-teal-900' : 'bg-teal-700'}
          relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={`${
            currentData?.isDarkMode ? 'translate-x-9' : 'translate-x-0'
          }
            pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
    </header>
  )
}

export default Header
