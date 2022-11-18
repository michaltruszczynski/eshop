import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import BrandNameInput from './BrandNameInput/BrandNameInput';
import FilePicker from '../Form/FileP/FilePicker';
import AsyncOpBgComponent from '../AsyncOpBgComponent/AsyncOpBgComponent';
import Button from '../Button/Button';

import useForm from '../../hooks/useForm';

import { brandNameInputConfig } from './BrandNameInput/brandNameInputConfig';
import { brandLogoInputConfig } from './BrandLogoInputConfig/brandLogoInputConfig';

import { adminService } from '../../services/adminService';

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
                        const response = await adminService.getBrand(id);
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
                  const response = await adminService.postBrand(newData);
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

            const getFormData = (inputsData = {}, inputsDataImages = {}) => {
                  const newData = new FormData();
                  console.log(inputsData);
                  if (!((typeof inputsData === 'object') && (typeof inputsDataImages === 'object'))) return newData;

                  Object.entries(inputsData).forEach(data => {
                        console.log('check', data[0], data[1].value)
                        newData.append(data[0], data[1].value);
                  });

                  Object.entries(inputsDataImages).forEach(data => {
                        data[1].value.forEach(image => {
                              console.log(data[0], image.file);
                              if (!image.file) {
                                    // newData.append('fileName', image.fileName);
                                    newData.append('fileName', JSON.stringify(image));
                              }
                              newData.append(data[0], image.file);
                        })
                  });

                  return newData;
            }


            const newData = getFormData(inputBrandNameData, inputBrandLogoData);

            setAsyncCallStatus(asyncOperation.LOADING);
            try {
                  const response = await adminService.putBrand(brandId, newData);
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
            history.push('/admin/brands');
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
                              imageDataOnChangeHandler={inputBrandLogoDataChangeHandler('brandImage')}
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
                                                disabled={isFormDataValid} type="button">
                                                Update
                                          </Button>
                                          <Button
                                                onClick={changeEditModeHandler}
                                                buttonType="success"
                                                buttonStyle="standard"
                                                type="button">
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
                                                type="button">
                                                Edit
                                          </Button>
                                          <Button
                                                onClick={backToSizeSystemList}
                                                buttonType="success"
                                                buttonStyle="standard"
                                                type="button">
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