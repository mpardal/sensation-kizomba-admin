import { useReducer } from 'react'

type Action =
  | { type: 'try-delete'; payload: { title: string; onConfirm: () => Promise<void> } }
  | { type: 'close' }
  | { type: 'delete' }

type State = {
  title: string
  onConfirm: () => Promise<void>
  isOpen: boolean
}

const defaultClose = () => Promise.resolve()

export function useDeleteEventAlertDialog() {
  const [state, dispatch] = useReducer(
    (state: State, action: Action) => {
      switch (action.type) {
        case 'try-delete':
          return {
            ...state,
            title: action.payload.title,
            isOpen: true,
            onConfirm: action.payload.onConfirm,
          }
        case 'close':
        case 'delete':
          return {
            ...state,
            isOpen: false,
            title: '',
            onConfirm: defaultClose,
          }
        default:
          return state
      }
    },
    {
      title: '',
      onConfirm: defaultClose,
      isOpen: false,
    }
  )

  return {
    dispatchTryDelete: (title: string, onConfirm: () => Promise<void>) => {
      dispatch({
        type: 'try-delete',
        payload: {
          title,
          onConfirm,
        },
      })
    },
    dispatchClose: () => {
      dispatch({
        type: 'close',
      })
    },
    dispatchDelete: async () => {
      await state.onConfirm()

      dispatch({
        type: 'delete',
      })
    },
    state,
  }
}
