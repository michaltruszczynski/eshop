import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import UserInfoInputs from './UserInfoInputs/UserInfoInputs';
import UserRolesInput from './UserRolesInput/UserRolesInput';
import AsyncOpBGComponent from '../AsyncOpBgComponent/AsyncOpBgComponent';

import useForm from '../../hooks/useForm';

import { userInfoInputConfig } from './UserInfoInputs/userInfoInputsConfig';
import { userRolesInputConfig } from './UserRolesInput/userRolesInputConfig';

import { adminService } from '../../services/adminService';

import styles from './EditUserForm.module.scss';

const asyncOperation = {
      IDLE: 'idle',
      SUCCESS: 'success',
      LOADING: 'loading',
      ERROR: 'error'
}

const EditUserForm = () => {
      const [userInfoData, userInfoDataIsValid, userInfoDataChangeHandler] = useForm(userInfoInputConfig);
      const [userRolesData, userRolesDataIsValid, userRolesDataChangeHandler] = useForm(userRolesInputConfig);

      const [asyncCallStatus, setAsyncCallStatus] = useState(asyncOperation.IDLE);
      const [userId, setUserId] = useState(null);
      const [editing, setEditing] = useState(false);
      const { id } = useParams();
      const history = useHistory();

      console.log(id)

      console.log(userRolesData)

      useEffect(() => {
            if (!id) return setAsyncCallStatus(asyncOperation.SUCCESS);
            if (editing) return;

            const getUserDetails = async () => {
                  const getUserRoles = userRoles => {
                        if (!Array.isArray(userRoles)) return [];
                        return userRoles.map(role => role)
                  }

                  setAsyncCallStatus(asyncOperation.LOADING);
                  try {
                        const response = await adminService.getUser(id)
                        const { user } = response.data;
                        console.log(user);
                        const { _id, email, name, userRoles } = user;
                        setUserId(_id);
                        userInfoDataChangeHandler('name')(name);
                        userInfoDataChangeHandler('email')(email);

                        const userRolesAttay = userRoles.map(role => role.name)
                        userRolesDataChangeHandler('userRoles')(userRolesAttay);
                        setAsyncCallStatus(asyncOperation.SUCCESS);
                  } catch (error) {
                        console.log(error.response);
                        setAsyncCallStatus(asyncOperation.ERROR);
                  }
            }

            getUserDetails();

      }, [id, editing])


      return (
            // <AsyncOpBgComponent status={asyncCallStatus}>
            <form className={styles['form']}>
                  <UserInfoInputs
                        userInfoData={userInfoData}
                        userInfoDataChangeHandler={userInfoDataChangeHandler}
                        disabled={!editing && !!id} />
                  <UserRolesInput
                        userRolesData={userRolesData}
                        userRolesDataChangeHandler={userRolesDataChangeHandler}
                        disabled={!editing && !!id} />
                  <div className={styles['form__buttons']} >

                  </div>
            </form>
            // </AsyncOpBgComponent>
      )
}

export default EditUserForm;