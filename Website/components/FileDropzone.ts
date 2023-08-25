import React, { useEffect } from 'react';
import { Row, Col } from 'reactstrap';

const Example: React.FC = () => {
  useEffect(() => {
    const initDropzone = async () => {
      const Dropzone = (await import('dropzone')).default;
      Dropzone.autoDiscover = false;
      
      let currentSingleFile: Dropzone.DropzoneFile | undefined;

      new Dropzone(document.getElementById('dropzone-single'), {
        url: '/',
        thumbnailWidth: null,
        thumbnailHeight: null,
        previewsContainer: document.getElementsByClassName('dz-preview-single')[0],
        previewTemplate: document.getElementsByClassName('dz-preview-single')[0].innerHTML,
        maxFiles: 1,
        acceptedFiles: 'image/*',
        init: function () {
          this.on('addedfile', function (file) {
            if (currentSingleFile) {
              this.removeFile(currentSingleFile);
            }
            currentSingleFile = file;
          });
        },
      });

      document.getElementsByClassName('dz-preview-single')[0].innerHTML = '';
    };

    initDropzone();
  }, []);

  return (
    <>
      <div className="dropzone dropzone-single mb-3" id="dropzone-single">
        <div className="fallback">
          <div className="custom-file">
            <input className="custom-file-input" id="projectCoverUploads" type="file" />
            <label className="custom-file-label" htmlFor="projectCoverUploads">
              Choose file
            </label>
          </div>
        </div>
        <div className="dz-preview dz-preview-single">
          <div className="dz-preview-cover">
            <img alt="..." className="dz-preview-img" data-dz-thumbnail="" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Example;
