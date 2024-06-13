'use client'

import './Activitydetails.scss'

import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '@/redux/store'

function Activitydetails() {
  const apartmentName = useSelector(
    (state: RootState) => state.apartment.data.engName,
  )
  const accessToken = useSelector((state: RootState) => state.auth.accessToken)
  const [complaintCount, setComplaintCount] = useState<number>(0)
  const [communicationCount, setCommunicationCount] = useState<number>(0)
  const [commentCount, setCommentCount] = useState<number>(0)

  // 관리사무소 민원 갯수 조회
  useEffect(() => {
    const fetchComplaintCount = async () => {
      if (!accessToken) {
        console.error('Access token is missing')
        return
      }

      try {
        const response = await axios.get(
          'https://aptner.shop/api/post/complaint/search/1',
          {
            params: {
              pageNumber: 1,
              pageSize: 1, // 페이지 사이즈를 1로 설정하여 전체 갯수만 조회
              searchType: 'TITLE_CONTENTS',
              orderType: 'DATE',
              orderBy: 'DESC',
              myComplaint: true,
            },
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        )
        const totalComplaints = response.data.totalElements // 총 민원 갯수
        setComplaintCount(totalComplaints || 0) // 데이터가 없을 경우 0으로 설정
      } catch (error) {
        console.error('Failed to fetch complaint count:', error)
        setComplaintCount(0) // API 요청이 실패한 경우 0으로 초기화
      }
    }

    fetchComplaintCount()
  }, [accessToken])

  // 소통공간 전체 길이 조회
  useEffect(() => {
    const fetchCommunicationCount = async () => {
      if (!accessToken) {
        console.error('Access token is missing')
        return
      }

      try {
        const response = await axios.get(
          'https://aptner.shop/api/post/communication/search/1',
          {
            params: {
              pageNumber: 1,
              pageSize: 1, // 페이지 사이즈를 1로 설정하여 전체 갯수만 조회
              searchType: 'TITLE',
              orderType: 'DATE',
              orderBy: 'DESC',
              communicationType: 'USER_COMMU',
              myCommunication: true,
            },
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        )
        const totalCommunications = response.data.totalElements // 총 소통공간 글 갯수
        setCommunicationCount(totalCommunications || 0) // 데이터가 없을 경우 0으로 설정
      } catch (error) {
        console.error('Failed to fetch communication count:', error)
        setCommunicationCount(0) // API 요청이 실패한 경우 0으로 초기화
      }
    }

    fetchCommunicationCount()
  }, [accessToken])

  // 댓글 갯수 조회
  useEffect(() => {
    const fetchCommentCount = async () => {
      if (!accessToken) {
        console.error('Access token is missing')
        return
      }

      try {
        const response = await axios.get(
          'https://aptner.shop/api/post/comment/',
          {
            params: {
              pageNumber: 1,
              pageSize: 1, // 페이지 사이즈를 1로 설정하여 전체 갯수만 조회
            },
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        )
        const totalComments = response.data.totalElements // 총 댓글 갯수
        setCommentCount(totalComments || 0) // 데이터가 없을 경우 0으로 설정
      } catch (error) {
        console.error('Failed to fetch comment count:', error)
        setCommentCount(0) // API 요청이 실패한 경우 0으로 초기화
      }
    }

    fetchCommentCount()
  }, [accessToken])

  return (
    <div className="activitydetails">
      <h2 className="subTitle1">나의 활동 내역</h2>

      <ul className="activitydetails-list">
        <li>
          <Link
            className="activitydetails-list-item"
            href={`/${apartmentName}/mypage/lists/complaints/1`}>
            <span className="body_01">{complaintCount}</span>
            <span className="body_02">관리사무소 민원</span>
          </Link>
        </li>

        <li className="line">
          <Link
            className="activitydetails-list-item"
            href={`/${apartmentName}/mypage/lists/communication/1`}>
            <span className="body_01">{communicationCount}</span>
            <span className="body_02">소통공간</span>
          </Link>
        </li>

        <li>
          <Link
            className="activitydetails-list-item"
            href={`/${apartmentName}/mypage/lists/comment/1?boardType=ANNOUNCEMENT`}>
            <span className="body_01">{commentCount}</span>
            <span className="body_02">댓글</span>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Activitydetails
