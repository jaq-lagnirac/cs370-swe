#!/usr/bin/python3
# Justin Caringal
# A function which organizes and implements Gmail API calls to send emails

# Gmail API Libraries
import os
import base64
from email.mime.text import MIMEText
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from requests import HTTPError

# JSON library
import json

# Constants
MAX_ATTEMPTS = 10
DESCRIPTION = """Hello!
Welcome to send_email.py
"""
EMAILS_KEY = 'recipients'
SUBJECT_KEY = 'subject'
BODY_KEY = 'body'
EXT = '.json'


# Global variables
errors = [] # stores email addresses which produce errors


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

    global errors
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
        errors.append(recipient)
        message = None
    except Exception as error:
        print(f'An unknown error occured with {recipient}\n{error}')
        errors.append(recipient)
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
    global errors
    # threading_errors = []
    # with ThreadPoolExecutor(max_workers = multiprocessing.cpu_count()) as executor:
    #         for recipient in recipients:
    #             try:
    #                 executor.submit(send_email, service, recipient, subject, body)
    #             except:
    #                 errors.append(threading_errors)

    for recipient in recipients:
        send_email(service, recipient, subject, body)

    # print(errors)
    return


def auth_into_email(recipients, subject, body):
    """ Driver function to handle OAuth

    A function which handles the OAuth into the Google API for Gmail
    and sends the emails

    Args:
        recipients (list): A list of email address strings
        subject (str): A string containing the subject header for the email
        body (str): A string containing the raw body text for the email

    Returns:
        None
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

    return


def send_email_from_json(json_path):
    """Initiates sending email from JSON
    
    A function which extracts data relevant for an email
    and sends it through the pipeline of functions which
    results in emails being sent to a list of addresses.
    
    The top-level function which is exposed for use in other
    functions.
    
    Args:
        json_path (str): A path to a json file, expecting
            certain keys
    
    Returns:
        None
    """
    
    # input_file_path = 'cs370_class_list.txt'
    # input_file_path = 'small_test_list.txt'
    # input_file_path = 'dummy_emails.txt'

    _, ext = os.path.splitext(json_path)
    if ext != EXT:
        print('Non-JSON file inputted.')
        return
    
    expected_keys = {SUBJECT_KEY, BODY_KEY, EMAILS_KEY} # set
    with open(json_path, 'r') as input:

        # loads JSON into dict
        email_request = json.load(input)
        
        # ensures required keys are listed
        received_keys = set(email_request.keys())
        if received_keys != expected_keys:
            print('Inputted JSON file does not have the required keys.')
            return
        
        # extracts data
        emails = email_request[EMAILS_KEY]
        subject = email_request[SUBJECT_KEY]
        body = email_request[BODY_KEY]

    # validates types of extracted data
    if type(emails) != list or \
        type(subject) != str or \
            type(body) != str:
        print('Data types do not line up.')
        return

    # prints status update
    # print(email_request)
    # print(subject)
    # print(body)
    # print(emails)
    # executes exposed function
    auth_into_email(emails, subject, body)

    return


if __name__ == '__main__':
    print(DESCRIPTION)
    send_email_from_json('dummy_emails.json')
