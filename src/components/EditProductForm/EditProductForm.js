import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import ProductBrandInput from './ProductBrandInput/ProductBrandInput';
import ProductDescriptionInputs from './ProductDescriptionInputs/ProductDescriptionInputs';
import SizeChart from './SizeChartInputs/SizeChart';
import FilePicker from '../Form/FileP/FilePicker';
import AsyncOpBgComponent from '../AsyncOpBgComponent/AsyncOpBgComponent';
import ControlButtons from './ControlButtons/ControlButtons';

import useForm from '../../hooks/useForm';

import { productDescriptionInputsConfig } from './ProductDescriptionInputs/productDescriptionInputsConfig';
import { productBrandInputConfig } from './ProductBrandInput/productBrandInputConfig'
import { sizeChartSystemInputConfig } from './SizeChartInputs/sizeChartSystemInputConfig';
import { sizeChartInputConfig } from './SizeChartInputs/CustomSizeChart/sizeChartInputConfig';
import { productImageInputConfig } from './ImageFilePicker/productImageInputConfig';
import { definedSizeChartInputConfigId } from './SizeChartInputs/DefinedSizeChart/definedSizeChartInputConfig';

import { adminService } from '../../services/adminService';

import { ErrorMessage } from '../../utility/helpers';

import styles from './EditProductForm.module.scss';

const filePickerConfiguration = {
      fileType: ['image/jpeg', 'image/png', 'image/jpg', 'text/plain'],
      maxFileSize: 2000,
      allowDuplicate: false,
      minFileNumber: 3,
      maxFileNumber: 6
}

const asyncOperation = {
      IDLE: 'idle',
      SUCCESS: 'success',
      LOADING: 'loading',
      ERROR: 'error'
}

