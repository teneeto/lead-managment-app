# **Lead Management App - Design Document**

## **1. Overview**

The Lead Management App is built using **Next.js App Router**, **Redux for partial state management**, and **Firebase for file storage**. The application allows users to submit leads via a public form and view/manage leads internally with authentication.

---

## **2. Technology Stack & Justifications**

| **Technology**                          | **Usage**                          | **Why We Chose It?**                                                            |
| --------------------------------------- | ---------------------------------- | ------------------------------------------------------------------------------- |
| **Next.js (App Router)**                | Main framework                     | - Server-side rendering (SSR) for performance<br>- API routes for backend logic |
| **Redux Toolkit**                       | Partial state management for leads | - Some state is stored globally, but needs finalization for full scalability    |
| **Firebase Storage**                    | File uploads (resumes)             | - Easy integration with Next.js<br>- Secure cloud storage                       |
| **NextAuth.js**                         | Authentication                     | - Simplifies user authentication & session handling                             |
| **JsonForms (with Material Renderers)** | Dynamic form creation              | - Schema-driven UI for flexibility and better integration with Material UI      |
| **Styled-Components**                   | Styling                            | - Component-based styling that adapts to Next.js                                |
| **Jest + React Testing Library**        | Unit testing                       | - Ensures form & Redux store functions correctly (Not yet implemented)          |

---

## **3. Architecture Design & Folder Structure**

The application is **modular**, keeping concerns separate and making it easier to maintain.

```
/src
 ├── /app
 │    ├── /api
 │    │    ├── /auth/[...nextauth].ts    # NextAuth.js authentication API
 │    │    ├── /leads/route.ts           # API for handling leads storage
 │    ├── layout.tsx                      # Wraps app with Redux provider
 │    ├── page.tsx                         # Main lead form UI
 │    ├── leads-list.tsx                    # Protected internal leads list
 │
 ├── /components
 │    ├── LeadForm.tsx                      # Lead form component
 │    ├── styledComponents.ts                # Centralized styles
 │    ├── ReduxProvider.tsx                  # Wraps Next.js app with Redux
 │
 ├── /redux
 │    ├── store.ts                           # Redux store setup (Partially used)
 │    ├── leadsSlice.ts                       # Redux slice for managing leads (Needs refinement)
 │
 ├── /utils
 │    ├── countries.ts                       # List of countries for dropdown
 │
 ├── __tests__                                # Unit tests (Not yet implemented)
 │    ├── LeadForm.test.tsx                   # Unit test for lead form (Pending implementation)
 │
 ├── /lib
 │    ├── firebaseConfig.ts                   # Firebase configuration
```

📌 **Why this structure?**

- **Separation of concerns** → Components, Redux, and API are kept modular.
- **Scalability** → Future features can be added without breaking existing code.
- **Reusability** → Components & utility functions are easy to maintain.

---

## **4. Key Design Decisions & Their Justifications**

### **4.1 Form Handling with JsonForms and Material Renderers**

🔹 **Decision:** We chose JsonForms with Material UI renderers for the lead submission form.  
🔹 **Why?**  
✅ **Configuration-driven UI** → Can modify the form by just updating the schema.  
✅ **Better UI integration** → Material UI renderers ensure a modern, user-friendly interface.

### **4.2 State Management with Redux (Partial Implementation)**

🔹 **Decision:** Redux is used for partial state management.  
🔹 **Why?**  
✅ **Centralized state (in progress)** → Some lead data is stored globally but needs full implementation.  
✅ **Better predictability** → Helps manage shared state across components.

### **4.3 Authentication with NextAuth.js**

🔹 **Decision:** Restrict access to the **Leads List** page using authentication.  
🔹 **Why?**  
✅ **Security** → Only authorized users can access lead data.  
✅ **Easy session handling** → Handles login, session management, and logout.

### **4.4 File Upload Handling with Firebase**

🔹 **Decision:** Use Firebase Storage for storing resumes.  
🔹 **Why?**  
✅ **Scalability** → Easily supports larger file storage needs.  
✅ **Secure** → Firebase provides built-in authentication & file access control.

---

## **5. Challenges & How We Solved Them**

| **Challenge**                             | **How We Solved It?**                                                                         |
| ----------------------------------------- | --------------------------------------------------------------------------------------------- |
| **Validation appearing before input**     | Used `submitted` state to only show errors **after form submission**                          |
| **Hydration errors in Next.js**           | Wrapped the form inside a `useEffect` hook to ensure it only renders client-side              |
| **Redux reducer issue**                   | Ensured `leadsSlice.ts` correctly exports `default reducer`                                   |
| **Form data not updating Redux**          | Connected Redux `dispatch(addLead(data))` inside `handleSubmit()` but needs better completion |
| **Spacing & Layout Issues in JSON Forms** | Need to improve UI spacing and styling for better usability                                   |
| **Unit tests not implemented**            | Jest and React Testing Library setup is pending                                               |

---

## **6. Future Improvements**

🚀 **What can be added next?**

1. **Finalize Redux Integration** → Ensure all lead data is properly stored and retrieved from Redux.
2. **Improve JSON Forms UI** → Adjust spacing and styling for better readability.
3. **Implement Unit Tests** → Set up Jest and React Testing Library for form validation and API testing.
4. **Database integration** → Store leads persistently using Firebase Firestore or another database.
5. **Role-based access** → Different levels of access for internal users.
6. **Email notifications** → Send an email confirmation upon lead submission.

---

## **7. Conclusion**

- The app is built with **Next.js, Redux (partially), and Firebase** for scalability.
- **JsonForms with Material Renderers provides a dynamic, user-friendly form UI**.
- **NextAuth.js ensures authentication & security**.
- **The architecture is modular but still requires some refinements**.

✅ **With these design choices, the application is easy to maintain, scalable, and efficient, but still requires final optimizations.**
