export interface findApartmentData {
  code: number
  message: string
  data: apartmentData
}

export interface apartmentData {
  apartmentId: number
  name: string
  engName: string
  sido: string
  gugun: string
  road: string
  zipcode: string
  icon: string
  banner: string
  tel: string
  dutyTime: string
}
