// eslint-disable-next-line @typescript-eslint/no-unused-vars
import 'next-auth'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import '@auth/core/jwt'

declare module 'next-auth' {
  interface User {
    accessToken: string
  }
  interface Session {
    accessToken: string
  }
}

declare module '@auth/core/jwt' {
  interface JWT {
    accessToken: string
  }
}
