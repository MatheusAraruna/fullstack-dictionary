import { create } from 'zustand'
import type { Word } from '@/types/entities'

type Props = {
    word: Word
}

type ActionsProps = {
    setWord: (word: Word) => void
    reset: () => void
}

type StoreProps = Props & ActionsProps

export const useDictionaryStore = create<StoreProps>()((set) => {
  const intialState: Props = {
    word: {
      id: '',
      text: '',
      definition: '',
      example: ''
    }
  }

  return {
    ...intialState,
    setWord: (word) => {
      set((state) => ({
        ...state,
        word
      }))
    },
    reset: () => {
      set(intialState)
    }
  }
})
