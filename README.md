# My Lovelace Card Template

A template for creating custom Lovelace cards using TypeScript and LitElement.

## Features

- TypeScript support
- LitElement for component creation
- Ready-to-use structure for Lovelace cards
- Easy to extend and customize
- Home Assistant development container setup

## Getting Started

1. Clone this repository
2. Install dependencies: `npm install`
3. Start development server: `npm run watch`
4. Build for production: `npm run build`

## Home Assistant Development Container

To set up a development environment with Home Assistant:

1. Ensure you have Docker and Docker Compose installed
2. Create a `config` directory in the project root
3. Create a `configuration.yaml` file in the `config` directory with basic Home Assistant configuration
4. Build the container: `docker-compose build`
5. Start the container: `docker-compose up -d`
6. Access Home Assistant at http://localhost:8123

## Using the Development Container

The development container provides a complete environment for developing and testing your Lovelace card:

1. **Automatic Code Sync**: The container automatically syncs your local code changes to the Home Assistant instance. When you make changes to your card in the `src` directory, they will be reflected in the container.

2. **Development Workflow**:
   - Make changes to your card in `src/lovelace-card.ts`
   - Use `npm run watch` to automatically compile TypeScript changes
   - The compiled JavaScript will be available in the `dist` directory
   - The container will automatically reload when changes are detected

3. **Testing Your Card**:
   - Add your card to a Lovelace view in Home Assistant
   - Use the following configuration:
   ```yaml
   type: custom:my-lovelace-card
   title: My Custom Card
   ```
   - The card will be available in the Lovelace UI

4. **Debugging**:
   - Access the container shell: `docker exec -it homeassistant bash`
   - Check logs: `docker logs homeassistant`
   - View the Home Assistant configuration: `cat /config/configuration.yaml`

5. **Stopping the Container**:
   - Stop the container: `docker-compose down`
   - Remove the container: `docker-compose down --rmi all`

## Usage

1. Import the card in your Lovelace configuration:
