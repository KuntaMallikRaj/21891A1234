import axios from 'axios';

const API_BASE_URL = 'http://20.244.56.144/test';

export const fetchProducts = async (options) => {
  try {
    const { company, category, minPrice, maxPrice, topN } = options;
    const url = `${API_BASE_URL}/companies/${company}/categories/${category}/products?top=${topN}&minPrice=${minPrice}&maxPrice=${maxPrice}`;
    const response = await axios.get(url,{
        headers:{
            Authorization:`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzIxOTc2MDc2LCJpYXQiOjE3MjE5NzU3NzYsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImYxOTYyNjU2LTY1MjktNGVmMi04NjAyLTM3MzIwM2MwMzZmZiIsInN1YiI6Imt1bnRhbWFsbGlrcmFqQGdtYWlsLmNvbSJ9LCJjb21wYW55TmFtZSI6ImhleHRyZW5kcyIsImNsaWVudElEIjoiZjE5NjI2NTYtNjUyOS00ZWYyLTg2MDItMzczMjAzYzAzNmZmIiwiY2xpZW50U2VjcmV0IjoiZVRodnR6aUxSSW9McG9FUSIsIm93bmVyTmFtZSI6Ikt1bnRhIE1hbGxpayBSYWoiLCJvd25lckVtYWlsIjoia3VudGFtYWxsaWtyYWpAZ21haWwuY29tIiwicm9sbE5vIjoiMjE4OTFBMTIzNCJ9.5EK2aH30ZZDtvAeAbL6avJ1eID7Y9K3bZwi8n0KtKpg`
        }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};