'use client'
import { useCallback, useEffect } from 'react'

declare global {
  interface Window {
    $: any
  }
}

export default function Editor() {
  const initSummernote = useCallback(() => {
    if (typeof window !== 'undefined' && window.$) {
      window.$('#summernote').summernote({
        height: 450,
        lang: 'ko-KR',
        disableDragAndDrop: true,
        disableResizeEditor: true,
        tabDisable: false,
        placeholder: '내용을 입력하세요',
        icons: {
          picture: 'postWriteImage',
        },
        toolbar: [
          ['style', ['style']],
          ['font', ['bold', 'underline', 'clear']],
          ['fontsize', ['fontsize']],
          ['fontname', ['fontname']],
          ['color', ['color']],
          ['para', ['ul', 'ol', 'paragraph']],
          ['height', ['height']],
          ['table', ['table']],
          ['view', ['help']],
        ],
      })
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      if (typeof window !== 'undefined' && window.$) {
        initSummernote()
        clearInterval(interval)
      }
    }, 100)

    return () => clearInterval(interval)
  }, [initSummernote])

  return <div id="summernote" />
}
