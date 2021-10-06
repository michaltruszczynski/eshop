import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import BrandNameInput from './BrandNameInput/BrandNameInput';
import FilePicker from '../Form/FileP/FilePicker';
import AsyncOpBgComponent from '../AsyncOpBgComponent/AsyncOpBgComponent';
import Button from '../Button/Button';

import useForm from '../../hooks/useForm';

import { brandNameInputConfig } from './BrandNameInput/brandNameInputConfig';
import { brandLogoInputConfig } from './BrandLogoInputConfig/brandLogoInputConfig';

import { postNewBrand, getBrand, putBrand } from '../../services/productService';

import styles from './EditBrandForm.module.scss';

const filePickerConfiguration = {
      fileType: ['image/jpeg', 'image/png', 'image/jpg', 'text/plain'],
      maxFileSize: 1000,
      allowDuplicate: false,
      minFileNumber: 0,
      maxFileNumber: 2
}

const asyncOperation = {
      IDLE: 'idle',
      SUCCESS: 'success',
      LOADING: 'loading',
      ERROR: 'error'
}

const EditBrandForm = () => {
      const [inputBrandNameData, inputBrandNameDataIsValid, inputBrandNameDataChangeHandler] = useForm(brandNameInputConfig)
      const [inputBrandLogoData, inputBrandLogoDataisValid, inputBrandLogoDataChangeHandler] = useForm(brandLogoInputConfig)

      const [asyncCallStatus, setAsyncCallStatus] = useState(asyncOperation.IDLE);
      const [brandId, setBrandId] = useState(null);
      const [editing, setEditing] = useState(false);
      const { id } = useParams();
      const history = useHistory();
      console.log(inputBrandLogoData)

      useEffect(() => {
            if (!id) return setAsyncCallStatus(asyncOperation.SUCCESS);
            if (editing) return;

            const getBrandDetails = async () => {
                  setAsyncCallStatus(asyncOperation.LOADING);
                  try {
                        const response = await getBrand(id);
                        console.log(response)
                        const { _id, brandName, images } = response.data;
                        inputBrandNameDataChangeHandler('brandName')(brandName);

                        if (images) {
                              const brandImages = images.map(image => ({
                                    url: image.imageUrl,
                                    name: image.originalFileName,
                                    fileName: image.fileName
                              }))
                              inputBrandLogoDataChangeHandler('brandImage')(brandImages);
                        }
                        setBrandId(_id);
                        setAsyncCallStatus(asyncOperation.SUCCESS);
                  } catch (error) {
                        console.log(error.response);
                        setAsyncCallStatus(asyncOperation.ERROR);
                  }
            }

            getBrandDetails();

      }, [id, editing])

      const submitHandler = async (event) => {
            event.preventDefault();
            const newData = new FormData();

            const appendInputsData = inputsData => {
                  Object.entries(inputsData).forEach(data => {
                        newData.append(data[0], data[1].value)
                  });
            }

            const appendInputsDataImages = inputsDataImages => {
                  console.log(inputsDataImages)
                  Object.entries(inputsDataImages).forEach(data => {
                        data[1].value.forEach(image => {
                              console.log(data[0], image.file);
                              newData.append(data[0], image.file);
                        })
                  });
            }

            appendInputsData(inputBrandNameData);
            appendInputsDataImages(inputBrandLogoData);

            setAsyncCallStatus(asyncOperation.LOADING);
            try {
                  const response = await postNewBrand(newData);
                  console.log(response);
                  setAsyncCallStatus(asyncOperation.SUCCESS);
                  backToSizeSystemList();
            } catch (error) {
                  console.log(error.response);
                  console.log(error.request);
                  setAsyncCallStatus(asyncOperation.ERROR);
            }
      }

      const updateHandler = async (event) => {
            event.preventDefault();
            // const newData = new FormData();

            // const appendInputsData = inputsData => {
            //       Object.entries(inputsData).forEach(data => {
            //             newData.append(data[0], data[1].value);
            //       });
            // }

            // const appendInputsDataImages = inputsDataImages => {
            //       console.log(inputsDataImages);
            //       Object.entries(inputsDataImages).forEach(data => {
            //             data[1].value.forEach(image => {
            //                   console.log(data[0], image.file);
            //                   if (!image.file) {
            //                         newData.append('fileName', image.fileName);
            //                   }
            //                   newData.append(data[0], image.file);
            //             })
            //       });
            // }

            const getFormData = (inputsData = {}, inputsDataImages = {}) => {
                  const newData = new FormData();
                  console.log(inputsData);
                  if (!((typeof inputsData === 'object') && (typeof inputsDataImages === 'object'))) return newData;

                  Object.entries(inputsData).forEach(data => {
                        console.log('check', data[0], data[1].value)
                        newData.append(data[0], data[1].value);
                  });
                  console.log('dupa')
                  Object.entries(inputsDataImages).forEach(data => {
                        data[1].value.forEach(image => {
                              console.log(data[0], image.file);
                              if (!image.file) {
                                    newData.append('fileName', image.fileName);
                              }
                              newData.append(data[0], image.file);
                        })
                  });
                  console.log(newData)
                  return newData;
            }

            // appendInputsData(inputBrandNameData);
            // appendInputsDataImages(inputBrandLogoData);

            const newData  = getFormData(inputBrandNameData, inputBrandLogoData);
            // const newData = getFormData(inputBrandNameData);
            console.log(newData)
            setAsyncCallStatus(asyncOperation.LOADING);
            try {
                  const response = await putBrand(brandId, newData);
                  console.log(response)
                  setEditing(prevState => !prevState);
                  setAsyncCallStatus(asyncOperation.SUCCESS);
            } catch (error) {
                  console.log(error.response);
                  setAsyncCallStatus(asyncOperation.ERROR);
            }
      }

      const isFormDataValid = !(inputBrandNameDataIsValid && inputBrandLogoDataisValid);

      const changeEditModeHandler = () => {
            setEditing(prevState => !prevState)
      }

      const backToSizeSystemList = () => {
            history.push('/brands');
      }

      return (
            <AsyncOpBgComponent status={asyncCallStatus}>
                  <form className={styles['form']}>
                        <BrandNameInput
                              inputBrandNameData={inputBrandNameData}
                              inputBrandNameDataChangeHandler={inputBrandNameDataChangeHandler}
                              disabled={!editing && id}
                        />
                        <FilePicker
                              imageData={inputBrandLogoData.brandImage}
                              onChangeHandler={inputBrandLogoDataChangeHandler('brandImage')}
                              {...filePickerConfiguration}
                              inputName={brandLogoInputConfig.brandImage.elementName}
                              disabled={!editing && id}
                        />
                        <div className={styles['form__buttons']} >
                              {(!editing && !brandId) && <Button
                                    onClick={submitHandler}
                                    buttonType="success"
                                    buttonStyle="standard"
                                    disabled={isFormDataValid} type="submit">
                                    Save
                              </Button>}
                              {(editing && brandId) && (
                                    <>
                                          <Button
                                                onClick={updateHandler}
                                                buttonType="success"
                                                buttonStyle="standard"
                                                disabled={isFormDataValid} type="submit">
                                                Update
                                          </Button>
                                          <Button
                                                onClick={submitHandler}
                                                buttonType="success"
                                                buttonStyle="standard"
                                                disabled={isFormDataValid} type="submit">
                                                Save as new
                                          </Button>
                                          <Button
                                                onClick={changeEditModeHandler}
                                                buttonType="success"
                                                buttonStyle="standard"
                                                type="submit">
                                                Cancel
                                          </Button>
                                    </>
                              )}
                              {(!editing && brandId) && (
                                    <>
                                          <Button
                                                onClick={changeEditModeHandler}
                                                buttonType="success"
                                                buttonStyle="standard"
                                                type="submit">
                                                Edit
                                          </Button>
                                          <Button
                                                onClick={backToSizeSystemList}
                                                buttonType="success"
                                                buttonStyle="standard"
                                                type="submit">
                                                Back to list
                                          </Button>
                                    </>
                              )}
                        </div>
                  </form>
            </AsyncOpBgComponent>
      )
}

export default EditBrandForm;