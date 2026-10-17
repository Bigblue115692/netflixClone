Supabase API Notes

Database Overview

Backend: Supabase

API type: REST

Testing tool: Postman

API base URL: {{baseUrl}}/rest/v1/

API Requests Tested

Method

Purpose

Status

GET

Retrieve all movies

Working

GET

Retrieve a movie by ID

Working

POST

Create a new record

Working

PATCH

Update an existing movie

Working

DELETE

Delete an existing movie

Working

Database Tables

For each table, document:

Table name

Required columns

Primary key

Foreign keys, if applicable

API Configuration

Requests use these headers:

apikey: Supabase publishable key

Authorization: Bearer token, as configured in Postman

Content-Type: application/json

Never store secret keys in this document.