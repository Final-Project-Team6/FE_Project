import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    fonts: {
      menuTitle: {
        _01: string
        _02: string
      }
      title: string
      subTitle: {
        _01: string
        _02: string
      }
      body: {
        _01: string
        _02: string
        _03: string
        _04: string
        _05: string
        _06: string
      }
      caption: {
        _01: string
        _02: string
      }
    }
  }
}
