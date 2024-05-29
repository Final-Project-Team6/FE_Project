export default interface SearchBarProps {
  id: string
  placeholder: string
  value?: string
  dropDown?: string[]
  onChange?: React.ChangeEventHandler<HTMLInputElement>
}
