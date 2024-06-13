'use client'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { AppDispatch } from '@/redux/store'
import { fetchApartmentId } from '@/serverActions/findApartmentId'

const useFetchApartmentId = (apartmentName: string) => {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    fetchApartmentId(dispatch, apartmentName)
  }, [dispatch, apartmentName])
}

export default useFetchApartmentId
