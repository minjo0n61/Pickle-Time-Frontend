import { API_USER } from '@/constants/API';
import client from './axios';

export const userRequests = Object.freeze({
  updateImgUrl: (imgFile: File) => {
    const formData = new FormData();
    formData.append('profileImage', imgFile);

    return client.post(API_USER.PROFILE_IMG, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
});
