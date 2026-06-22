// Example code


{/*
    import { StaticParamList } from '@react-navigation/native';
import { AppStack } from './AppNavigation';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends StaticParamList<typeof AppStack> {
      VerifyOtp: { phNo: string };
      ReferralCode: { phoneNumber: string; otp: string };
      Home: { userRole?: UserRole };
      UploadKYCDocument: {
        title: string;
        description: string;
        imgTextTitle?: string;
        imgTextSubtitle?: string;
        dualUpload?: boolean;
        backImgTextTitle?: string;
        value: string;
      };
      UploadAadhaarDocument: {
        pancardImage: ImageResponseType[];
      };
      AddOrUpdateAddress: {
        address: AddressTypeWithId | undefined;
      };
      PaymentRazorpay: {
        amount: number;
        orderId: string;
        bookingId?: string;
        keyId: string;
        currency: string;
        transactionType: string;
        user: {
          name: string;
          email: string;
          contact: string;
        };
        description: string;
        image: string;
        theme: {color: string};
        successRedirectScreen?: string;
        failureRedirectScreen?: string;
      };
      PaymentWebView: {
        url: string;
        title: string;
        successRedirectScreen?: string;
        failureRedirectScreen?: string;
      };
    }
  }
}

    */}