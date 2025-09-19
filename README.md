# Pencak Silat Scoring System

This is a web-based scoring system for Pencak Silat competitions. It provides a real-time, multi-user platform for judges, officials, and operators to manage and score tournaments.

## About The Project

This project aims to modernize and streamline the scoring process for Pencak Silat tournaments. It replaces the need for manual scoring systems with a digital solution that is more accurate, efficient, and transparent. The system is designed to be used by various roles within a tournament, including:

*   **Juri (Jury):** Can submit scores for each fighter.
*   **Dewan (Council):** Can view and verify scores from the jury.
*   **Ketua Pertandingan (Match Chairman):** Has an overview of the match and can manage the rounds.
*   **Operator:** Manages the technical aspects of the scoring system.

The application uses WebSockets to ensure that all score updates are broadcast in real-time to all connected clients.

## Features

*   **Real-time Scoring:** Scores are updated instantly across all connected devices.
*   **Role-Based Access Control:** Different user roles have different permissions and views.
*   **Match Management:** Create, edit, and delete matches (partai).
*   **Arena Management:** Manage the arenas (gelanggang) where matches take place.
*   **User Management:** Manage user accounts and roles.
*   **History:** View the history of past matches and scores.
*   **Excel Import/Export:** Import match data from and export to Excel files.

## Built With

*   [Laravel](https://laravel.com/)
*   [Tailwind CSS](https://tailwindcss.com/)
*   [Alpine.js](https://alpinejs.dev/)
*   [Laravel WebSockets](https://beyondco.de/docs/laravel-websockets)
*   [Pusher](https://pusher.com/)

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

*   PHP >= 7.4
*   Composer
*   NPM
*   PostgreSQL

### Installation

1.  **Clone the repo**
    ```sh
    git clone https://github.com/your_username/your_project_name.git
    ```
2.  **Install PHP dependencies**
    ```sh
    composer install
    ```
3.  **Install NPM dependencies**
    ```sh
    npm install
    ```
4.  **Create a copy of your .env file**
    ```sh
    cp .env.example .env
    ```
5.  **Generate an app encryption key**
    ```sh
    php artisan key:generate
    ```
6.  **Configure your database credentials in `.env`**
    ```
    DB_CONNECTION=pgsql
    DB_HOST=127.0.0.1
    DB_PORT=5432
    DB_DATABASE=scoring
    DB_USERNAME=postgres
    DB_PASSWORD=root
    ```
7.  **Run the database migrations**
    ```sh
    php artisan migrate
    ```
8.  **Compile frontend assets**
    ```sh
    npm run dev
    ```
9.  **Start the Laravel development server**
    ```sh
    php artisan serve
    ```
10. **Start the WebSockets server**
    ```sh
    php artisan websockets:serve
    ```

## Usage

1.  **Register a new user** or use the default user account.
2.  **Log in** to the application.
3.  Navigate to the **Management** section to set up your tournament:
    *   Create **Arenas (Gelanggang)**.
    *   Create **Matches (Partai)**.
    *   Create **Users** and assign them roles (Juri, Dewan, etc.).
4.  Once the tournament is set up, users can log in with their assigned roles and start scoring matches.
    *   **Juri** users will see the scoring interface.
    *   **Dewan** users will see the verification interface.
    *   The **Papan Score (Scoreboard)** will display the scores in real-time.
