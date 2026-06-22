//example code for navigation, to be replaced with actual navigation code


{/* 
    import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {HomeScreen} from '../screens/home/HomeScreen';
import {EnterPhNoScreen} from '../screens/auth/EnterPhNoScreen';
import {VerifyOTPScreen} from '../screens/auth/VerifyOTPScreen';
import {UserDetailScreen} from '../screens/auth/UserDetailScreen';
import {OnBoardingScreen} from '../screens/onboarding/OnBoardingScreen';
import {ReferralCodeScreen} from '../screens/auth/ReferralCodeScreen';
import {SelectRoleScreen} from '../screens/auth/SelectRoleScreen';
import {useAuthContext} from './AuthProvider';
import {createStaticNavigation, ParamListBase} from '@react-navigation/native';
import {SellProductsCreatePostScreen} from '../screens/seller/screens/posts/SellProductsCreatePostScreen';
import {KYCVerificationInitiationScreen} from '../screens/seller/screens/kyc/KYCVerificationInitiationScreen';
import {SelectKYCVerificationDocumentScreen} from '../screens/seller/screens/kyc/SelectKYCVerificationDocumentScreen';
import {SelectKYCOtherDocumentVerification} from '../screens/seller/screens/kyc/SelectKYCOtherDocumentVerification';
import {UploadDocumentScreen} from '../screens/seller/screens/kyc/UploadDocumentScreen';
import {KYCStatusScreen} from '../screens/seller/screens/kyc/KYCStatusScreen';
import {KYCRulesAndRegulationScreen} from '../screens/seller/screens/kyc/KYCRulesAndRegulationScreen';
import AccountBlockedScreen from '../screens/common/AccountBlockedScreen';
import { SelectAadhaarDocumentScreen } from '../screens/seller/screens/kyc/SelectAadhaarDocumentScreen';
import { ProvideServicesCreatePostScreen } from '../screens/seller/screens/posts/ProvideServicesCreatePostScreen';
import { AddressForm } from '../components/Address/AddressForm';
import { HeaderBackButton } from '../components/HeaderBackButton/HeaderBackButton';
import { AddressList } from '../components/Address/AddressList';
import {EditSellerPostScreen} from '../screens/seller/screens/posts/EditSellerPostScreen';
import { SellerProHome } from '../screens/sellerPro/SellerProHome';
import { SellerProAddProductModuleScreen } from '../screens/sellerPro/SellerProAddProductModuleScreen';
import { SellerProAddServiceModuleScreen } from '../screens/sellerPro/SellerProAddServiceModuleScreen';
import { SellerProAddTestimonialModuleScreen } from '../screens/sellerPro/SellerProAddTestimonialModuleScreen';
import { CreateOrEditProTemplateScreen } from '../screens/sellerPro/CreateOrEditProTemplateScreen';
import { SellerProTemplatePreviewScreen } from '../screens/sellerPro/SellerProTemplatePreviewScreen';
import { SellerProDetailScreen } from '../screens/sellerPro/SellerProDetailScreen';
import { PaymentRazorpayScreen } from '../screens/payment/PaymentRazorpayScreen';
import { PaymentWebViewScreen } from '../screens/payment/PaymentWebViewScreen';
import DrawerNavigator from '../screens/topbar/TopNavigation';
import {ChatNavigator} from '../screens/chat/ChatNavigator';
import {ChatListScreen} from '../screens/chat/ChatListScreen';
import {ChatRoom} from '../screens/chat/ChatRoom';
import SellerDrawerNavigator from './SellerTopNavigation';

const useIsUserAuthenticated = () => {
  const {authState} = useAuthContext();
  return authState?.isAuthenticated;
};

const useIsUserProfileNotCompleted = () => {
  const { userDetailsData } = useAuthContext();
  return !userDetailsData.isProfileCompleted;
};

const useIsUserRoleNotAssigned = () => {
  const { userDetailsData } = useAuthContext();
  const role = userDetailsData.role;
  return !role;
};

const useIsSellerUserAndKYCPending = () => {
  const { userDetailsData } = useAuthContext();
  const { role, kycStatus } = userDetailsData;
  return role === 'seller' && kycStatus === 'PENDING';
};

const useIsSellerUserAndKYCCompletedOrApproved = () => {
  const { userDetailsData } = useAuthContext();
  const { role, kycStatus } = userDetailsData;
  return (
    role === 'seller' && (kycStatus === 'APPROVED' || kycStatus === 'COMPLETED')
  );
};

const useIsSellerUserAndKYCApprovalChecked = () => {
  const { userDetailsData } = useAuthContext();
  const { role, kycStatus } = userDetailsData;
  return role === 'seller' && kycStatus === 'USER_APPROVED';
};

const handleGoBack = (
  navigation: NativeStackNavigationProp<ParamListBase, string, undefined>,
) => {
  if (navigation.canGoBack()) {
    navigation.goBack();
  }
};

export const AppStack = createNativeStackNavigator({
  groups: {
    Protected: {
      if: () => useIsUserAuthenticated(),
      screens: {
        ProfileCompletion: {
          if: useIsUserProfileNotCompleted,
          screen: UserDetailScreen,
          options: { headerShown: false },
        },
        ReferralCode: {
          if: useIsUserProfileNotCompleted,
          screen: ReferralCodeScreen,
          options: {headerShown: false},
        },
        RoleSelection: {
          if: () => useIsUserRoleNotAssigned(),
          screen: SelectRoleScreen,
          options: { headerShown: false },
        },
        KYCVerification: {
          if: useIsSellerUserAndKYCPending,
          screen: KYCVerificationInitiationScreen,
          options: ({ navigation }) => ({
            headerShown: false,
          }),
        },
        KYCStatus: {
          if: useIsSellerUserAndKYCCompletedOrApproved,
          screen: KYCStatusScreen,
          options: {
            headerShown: false,
          },
        },
        SellerHome: {
          if: useIsSellerUserAndKYCApprovalChecked,
          screen: SellerDrawerNavigator,
          options: {
            headerShown: false,
          },
        },
        Home: {
          screen: DrawerNavigator,
          options: {
            headerShown: false,
          },
        },
        SelectKYCVerificationDocument: {
          screen: SelectKYCVerificationDocumentScreen,
          options: ({ navigation }) => ({
            headerShown: false,
          }),
        },
        KycRulesAndRegulation: {
          screen: KYCRulesAndRegulationScreen,
          options: ({ navigation }) => ({
            headerShown: false,
          }),
        },
        SelectKYCVerificationOtherDocument: {
          screen: SelectKYCOtherDocumentVerification,
          options: ({ navigation }) => ({
            headerShown: false,
          }),
        },
        UploadKYCDocument: {
          screen: UploadDocumentScreen,
          options: ({ navigation }) => ({
            headerShown: false,
          }),
        },
        UploadAadhaarDocument: {
          screen: SelectAadhaarDocumentScreen,
          options: ({ navigation }) => ({
            headerShown: false,
          }),
        },
        KYCStatusCompleted: {
          screen: KYCStatusScreen,
          options: {
            headerShown: false,
          },
        },
        SellProductsCreatePosts: {
          screen: SellProductsCreatePostScreen,
          options: {
            headerShown: false,
            headerTitle: 'Create Post',
          },
        },
        ProvideServicesCreatePosts: {
          screen: ProvideServicesCreatePostScreen,
          options: {
            headerShown: false,
            headerTitle: 'Create Post',
          },
        },
        EditSellerPost: {
          screen: EditSellerPostScreen,
          options: {
            headerShown: false,
            headerTitle: 'Edit Post',
          },
        },
        ManageAddress: {
          screen: AddressList,
          options: {
            headerShown: true,
            headerTitle: 'Address',
          },
        },
        AddOrUpdateAddress: {
          screen: AddressForm,
          options: {
            headerShown: true,
            headerTitle: 'Address',
            presentation: 'modal',
            animation: 'fade_from_bottom',
          },
        },
        SellerProHome: {
          screen: SellerProHome,
          options: {
            headerShown: false,
          },
        },
        PaymentRazorpay: {
          screen: PaymentRazorpayScreen,
          options: {
            headerShown: false,
          },
        },
        PaymentWebView: {
          screen: PaymentWebViewScreen,
          options: {
            headerShown: false,
          },
        },
        CreateOrEditProTemplate: {
          screen: CreateOrEditProTemplateScreen,
          options: {
            headerShown: false,
          },
        },
        SellerProAddProductModule: {
          screen: SellerProAddProductModuleScreen,
          options: {
            headerShown: false,
          },
        },
        SellerProAddServiceModule: {
          screen: SellerProAddServiceModuleScreen,
          options: {
            headerShown: false,
          },
        },
        SellerProAddTestimonialModule: {
          screen: SellerProAddTestimonialModuleScreen,
          options: {
            headerShown: false,
          },
        },
        SellerProTemplatePreview: {
          screen: SellerProTemplatePreviewScreen,
          options: ({ navigation }) => ({
            headerShown: true,
            headerTitle: '',
            headerLeft: () => (
              <HeaderBackButton
                title="Preview"
                onPress={() => handleGoBack(navigation)}
              />
            ),
          }),
        },
        ChatList: {
          screen: ChatListScreen,
          options: {
            headerShown: false,
          },
        },
        ChatRoom: {
          screen: ChatRoom,
          options: {
            headerShown: false,
          },
        },
        SellerProDetail: {
          screen: SellerProDetailScreen,
          options: {
            headerShown: false,
          },
        },
      },
    },
    Guest: {
      screenOptions: {
        headerShown: false,
        animation: 'none',
      },
      if: () => !useIsUserAuthenticated(),
      screens: {
        onBoarding: OnBoardingScreen,
        EnterPhoneNo: EnterPhNoScreen,
        VerifyOtp: VerifyOTPScreen,
        ReferralCode: ReferralCodeScreen,
        UserDetail: UserDetailScreen,
      },
    },
  },
});

export const AppNavigation = createStaticNavigation(AppStack);



*/}