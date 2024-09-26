# InkSpire-AI: AI-Driven Content Creation Suite

InkSpire-AI is an open-source tool designed to streamline and enhance the content creation process using AI assistance. It leverages the Hugging Face Inference API to provide features for content generation and analysis.

## Current State

This project is in early development. Basic functionality for content generation and project management has been implemented, but many features are still in progress or planned for future development.

## Features

- AI-powered content generation for various types (blog posts, social media, product descriptions, etc.)

- Basic project management system

- User authentication (in progress)

- Content analysis

## Tech Stack

- Frontend: Next.js with TypeScript

- Backend: Express.js with TypeScript

- AI Integration: Hugging Face Inference API

- Authentication: JWT (in progress)

## Prerequisites

- Node.js (v14 or later)

- npm or yarn

- Hugging Face API account and token

## Setup

1\. Clone the repository:

   ```

   git clone https://github.com/somkuwaryash/inkspire-ai.git

   cd inkspire-ai

   ```

2\. Install dependencies:

   ```

   # Install backend dependencies

   cd backend

   npm install

   # Install frontend dependencies

   cd ../frontend

   npm install

   ```

3\. Set up environment variables:

   Create a `.env` file in the `backend` directory with the following content:

   ```

   PORT=3001

   LLM_API_ENDPOINT=http://192.168.1.2:1234/v1

   HUGGINGFACE_API_TOKEN=your_huggingface_api_token

   HUGGINGFACE_MODEL_ID=mistralai/Mistral-7B-Instruct-v0.3

   ```

   Replace `your_huggingface_api_token` with your actual Hugging Face API token.

4\. Start the backend server:

   ```

   cd backend

   npm run dev

   ```

5\. Start the frontend development server:

   ```

   cd frontend

   npm run dev

   ```

6\. Open your browser and navigate to `http://localhost:3000` to access the application.

## Current Limitations

- The project uses in-memory storage and does not persist data between server restarts.

- User authentication is partially implemented but not fully integrated.

- Error handling and input validation are minimal.

- The UI is functional but basic, with limited styling.

## Next Steps

- Implement persistent data storage

- Complete and integrate user authentication

- Enhance error handling and input validation

- Improve UI/UX design

- Add more advanced content management features

## Contributing

This project is in active development. Contributions are welcome, but please note that many features are still evolving.

## License

This project is open source and available under the [MIT License](LICENSE).