# Email Form Setup Guide - FREE Solution

## Overview
Your contact form is now connected to **Web3Forms**, a completely free email service that requires no backend!

## Quick Setup (5 minutes)

### Step 1: Get Your Free Access Key
1. Go to **https://web3forms.com**
2. Enter your email address (where you want to receive form submissions)
3. Click "Get Your Access Key"
4. Copy the access key they provide

### Step 2: Add Access Key to Your Project

#### Option A: Environment Variable (Recommended for Production)
1. Create a `.env` file in the `frontend` folder (if it doesn't exist)
2. Add this line:
   ```
   REACT_APP_WEB3FORMS_KEY=your_access_key_here
   ```
3. Replace `your_access_key_here` with the key from Step 1
4. Restart your development server

#### Option B: Direct in Code (Quick Testing)
1. Open `frontend/src/pages/RequestDemo.js`
2. Find this line (around line 5):
   ```javascript
   const WEB3FORMS_ACCESS_KEY = process.env.REACT_APP_WEB3FORMS_KEY || 'YOUR_ACCESS_KEY_HERE';
   ```
3. Replace `'YOUR_ACCESS_KEY_HERE'` with your actual key:
   ```javascript
   const WEB3FORMS_ACCESS_KEY = process.env.REACT_APP_WEB3FORMS_KEY || 'your_actual_key_here';
   ```

### Step 3: Update Recipient Email (Optional)
1. In `RequestDemo.js`, find:
   ```javascript
   const RECIPIENT_EMAIL = 'info@medikalafrica.com';
   ```
2. Change it to your email address

### Step 4: Test the Form
1. Fill out the form on your website
2. Submit it
3. Check your email inbox - you should receive the submission!

## How It Works

- **Free Forever**: Web3Forms offers unlimited free submissions
- **No Backend Needed**: Everything works from the frontend
- **Spam Protection**: Built-in spam filtering
- **Email Notifications**: You receive emails when someone submits the form
- **Auto-Reply**: Can be configured to send auto-replies to users (optional)

## What Happens When Someone Submits?

1. User fills out the form and clicks "Submit Request"
2. Form data is sent to Web3Forms API
3. You receive an email with all the form details
4. User sees a success message
5. Form is automatically cleared

## Email Format

You'll receive emails with:
- Subject: "Request Demo - [Name] from [Organization]"
- All form fields formatted nicely
- Contact type and response time
- User's message

## Troubleshooting

### Form shows "Setup Required" warning
- You need to add your access key (see Step 2)

### Form submission fails
- Check that your access key is correct
- Make sure you're using the latest key from web3forms.com
- Check browser console for error messages

### Not receiving emails
- Check spam folder
- Verify your email address in Web3Forms dashboard
- Make sure the access key matches your email

## Alternative Free Options

If Web3Forms doesn't work for you, here are other free alternatives:

1. **Formspree** (https://formspree.io)
   - Free tier: 50 submissions/month
   - Similar setup process

2. **EmailJS** (https://www.emailjs.com)
   - Free tier: 200 emails/month
   - Requires email service setup (Gmail, Outlook, etc.)

3. **Getform** (https://getform.io)
   - Free tier: 50 submissions/month
   - Simple API integration

## Security Notes

- Never commit your access key to public repositories
- Use environment variables for production
- The access key is safe to use in frontend code (it's designed for that)

## Need Help?

- Web3Forms Documentation: https://docs.web3forms.com
- Web3Forms Support: support@web3forms.com
