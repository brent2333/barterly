import { SEND_MAIL, MAIL_ERROR } from '../actions/types';

const initialState = {
    message: '',
    sender: '',
    receiver: ''
  };

  // eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
          case SEND_MAIL:
          return {
            ...state
          };
        case MAIL_ERROR:
            return {
              ...state,
              error: payload};
          default:
            return state;
        }
}