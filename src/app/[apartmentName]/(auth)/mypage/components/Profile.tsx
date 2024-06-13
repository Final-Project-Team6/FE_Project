'use client'

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '@/redux/store'

function Profile() {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken)
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const defaultImage = '/imgs/userimg.png'

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!accessToken) {
        return
      }

      console.log('Access Token:', accessToken)

      try {
        const response = await axios.get(
          'https://aptner.shop/api/member/information',
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        )
        const userData = response.data
        console.log('Profile Image:', userData.data.profileImage)
        setProfileImage(userData.data.profileImage)
      } catch (error: any) {
        console.error('Failed to fetch profile data:', error)
      }
    }

    fetchProfileData()
  }, [accessToken])

  return (
    <img
      className="img"
      src={profileImage || defaultImage}
      alt="Profile"
    />
  )
}

export default Profile
