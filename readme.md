BookNest – Online Bookstore

BookNest is a full-featured online bookstore that allows users to browse books, create accounts, manage their profiles, and place orders.
The platform includes admin-only management tools for controlling users, books, and overall site activity.

🚀 Features

👤 User Features
	•	Create an account and securely log in
	•	Browse all available books
	•	View detailed book information
	•	Add books to the cart
	•	Place orders
	•	Edit and manage personal user profile
	•	Contact the bookstore through the contact page
	•	Fully responsive and easy-to-navigate interface

🛠️ Admin Features
	•	Admin Dashboard
	•	User Management (edit, delete, view users)
	•	Book Management (add, edit, delete books)
	•	Access to admin-only pages
	•	View and manage orders (if implemented)

⸻

📄 Pages Included
	•	Home – landing page
	•	About – about the store and mission
	•	Services – what BookNest offers
	•	Contact – send messages to site owners
	•	Books – book catalog
	•	Book Details Page – full book info
	•	Cart Page – view and manage user cart
	•	Login Page
	•	Register Page
	•	User Profile Page
	•	Admin Dashboard (admin only)
	•	User Management Page (admin only)
	•	Book Management Page (admin only)


    ⸻

🏗️ Project Structure (example)
src/
 ├── components/
 ├── pages/
 │   ├── Home.js
 │   ├── About.js
 │   ├── Services.js
 │   ├── Contact.js
 │   ├── Books.js
 │   ├── CartPage.js
 │   ├── Login.js
 │   ├── Register.js
 │   ├── Profile.js
 │   ├── admin/
 │   │   ├── Dashboard.js
 │   │   ├── UserManagement.js
 │   │   └── BookManagement.js
 ├── assets/
 ├── App.js
 └── README.md


 🛠️ Installation

Clone the project:
git clone https://github.com/yourusername/booknest.git
cd booknest

Install dependencies:
npm install

Run the project:
npm start

🔧 Technologies Used
	•	React.js
	•	Node.js / Express (if backend exists)
	•	LocalStorage / API Integration
	•	CSS / Bootstrap / Tailwind (depending on your setup)
	•	JavaScript (ES6+)

🔐 Authentication

BookNest includes:
	•	Active Login system
	•	Registration system
	•	Protected admin routes
	•	User role handling (User / Admin)


🛒 Book Ordering

Users can:
	•	Add books to the cart
	•	Update or remove books
	•	Proceed to checkout (if implemented)


📞 Contact Page

Visitors can send messages or inquiries to the store owners.
