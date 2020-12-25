// define a mixin object
const anonymousUserRequiredMixin = {
    beforeRouteEnter(from, to, next) {
        if (localStorage.getItem('authUser')) return next({path: "/"})

        return next()
    },
}

const loginRequiredMixin = {
    beforeRouteEnter(from, to, next) {
        if ( ! localStorage.getItem('authUser')) return next({path: "/"})

        return next()
    },
}

export {
    anonymousUserRequiredMixin,
    loginRequiredMixin,
}