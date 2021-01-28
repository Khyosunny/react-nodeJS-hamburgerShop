import React, { useState } from 'react'

import Dropzone from 'react-dropzone'
import MenuImageBox from '../MenuImageBox/MenuImageBox'
import { useDispatch } from 'react-redux'
import { uploadImages } from '../../modules/product'
import { IMAGE_SERVER } from '../../config'

import styles from '../../pages/UploadProductPage/UploadProduct.module.scss'

export default function FileUpload({ refreshFunction }) {
  const dispatch = useDispatch()
  const [Images, setImages] = useState([])

  const dropHandler = files => {
    let formData = new FormData()

    formData.append('file', files[0])

    dispatch(uploadImages(formData)).then(response => {
      if (response.payload.success) {
        setImages([response.payload.filePath])
        refreshFunction([response.payload.filePath])
      } else {
        alert('파일을 저장하는데 실패했습니다.')
      }
    })
  }

  const onDeleteImg = () => {
    setImages([])
    refreshFunction([])
  }

  return (
    <>
      <MenuImageBox onDeleteImg={onDeleteImg}>
        {Images.map((image, index) => (
          <div className={styles.ImgBox} key={index}>
            <img src={`${IMAGE_SERVER}${image}`} />
          </div>
        ))}
      </MenuImageBox>
      <Dropzone onDrop={dropHandler}>
        {({ getRootProps, getInputProps }) => (
          <div
            style={{
              marginTop: 20,
              cursor: 'pointer',
              outline: 'none',
              backgroundColor: '#818181',
              padding: '10px 30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <p style={{ color: '#fff' }}>이미지 업로드</p>
          </div>
        )}
      </Dropzone>
    </>
  )
}
