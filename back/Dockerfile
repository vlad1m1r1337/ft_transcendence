FROM python:3.12

WORKDIR /usr/src/app

VOLUME /usr/local/lib/python3.12/site-packages

COPY modules.txt .
RUN pip install --upgrade pip && \
    pip install -r modules.txt --use-feature=fast-deps

COPY . .

EXPOSE 5001

CMD sh -c "python3 manage.py makemigrations && \
           python3 manage.py migrate && \
           python3 manage.py collectstatic --noinput && \
           python3 manage.py runserver 0.0.0.0:5001"
