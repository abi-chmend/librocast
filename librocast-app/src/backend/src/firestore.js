export const admin = require("firebase-admin");

const firebaseConfig = {
  type: "service_account",
  project_id: "librocast-be5ba",
  private_key_id: "b4d45a0ee2c68f882d29f6e01bcf7dea44332910",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEugIBADANBgkqhkiG9w0BAQEFAASCBKQwggSgAgEAAoIBAQCvzHAutr6Z/kDW\n2tv6zRPbJQ6XjlS6Mj9DRdScbtBUehuKecZyrXniDNjDkRt0rSqJR4OhEWy2/5Yv\nAu10GdgOIJgbMISkYVk8wtkUTD7m/0eBHs4fmBJy4v3Rc37JEEwh/ln0HUAYVCbC\n4sMFnjWPhUSIXf8wqeFDfulckdNwJSuJVaJMUIj8w2XhmQ9jtboTlykS4+irOaRp\nbErxN0FrYlJAeM4stGi1QvUbwQlXCebawxEJIKUsKNTUaRFerVk2TVMTj8tTZhkR\nBmN81W1QACpzLRfTYWz3YUnJevCpa8NC1LVkMuhTEDmp7lgfiIO5tL5CETJTEqnP\n9g46ak0hAgMBAAECggEAInC/kJNKK4KZYs5NNukK6Q2tOmlOtYynAq+xS7VU+JvU\nffBF/cz5Gh1QsR2iPp03Pl5Fjh5LCV3wpwSgjvSKNJhTnE4Iymhs8l+s5hJa52ff\nMw9dK+jfwmSwe6JwFgVsmONK7a12U13XGyqQMO9SCGxAJSQfHMJHSLEaGEHUZb17\nQPCUm+B5FRsJt4rDxYWx8mXK3acd6iPt5XHpA0pgOyWSL8ZJXBuI5IDzmTpyM6e4\nBLHs3Ejvg/6H/L+J1pf9lGtY3fKNJS6funLS7WBnWOBhF1IZ+yxvdZASqIn9TEZj\n12/UghD/5USbTFRwhOoIXmUHpoH2j6TVRjFrKW1J3QKBgQDeBFKUEAHcBp9mx3M/\nDw3J2PPThT2mlhobGDSeP3wVBrF4DutQmz/OmVl/pQ7q8lGJyUUgReZ/Fr5d5dai\nF+g9KvISD+wPDkJigKkS7z1yit6SnSsfoR/Z6P/Xnzl0iGFsYX8qmHnwz76TTDtu\nj6gB0V5ng2SVXrl1Qag6mFK0tQKBgQDKtRAayG+djVrB0s1GJg8/Si46X20xGC6T\nFba8XgAIJiWF3DmR9TEWyTQkjZwQELqz8ZNxhMH9v62HgCKYjBiGeYzOaOVOuKju\ncjS4vBCGhBOAgOZaaN7PRD6tmwWliWvq9u86HYGv5vaeIKa82h+O9seuLlMbL23t\nqu/2YTUGPQKBgGSqCxMtKtqregzs9BksZzEVGIDYkfp9ZnrQf9Mcr9MMxNzNzu4u\nZkDzkPvqSBhJJKVXx+r5JqiLFGeYtberJVbOqRF9fKfa7EijU4XNScwsoPxTHOFr\nefigx5fpjvCCgcHVdwZGOkvwtdUtpGjd4+xnFOnUTn/XgjljOrbOp/ldAoGAKx0V\nnsywyK7O9diTJm9j4M8zQ+EWBVIiXdBJfIj1ssYCRxVO/VdMKI+E0p136wbT3v/r\nn0JgTEsfaml7cjyh3sAtjZ1L4FFwRL7vrbb6QNIIn9VKqUIS2bynJB+LtOiklmYM\n/axW8AXMwFcrf5FZEvwz/j0GGgsdc2ZfAWUtdPUCf1rbccjpnGy/8o9JrWUufmLN\nl1pQ++e4JsHgEU8JAYtIO5Ew51D5BRAcUK8xeMtj57JmoEOUo+geCmcPV7zDrJtJ\noCGnz419ibuQr76GtrG1k9OS7by6+7zysBcaW+avqW5cvY58MeY0ZrOGaCQclhGv\nIB7waocTslkc/Pm8HuI=\n-----END PRIVATE KEY-----\n",
  client_email:
    "firebase-adminsdk-kifhn@librocast-be5ba.iam.gserviceaccount.com",
  client_id: "111546821017488407899",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-kifhn%40librocast-be5ba.iam.gserviceaccount.com",
};
//initialize admin SDK using serciceAcountKey
admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
});

export const db = admin.firestore();
