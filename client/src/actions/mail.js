import axios from 'axios';
import { SEND_MAIL, MAIL_ERROR} from './types';

export const sendMail = (mailData) => async (dispatch) => {
    try {
      await axios.post('/api/mail/', mailData);
      dispatch({
        type: SEND_MAIL,
        payload: mailData
      });
    } catch (err) {
      dispatch({
        type: MAIL_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };