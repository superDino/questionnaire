// src/api.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://www.mijia.games/api/ios/questionnaire',
  withCredentials: false, 
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default {
  saveBasicInfo(Data) {
    return apiClient.post('/saveOrUpdateDiagnosisInfo', Data);
  },
  saveScenariosResult(Data) {
    return apiClient.post('/saveOrUpdateDiagnosisEnvInfo', Data);
  }
};
