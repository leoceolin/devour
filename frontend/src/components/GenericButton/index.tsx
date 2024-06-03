import { Button } from './styles'

interface IButton {
  text: string
  bgColor: string
  handleClick: () => void
  disabled: boolean
}
export const GenericButton = ({
  bgColor,
  text,
  handleClick,
  disabled,
}: IButton) => {
  return (
    <Button bgColor={bgColor} onClick={handleClick} disabled={disabled}>
      {text}
    </Button>
  )
}
