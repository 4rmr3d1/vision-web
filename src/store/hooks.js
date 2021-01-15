import {
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector
} from 'react-redux'

export const useDispatch = () => {
  const dispatch = useReduxDispatch()
  return { dispatch }
}

export const useSelector = (selector, equalityFn) => {
  return useReduxSelector(selector, equalityFn)
}
