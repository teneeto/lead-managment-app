

## Getting Started

First, install all dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Endpoints to Note

To use this App, we have the following endpoints:

- Open [http://localhost:3000/](http://localhost:3000/): To View the Immigration Assessment Form
- Open [http://localhost:3000/login](http://localhost:3000/login): To open a login form (With this form you can access the Leads List)
- Open [http://localhost:3000/leads-list](http://localhost:3000/leads-list): To View the Immigration Assessment Form

**Note:** To better see how the `/leads-list` endpoint is protected, try to access the `/leads-list` before logging in with the `login`

## Login Credentials
Username:
```bash
admin
```

Password:
```bash
password123
```

## File Upload
We upload files to Firebase, and to use firebase we need to create `.env` file in the root directory with the following credentials
```bash
  NEXT_PUBLIC_FIREBASE_API_KEY = 
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = 
  NEXT_PUBLIC_FIREBASE_PROJECT_ID =
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET =
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID =
  NEXT_PUBLIC_FIREBASE_APP_ID =
```

