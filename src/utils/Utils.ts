//example code for utils, to be replaced with actual utils



/**
 * 
 * import {AxiosResponse} from 'axios';
import {AddressTypeWithId} from '../validationSchema/AddressSchema';
import {SellerPostsResponse} from '../types/APIPayloadAndResponse/sellerCreatePosts';

export const BannerHelperList = [
  'Plants Share',
  'Expert Calls',
  'Meetups & More',
];
export const GENERIC_ERROR_MESSAGE = 'Something went wrong! Please try again.';

export const getFormattedAddress = (address: AddressTypeWithId | null) => {
  if (!address) {
    return '';
  }
  const {
    addressLine1,
    addressLine2,
    landmark = '',
    city,
    state,
    postalCode,
  } = address;
  const formattedLandmark = landmark ? landmark : '';
  return `${addressLine1}, ${addressLine2}, ${formattedLandmark} ${city}, ${state}, ${postalCode}`;
};

export const formatSellerPostListResponse = (
  data: AxiosResponse<SellerPostsResponse, any> | undefined,
) => {
  if (!data) {
    return [];
  }
  const response = data?.data?.message;
  if (typeof response === 'string' && data?.status !== 201) {
    return GENERIC_ERROR_MESSAGE;
  }
  if (typeof response === 'object') {
    return [...response.products, ...response.services];
  }
  return [];
};

export const ADDRESS_FLOW = {
  SELLER_PRODUCT_CREATE_POST: 'SELLER_PRODUCT_CREATE_POST',
  SELLER_SERVICE_CREATE_POST: 'SELLER_SERVICE_CREATE_POST',
};

 */