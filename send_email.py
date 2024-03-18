import os
import smtplib

import base64
from email.mime.text import MIMEText
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from requests import HTTPError

# loads in private .env variables
from dotenv import load_dotenv
load_dotenv()
EMAIL_ADDRESS = os.getenv('EMAIL_ADDRESS')
EMAIL_PASSWORD = os.getenv('EMAIL_PASSWORD')

DESCRIPTION = """Hello!
Welcome to send_email.py"""

SCOPES = [
    "https://www.googleapis.com/auth/gmail.send"
]

flow = InstalledAppFlow.from_client_secrets_file(
    'credentials.json', SCOPES
)

credentials = flow.run_local_server(port = 0)

service = build('gmail', 'v1', credentials = credentials)

subject = 'this is a test subject for cs370'
body = 'this is a test body for cs370'
sender = EMAIL_ADDRESS
recipients = [
    'jac5566@truman.edu',
    'an2713@truman.edu',
    'jaw6642@truman.edu',
    'abr8115@truman.edu'
    ]

message  = MIMEText(body)
message['to'] = 'jac5566@truman.edu'
message['subject'] = subject
create_message = {
    'raw' : base64.urlsafe_b64encode(message.as_bytes()).decode()
}

try:
    message = (service.users().messages().send(userId='me', body=create_message).execute())
    print(f'Sent message to {message} Message ID: {message["id"]}')
except HTTPError as error:
    print(f'An error occured: {error}')
    message = None