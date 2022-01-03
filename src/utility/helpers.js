export const updateObject = (oldObject, updatedProperties) => {
      return {
            ...oldObject,
            ...updatedProperties
      }
}

export class ErrorMessage {
      constructor(error) {
            this.errorObject = null;
            if (error.response) {
                  this.errorObject = error.response;
                  this.errorMessage = error.response.data?.message ? error.response.data.message : '';
                  this.errorDetailsArray = error.response.data?.data ? error.response.data.data : [];
                  // console.log('error.response', error.response);
            } else if (error.request) {
                  this.errorObject = error.request;
                  this.errorMessage = 'Connection problems.'
                  this.errorDetailsArray = [];
                  this.addErrorDetails('Please try again later');
                  // console.log('error.request', error.request);
            } else {
                  this.errorMessage = error.message ? error.message : 'Connection problems.';
                  this.errorDetailsArray = [];
                  if (!error.message) {
                        this.addErrorDetails('Please try again later');
                  }
                  // console.dir(error.message)
                  // console.log('error', this.errorObject)
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

export class Message {
      constructor(message = '') {
            this.message = message;
            this.messageDetailsArray = [];
      }

      addMessageDetails(newDataMessage) {
            this.messageDetailsArray.push({ msg: newDataMessage });
      }

      getMessageDetailsArray() {
            return this.messageDetailsArray.map(message => message.msg);
      }

      getMessageDetailsText() {
            return this.messageDetailsArray.reduce((text, message, id) => {
                  return id === 0 ? message.msg : text + ' ' + message.msg;
            }, '');
      }

      getMessageData() {
            const message = this.message;
            const messageDetailsArray = this.getMessageDetailsArray();
            const messageDetails = this.getMessageDetailsText();
            return { message, messageDetailsArray, messageDetails };
      }
}
