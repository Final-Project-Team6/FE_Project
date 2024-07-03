'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Info from 'public/icons/info.svg'
import NextIcon from 'public/icons/next.svg'
import React, { ChangeEventHandler /*useState*/ } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import CheckBox from '@/components/checkBox/CheckBox'
import Button from '@/components/common/Button'
import Input from '@/components/common/Input/Input'
import Editor from '@/components/editor/Editor'
import {
  PostCategoryParamKeys,
  postCategoryParams,
} from '@/constants/params/postCategoryUrl.params'
import {
  setPostWriteSecretReducer,
  setPostWriteTitleReducer,
} from '@/redux/postWriteSlice'
import { RootState } from '@/redux/store'
// import { createImage } from '@/serverActions/fetchAWS'
import { createPost } from '@/serverActions/fetchPostData'
import styles from '@/styles/writePage.module.scss'

import Filter from './Filter'

export default function WriteForm({
  params,
}: {
  params: {
    apartmentName: string
    post: string
    postType: PostCategoryParamKeys
    listNum: string
  }
}) {
  const router = useRouter()
  const apartmentId = useSelector(
    (state: RootState) => state.apartment.data.apartmentId,
  )
  const accessToken = useSelector((state: RootState) => state.auth.accessToken)
  const postWrite = useSelector((state: RootState) => state.postWrite)
  const dispatch = useDispatch()

  const onChangeTitle: ChangeEventHandler<HTMLInputElement> = e => {
    dispatch(setPostWriteTitleReducer({ title: e.target.value }))
  }

  const onChangeSecret: ChangeEventHandler<HTMLInputElement> = e => {
    dispatch(setPostWriteSecretReducer({ secret: e.target.checked }))
  }

  const writeAction = async () => {
    if (postWrite.title === '') {
      alert('제목을 입력해주세요.')
      return
    } else if (postWrite.categoryId === 0) {
      alert('분류를 선택해주세요.')
      return
    }

    // const imageResponse = await createImage({
    //   category: '테스트',
    //   accessToken: accessToken,
    //   imageUrl: imageUrl,
    // })

    const response = await createPost({
      apartmentId: apartmentId,
      postType: params.post,
      title: postWrite.title,
      contents:
        document.getElementsByClassName('note-editable')[0].innerHTML /*+
        `<img src="${imageResponse.json}"/>`*/,
      [`${params.post}CategoryId`]: postWrite.categoryId,
      important: postWrite.important,
      status: postWrite.status,
      secret: postWrite.secret,
      accessToken: accessToken,
    })
    router.replace(
      `/${params.apartmentName}/${params.post}/${params.postType}/1`,
    )

    alert(`${postCategoryParams[params.postType]}이 작성되었습니다.`)
    return response
  }

  // const [image, setImage] = useState<File | null>(null)
  // const [imageUrl, setImageUrl] = useState<string | null>(null)
  // const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.files && event.target.files.length > 0) {
  //     const uploadedImage = event.target.files[0]
  //     setImage(uploadedImage)
  //     setImageUrl(URL.createObjectURL(uploadedImage))
  //   }
  // }

  return (
    <form action={() => writeAction()}>
      <div className={styles.writeWrapper}>
        <h1 className={'title1 ' + styles.writeTitle}>
          {postCategoryParams[params.postType]}
        </h1>
        <div className={styles.writeInfoWrapper}>
          <div className={styles.classifyWrapper}>
            <p className="body_03">분류</p>
            <div className={styles.writeChipWrapper}>
              <Filter params={params} />
            </div>
          </div>
          <div className={styles.writeTitleWrapper}>
            <p className="body_03">제목</p>
            <Input
              id="title"
              width={696}
              onChange={onChangeTitle}
              placeholder={'"3자" 이상의 제목을 입력해주세요'}
            />
          </div>
          <div className={'caption_02 ' + styles.cautionWrapper}>
            <div className={styles.cautionTitle}>
              <Image
                src={Info}
                width={24}
                height={24}
                alt="정보"
                priority
              />
              <p>아파트 민원 작성 시 유의사항</p>
            </div>
            <p className={styles.cautionDesc}>
              작성한 게시글에 대한 법적 책임은 작성자에게 귀속되며 게시글 작성
              시 욕설, 특장 대상에 대한 비방, 허위사실 등의 내용을 포함할 경우
              운영정책과 관련 법률에 따라 제재될 수 있습니다.
            </p>
            <div className={styles.viewWrapper}>
              <Link
                href={'https://www.aptner.com/terms/view/post_policy'}
                target="_blank">
                <span className={styles.viewPolicy}>운영 정책 보기</span>
                <Image
                  src={NextIcon}
                  width={24}
                  height={24}
                  alt="운영 정책 보기"
                  priority
                />
              </Link>
            </div>
          </div>
          <Editor />
          {/* <div>
            <div>
              <input
                type="file"
                className="real-upload"
                accept="image/*"
                onChange={handleImageUpload}
              />
              {imageUrl && (
                <div className={styles.imageContainer}>
                  <Image
                    src={imageUrl}
                    alt="Uploaded Image"
                    height={150}
                    width={150}
                  />
                </div>
              )}
            </div>
          </div> */}
          {postCategoryParams[params.postType] === '입대의 소통' ? (
            ''
          ) : (
            <div className={`caption_02 ${styles.secretSettingWrapper}`}>
              <CheckBox
                name="secret"
                onChange={onChangeSecret}
                $baseColor>
                비밀글 설정
              </CheckBox>
              <div>
                <p>
                  다른 입주민에게 노출을 원하지 않는 민원의 경우 비밀글을
                  설정하세요.
                </p>
                <p>
                  비밀글 설정을 하면 아파트 민원 게시판에 노출되지 않고
                  관리사무소와 작성자만 확인할 수 있습니다.
                </p>
              </div>
            </div>
          )}
          <div className={styles.writeConfirmWrapper}>
            <Button
              type="button"
              onClick={() => {
                router.replace(
                  `/${params.apartmentName}/${params.post}/${params.postType}/1`,
                )
              }}
              size="message"
              color="white">
              취소
            </Button>
            <Button
              type="submit"
              size="message"
              color="primary">
              저장
            </Button>
          </div>
        </div>
      </div>
    </form>
  )
}
