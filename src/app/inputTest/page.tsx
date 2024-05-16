import Input from '@/components/common/Input/Input'
import { loginMessage } from '@/constants/inputMessage'
import { joinPlaceholder, loginPlaceholder } from '@/constants/inputPlaceholder'
import { passwordChip } from '@/constants/passwordChip'

export default function inputTestPage() {
  return (
    <>
      <h1>input</h1>
      <div>
        <section>
          <Input
            id="id"
            type="id"
            disabled={true}
            required
            placeholder={'Default'}
            message={loginMessage.noId}
          />
          <Input
            id="id"
            type="id"
            required
            placeholder={joinPlaceholder.id}
          />
          <Input
            id="id"
            type="id"
            required
            placeholder={joinPlaceholder.id}
          />
          <Input
            id="name"
            type="name"
            required
            placeholder="Name"
            status={'error'}
            message={'에러 메세지'}
          />
          <Input
            id="name"
            type="name"
            required
            placeholder="Name"
            status={'success'}
            checkIcon
          />
          <Input
            id="password1"
            type="password"
            required
            placeholder={loginPlaceholder.password}
            passwordIcon
            chip={passwordChip}
          />
          <Input
            id="password2"
            type="password"
            required
            placeholder={loginPlaceholder.password}
            passwordIcon
            chip={passwordChip}
          />
          <Input
            id="timer"
            type="text"
            required
            placeholder={joinPlaceholder.authNum}
            timer={'02:00'}
            clearIcon={true}
          />
          <Input
            id="timerExpire"
            type="text"
            required
            placeholder={joinPlaceholder.authNum}
            timer={'시간 종료'}
            clearIcon={true}
          />
          <Input
            id="tel"
            type="tel"
            required
            placeholder={joinPlaceholder.phoneNum}
          />
        </section>
      </div>
    </>
  )
}
