# Terra Vision Consult

This project is built with React, Vite, and Tailwind CSS.

## Deployment to Vercel

To deploy this project to Vercel, follow these steps:

1.  **Push to GitHub/GitLab/Bitbucket**: Ensure your code is in a Git repository.
2.  **Import to Vercel**: Go to [Vercel](https://vercel.com) and import your project.
3.  **Configure Build Settings**:
    *   **Framework Preset**: Vite
    *   **Build Command**: `npm run build`
    *   **Output Directory**: `dist`
4.  **Environment Variables**:
    *   Add the following environment variables in the Vercel dashboard:
        *   `VITE_FIREBASE_API_KEY`
        *   `VITE_FIREBASE_AUTH_DOMAIN`
        *   `VITE_FIREBASE_PROJECT_ID`
        *   `VITE_FIREBASE_STORAGE_BUCKET`
        *   `VITE_FIREBASE_MESSAGING_SENDER_ID`
        *   `VITE_FIREBASE_APP_ID`
        *   `GEMINI_API_KEY` (if using AI features)

## Local Development

```bash
npm install
npm run dev
```
