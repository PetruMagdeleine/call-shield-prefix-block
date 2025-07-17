import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.3f26f167465648dfb4d20a584ddfd70a',
  appName: 'A Lovable project',
  webDir: 'dist',
  server: {
    url: 'https://3f26f167-4656-48df-b4d2-0a584ddfd70a.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    CallNumber: {
      androidPackage: 'com.capacitorjs.plugins.callnumber'
    }
  }
};

export default config;