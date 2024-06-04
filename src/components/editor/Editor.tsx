'use client'
import Script from 'next/script'

let customIcons = {
  link: '<div style="text-align:center;"><img src="https://img.icons8.com/ios/24/000000/link--v1.png" alt="Link Icon"><br><span>Link</span></div>',
  picture:
    '<div style="text-align:center;"><img src="https://img.icons8.com/ios/24/000000/image.png" alt="Picture Icon"><br><span>Image</span></div>',
  video:
    '<div style="text-align:center;"><img src="https://img.icons8.com/ios/24/000000/video.png" alt="Video Icon"><br><span>Video</span></div>',
}

export default function Editor() {
  return (
    <>
      <div id="summernote" />
      <Script
        id="show-editor"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            var customIcons = ${JSON.stringify(customIcons)};

            $('#summernote').summernote({
              height: 450,
              lang: 'ko-KR',
              disableDragAndDrop: true,
              disableResizeEditor: true,
              toolbar: [
                ['insert', [
                  'customLink',
                  'customPicture',
                  'customVideo'
                ]],
                ['style', ['style']],
                ['font', ['bold', 'italic', 'underline', 'clear']],
                ['fontname', ['fontname']],
                ['color', ['color']],
                ['para', ['ul', 'ol', 'paragraph']],
                ['height', ['height']],
                ['table', ['table']],
                ['view', ['fullscreen', 'codeview', 'help']]
              ],
              buttons: {
                customLink: function() {
                  return '<button type="button" class="btn btn-default btn-sm" title="Link" data-event="createLink" tabindex="-1">' + customIcons.link + '</button>';
                },
                customPicture: function() {
                  return '<button type="button" class="btn btn-default btn-sm" title="Picture" data-event="showImageDialog" tabindex="-1">' + customIcons.picture + '</button>';
                },
                customVideo: function() {
                  return '<button type="button" class="btn btn-default btn-sm" title="Video" data-event="showVideoDialog" tabindex="-1">' + customIcons.video + '</button>';
                }
              }
            });
          `,
        }}
      />
    </>
  )
}
