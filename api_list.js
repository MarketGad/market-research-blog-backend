const api =[
        {
            method: "POST",
            api: "http://localhost:5000/api/loginUser",
            body: {
                "username": "sai-bot",
                "password": "iambot"
            }
        },
        {
            method: "POST",
            api: "http://localhost:5000/api/signupUser",
            body: {
                "username": "sidhartha7",
                "firstname": "Sidhartha",
                "lastname": "Mallick",
                "phone": "7789025800",
                "email": "b118044@iiit-bh.ac.in",
                "password": "pass12345"
            }
        },
        {
            method: "POST",
            api: "http://localhost:5000/api/sendotp",
            body: {
                "email": "b118055@iiit-bh.ac.in"
            }
        },
        {
            method: "POST",
            api: "http://localhost:5000/api/otpverify",
            body: {
                "email": "b118055@iiit-bh.ac.in",
                "otp": "883889"
            }
        }
    ]
