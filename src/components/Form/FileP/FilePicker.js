import React, { useState } from 'react';

import PreviewContainer from './PreviewContainer/PreviewContainer';
import InputError from '../InpurtError/InputError';
import SelectedImagesPreview from './SelectedImagesPreview/SelectedImagesPreview';
import SelectButton from './SelectButton/SelectButton';
import SelectedImagesList from './SelectedImagesList/SelectedImagesList';
import ErrorList from './ErrorList/ErrorList';

import { validateInput } from '../../../utility/validators';
import { fileSize, fileType, duplicated, arrayLength } from '../../../utility/validators';

import styles from './FilePicker.module.scss';

const FilePicker = ({
      imageData,
      inputName,
      onChangeHandler,
      fileTypeArray = ['image/jpeg', 'image/png', 'image/jpg', 'text/plain'],
      maxFileSize = 15000,
      allowDuplicate = false,
      minFileNumber = 1,
      maxFileNumber = 2,
      disabled = false }) => {

      const [invalidFilesList, setInvalidFilesList] = useState([]);

      const { value: filesSelected, touched, isValid, errors } = imageData;

      const fileValidators = [
            { check: fileSize(maxFileSize), message: 'File can not be larger than 1MB.' },
            { check: fileType(fileTypeArray), message: 'Accepted file types: jpg, jpeg, png.' },
            { check: duplicated(filesSelected, 'name', allowDuplicate), message: 'File duplicated.' }
      ]

      const selectFileHandler = (event) => {
            const addNewFiles = () => {
                  event.preventDefault();

                  let newFilesWithErrors = [];
                  let newFiles = [];

                  if (!event.target.files.length) {
                        event.target.value = null;
                        setInvalidFilesList([]);
                        return onChangeHandler([...filesSelected]);
                  }

                  [...event.target.files].forEach(file => {
                        const { isValid: valid, errorMessages } = validateInput(fileValidators, file);
                        let newFile = {
                              file: file,
                              name: file.name,
                              url: URL.createObjectURL(file),
                              size: file.size,
                              type: file.type,
                              isValid: valid,
                              errors: errorMessages
                        }

                        if (!valid) {
                              return newFilesWithErrors.push(newFile);
                        }

                        if (filesSelected.length + newFiles.length >= maxFileNumber) {
                              newFile.isValid = false;
                              newFile.errors = [`Allowed image number exceeded. Max image number ${maxFileNumber}.`];
                              return newFilesWithErrors.push(newFile);
                        }

                        newFiles.push(newFile);
                  });
                  event.target.value = null;
                  setInvalidFilesList(newFilesWithErrors);
                  onChangeHandler([...filesSelected, ...newFiles]);
            }

            addNewFiles();
      }

      const removeFileHandler = (event, index) => {
            if (disabled) return;
            const newFilesList = [...filesSelected];
            newFilesList.splice(index, 1);
            onChangeHandler(newFilesList);
            setInvalidFilesList([]);
      }

      const clearErrorMessagesHandler = () => {
            setInvalidFilesList([]);
      }

      const maxFilesNumberReached = () => {
            return filesSelected.length >= maxFileNumber;
      }

      // const getInputName = (minFileNumber, maxFileNumber) => {
      //       if (minFileNumber === maxFileNumber) return `(select ${minFileNumber} image)`;
      //       return `(select ${minFileNumber} - ${maxFileNumber} images)`
      // }

      return (
            <div className={styles['field']}>
                  <p className={styles['field__name']}>{inputName}:</p>
                  <PreviewContainer touched={touched} isValid={isValid} >
                        <SelectedImagesPreview
                              imagesSelected={filesSelected}
                              onDeleteImage={removeFileHandler}
                              disabled={disabled} />
                        <SelectButton
                              disabled={disabled || maxFilesNumberReached()}
                              formIsValid={isValid}
                              onSelectFile={selectFileHandler} />
                  </PreviewContainer>
                  <div className={styles['field__error']}>
                        <InputError
                              touched={touched}
                              isValid={isValid}
                              errors={errors} />
                  </div>
                  <SelectedImagesList imagesSelected={filesSelected} />
                  <ErrorList
                        invalidFilesList={invalidFilesList}
                        onClearErrorMessage={clearErrorMessagesHandler}
                  />
            </div>
      )
}

export default FilePicker