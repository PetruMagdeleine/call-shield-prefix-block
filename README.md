# Call Blocker Android App

A professional Android application for blocking unwanted calls by phone number prefix. Built with React, TypeScript, and Capacitor for native mobile functionality.

## Project info

**URL**: https://lovable.dev/projects/3f26f167-4656-48df-b4d2-0a584ddfd70a

## Features

- ✅ Block calls by number prefix (e.g., "+330162", "555")
- ✅ Professional, Material Design-inspired interface
- ✅ Real-time call blocking status
- ✅ Track blocked calls count
- ✅ Easy management of blocked numbers
- ✅ Native Android integration with Capacitor
- ✅ Responsive design for all screen sizes

## Demo Numbers

The app comes with demo blocked numbers:
- `+330162` - French number prefix
- `555` - Common spam prefix
- `+1800` - Toll-free numbers

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/3f26f167-4656-48df-b4d2-0a584ddfd70a) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## 📱 Building for Android

To build and test this app on Android:

1. **Export to GitHub**: Use the "Export to GitHub" button in Lovable
2. **Clone and setup**:
   ```bash
   git clone <your-repo-url>
   cd <your-project-name>
   npm install
   ```
3. **Add Android platform**:
   ```bash
   npx cap add android
   ```
4. **Build and sync**:
   ```bash
   npm run build
   npx cap sync
   ```
5. **Run on device/emulator**:
   ```bash
   npx cap run android
   ```

## 🔧 Native Android Features

When built as native Android app, this includes:

- **Call Screening Service**: Intercepts incoming calls
- **Phone State Permissions**: Monitors call status
- **Background Service**: Runs continuously to block calls
- **System Integration**: Works with Android's native call system

## 🚀 How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/3f26f167-4656-48df-b4d2-0a584ddfd70a) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
