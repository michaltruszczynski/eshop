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

import styles from './EditProductForm.module.scss';

import { addNewProduct, getProduct, putProduct } from '../../services/productService';

const filePickerConfiguration = {
      fileType: ['image/jpeg', 'image/png', 'image/jpg', 'text/plain'],
      maxFileSize: 1000,
      allowDuplicate: false,
      minFileNumber: 1,
      maxFileNumber: 5
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

      const [asyncCallStatus, setAsyncCallStatus] = useState(asyncOperation.IDLE);
      const [productId, setProductId] = useState(null);
      const [editing, setEditing] = useState(false);
      const { id } = useParams();
      const history = useHistory();
      console.log('Edit product ID', id)
      useEffect(() => {
            if (!id) return setAsyncCallStatus(asyncOperation.SUCCESS);
            if (editing) return;

            const getProductDetails = async () => {
                  setAsyncCallStatus(asyncOperation.LOADING);
                  try {
                        const response = await getProduct(id);
                        console.log(response);
                        const { _id, productCategory, productName, productType, productBrand, description, sizeChart, images } = response.data;
                        console.log(productBrand)
                        inputBrandChangeHandler('productBrand')(productBrand);
                        inputsDescriptionDataChangeHandler('productCategory')(productCategory);
                        inputsDescriptionDataChangeHandler('productName')(productName);
                        inputsDescriptionDataChangeHandler('productType')(productType);
                        inputsDescriptionDataChangeHandler('description')(description);
                        inputSizeSystemChangeHandler('sizeSystem')('custom')
                        inputSizeChartDataChangeHandler('sizeChart')(sizeChart);
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
                        console.log(error.response);
                        console.log(error.request);
                        setAsyncCallStatus(asyncOperation.ERROR);
                  }
            }

            getProductDetails();

      }, [id, editing]);

      useEffect(() => {

      }, [id])

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
                  console.log(inputsDataImages)
                  Object.entries(inputsDataImages).forEach(data => {
                        data[1].value.forEach(image => {
                              console.log(data[0], image.file);
                              newData.append(data[0], image.file);
                        })
                  });
            }

            appendInputsData(inputBrandData);
            appendInputsData(inputsDescriptionData);
            appendInputsData(inputSizeSystemData);
            appendInputsDataJSON(inputSizeChartData);
            appendInputsDataImages(inputImageData);

            try {
                  const response = await addNewProduct(newData);
                  console.log(response);
                  setAsyncCallStatus(asyncOperation.SUCCESS);
                  backToProductList();
            } catch (error) {
                  console.log(error.response);
                  console.log(error.request);
                  setAsyncCallStatus(asyncOperation.ERROR);
            }

      }

      const updateHandler = async (event) => {
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
                  console.log(inputsDataImages)
                  Object.entries(inputsDataImages).forEach(data => {
                        data[1].value.forEach(image => {
                              console.log(data[0], image.file);
                              if (!image.file) {
                                    newData.append('fileName', image.fileName);
                              }
                              newData.append(data[0], image.file);
                        })
                  });
            }

            appendInputsData(inputBrandData);
            appendInputsData(inputsDescriptionData);
            appendInputsData(inputSizeSystemData);
            appendInputsDataJSON(inputSizeChartData);
            appendInputsDataImages(inputImageData);

            try {
                  const response = await putProduct(productId, newData);
                  console.log(response);
                  setAsyncCallStatus(asyncOperation.SUCCESS);
                  backToProductList();
            } catch (error) {
                  console.log(error.response);
                  console.log(error.request);
                  setAsyncCallStatus(asyncOperation.ERROR);
            }

      }

      const isFormDataValid = !(inputBrandDataIsValid && inputsDescriptionDataAreValid && inputSizeSystemIsValid && inputSizeChartDataIsValid && inputImageDataIsValid);

      const changeEditModeHandler = () => {
            setEditing(prevState => !prevState)
      }

      const backToProductList = () => {
            history.push('/products');
      }

      return (
            <AsyncOpBgComponent status={asyncCallStatus}>
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
                              inputSizeChartData={inputSizeChartData}
                              inputSizeChartDataChangeHandler={inputSizeChartDataChangeHandler}
                              disabled={!editing && productId}
                        />
                        <FilePicker
                              imageData={inputImageData.productImage}
                              onChangeHandler={inputImageDataChangeHandler('productImage')}
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