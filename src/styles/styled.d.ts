import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      // Theme / Brand
      primaryColor: string
      subColor: string

      // Gray
      white: string
      black100: string

      gray: {
        _01: string
        _02: string
        _03: string
        _04: string
        _05: string
        _06: string
        _07: string
        _08: string
        _09: string
        _10: string
      }
    }

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
    devices: {
      mobile: string
      tablet: string
      laptop: string
    }
  }
}
