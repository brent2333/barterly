import axios from 'axios';
import { SEND_MAIL, MAIL_ERROR} from './types';

export const sendMail = () => async (dispatch) => {
  console.log('$$$$$ SEND MAIL');
    try {
      await axios.post('api/mail');
      dispatch({
        type: SEND_MAIL
      });
    } catch (err) {
      dispatch({
        type: MAIL_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };