# REST API End-points  List
## user
<pre>
api/user/signupuser
api/user/sendotp
api/user/verifyotp
api/user/loginuser
api/user/resetpassword
api/user/googlelogin
api/user/
api/user/profile
</pre>

## product details
<pre>
api/productdetails/ [GET, POST]
api/productdetails/:productID [PUT, GET]
api/productdetails/:productID/comments [GET, POST]
api/productdetails/:productID/comments/:commentID [GET, PUT]
api/productdetails/:productID/upvotes/add [POST]
api/hotproducts [GET]
api/hotproducts/recent [GET]
</pre>

## job profiles
<pre>
api/jobprofiles
api/jobprofiles/:jobId
api/jobprofiles/hire/:jobId 
api/jobprofiles/:jobId/addrating
api/jobs [POST]
api/jobs/:jobType [GET]
</pre>

# payment
<pre>
api/payment/razorpay/:jobId
api/payment/verification
</pre>