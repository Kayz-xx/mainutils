const admin = require("firebase-admin");
require("dotenv").config();

const config = {
  "type": "service_account",
  "project_id": process.env.PROJECT_ID,
  "private_key_id": process.env.PRIVATE_KEY_ID,
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDSya2mI8GIyagF\n330nCmDqvbWv8FlQxHMEoRaLppxBfkOjCNsKiSsOr7SQPXNuqcegr1os/VOmbGmA\n0i83TGzhTBDDWNQGu3NMSswBmPQajPLW+q9wbcgFdBrkFbbj1XqMJes/l7RxXqfC\nqmFY8gGWPshwS6bW8iaSfGjE7Ibpd3tIWXYd7DqVKVLUkYIZckhX1MOxIQewuR7D\novW5YWMzC6M2p0WY/g1UBzuYKenWQXyiYre8e6izELBlbBx1qCq4tLrSg5IGDgrn\nwzYwmMPwcKGFYwjX4miZJzHkct2Poyw5znXsKRT9eaafYt/vU5SbjYZI3NyMUrAb\n24yPoG8RAgMBAAECggEABLDK+dJcH0mAgQ/z+qNNHJAn68A9FpJmjlTw2d71ZXI0\nOlurNyjuAbvIeHi7mbvytqlMSAnDm6WYM+8JcLE1T46oJVaz0ioH8uvLriHrla8r\nBLxrnMR+odtvcUGn8ho5Kcb6vQ2ozOiKsmbk92wcO64OOwx97BTTpakZ0j8Csg2F\nniudFoM7zXNjQQlsLBLwod+NfmAqVRxG3L0SsN5UDn6SHLf3rS04jHYFgfxZvHpk\nA3IDCCqBXxc7wKwMidWTumoZeJCLUR0Meguk3RzgFl1Ao7KLXSWQ2vLLAFE/a/+D\nVZJV9JTG48Avp8TqGo2RdhBruq+Ps2ISK8rv1anH+QKBgQD5Pei/myX3lu4hL2FV\nGJnhE+XCNkgRGK9TuLbemXF636KAq5FQxQknyHbzvLPeTFd7odIZ8CxluOwU2W4G\nYvFIW6kqF3mln+bmf/xy+cAae9C5u5sQyo5NnT4vE6pPPxiup2wsRVkO/8b5JSm4\naAAJ9VSUffns8/MkoPl4NvegmQKBgQDYgNgD93j93Vmt+7KFFHxipXptmhC5zzQr\nGmGD/YzfmhuunZdNYikJJb1Eiu+hw2ygo4aBSS0ih5YN8sLIhx6duspqw4F8SlqP\nGAoCbbnMR5r3v75CfY2udItkcGnPrmY6PPoUTX0nGNPC1cajZfGnojpMHCdDEr3B\nWaTFwO41OQKBgGQhjBUWJo2udCKe31KJnKCBFugMWK2NpjpTVhxdtupvV+CrjKjP\nT9tMvQU0xWpEb0z6+OZ0x9FiFm5V387vBxJTyMVhQvzYHbJyrqAeWCALqBJGHYkE\nZ2ElD+tn0h8eMTNRjbLHdX0CIxTK6lTsaz+U8RLq/XJFm2QWy8KRCrDZAoGAKf9s\nZ/CUluJeaCKgMbKUomopQqOVRQYNv6LBceI4dpOldQz68bbt8OlSOr6c14taQhsW\nl3PDfqRAlnoWEOItLTmz1FwSfTLLOGDYaDoyxY7KX+7hEHLcjg/rjlNEI1ZYXEnB\n1Thm47OsOGpRuxamdvdASc1YTGmRR7WFAht32fkCgYBfkmN5ftq0TeV2bHlnhYrE\nO6ABupH4CPndiqFssQp9dvqeUOBBj2buYdVrGJfLl6eGGo3wWnG48oBmE07gFpCw\n5e8KA+aSeZJ0xu5wy9bk0dqZx2LZ79Lzx/lD1XyG6pqXUF59MJE+LqsTkwCG+1rr\n2JgDGCZhTRhhBLo+T13uMQ==\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-o0cli@discord-beta-b3add.iam.gserviceaccount.com",
  "client_id": "106644098161125900881",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-o0cli%40discord-beta-b3add.iam.gserviceaccount.com"
}

admin.initializeApp({
    credential: admin.credential.cert(config),
    databaseURL: 'https://discord-beta-b3add-default-rtdb.asia-southeast1.firebasedatabase.app/'
  });
  

module.exports = {
    db: admin.database()
  };

