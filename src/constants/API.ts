export const API = Object.freeze({
  AUTH: '/user',
  PICKLE: '/pickle',
  MESSAGES: '/messages',
  CONVERSATIONS: '/conversations',
});

export const API_AUTH = Object.freeze({
  LOGIN: `${API.AUTH}/login`,
  ME: `${API.AUTH}/me`,
  JOIN: `${API.AUTH}/join`,
  JOIN2: `${API.AUTH}/join2`,
  LOGOUT: `${API.AUTH}/logout`,
  BY_ID: (userId: string) => `${API.AUTH}/${userId}`,
});

export const API_PICKLE = Object.freeze({
  CREATE: `${API.PICKLE}/create`,
  BY_ID: (pickleId: string) => `${API.PICKLE}/${pickleId}`,
  LIKE: (pickleId: string) => `${API.PICKLE}/${pickleId}/like`,
  UNLIKE: (pickleId: string) => `${API.PICKLE}/${pickleId}/unlike`,
  SEARCH: (pickleType: string) => `${API.PICKLE}/${pickleType}`, // 피클검색
  LOCATION_SEARCH: `${API.PICKLE}/search`, // 지역검색
  IN_LOCATION: `${API.PICKLE}/location`, // 지도 내 피클 조회
  REVIEW: (pickleId: string) => `${API.PICKLE}/${pickleId}/review`,
  ATTENDANCE: (pickleId: string) => `${API.PICKLE}/${pickleId}/public`,
  RE_REQUEST: (pickleId: string) => `${API.PICKLE}/${pickleId}/reRequest`,
  RE_REVIEW: (pickleId: string) => `${API.PICKLE}/${pickleId}/reReview`,
  REGENERATE: (pickleId: string) => `${API.PICKLE}/${pickleId}/reReCruiting`, // 피클 재생성

  // 내피클
  MY_PICKEL: (userId: string) => `${API.PICKLE}/${userId}`,
  MY_PICKEL_STATUS: (userId: string, status: string) => `${API.PICKLE}/${userId}/${status}`,
});

export const API_CHAT = Object.freeze({
  INQUIRY: (receiverId: string) => `${API.MESSAGES}/send/${receiverId}`,
  LIST: (senderId: string) => `${API.MESSAGES}/${senderId}`,
  GROUP: (pickleId: string, senderId: string) => `${API.CONVERSATIONS}/${pickleId}/${senderId}`,
});