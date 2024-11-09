### user your own logins and passwords ;)

global:
  smtp_smarthost: '${SMTP_SERVER}'
  smtp_from: '${EMAIL_USER}'
  smtp_auth_username: '${EMAIL_USER}'
  smtp_auth_password: '${SMTP_SERVER_PASSWORD}'
  smtp_require_tls: true

route:
  receiver: 'email'
  group_wait: 10s

receivers:
  - name: 'email'
    email_configs:
      - to: '${RECIPIENT}'
