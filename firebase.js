const admin = require("firebase-admin");
require("dotenv").config();


const config = {
  "type": "service_account",
  "project_id": "discord-dono",
  "private_key_id": "168319d6e11df652612f727575688f14a866268b",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDOklrG92/MVKAx\nf5FcflM2VRb7T6PLYakJMbKu7cqEp7xSXUP7QOykcs/5UBQuPaFU2zr/ksfr9xet\nuwTB8xxuzYry52RQKs95AXSsLl1B10y/XxMBIMq/B/iDf7rXF6JsV+C/xlwHrF7W\nLGbfkn39dNzLKO7319cw8CtFZscp0hEpq6qFiGSU2W1ziMq0EWKPXuRcrlkEtx3s\nqiZ7Rr6dLpE7OCcPwAnHlZXAwVPtpBkm3db45IOYcF42u9LN9e1fG9TAC4nHSPWR\nM4Eq5wm7RccWsGKhIWrS33mUes+eZAo/P9kwx6UTd1V4sI8YVnakKJbUGVOVXZPt\n4lqXim49AgMBAAECggEAYFHo5xaQODALhBkOEBlNNqvla+heISLX/VQBk8SIJmPK\nEYOwg7LpxOJOLFuVFVyiYd1ZfLsV4maUUWs/VCpGSzonPIz9fs3/cNZnbzOtQ1qf\nTCqKQ3/lWb7fN32zAsFf+HHfd7yHxAIxNF9+1mfJvImlvEtJZiJsEkMighli65HT\n+Z9SSxtSMxSruAVIvOkEgGYIaPE22IAdfogVSmBHHrUUDLrcRb0N/LWDMY5XlFb5\neo7vFkg+qtykhQZVyxMfethIv7yd5p0sqEHsmAoWi4nEYWvZfWEZGTkX2mz4hwFe\nJsmHhVoHLqrXqEi3wTH+tFLeIZayIH8vJM538GGvJwKBgQDpRcOJLxJPQNwzN2Cl\nh3ypsM2FmnoykHqsYQqmsq1ji6bwNpPAE4ncGdsPxLh6m+rusYFZGRp6ZfL80JFk\nRs//Yl+qHn0nIE3ROGq4zsnwed9Jp8nvvzNeBuBmBFTJMFX46X8d+13CVEUFOU5X\nTQ3LUy2uJXyybtRDfya0pNkkzwKBgQDisp/Wn+4Mh0oDEYDeKWU5IcREvAhhVSb1\ntbbqWBlFGEFS6t/H9fr2CK11rWiOGfivQ8J0qEHKeZTuJV0hA0jorjHmv8Dpj0Bg\n8wYOVyx2SQANV6SGFOFd6HlCgWscCh9D4Ol/SDdaZjY8TM0TQcNSvEkJZFOwqN1i\nV+y2Y86XMwKBgQDnzli56RnTwctP5dbXhuSdp8ED4/dMagBNbf1sm5/rjOouSL3Y\nIFJdcyAZ8k20IV57Jc84n9aNDORC0Gu6bxfgW3xfC/8oM1TA9MQws+U+X41An0jv\nQlwkMsco+WLbrnmwaS/VtmV8Z8tSnpi37i0oAJcjN8NLeRDbpe3rkujpRwKBgCIY\nnaPJQCOQQZh+jHRdo4TZSEzSPyxsg0SXhSBwCbTztfeDrg7EN2/D1FsLrtsYmue5\neEjVebe7W6QJ6Jzrgo7EjGrZUmmOiy9JvhJwGBbeWeynzu3/u/nE2mAfWP3Jo/Qw\nos3rDbBCCUw+fOW1kWwjN5T7Cv9aFpoRAWBZWJwzAoGAasOTAMEUqw5eTQhjBk0d\nLJBTBbwvlegYASdJ7ZXaTMWPr8lxtmU6dk2nVGThLYM08701BO61+SUVVYUyT47D\nRImbV94vXZ1pcxQaQnvi9ftpoRZPN9zUo3mn9Z6+dAibs6Kiy4GRlNxxtqDPu2+8\ncUY/Gkel+2Oy4OIMCjO8Lz4=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-4l4g0@discord-dono.iam.gserviceaccount.com",
  "client_id": "111457724421065244663",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-4l4g0%40discord-dono.iam.gserviceaccount.com"
}

admin.initializeApp({
    credential: admin.credential.cert(config),
    databaseURL: 'https://discord-dono-default-rtdb.asia-southeast1.firebasedatabase.app/'
  });
  

module.exports = {
    db: admin.database()
  };

