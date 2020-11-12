import axios from 'axios';
import { SEND_MAIL, MAIL_ERROR} from './types';
import { setAlert } from './alert';

export const sendMail = (mailData) => async (dispatch) => {
    try {
      await axios.post('/api/mail/', mailData);
      dispatch({
        type: SEND_MAIL,
        payload: mailData
      });
      dispatch(setAlert('Message Sent', 'success'));

    } catch (err) {
      dispatch({
        type: MAIL_ERROR,
        payload: { msg: err, status: err.response.status }
      });
    }
  };