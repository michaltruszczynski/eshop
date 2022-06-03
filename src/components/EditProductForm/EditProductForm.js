import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import ProductBrandInput from './ProductBrandInput/ProductBrandInput';
import ProductDescriptionInputs from './ProductDescriptionInputs/ProductDescriptionInputs';
import SizeChart from './SizeChartInputs/SizeChart';
import FilePicker from '../Form/FileP/FilePicker';
import AsyncOpBgComponent from '../AsyncOpBgComponent/AsyncOpBgComponent';
import Button from '../Button/Button';

import useForm from '../../hooks/useForm';

import { productDescriptionInputsConfig } from './ProductDescriptionInputs/ProductDescriptionInputsConfig';
import { productBrandInputConfig } from './ProductBrandInput/productBrandInputConfig'
import { sizeChartSystemInputConfig } from './SizeChartInputs/sizeChartSystemInputConfig';
import { sizeChartInputConfig } from './SizeChartInputs/CustomSizeChart/sizeChartInputConfig';
import { productImageInputConfig } from './ImageFilePicker/productImageInputConfig';
import { definedSizeChartInputConfigId } from './SizeChartInputs/DefinedSizeChart/definedSizeChartInputConfig'

import { addNewProduct, getProduct, putProduct } from '../../services/productService';
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
      const [error, setError] = useState(null);
      const [productId, setProductId] = useState(null);
      const [editing, setEditing] = useState(false);
      const { id } = useParams();
      const history = useHistory();

      console.log('[EditProductForm]', inputImageData)

      useEffect(() => {
            if (!id) return setAsyncCallStatus(asyncOperation.SUCCESS);
            if (editing) return;

            const getProductDetails = async () => {
                  setAsyncCallStatus(asyncOperation.LOADING);
                  try {
                        const response = await getProduct(id);
                        const { _id, productCategory, productName, productType, productBrand, description, sizeChart, sizeSystemId, images, productPrice } = response.data;
                        console.log('productPrice', typeof productPrice, productPrice)
                        inputBrandChangeHandler('productBrand')(productBrand);
                        inputsDescriptionDataChangeHandler('productCategory')(productCategory);
                        inputsDescriptionDataChangeHandler('productName')(productName);
                        inputsDescriptionDataChangeHandler('productType')(productType);
                        inputsDescriptionDataChangeHandler('description')(description);
                        inputsDescriptionDataChangeHandler('productPrice')(productPrice);
                        inputSizeChartDataChangeHandler('sizeChart')(sizeChart);
                        if (sizeSystemId) {
                              sizeSystemIdDataChangeHandler('sizeSystemId')(sizeSystemId);
                              inputSizeSystemChangeHandler('sizeSystem')('predefined');
                        } else {
                              inputSizeSystemChangeHandler('sizeSystem')('custom');
                        }
                        if (images) {
                              const productImage = images.map(image => ({
                                    url: image.imageUrl,
                                    name: image.originalFileName,
                                    fileName: image.fileName
                              }));
                              inputImageDataChangeHandler('productImage')(productImage);
                        } else {
                              inputImageDataChangeHandler('productImage')([]);
                        }

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
                  // console.log(inputsDataImages)
                  Object.entries(inputsDataImages).forEach(data => {
                        if (data[0] === 'productImage') {
                              data[1].value.forEach(image => {
                                    // console.log(data[0], image.file);
                                    newData.append(data[0], image.file);
                              })
                        }
                        if (data[0] === 'primaryProductImage') {
                              newData.append(data[0], data[1].value)
                        }
                  });
                  newData.append('fileName', 'empty');
            }

            appendInputsData(inputBrandData);
            appendInputsData(inputsDescriptionData);
            appendInputsData(inputSizeSystemData);
            appendInputsData(sizeSystemIdData);
            appendInputsDataJSON(inputSizeChartData);
            appendInputsDataImages(inputImageData);

            setAsyncCallStatus(asyncOperation.LOADING);
            try {
                  const response = await addNewProduct(newData);

                  setAsyncCallStatus(asyncOperation.SUCCESS);
                  backToProductList();
            } catch (error) {
                  const errorMsg = new ErrorMessage(error);
                  setError(errorMsg);
                  setAsyncCallStatus(asyncOperation.ERROR);
            }
      }

      const updateHandler = async (event) => {
            event.preventDefault();

            const newData = new FormData();
            const appendInputsData = inputsData => {
                  Object.entries(inputsData).forEach(data => {
                        console.log('[EditProductForm]', data[0], data[1].value)
                        newData.append(data[0], data[1].value)
                  });
            }

            const appendInputsDataJSON = inputsDataJSON => {
                  Object.entries(inputsDataJSON).forEach(data => {
                        console.log(data[0], JSON.stringify(data[1].value))
                        newData.append(data[0], JSON.stringify(data[1].value))
                  });
            }

            const appendInputsDataImages = inputsDataImages => {
                  Object.entries(inputsDataImages).forEach(data => {
                        if (data[0] === 'productImage') {
                              data[1].value.forEach(image => {
                                    console.log(data[0], image.file);
                                    if (!image.file) {
                                          // newData.append('fileName', image.fileName);
                                          newData.append('fileName', JSON.stringify(image));
                                    }
                                    newData.append(data[0], image.file);
                              })
                        }

                        if (data[0] === 'primaryProductImage') {
                              newData.append(data[0], data[1].value)
                        }

                  });
            }

            appendInputsData(inputBrandData);
            appendInputsData(inputsDescriptionData);
            appendInputsData(inputSizeSystemData);
            appendInputsDataJSON(inputSizeChartData);
            appendInputsDataImages(inputImageData);

            setAsyncCallStatus(asyncOperation.LOADING);
            try {
                  const response = await putProduct(productId, newData);
                  setAsyncCallStatus(asyncOperation.SUCCESS);
                  backToProductList();
            } catch (error) {
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
                              imageData={inputImageData.productImage}
                              primaryImageData={inputImageData.primaryProductImage}
                              onChangeHandler={inputImageDataChangeHandler}
                              {...filePickerConfiguration}
                              inputName={productImageInputConfig.productImage.elementName}
                              disabled={!editing && productId}
                        />
                        <div className={styles['form__buttons']} >
                              {(!editing && !productId) && <Button
                                    onClick={submitHandler}
                                    buttonType="success"
                                    buttonStyle="standard"
                                    disabled={isFormDataValid} type="submit">
                                    Save
                              </Button>}
                              {(editing && productId) && (
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
                              {(!editing && productId) && (
                                    <>
                                          <Button
                                                onClick={changeEditModeHandler}
                                                buttonType="success"
                                                buttonStyle="standard"
                                                type="submit">
                                                Edit
                                          </Button>
                                          <Button
                                                onClick={removeProductHandler}
                                                buttonType="success"
                                                buttonStyle="standard"
                                                type="button">
                                                Remove
                                          </Button>
                                          <Button
                                                onClick={backToProductList}
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

export default EditProductForm;