export function UserDisplayName(req){           // If request has a variable availabe - if passprt saved user in request
    if (req.user){                              // return user.displayName, if not return blank
        return req.user.displayName;
    }
    return '';
}

export function AuthGuard(req, res, next){      // This coide will be intercepting the request to check if the user is logged in and if not no access provided
    if(!req.isAuthenticated()){                 // extension method injected by passport - if req is not authenticated redirect to the login if not next () is called
        return res.redirect('/login')
    }
    next();
}