# TINKERBELL BACKEND (PHP + MySQL Guide)

This directory provides a complete, working PHP & MySQL backend for **Tinkerbell — The Secret Language of Flowers**.

---

## 🌟 Why is this included?
- **Frontend Mode (Live Server):** Runs standalone with zero installation using HTML5, CSS3, Vanilla JS, and browser IndexedDB.
- **Full-Stack Mode (PHP + MySQL):** Enables genuine cross-device sharing of secret gift codes across different phones, laptops, and networks via a central MySQL database.

---

## 🚀 How to Set Up in XAMPP (Local Full-Stack)

1. **Install and Open XAMPP:**
   - Download XAMPP from [apachefriends.org](https://www.apachefriends.org/).
   - Start **Apache** and **MySQL** modules from the XAMPP Control Panel.

2. **Copy the Project:**
   - Copy this entire `tinkerbell1` folder into your XAMPP `htdocs` directory:
     `C:\xampp\htdocs\tinkerbell1`

3. **Import Database:**
   - Open your browser and go to: `http://localhost/phpmyadmin/`
   - Click on the **Import** tab.
   - Choose the file: `backend/schema.sql`
   - Click **Go** (Import).
   - This creates the `tinkerbell_db` database and its tables (`flowers`, `gifts`, `gift_flowers`).

4. **Verify Database Connection:**
   - Open `backend/db_connect.php`.
   - By default in XAMPP:
     - Host: `127.0.0.1`
     - Database: `tinkerbell_db`
     - User: `root`
     - Password: `""` (empty)

5. **Test the API in your browser:**
   - Open: `http://localhost/tinkerbell1/backend/api.php?action=get_gift&code=TINK-DEMO01`
   - You will see the JSON response for the sample seeded gift!

6. **Enable Backend Sync in Frontend (Optional):**
   - In `js/storage.js`, the code can automatically send `POST` requests to `backend/api.php?action=save_gift` and retrieve gifts across devices whenever hosted on an Apache/PHP web server.

