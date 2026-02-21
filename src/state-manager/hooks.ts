import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'

// `useDispatch` and `useSelector`with types supported
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
