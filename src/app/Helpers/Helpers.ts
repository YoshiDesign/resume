// Closure to bind variadic args to evt listeners
export function wrapEvent(func, ...args) {
    return function(e) {
        func(e, ...args)
    }
}

