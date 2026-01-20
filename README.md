# Gator - Blog Aggregator CLI

gator is a command-line interface (CLI) tool for aggregating and managing RSS feeds. It allows users to register, follow feeds, and aggregate content from multiple RSS sources.

## Features

- User registration and login
- Add and manage RSS feeds
- Follow/unfollow feeds
- Aggregate RSS content
- PostgreSQL database backend with Drizzle ORM

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL database
- npm or yarn

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd aggregator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the database:
   - Create a PostgreSQL database
   - Run migrations:
     ```bash
     npm run migrate
     ```

## Configuration

Create a configuration file at `~/.gatorconfig.json` with your database URL:

```json
{
  "db_url": "postgres://username:password@localhost:5432/gator_db",
  "current_user_name": "your_username"
}
```

Replace the values with your actual PostgreSQL connection details.

## Usage

Run commands using the following syntax:

```bash
npm start <command> [arguments]
```

### Available Commands

#### User Management

- **register `<name>`**: Register a new user
  ```bash
  npm start register john_doe
  ```

- **login `<name>`**: Switch to an existing user
  ```bash
  npm start login john_doe
  ```

- **users**: List all registered users (marks current user)
  ```bash
  npm start users
  ```

#### Feed Management

- **addfeed `<name>` `<url>`**: Add a new RSS feed (requires login)
  ```bash
  npm start addfeed "TechCrunch" "https://techcrunch.com/feed/"
  ```

- **feeds**: List all available feeds
  ```bash
  npm start feeds
  ```

- **follow `<url>`**: Follow an existing feed (requires login)
  ```bash
  npm start follow "https://techcrunch.com/feed/"
  ```

- **following**: List feeds you're following (requires login)
  ```bash
  npm start following
  ```

- **unfollow `<url>`**: Unfollow a feed (requires login)
  ```bash
  npm start unfollow "https://techcrunch.com/feed/"
  ```

#### Aggregation

- **agg**: Aggregate RSS content from followed feeds
  ```bash
  npm start agg
  ```

#### Database Management

- **reset**: Reset the database (drops all data)
  ```bash
  npm start reset
  ```

## Development

### Building

The project uses TypeScript. To compile:

```bash
npx tsc
```

### Database Migrations

Generate new migrations after schema changes:

```bash
npm run generate
```

Apply migrations:

```bash
npm run migrate
```

### Project Structure

```
src/
├── commands/          # Command handlers
│   ├── command.ts     # Command registry
│   ├── feeds.ts       # Feed-related commands
│   ├── reset.ts       # Database reset
│   ├── rss.ts         # RSS aggregation
│   └── users.ts       # User management
├── lib/
│   ├── db/            # Database layer
│   │   ├── schema.ts  # Drizzle schema
│   │   ├── queries/   # Database queries
│   │   └── migrations/# Database migrations
│   └── rss.ts         # RSS fetching logic
├── config.ts          # Configuration management
├── index.ts           # CLI entry point
└── middleware.ts      # Authentication middleware
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

ISC</content>
<parameter name="filePath">/home/tb-aiap/workspace/github.com/aggregator/README.md