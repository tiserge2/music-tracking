import React from 'react'

const checkLogin = () => {
    console.log("[withAuth] checking auth");
      fetch('/checkToken')
        .then(res => {
          if (res.status === 200) {
            console.log("status from true: ", res.status)
            // return true
          } else {
            console.log("status from false: ", res.status)
            // return false
          }
          return res.status;
        })
        .catch(err => {
          console.error(err);
        //   return false;
        });
}

export default checkLogin;