const EditProductForm = () => {
      const [inputBrandData, inputBrandDataIsValid, inputBrandChangeHandler] = useForm(productBrandInputConfig);
      const [inputsDescriptionData, inputsDescriptionDataAreValid, inputsDescriptionDataChangeHandler] = useForm(productDescriptionInputsConfig)
      const [inputSizeSystemData, inputSizeSystemIsValid, inputSizeSystemChangeHandler] = useForm(sizeChartSystemInputConfig)
      const [inputSizeChartData, inputSizeChartDataIsValid, inputSizeChartDataChangeHandler] = useForm(sizeChartInputConfig)
      const [inputImageData, inputImageDataIsValid, inputImageDataChangeHandler] = useForm(productImageInputConfig);
      const [sizeSystemIdData, , sizeSystemIdDataChangeHandler] = useForm(definedSizeChartInputConfigId);

      const [asyncCallStatus, setAsyncCallStatus] = useState(asyncOperation.IDLE);
      const [product, setProduct] = useState(null);
      const [error, setError] = useState(null);
      const [productId, setProductId] = useState(null);
      const [editing, setEditing] = useState(false);
      const { id } = useParams();
      const history = useHistory();

      console.log('[EditProductForm]', inputImageData)

      useEffect(() => {
            if (!id) {
                  return setAsyncCallStatus(asyncOperation.SUCCESS);
            }
            if (editing) return;

            const getProductDetails = async () => {
                  setAsyncCallStatus(asyncOperation.LOADING);
                  try {
                        const response = await adminService.getProduct(id);
                        setProduct(response.data);
                        const { _id, name, type, category, brand, description, sizeChart, sizeSystemId, price, images, primaryImage } = response.data;
                        console.log(response.data)
                        inputsDescriptionDataChangeHandler('name')(name);
                        inputsDescriptionDataChangeHandler('type')(type);
                        inputsDescriptionDataChangeHandler('category')(category);
                        inputBrandChangeHandler('brand')(brand);
                        inputsDescriptionDataChangeHandler('description')(description);
                        inputsDescriptionDataChangeHandler('price')(price);
                        inputSizeChartDataChangeHandler('sizeChart')(sizeChart);

                        if (sizeSystemId) {
                              sizeSystemIdDataChangeHandler('sizeSystemId')(sizeSystemId);
                              inputSizeSystemChangeHandler('sizeSystem')('predefined');
                        } else {
                              inputSizeSystemChangeHandler('sizeSystem')('custom');
                        }

                        inputImageDataChangeHandler('images')(images);
                        inputImageDataChangeHandler('primaryImage')(primaryImage);
                        setProductId(_id);

                        setAsyncCallStatus(asyncOperation.SUCCESS);
                  } catch (error) {
                        const errorMsg = new ErrorMessage(error);
                        setError(errorMsg);
                        setAsyncCallStatus(asyncOperation.ERROR);
                  }
            }

            getProductDetails();

      }, [id, editing]);

      const submitHandler = async (event) => {
            event.preventDefault();
            const newData = new FormData();

            const appendInputsData = inputsData => {
                  Object.entries(inputsData).forEach(data => {
                        newData.append(data[0], data[1].value)
                  });
            }

            const appendInputsDataJSON = inputsDataJSON => {
                  Object.entries(inputsDataJSON).forEach(data => {
                        newData.append(data[0], JSON.stringify(data[1].value))
                  });
            }


            const appendInputsDataImages = inputsDataImages => {
                  Object.entries(inputsDataImages).forEach(data => {
                        if (data[0] === 'images') {
                              data[1].value.forEach(image => {
                                    console.log(data[0], image.file);
                                    if (!image.file) {
                                          // newData.append('fileName', image.fileName);
                                          newData.append('urlImages', JSON.stringify(image));
                                    }
                                    newData.append(data[0], image.file);
                              })
                        }

                        if (data[0] === 'primaryImage') {
                              newData.append(data[0], data[1].value)
                        }

                  });
            }

            appendInputsData(inputBrandData);
            appendInputsData(inputsDescriptionData);
            appendInputsData(inputSizeSystemData);
            appendInputsData(sizeSystemIdData);
            appendInputsDataJSON(inputSizeChartData);
            appendInputsDataImages(inputImageData);

            setAsyncCallStatus(asyncOperation.LOADING);
            try {
                  const response = await adminService.postProduct(newData);

                  setAsyncCallStatus(asyncOperation.SUCCESS);
                  backToProductList();
            } catch (error) {
                  console.log('[EditProductForm - error]', error.response, error.request)
                  const errorMsg = new ErrorMessage(error);
                  setError(errorMsg);
                  setAsyncCallStatus(asyncOperation.ERROR);
            }
      }

      const updateHandler = async (event) => {
            event.preventDefault();
            //TODO nie form data powtarz sie refactoryzować
            const newData = new FormData();
            const appendInputsData = inputsData => {
                  Object.entries(inputsData).forEach(data => {
                        // console.log('[EditProductForm]', data[0], data[1].value)
                        newData.append(data[0], data[1].value)
                  });
            }

            const appendInputsDataJSON = inputsDataJSON => {
                  Object.entries(inputsDataJSON).forEach(data => {
                        // console.log(data[0], JSON.stringify(data[1].value))
                        newData.append(data[0], JSON.stringify(data[1].value))
                  });
            }

            const appendInputsDataImages = inputsDataImages => {
                  Object.entries(inputsDataImages).forEach(data => {
                        if (data[0] === 'images') {
                              data[1].value.forEach(image => {
                                    console.log(data[0], image.file);
                                    if (!image.file) {
                                          // newData.append('fileName', image.fileName);
                                          newData.append('urlImages', JSON.stringify(image));
                                    }
                                    newData.append(data[0], image.file);
                              })
                        }

                        if (data[0] === 'primaryImage') {
                              newData.append(data[0], data[1].value)
                        }

                  });
            }

            appendInputsData(inputBrandData);
            appendInputsData(inputsDescriptionData);
            appendInputsData(inputSizeSystemData);
            appendInputsDataJSON(inputSizeChartData);
            appendInputsData(sizeSystemIdData);
            appendInputsDataImages(inputImageData);

            setAsyncCallStatus(asyncOperation.LOADING);
            try {
                  const response = await adminService.putProduct(productId, newData);
                  console.log(response)
                  setAsyncCallStatus(asyncOperation.SUCCESS);
                  backToProductList();
            } catch (error) {
                  console.log('[EditProductForm - error]', error)
                  const errorMsg = new ErrorMessage(error);
                  setError(errorMsg);
                  setAsyncCallStatus(asyncOperation.ERROR);
            }
      }

      const isFormDataValid = !(inputBrandDataIsValid && inputsDescriptionDataAreValid && inputSizeSystemIsValid && inputSizeChartDataIsValid && inputImageDataIsValid);

      const changeEditModeHandler = () => {
            setEditing(prevState => !prevState)
      }

      const backToProductList = () => {
            history.push('/admin/products');
      }

      const removeProductHandler = async () => {
            setAsyncCallStatus(asyncOperation.LOADING);
            try {
                  const response = await adminService.removeProduct(id);
                  setAsyncCallStatus(asyncOperation.SUCCESS);
                  backToProductList();

            } catch (error) {
                  const errorMsg = new ErrorMessage(error);
                  setError(errorMsg);
                  setAsyncCallStatus(asyncOperation.ERROR);
            }
      }

      return (
            <AsyncOpBgComponent status={asyncCallStatus} error={error} showErrorMessage={true}>
                  <form className={styles['form']}>
                        <ProductBrandInput
                              inputBrandData={inputBrandData}
                              inputBrandChangeHandler={inputBrandChangeHandler}
                              disabled={!editing && productId}
                        />
                        <ProductDescriptionInputs
                              inputsDescriptionData={inputsDescriptionData}
                              inputsDescriptionDataChangeHandler={inputsDescriptionDataChangeHandler}
                              disabled={!editing && productId}
                        />
                        <SizeChart
                              inputSizeSystemData={inputSizeSystemData}
                              inputSizeSystemChangeHandler={inputSizeSystemChangeHandler}
                              sizeSystemIdData={sizeSystemIdData}
                              sizeSystemIdDataChangeHandler={sizeSystemIdDataChangeHandler}
                              inputSizeChartData={inputSizeChartData}
                              inputSizeChartDataChangeHandler={inputSizeChartDataChangeHandler}
                              disabled={!editing && productId}
                        />
                        <FilePicker
                              imageData={inputImageData.images}
                              primaryImageData={inputImageData.primaryImage}
                              imageDataOnChangeHandler={inputImageDataChangeHandler('images')}
                              primaryImageDataOnChangeHandler={inputImageDataChangeHandler('primaryImage')}
                              {...filePickerConfiguration}
                              inputName={productImageInputConfig.images.elementName}
                              disabled={!editing && productId}
                        />
                        <ControlButtons
                              editing={editing}
                              isFormValid={isFormDataValid}
                              elementId={productId}
                              submitHandler={submitHandler}
                              removeHandler={removeProductHandler}
                              updateHandler={updateHandler}
                              backToPreviousPageHandler={backToProductList}
                              changeEditModeHandler={changeEditModeHandler}
                        />
                  </form>
            </AsyncOpBgComponent>
      )
}

export default EditProductForm;