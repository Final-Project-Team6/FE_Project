import { PostSearchParamKeys } from '@/constants/params/postSearch.params'

export default interface SearchBarProps {
  id: string
  placeholder: string
  value?: string
  dropDown?: PostSearchParamKeys[]
  onChange?: React.ChangeEventHandler<HTMLInputElement>
}
