const cloud_name = process.env.REACT_APP_CLOUD_NAME || '';
const api_key = process.env.REACT_APP_API_KEY || '';
const api_secret = process.env.REACT_APP_API_SECRET || '';


const cloudinaryConfig = {
  cloud_name,
  api_key,
  api_secret,
};

export default cloudinaryConfig;