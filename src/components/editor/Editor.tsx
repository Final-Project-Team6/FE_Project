'use client'
import Script from 'next/script'

export default function Editor() {
  return (
    <>
      <div id="summernote" />
      <Script
        id="show-editor"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            $('#summernote').summernote({
              height: 450,
              lang: 'ko-KR',
              disableDragAndDrop: true,
              disableResizeEditor: true,
              tabDisable: false,
              placeholder: '내용을 입력하세요',
              icons: {
                  picture: 'postWriteImage'
              },
              toolbar: [
                ['insert', ['link', 'picture', 'video', 'hr']],
                ['style', ['style']],
                ['font', ['bold', 'italic', 'underline', 'strikethrough', 'clear']],
                ['fontsize', ['fontsize']],
                ['fontname', ['fontname']],
                ['color', ['color', 'backcolor']],
                ['para', ['ul', 'ol', 'paragraph']],
                ['height', ['height']],
                ['table', ['table']],
                ['view', ['help']]
              ]
            });
          `,
        }}
      />
    </>
  )
}
