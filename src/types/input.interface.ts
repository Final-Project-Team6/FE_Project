export default interface InputProps {
  id?: string
  type?: string
  disabled?: boolean
  placeholder: string
  required?: boolean
  status?: string
  timer?: string
  clearIcon?: boolean
  passwordIcon?: boolean
  checkIcon?: boolean
  message?: string
  value?: string
  chip?: string[]
  width?: number
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  name?: string
  onBlur?: React.FocusEventHandler<HTMLInputElement>
  errorMessage?: string | null
}
