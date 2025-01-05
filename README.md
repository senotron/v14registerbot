# 🌟 Star please <3

# Discord Verification and Registration Bot  

A powerful and customizable Discord bot for user verification and registration, designed to streamline the member onboarding process in your server.  

## Features  
- **User Verification System**: Requires users to complete a secure verification process before gaining access.  
- **Role Management**: Automatically assigns roles upon successful registration.  
- **Customizable Messages**: Fully configurable messages to match your server's needs.  
- **Secure Verification**: Sends a 6-digit verification code via direct message for security.  

## Installation  

1. Clone the repository:  
   ```bash
   git clone https://github.com/senotron/discord-register-bot.git
   cd discord-register-bot
   ```  

2. Install the required dependencies:  
   ```bash
   npm install
   ```  

3. Configure the bot:  
   - Rename `config.txt` to `config.json`.  
   - Fill in your bot token, role IDs, and other server-specific details.  

4. Start the bot:  
   ```bash
   node index.js
   ```  

## Usage  

1. Use the `/register` command to send the registration embed in the configured channel.  
2. Users can click "Send Code" to receive a 6-digit verification code via DM.  
3. After entering the code in the provided form, they will be successfully registered and assigned the appropriate role.  

## Contributing  

We welcome contributions! Fork the repository, make your changes, and submit a pull request.  

## License  

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.  

## Support  

If you encounter any issues or have feature suggestions, please open an [issue](https://github.com/senotron/discord-register-bot/issues).  

## Author  
Created by **Senan Shukurzade**.
