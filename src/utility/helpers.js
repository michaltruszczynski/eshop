export const updateObject = (oldObject, updatedProperties) => {
      return {
            ...oldObject,
            ...updatedProperties
      }
}

export class ErrorInformation {
      constructor(error) {
            this.errorObject = null;
            if (error.response) {
                  this.errorObject = error.response;
                  this.errorMessage = error.response.data?.message ? error.response.data.message : '';
                  this.errorDetailsArray = error.response.data?.data ? error.response.data.data : [];
                  console.log('error.response', error.response, this.errorObject);
            } else if (error.request) {
                  this.errorObject = error.request;
                  this.errorMessage = 'Connection problems.'
                  this.errorDetailsArray = [];
                  this.addErrorDetails('Please try again later');
                  console.log('error.request', error.request, this.errorObject);
            } else {
                  this.errorMessage = error.message ? error.message : 'Connection problems.';
                  this.errorDetailsArray = [];
                  this.addErrorDetails('Please try again later');
                  console.dir(error.message)
                  console.log('error', this.errorObject)
            }
      }

      getErrorMessage() {
            return this.errorMessage;
      }

      getErrorDetailsText() {
            return this.errorDetailsArray.reduce((text, message, id) => {
                  return id === 0 ? message.msg : text + ' ' + message.msg;
            }, '');
      }

      getErrorDetailsArray() {
            return this.errorDetailsArray.map(message => message.msg);
      }

      addErrorDetails(newMessage) {
            this.errorDetailsArray.push({ msg: newMessage });
      }

      getErrorMessageData() {
            const errorMessage = this.getErrorMessage();
            const errorDetailsArray = this.getErrorDetailsArray();
            const errorDetailsText = this.getErrorDetailsText();
            return { errorMessage, errorDetailsArray, errorDetailsText };
      }

      getErrorObject() {
            return this.errorObject ? this.errorObject : this.getErrorMessageData();
      }
}