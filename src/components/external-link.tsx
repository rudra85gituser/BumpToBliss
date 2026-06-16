import { Href, Link } from 'expo-router';
import { openBrowserAsync, WebBrowserPresentationStyle } from 'expo-web-browser';
import { type ComponentProps } from 'react';
import { Alert, Linking, Platform } from 'react-native';

type Props = Omit<ComponentProps<typeof Link>, 'href'> & { href: Href & string };

export function ExternalLink({ href, ...rest }: Props) {
  return (
    <Link
      target="_blank"
      {...rest}
      href={href}
      onPress={async (event) => {
        if (process.env.EXPO_OS !== 'web') {
          event.preventDefault();
          try {
            await openBrowserAsync(href, {
              presentationStyle: WebBrowserPresentationStyle.AUTOMATIC,
            });
          } catch (error) {
            console.error('Failed to open in-app browser:', error);
            try {
              await Linking.openURL(href);
            } catch (fallbackError) {
              const message =
                fallbackError instanceof Error ? fallbackError.message : 'Unknown error';
              if (Platform.OS === 'web') {
                console.error('Failed to open URL:', message);
              } else {
                Alert.alert('Unable to open link', message);
              }
            }
          }
        }
      }}
    />
  );
}
