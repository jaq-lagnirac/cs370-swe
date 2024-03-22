#!/usr/bin/python3
# Justin Caringal
# A function which organizes and implements Gmail API calls to send emails

# Email Libraries
import os
import base64
from email.mime.text import MIMEText
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from requests import HTTPError

# Multithreading Libraries
from concurrent.futures import ThreadPoolExecutor, as_completed
import multiprocessing

# Constants
MAX_ATTEMPTS = 10
DESCRIPTION = """Hello!
Welcome to send_email.py"""


# Functions

def send_email(service, recipient, subject, body):
    """ Sends a single email
    
    A function which formats and encodes a message with the required
    email information and uses the Google API to send the email

    Args:
        service (api): The Gmail flow used to access the API
        recipient (str): A string containing the email address that will
            receive the email
        subject (str): A string containing the subject header for the email
        body (str): A string containing the raw body text for the email

    Returns:
        Returns confirmation (unusable by program)
    """
    # sets up email with required parts
    message  = MIMEText(body)
    message['to'] = recipient
    message['subject'] = subject

    # encodes message in base64
    create_message = {
        'raw' : base64.urlsafe_b64encode(message.as_bytes()).decode()
    }

    try:
        message = (
            service
            .users()
            .messages()
            .send(userId='me', body=create_message)
            .execute()
            )
        print(f'Sent message to {recipient}')
    except HTTPError:
        print(f'An HTTP error occured with {recipient}')
        message = None
    except Exception as error:
        print(f'An unknown error occured with {recipient}\n{error}')
        message = None

    return message


def sends_emails_to_list(service, recipients, subject, body):
    """ Sends email to list of recipients

     A function which takes a list of email addresses and sends
     identical emails to each of the recipients. Does not use bcc

     Args:
        service (api): The Gmail flow used to access the API
        recipients (list): A list of email address strings
        subject (str): A string containing the subject header for the email
        body (str): A string containing the raw body text for the email

    Returns:
        None
    """
    # processes tasks using ThreadPoolExecutor
    errors = []
    with ThreadPoolExecutor(max_workers = multiprocessing.cpu_count()) as executor:
            for recipient in recipients:
                try:
                    executor.submit(send_email, service, recipient, subject, body)
                except:
                    errors.append(recipient)


def send_email_driver(recipients, subject, body):
    """ Driver function to handle OAuth

    A function which handles the OAuth into the Google API for Gmail
    and sends the emails
    """
    # sets scopes for use with Google API
    SCOPES = [
        "https://www.googleapis.com/auth/gmail.send"
    ]

    credentials = None
    # The file token.json stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for the first
    # time.
    if os.path.exists('token.json'):
        credentials = Credentials.from_authorized_user_file('token.json', SCOPES)
    # If there are no (valid) credentials available, let the user log in.
    if not credentials or not credentials.valid:
        if credentials and credentials.expired and credentials.refresh_token:
            credentials.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                'credentials.json', SCOPES)
            # keeps attempting to form the connection while empty
            while credentials == None:
                try:
                    credentials = flow.run_local_server(port=0)
                except:
                    print('Failed to generate server.')
        # Save the credentials for the next run
        with open('token.json', 'w') as token:
            token.write(credentials.to_json())

    # keeps attempting to send emails until max attempts reached
    successful_auth = False
    for attempt in range(1, MAX_ATTEMPTS + 1):
        try:
            # builds Gmail call with attached credentials
            service = build('gmail', 'v1', credentials = credentials)
            # sends emails to a given email list
            sends_emails_to_list(service, recipients, subject, body)
            successful_auth = True
            print('Successfully sent emails.')
            break
        except:
            print(f'Attempt {attempt} failed. Error in authenticating into Google API.')

    if not successful_auth:
        print('Authentication into Google API unsuccessful.')

if __name__ == '__main__':
    recipients = [
        'jac5566@truman.edu',
        'jaw6642@truman.edu',
        'abr8115@truman.edu',
        'an2713@truman.edu'
        ]
    subject = 'this is a test subject for cs370'
    body = 'this is a test body for cs370'
    send_email_driver(recipients, subject, body)