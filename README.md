# **Lead Management App**

This application provides a way to collect and manage immigration assessment leads. Users can fill out a lead form, while internal users can access and review submitted leads via an authenticated dashboard.

## **🚀 Getting Started**

### **1️⃣ Install Dependencies**

Run the following command to install all necessary dependencies:

```bash
npm install
```

### **2️⃣ Start the Development Server**

To start the application locally, run:

```bash
npm run dev
```

The app will be available at:

- **Frontend:** Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## **📌 Endpoints to Note**

| **URL**                                                              | **Description**                    |
| -------------------------------------------------------------------- | ---------------------------------- |
| [http://localhost:3000/](http://localhost:3000/)                     | Public Immigration Assessment Form |
| [http://localhost:3000/login](http://localhost:3000/login)           | Login page for authentication      |
| [http://localhost:3000/leads-list](http://localhost:3000/leads-list) | Protected list of submitted leads  |

### **🔒 Authentication Check**

- If you try to access **`/leads-list`** without logging in, you'll be redirected to the login page.

---

## **🔑 Login Credentials**

Use the following credentials to log in and access the leads list:

```bash
Username: admin
Password: password123
```

---

## **📂 Environment Configuration**

### **Firebase Storage Configuration**

We store uploaded resumes in **Firebase Storage**. To enable file uploads, create a `.env` file in the root directory with the following credentials:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

### **NextAuth.js Configuration**

If using authentication, add the following environment variables:

```bash
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000
```

Make sure your Firebase project is set up and these values are correctly configured.

---

## **👀 Viewing the Leads List**

- After submitting a form, click **Sign In** at the bottom of the page.
- Once logged in, visit [http://localhost:3000/leads-list](http://localhost:3000/leads-list) to view submitted leads.

---

## **📌 Deployment Notes**

- Ensure all required **Firebase and NextAuth credentials** are added in the environment variables.
- The app can be deployed using **Vercel** or **Netlify** with proper Next.js configurations.

---

## **📜 System Design & Architecture**

For a detailed breakdown of our design choices, project architecture, and decision-making process, refer to the **[DESIGN.md](./DESIGN.md)** file in the project root.

---

## **🔧 Areas for Improvement**

The current implementation is functional, but some improvements are planned:

- **Redux Finalization:** Redux is partially implemented but needs better state handling for leads.
- **JSON Forms UI Enhancements:** Improve form spacing, layout, and styling for better usability.
- **Better Error Handling:** Ensure validation messages appear only when necessary.
- **Code Cleanup:** Refactor components and ensure modularity.

---

## **🔧 Future Enhancements**

- **Database Integration:** Store leads persistently using Firebase Firestore or another database.
- **Role-Based Access:** Different user roles for managing leads.
- **Email Notifications:** Notify users upon successful form submission.

---

## **📜 License**

This project is licensed under the **MIT License**.

---

🚀 **Now you're ready to use the Lead Management App!** Happy coding! 🎉
